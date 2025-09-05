import "~/assets/scss/Show.scss";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import { useUser } from "~/context/UserContext";
import Modal from "~/components/layout/Modal";
import VistoriaChecklist from "~/components/modal/VistoriaChecklist";
import InfoProdutoModal from "~/components/modal/InfoProdutoModal";
import { checklist_api } from './../api';

export default function ChecklistOrder() {
    const { id } = useParams();
    const { usuarioLogado } = useUser();

    if (usuarioLogado && usuarioLogado.permissao !== 'checklists') {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout>
            <Title title={`Checklist Nº #${id}`} icon={<CheckBoxIcon />} />
            <Box className="show_content">
                <Box className="checklist_content">
                    <Checklist />
                </Box>
            </Box>
        </Layout>
    );
}

export function Checklist() {
    const { id } = useParams();
    const { selectedDepartamento, usuarioLogado } = useUser();
    const prevDepartamento = useRef(null);

    const [openModal, setOpenModal] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [checklistSelecionado, setChecklistSelecionado] = useState(null);

    const [observacao, setObservacao] = useState('');
    const [falha, setFalha] = useState(0);


    const [checklist, setChecklist] = useState(null);
    const navigate = useNavigate();

    const carregar = async () => {
        try {
            const res = await checklist_api.getChecklistOrdem(selectedDepartamento.id, id);
            
            const checklistAgrupado = agruparPorEtapa(res.data);
            
            setChecklist(checklistAgrupado);
        } catch (err) {
            console.log(err);
        }
    };

    const agruparPorEtapa = (dados) => {
        return dados.reduce((acc, item) => {
            const etapaId = item.id_conf_etapa;
            
            if (!acc[etapaId]) {
                acc[etapaId] = {
                    id_conf_etapa: etapaId,
                    etapa: item.etapa,
                    checklists: []
                };
            }
            
            acc[etapaId].checklists.push(item);
            
            return acc;
        }, {});
    };

    useEffect(() => {
        carregar();
    }, []); 

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/checklists");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);

    const abrirModalVistoria = (checklist) => {
        setChecklistSelecionado(checklist)
        setFalha(0)
        setObservacao('')
        setOpenModal(true)
    }

    const fazerVistoria = async () => {
        const payload = {
            id_user: usuarioLogado.id,
            status: falha === 1 ? -1 : 1,
            observacao: observacao,
        }
        
        const res = await checklist_api.updateChecklist(checklistSelecionado.id, payload);
        return res
    }

    return (
        <Box className="checklist" sx={{ p: '0px !important' }}>
            <Button className="info_produto" variant="contained" size="small" onClick={() => setOpenModalInfo(true)}>
                <InfoTwoToneIcon />
                Informaçoes do produto
            </Button>
            {checklist ? Object.values(checklist).map((etapa, index) => (
                <ChecklistEtapa 
                    key={etapa.id_conf_etapa}
                    etapa={etapa}
                    openModal={abrirModalVistoria}
                /> 
            )) : null}
            <Modal open={openModal} setOpen={setOpenModal} title="Fazer vistoria" confirm={fazerVistoria} atualizar={carregar}>
                <VistoriaChecklist setObservacao={setObservacao} setFalha={setFalha} title={checklistSelecionado?.checklist} />
            </Modal>
            <Modal open={openModalInfo} setOpen={setOpenModalInfo} title="Informações do produto" confirmText="Fechar">
                <InfoProdutoModal ordem={{ id: id }} />
            </Modal>
        </Box>
    )
}

function ChecklistEtapa({ etapa, openModal }) {
    return (
        <Box className="checklist_etapa">
            <h3>{etapa.etapa}</h3>
            <div className="checklist_itens">
                {etapa.checklists.map((checklistItem, index) => (
                    <ChecklistAtividade 
                        key={checklistItem.id} 
                        checklistItem={checklistItem}
                        openModal={openModal}
                    />
                ))}
            </div>
        </Box>
    )
}

function ChecklistAtividade({ checklistItem, openModal }) {
    return (<>
        <h4>
            <span>{checklistItem.nome_equipe}</span> {checklistItem.atividade}
        </h4>
        <Box className={`item ${
            checklistItem.status === 1 ? 'success' : 
            checklistItem.status === -1 ? 'error' : 'pending'
        }`}>
            <div className="text">
                <h5>{checklistItem.checklist}</h5>
                {checklistItem.observacao && 
                    <p className="observacoes">Observações: {checklistItem.observacao}</p>
                }
                {checklistItem.status_atividade < 4 && checklistItem.status !== -1 &&
                    <p className="observacoes">Aguardando a atividade ser finalizada!</p>
                }
            </div>
            {(checklistItem.status_atividade === 4 && checklistItem.status === 0) &&
                <Button variant="outlined" size="small" onClick={() => openModal(checklistItem)}>
                    Fazer vistoria
                </Button>
            }
        </Box>
    </>
    );
}