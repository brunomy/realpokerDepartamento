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

import Layout from "~/components/Layout";
import Title from "~/components/Title";
import { useUser } from "~/context/UserContext";

import Modal from '~/components/Modal';
import AdicionarString from '~/components/AdicionarString';

export default function ConficuracaoEtapas() {
    const { id } = useParams();
    const { etapas, setEtapas, atividades, setAtividades, checklists, setChecklists, volumes } = useUser();

    const [novaEtapa, setNovaEtapa] = useState("");

    const adicionarEtapa = () => {
        setEtapas([
            ...etapas,
            {
                id: etapas.length + 1,
                id_departamento: 1,
                title: novaEtapa,
                id_categoria: id,
            },
        ]);
        setNovaEtapa("");
        setOpenModal(false);
    }
    const deletar = (id) => {
        setEtapas(etapas.filter(item => item.id !== id))
        setAtividades(atividades.filter(item => item.id_etapa !== id))
        setChecklists(checklists.filter(item => item.id_etapa !== id))
    }

    const [openModal, setOpenModal] = useState(false);

    //dados da tabela
    const createData = (etapa, atividades, checklists, volumes, acoes) => {
        return { etapa, atividades, checklists, volumes, acoes };
    }
    const createDataItens = () => {
        return (etapas.filter((item) => item.id_categoria == id))?.map((etapa) => {
            return createData(
                etapa.title,
                atividades.filter((atividade) => atividade.id_etapa == etapa.id).length,
                checklists.filter((checklist) => checklist.id_etapa == etapa.id).length,
                volumes.filter((volume) => volume.id_etapa == etapa.id).length,
                <Box className="acoes">
                    <Button component={Link} to={`/configuracoes/${id}/etapa/${etapa.id}`} variant="outlined" size="small">
                        <EditSquareIcon />
                    </Button>
                    <Button onClick={() => {deletar(etapa.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || [] 
    }
    useEffect(() => {
        setRows(createDataItens())
    },[etapas])

    const [rows, setRows] = useState(
        createDataItens()
    );

    const headCells = [
        {
            id: 'etapa',
            numeric: false,
            label: 'Etapa',
        },
        {
            id: 'atividades',
            numeric: false,
            label: 'Atividades',
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
            <Title title={`Configuração de etapas`} icon={<SettingsApplicationsIcon />} />
            <Box className="show_content">
                <Box className="table_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar etapa</Button>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar etapa" confirm={adicionarEtapa}>
                <AdicionarString value={novaEtapa} setValue={setNovaEtapa} />
            </Modal>
        </Layout>
    );
}