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

export default function ConfiguracaoAtividades() {
    const { id, id_etapa } = useParams();
    const { atividades, setAtividades, checklists, setChecklists, volumes, categorias, etapas } = useUser();

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
    const createData = (atividade, checklists, volumes, acoes) => {
        return { atividade, checklists, volumes, acoes };
    }
    const createDataItem = () => {
        return (atividades.filter((item) => item.id_etapa == id_etapa))?.map((atividade) => {
            return createData(
                atividade.title,
                checklists.filter((checklist) => checklist.id_atividade == atividade.id).length,
                volumes.filter((volume) => volume.id_atividade == atividade.id).length,
                <Box className="acoes">
                    <Button className="link" component={Link} to={`/configuracoes/${id}/etapa/${id_etapa}/atividade/${atividade.id}`} variant="outlined" size="small">
                        <EditSquareIcon />
                    </Button>
                    <Button onClick={() => {deletar(atividade.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || []
    }
    useEffect(() => {
        setRows(createDataItem())
    },[atividades])

    const [rows, setRows] = useState(createDataItem());

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

    const categoria = categorias.find((item) => item.id == id)
    const etapa = etapas.find((item) => item.id == id_etapa)
    const breadcrumbs = [
        {
            label: 'Configurações',
            url: '/configuracoes'
        },
        {
            label: categoria.title,
            url: `/configuracoes/${id}`
        },
        {
            label: etapa.title,
            url: `/configuracoes/${id}/etapa/${id_etapa}`
        }
    ]

    return (
        <Layout>
            <Title title={`Configuração de Atividade`} icon={<SettingsApplicationsIcon />} breadcrumbs={breadcrumbs} />
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