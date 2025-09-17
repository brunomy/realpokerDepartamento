import "~/assets/scss/Show.scss";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Box, Button, TextField, Typography, IconButton, Tabs, Tab } from "@mui/material";
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
import { useAutoUpdate } from "../hooks/useAutoUpdate";

export default function ConfiguracaoCheckVol() {
    const { selectedDepartamento, usuarioLogado } = useUser();

    if (usuarioLogado && usuarioLogado.permissao !== 'gerente') {
        return <Navigate to="/" replace />;
    }

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
    const [atividade, setAtividade] = useState(null);
    const [checklists, setChecklists] = useState([]);
    const [volumes, setVolumes] = useState([]);

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/configuracoes");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);

    const carregar = async () => {
        try {
            const res = await config_api.getChecklistVolumes(id);

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
                },
                {
                    label: res.data?.atividade?.titulo || 'Atividade',
                    url: `/configuracoes/atividade/${res.data?.atividade?.id}`
                }
            ]);

            setAtividade(res.data?.atividade || null);
            setChecklists(res.data?.checklists || []);
            setVolumes(res.data?.volumes || []);
        } catch (err) {
            setError(err.message);
        }
    };
    useAutoUpdate(carregar);

    const editar = async (id, titulo) => {
        try {
            const payload = {
                titulo: titulo,
            };

            const res = await config_api.updateAtividade(id, payload);
            console.log("Atividade atualizada:", res.data);

            carregar();
        } catch (err) {
            console.error("Erro ao criar atividade:", err.message);
        }
    }


    const [tab, setTab] = useState(0);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout>
            <Title title={`Configuração de Checklists e Volumes`} icon={<SettingsApplicationsIcon />} breadcrumbs={breadcrumbs} />

            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Checklists" />
                    <Tab label="Volumes" />
                </Tabs>
            </Box>

            <Box className="show_content">
                <Box className="table_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                {tab == 0 && <Checklists atividade={atividade} editar={editar} checklists={checklists} carregar={carregar} />}
                {tab == 1 && <Volumes atividade={atividade} editar={editar} volumes={volumes} carregar={carregar} />}
                </Box>
            </Box>
        </Layout>
    );
}

function Checklists({ atividade, editar, checklists, carregar }){
    const { id } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [rows, setRows] = useState(checklists || []);
    const [novo, setNovo] = useState("");

    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este checklist?")) return;

        try {
            const res = await config_api.deleteChecklist(id);
            console.log(res.message);

            carregar();
        } catch (err) {
            console.error("Erro ao deletar checklist:", err.message);
        }
    };
    const adicionar = async () => {
        try {
            const payload = {
                id_conf_atividade: id,
                titulo: novo,
            };

            const res = await config_api.createChecklist(payload);

            console.log("Checklist criado:", res.data);

            carregar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar checklist:", err.message);
        }
    }

    const createData = (checklist, acoes) => {
        return {
            checklist,
            acoes,
        };
    }
    const createDataItem = () => {
        return checklists?.map((checklist) => {
            return createData(
                checklist.titulo,
                <Box className="acoes">
                    <Button onClick={() => {deletar(checklist.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || []
    }

    useEffect(() => {
        setRows(createDataItem())
    },[checklists])

    useEffect(() => {
        setNovo('')
    },[openModal])

    const headCellsChecklist = [
        {
            id: 'checklist',
            numeric: false,
            label: 'Checklist',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <>
        <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
            <MudarTitulo objeto={atividade}  onClick={editar} />
            <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar Checklist</Button>
        </Box>
        <DataTable headCells={headCellsChecklist} rows={rows}/>
        <Modal open={openModal} setOpen={setOpenModal} title="Adicionar checklist" confirm={adicionar}>
            <AdicionarString value={novo} setValue={setNovo} />
        </Modal>
        </>
    )
}

function Volumes({ atividade, editar, volumes, carregar }){
    const { id } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [rows, setRows] = useState(volumes || []);
    const [novo, setNovo] = useState("");

    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este volume?")) return;

        try {
            const res = await config_api.deleteVolume(id);
            console.log(res.message);

            carregar();
        } catch (err) {
            console.error("Erro ao deletar volume:", err.message);
        }
    };
    const adicionar = async () => {
        try {
            const payload = {
                id_conf_atividade: id,
                titulo: novo,
            };

            const res = await config_api.createVolume(payload);

            console.log("Checklist criado:", res.data);

            carregar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar checklist:", err.message);
        }
    }

    const createData = (volume, acoes) => {
        return { volume, acoes };
    }
    const createDataItem = () => {
        return volumes?.map((volume) => {
            return createData(
                volume.titulo,
                <Box className="acoes">
                    <Button onClick={() => {deletar(volume.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || []
    }

    useEffect(() => {
        setRows(createDataItem())
    },[volumes])

    useEffect(() => {
        setNovo('')
    },[openModal])

    const headCells = [
        { id: 'volume', label: 'Volume', },
        {
            id: 'acoes',
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <>
        <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
            <MudarTitulo objeto={atividade}  onClick={editar} />
            <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar Volume</Button>
        </Box>
        <DataTable headCells={headCells} rows={rows}/>
        <Modal open={openModal} setOpen={setOpenModal} title="Adicionar volume" confirm={adicionar}>
            <AdicionarString value={novo} setValue={setNovo} />
        </Modal>
        </>
    )
}