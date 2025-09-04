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

export default function ChecklistOrder() {
    const { id } = useParams();
    const { checklists, checklistItem, setChecklistItem, setChecklists, usuarioLogado } = useUser();

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
    const { 
        checklists, checklistOP, setChecklistOP, 
        atividadesOP, setAtividadesOP, 
        setVolumesOP, volumesOP, 
        etapas, etapasOP,
        equipes
    } = useUser();
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [checklistSelecionado, setChecklistSelecionado] = useState(null);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

    const [observacao, setObservacao] = useState('');
    const [falha, setFalha] = useState(0);


    const atualizarStatusAtividade = (atividade, novoStatus) => {
        const prevAtividades = atividadesOP.map(item =>
            item.id === atividade.id ? { ...item, status: novoStatus } : item
        )
        setAtividadesOP([...prevAtividades, {
            id: atividadesOP.length + 1,
            id_ordem: atividade.id_ordem,
            id_etapa: atividade.id_etapa,
            id_atividade: atividade.id_atividade,
            id_equipe: atividade.id_equipe,
            ativo: 1,
            data: atividade.data,
            status: 0
        }])
    };
    const abrirModalVistoria = (checklist , atividade) => {
        setChecklistSelecionado(checklist)
        setAtividadeSelecionada(atividade)
        setFalha(0)
        setObservacao('')

        setOpenModal(true)
    }
    const fazerVistoria = () => {
        if(falha){
            const cadastrados = checklistOP
            .filter(item => item.id_ativ === atividadeSelecionada.id && item.id_atividade === checklistSelecionado.id_atividade)
            .map(item => item.id_checklist);
    
            const todosCheckAtv = checklists.filter(item => item.id_atividade === checklistSelecionado.id_atividade);
        
            const naoCadastrados = todosCheckAtv.filter(item2 =>
                !cadastrados.includes(item2.id) && item2.id !== checklistSelecionado.id
            );
        
            const novoItem = {
                id: checklistOP.length + 1,
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: checklistSelecionado.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: observacao,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 0
            };
        
            const novosItens = naoCadastrados.map((item, i) => ({
                id: checklistOP.length + 2 + i, 
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: item.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: 'Falha no checklist: ' + checklistSelecionado.title,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 0
            }));
        
            setChecklistOP(prev => [...prev, novoItem, ...novosItens]);
        
            setChecklistOP(prev =>
                prev.map(item =>
                    item.id_ativ === atividadeSelecionada.id ? { ...item, status: 0 } : item
                )
            );

            setVolumesOP(prev => prev.filter(item => item.id_ativ !== atividadeSelecionada.id));
            atualizarStatusAtividade(atividadeSelecionada, -1);
        } else {
            setChecklistOP([...checklistOP, {
                id: checklistOP.length + 1,
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: checklistSelecionado.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: observacao,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 1
            }])
        }
    }

    return (
        <Box className="checklist">
            <Button className="info_produto" variant="contained" size="small" onClick={() => setOpenModalInfo(true)}>
                <InfoTwoToneIcon />
                Informaçoes do produto
            </Button>
            {etapasOP.map((item, index) => (
                <ChecklistEtapa 
                    key={index}
                    atividadesOP={atividadesOP.filter((a) => a.id_etapa === item && a.ativo === 1)} 
                    checklists={checklists} 
                    etapa={etapas.find((e) => e.id === item)} 
                    equipes={equipes}
                    openModal={abrirModalVistoria}/> 
            ))}
            <Modal open={openModal} setOpen={setOpenModal} title="Fazer vistoria" confirm={fazerVistoria}>
                <VistoriaChecklist setObservacao={setObservacao} setFalha={setFalha} title={checklistSelecionado?.title} />
            </Modal>
            <Modal open={openModalInfo} setOpen={setOpenModalInfo} title="Informações do produto" confirmText="Fechar">
                <InfoProdutoModal />
            </Modal>
        </Box>
    )
}

function ChecklistEtapa({ etapa, atividadesOP, checklists, equipes, openModal }) {
    const { atividades } = useUser();

    return (
        <>
            {/* {atividadesOP.length > 0 && 
                <Box className="checklist_etapa">
                    <h3>{etapa.title}</h3>
                    <div className="checklist_itens">
                        {atividadesOP.map((atividade, index) => {
                            const equipe = equipes.find(e => e.id === atividade.id_equipe);

                            const atividadeData = atividades.find(item => item.id === atividade.id_atividade);

                            return (
                                <>
                                <h4><span>{equipe.title}</span> {atividadeData.title}</h4>
                                <ChecklistAtividade 
                                    key={index} 
                                    checklists={checklists.filter((c) => c.id_atividade === atividade.id_atividade)} 
                                    atividade={atividade} 
                                    openModal={openModal}/>
                                </>
                            )
                        })}
                    </div>
                </Box>
            } */}
        </>
    )
}
function ChecklistAtividade({ checklists, atividade, openModal }) {
    const { checklistOP } = useUser();
    
    return (
        <>
        {checklists.map((checklist, index) => {
            const checklistData = checklistOP.find(item => item.id_ativ === atividade.id && item.id_checklist === checklist.id);

            return (
                <Box className={"item "+
                    (checklistData?.status === 1 ? 'success' : '')+
                    (checklistData?.status === 0 ? 'error' : '')
                } key={index}>
                    <div className="text">
                        <h5>{checklist.title}</h5>
                        {checklistData?.observacao && 
                            <p className="observacoes">Observações: {checklistData?.observacao || 'Nenhuma'}</p>
                        }
                        {(atividade.status < 4 && atividade.status !== -1) &&
                            <p className="observacoes">Aguardando a atividade ser finalizada!</p>
                        }
                    </div>
                    {(atividade.status === 4 && !checklistData) &&
                        <Button variant="outlined" size="small" onClick={() => openModal(checklist, atividade)}>
                            Fazer vistoria
                        </Button>
                    }
                </Box>
            );
        })}
        </>
    );
}