import "~/assets/scss/Show.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
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

import Layout from "~/components/Layout";
import Title from "~/components/Title";
import { useUser } from "~/context/UserContext";

import Modal from '~/components/Modal';
import AdicionarString from '~/components/AdicionarString';
import AdicionarVolume from '~/components/AdicionarVolume';

export default function ConfiguracaoCheckVol() {
    const { id, id_etapa, id_atividade } = useParams();

    const [tab, setTab] = useState(0);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout>
            <Title title={`Configuração de Checklists e Volumes`} icon={<SettingsApplicationsIcon />} />
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
                {tab == 0 && <Checklists id={id} id_atividade={id_atividade} id_etapa={id_etapa} />}
                {tab == 1 && <Volumes id={id} id_atividade={id_atividade} id_etapa={id_etapa} />}
                </Box>
            </Box>
        </Layout>
    );
}

function Checklists({ id, id_atividade, id_etapa }){
    const { checklists, setChecklists } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [novoChecklist, setNovoChecklist] = useState("");

    const adicionarChecklist = () => {
        setChecklists([
            ...checklists,
            {
                id: checklists.length + 1,
                id_categoria: id,
                id_etapa: id_etapa,
                id_atividade: id_atividade,
                title: novoChecklist
            },
        ]);
        setNovoChecklist("");
        setOpenModal(false);
    }
    const deletar = (id) => {
        setChecklists(checklists.filter(item => item.id !== id))
    }

    const createData = (checklist, acoes) => {
        return {
            checklist,
            acoes,
        };
    }
    const createDataItem = () => {
        return (checklists.filter((item) => item.id_atividade == id_atividade))?.map((checklist) => {
            return createData(
                checklist.title,
                <Box className="acoes">
                    <Button onClick={() => {deletar(checklist.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || []
    }
    useEffect(() => {
        setRowsChecklist(createDataItem())
    },[checklists])

    const [rowsChecklist, setRowsChecklist] = useState(createDataItem());

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
        <DataTable headCells={headCellsChecklist} rows={rowsChecklist}/>
        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar checklist</Button>
        <Modal open={openModal} setOpen={setOpenModal} title="Adicionar checklist" confirm={adicionarChecklist}>
            <AdicionarString value={novoChecklist} setValue={setNovoChecklist} />
        </Modal>
        </>
    )
}

function Volumes({ id, id_atividade, id_etapa }){
    const { volumes, setVolumes } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [novoVolume, setNovoVolume] = useState({
        descricao: "",
        largura: "",
        comprimento: "",
        altura: "",
        peso: ""
    });

    const adicionarVolume = () => {
        setVolumes([
            ...volumes,
            {
                id: volumes.length + 1,
                id_categoria: id,
                id_etapa: id_etapa,
                id_atividade: id_atividade,
                title: novoVolume.descricao,
                comprimento: novoVolume.comprimento,
                largura: novoVolume.largura,
                altura: novoVolume.altura,
                peso: novoVolume.peso
            },
        ]);
        setNovoVolume("");
        setOpenModal(false);
    }
    const deletar = (id) => {
        setVolumes(volumes.filter(item => item.id !== id))
    }

    const createData = (volume, comprimento, largura, altura, peso, acoes) => {
        return { volume, comprimento, largura, altura, peso, acoes };
    }
    const createDataItem = () => {
        return (volumes.filter((item) => item.id_atividade == id_atividade))?.map((volume) => {
            return createData(
                volume.title,
                volume.comprimento,
                volume.largura,
                volume.altura,
                volume.peso,
                <Box className="acoes">
                    <Button onClick={() => {deletar(volume.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || []
    }
    useEffect(() => {
        setRows(createDataItem())
    },[volumes])

    const [rows, setRows] = useState(createDataItem());

    const headCells = [
        { id: 'volume', label: 'Volume', },
        { id: 'comprimento', label: 'Comprimento', },
        { id: 'largura', label: 'Largura', },
        { id: 'altura', label: 'Altura', },
        { id: 'peso', label: 'Peso', },
        {
            id: 'acoes',
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <>
        <DataTable headCells={headCells} rows={rows}/>
        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar volume</Button>
        <Modal open={openModal} setOpen={setOpenModal} title="Adicionar volume" confirm={adicionarVolume}>
            <AdicionarVolume value={novoVolume} setValue={setNovoVolume} />
        </Modal>
        </>
    )
}