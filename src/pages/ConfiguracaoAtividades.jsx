import "~/assets/scss/Show.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import InputAuto from './components/InputAuto';
import DataTable from './components/DataTable';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "./components/Layout";
import Title from "./components/Title";
import { useUser } from "../context/UserContext";

import Modal from './components/Modal';
import AdicionarString from './components/AdicionarString';

export default function ConfiguracaoAtividades() {
    const { id, id_etapa } = useParams();
    const { etapas, setEtapas, atividades, setAtividades, checklists, setChecklists } = useUser();

    const [novaAtividade, setNovaAtividade] = useState("");

    const adicionarAtividae = () => {
        setAtividades([
            ...atividades,
            {
                id: atividades.length + 1,
                id_etapa: id_etapa,
                id_categoria: id,
                title: novaAtividade
            },
        ]);
        setNovaAtividade("");
        setOpenModal(false);
    }
    const deletar = (id) => {
        setAtividades(atividades.filter(item => item.id !== id))
        setChecklists(checklists.filter(item => item.id_atividade !== id))
    }

    const [openModal, setOpenModal] = useState(false);


    //dados da tabela
    const createData = (etapa, atividades, checklists, acoes) => {
        return {
            etapa,
            atividades,
            checklists,
            acoes,
        };
    }
    useEffect(() => {
        setRows(
            (atividades.filter((item) => item.id_etapa == id_etapa))?.map((atividade) => {
                return createData(
                    atividade.title,
                    checklists.filter((checklist) => checklist.id_atividade == atividade.id).length,
                    <Box className="acoes">
                        <Button component={Link} to={`/configuracoes/${id}/etapa/${atividade.id}/atividade/${atividade.id}`} variant="outlined" size="small">
                            <EditSquareIcon />
                        </Button>
                        <Button onClick={() => {deletar(atividade.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                    </Box>
                );
            }) || []
        )
    },[atividades])

    const [rows, setRows] = useState(
        (atividades.filter((item) => item.id_etapa == id_etapa))?.map((atividade) => {
            return createData(
                atividade.title,
                checklists.filter((checklist) => checklist.id_atividade == atividade.id).length,
                <Box className="acoes">
                    <Button component={Link} to={`/configuracoes/${id}/etapa/${id_etapa}/atividade/${atividade.id}`} variant="outlined" size="small">
                        <EditSquareIcon />
                    </Button>
                    <Button onClick={() => {deletar(atividade.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || [] 
    );

    const headCells = [
        {
            id: 'etapa',
            numeric: false,
            label: 'Etapa',
        },
        {
            id: 'checklists',
            numeric: false,
            label: 'Checklists',
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
            <Title title={`Configuração de Atividade`} icon={<SettingsApplicationsIcon />} />
            <Box className="show_content">
                <Box className="table_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar atividade</Button>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar atividade" confirm={adicionarAtividae}>
                <AdicionarString value={novaAtividade} setValue={setNovaAtividade} />
            </Modal>
        </Layout>
    );
}