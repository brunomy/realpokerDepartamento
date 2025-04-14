import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip, Tabs, Tab } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

import Modal from './components/Modal';
import AdicionarChecklist from './components/AdicionarChecklist';

import { useUser } from "../context/UserContext";

export default function Configuracoes() {
    const [tab, setTab] = useState(0);

    const { etapas, atividades, categorias, checklists } = useUser();

    //dados da tabela
    const createData = (categorias, etapas, atividades, checklists, acoes) => {
        return { categorias, etapas, atividades, checklists, acoes};
    }
    const [rows, setRows] = useState(
        categorias?.map((categoria) => {
            return createData(
                categoria.title,
                etapas.filter((etapa) => etapa.id_categoria == categoria.id).length,
                atividades.filter((atividade) => atividade.id_categoria == categoria.id).length,
                checklists.filter((checklist) => checklist.id_categoria == categoria.id).length,
                <Box className="acoes">
                    <Button component={Link} to={`/configuracoes/${categoria.id}`} variant="outlined" size="small">
                        <EditSquareIcon />
                    </Button>
                </Box>
            );
        }) || [] 
    );
    const headCells = [
        {
            id: 'categoria',
            numeric: false,
            label: 'Categoria',
        },
        {
            id: 'etapas',
            numeric: true,
            label: 'Etapas',
        },
        {
            id: 'atividades',
            numeric: true,
            label: 'Atividades',
        },
        {
            id: 'checklists',
            numeric: true,
            label: 'Checklists',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout>
            <Title title="Configuração de produção" icon={<SettingsApplicationsIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Fábrica" />
                    <Tab label="Fichas" />
                    <Tab label="Comunicação" />
                </Tabs>
            </Box>
            <Box className="index_content">
                <Box className="table_content filtros">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}