import "~/assets/scss/Show.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import InputAuto from '~/components/InputAuto';
import DataTable from '~/components/DataTable';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import { useUser } from "~/context/UserContext";

import Modal from '~/components/layout/Modal';
import AdicionarString from '~/components/modal/AdicionarString';


import { config_api } from './../api';
import { MudarTitulo } from "./ConficuracaoEtapas";

export default function ConfiguracaoAtividades() {
    const { selectedDepartamento } = useUser();
    const navigate = useNavigate();
    const prevDepartamento = useRef(null);

    const { id } = useParams();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            label: 'Configurações',
            url: '/configuracoes'
        },
    ]);
    const [error, setError] = useState(null);

    const [novo, setNovo] = useState("");
    const [etapa, setEtapa] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/configuracoes");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);

    useEffect(() => {
        setNovo('');
    }, [openModal]);

    const carregar = async () => {
        try {
            const res = await config_api.getAtividades(id);
            
            setBreadcrumbs([
                {
                    label: 'Configurações',
                    url: '/configuracoes'
                },
                {
                    label: res.data?.categoria?.nome || 'Categoria',
                    url: `/configuracoes/${res.data?.categoria?.id}`
                },
                {
                    label: res.data?.etapa?.titulo || 'Etapa',
                    url: `/configuracoes/etapa/${res.data?.etapa?.id}`
                }
            ]);

            setEtapa(res.data?.etapa || null);
            
            setRows(
                res.data?.atividades?.map((atividade) => {
                    return createData(
                        atividade.titulo,
                        atividade.checklists_count,
                        atividade.volumes_count,
                        <Box className="acoes">
                            <Button className="link" component={Link} to={`/configuracoes/atividade/${atividade.id}`} variant="outlined" size="small">
                                <EditSquareIcon />
                            </Button>
                            <Button onClick={() => {deletar(atividade.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                        </Box>
                    );
                }) || []
            );
        } catch (err) {
            setRows([]);
            setError(err.message);
        }
    };

    const adicionar = async () => {
        try {
            const payload = {
                id_conf_etapa: id,
                titulo: novo,
            };

            const res = await config_api.createAtividade(payload);

            console.log("Atividade criada:", res.data);

            carregar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar etapa:", err.message);
        }
    }
    const editar = async (id, titulo) => {
        try {
            const payload = {
                titulo: titulo,
            };

            const res = await config_api.updateEtapa(id, payload);

            console.log("Etapa atualizada:", res.data);

            carregar();
        } catch (err) {
            console.error("Erro ao criar etapa:", err.message);
        }
    }
    
    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta atividade?")) return;

        try {
            const res = await config_api.deleteAtividade(id);
            console.log(res.message);

            carregar();
        } catch (err) {
            console.error("Erro ao deletar atividade:", err.message);
        }
    };


    //dados da tabela
    const createData = (atividade, checklists, volumes, acoes) => {
        return { atividade, checklists, volumes, acoes };
    }
    const [rows, setRows] = useState([]);

    const headCells = [
        {
            id: 'atividade',
            numeric: false,
            label: 'Atividade',
        },
        {
            id: 'checklists',
            numeric: false,
            label: 'Checklists',
        },
        {
            id: 'volumes',
            numeric: false,
            label: 'Volumes',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <Layout>
            <Title title={`Configuração de Atividade`} icon={<SettingsApplicationsIcon />} breadcrumbs={breadcrumbs} />
            <Box className="show_content">
                <Box className="table_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                    <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
                        <MudarTitulo objeto={etapa} onClick={editar} />
                        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar atividade</Button>
                    </Box>
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar atividade" confirm={adicionar}>
                <AdicionarString value={novo} setValue={setNovo} />
            </Modal>
        </Layout>
    );
}

