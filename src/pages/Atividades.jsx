import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip, Tabs, Tab } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import dayjs from 'dayjs';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

export default function Atividades() {
    const hoje = dayjs();

    const [tab, setTab] = useState(0);
    const [statusFilter, setStatusFilter] = useState([]);
    const [teamFilter, setTeamFilter] = useState([]);
    const [idFilter, setIdFilter] = useState([]);
    const [dateFilterDe, setDateFilterDe] = useState(hoje.format('YYYY-MM-DD'));
    const [dateFilterAte, setDateFilterAte] = useState(hoje.format('YYYY-MM-DD'));

    const statusList = [
        { label: 'Pendente', value: 1},
        { label: 'Em andamento', value: 2},
        { label: 'Parado', value: 3},
        { label: 'Concluído', value: 4},
    ]
    const teamList = [
        { label: 'M1', value: 1},
        { label: 'M2', value: 2},
        { label: 'M3', value: 3}
    ]
    const idList = [
        { label: '#5951', value: 5951},
        { label: '#5952', value: 5952},
        { label: '#5953', value: 5953},
        { label: '#5954', value: 5954},
    ]

    //dados da tabela
    const createData = (id, equipe, descricao, producao, status, link) => {
        return {
            id,
            equipe,
            descricao,
            producao,
            status,
            link,
        };
    }
    const rows = [
        createData(
            '#3489857', 
            'M1',
            'Cortar + Montar Base 1 Coluna Retangular',
            '01/11/2024',
            <Chip className="stats" size="small" label="Pendente" />,
            <Button component={Link} to="/atividades/3489857" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489858', 
            'M2',
            'Cortar Também Dividido + Réguas',
            '01/11/2024',
            <Chip className="stats" size="small" color="primary" label="Em andamento" />,
            <Button component={Link} to="/atividades/3489858" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489859', 
            'M3',
            'Fazer Furo das Vailhas Tampão Dividido	',
            '01/11/2024',
            <Chip className="stats" size="small" color="error" label="Parado" />,
            <Button component={Link} to="/atividades/3489859" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489860', 
            'M1',
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/3489860" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489861', 
            'M1',
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/3489861" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489862', 
            'M1',
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/3489862" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3489863', 
            'M1',
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/3489863" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'equipe',
            numeric: false,
            label: 'Equipe',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'producao',
            numeric: false,
            label: 'Produção',
        },
        {
            id: 'status',
            numeric: true,
            label: 'Status',
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
            <Title title="Lista de atividades" icon={<AssignmentIcon/>} />
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
            <Box className="index_content atividades_list">
                <Box className="filtros">
                    <h2>Filtros:</h2>
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto label="id" list={idList} setValue={setIdFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Equipe" list={teamList} setValue={setTeamFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Status" list={statusList} setValue={setStatusFilter} width={'100%'} />
                        </Box>
                        <Box className="item calendario">
                            <InputCalendarRange setFunctionDe={setDateFilterDe} setFunctionAte={setDateFilterAte} />
                        </Box>
                    </Box>
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="relatorio" variant="contained"><PictureAsPdfIcon/> Gerar relatório</Button>
                </Box>
            </Box>
        </Layout>
    )
}