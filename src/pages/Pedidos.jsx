import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


import dayjs from 'dayjs';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

export default function Pedidos() {
    const hoje = dayjs();

    const [statusFilter, setStatusFilter] = useState([]);
    const [idFilter, setIdFilter] = useState([]);
    const [dateFilterDe, setDateFilterDe] = useState(hoje.format('YYYY-MM-DD'));
    const [dateFilterAte, setDateFilterAte] = useState(hoje.format('YYYY-MM-DD'));

    const statusList = [
        { label: 'Pendente', value: 1},
        { label: 'Em andamento', value: 2},
        { label: 'Parado', value: 3},
        { label: 'Concluído', value: 4},
    ]
    const idList = [
        { label: '#5951', value: 5951},
        { label: '#5952', value: 5952},
        { label: '#5953', value: 5953},
        { label: '#5954', value: 5954},
    ]

    //dados da tabela
    const createData = (id, ordens, criacao, comprador, status, link) => {
        return { id, ordens, criacao, comprador, status, link };
    }
    const rows = [
        createData(
            '#5951', 
            '1/2',
            '01/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="primary" label="Em andamento" />,
            <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5952', 
            '0/2',
            '02/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" label="Pendente" />,
            <Button component={Link} to="/pedidos/5952" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5953', 
            '1/2',
            '03/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="error" label="Parado" />,
            <Button component={Link} to="/pedidos/5953" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5955', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5955" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5956', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5956" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5957', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5957" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5958', 
            '4/4',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5958" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5959', 
            '1/1',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5959" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5960', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5960" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5961', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5961" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#5962', 
            '2/2',
            '04/11/2024',
            'João Felipe',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/pedidos/5962" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'ordens',
            numeric: false,
            label: 'Ordens',
        },
        {
            id: 'criacao',
            numeric: false,
            label: 'Criação',
        },
        {
            id: 'comprador',
            numeric: false,
            label: 'Comprador',
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

    return (
        <Layout>
            <Title title="Lista de pedidos" icon={<ShoppingCartIcon/>} />
      
            <Box className="index_content">
                <Box className="filtros">
                    <h2>Filtros:</h2>
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto label="id" list={idList} setValue={setIdFilter} width={'100%'} />
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
                    <Button className="relatorio" variant="contained"><PictureAsPdfIcon /> Gerar relatório</Button>
                </Box>
            </Box>
        </Layout>
    )
}