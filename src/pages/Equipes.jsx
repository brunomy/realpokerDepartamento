import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip, Tabs, Tab } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

import dayjs from 'dayjs';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

export default function Equipes() {
    const [tab, setTab] = useState(0);

    //dados da tabela
    const createData = (id, nome, descricao, funcionarios, link) => {
        return { id, nome, descricao, funcionarios, link };
    }
    const rows = [
        createData(
            '#1', 
            'M1',
            'Responsável por montar mesas',
            '5',
            <Button component={Link} to="/equipes/1" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#2', 
            'M2',
            'Responsável por pintar mesas',
            '4',
            <Button component={Link} to="/equipes/2" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3', 
            'M3',
            'Responsável por dar o acabamento',
            '4',
            <Button component={Link} to="/equipes/3" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#4', 
            'M4',
            'Responsável por dar o acabamento',
            '4',
            <Button component={Link} to="/equipes/4" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'nome',
            numeric: false,
            label: 'Nome',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'funcionarios',
            numeric: false,
            label: 'Funcionarios',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout>
            <Title title="Lista de equipes" icon={<GroupsIcon/>} />
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
                <br />
                <br />
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}