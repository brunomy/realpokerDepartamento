import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import dayjs from 'dayjs';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

export default function Remessas() {
    const hoje = dayjs();

    const [statusFilter, setStatusFilter] = useState([]);
    const [teamFilter, setTeamFilter] = useState([]);
    const [idFilter, setIdFilter] = useState([]);
    const [dateFilterDe, setDateFilterDe] = useState(hoje.format('YYYY-MM-DD'));
    const [dateFilterAte, setDateFilterAte] = useState(hoje.format('YYYY-MM-DD'));

    const destinoList = [
        { label: 'Goiânia', value: 1},
    ]
    const pedidosList = [
        { label: '#5951', value: 1},
        { label: '#5952', value: 2},
        { label: '#5953', value: 3},
        { label: '#5955', value: 3},
        { label: '#5956', value: 3}
    ]
    const idList = [
        { label: '#3486-1', value: 5951},
        { label: '#3486-2', value: 5952},
    ]

    //dados da tabela
    const createData = (id, pedidos, dimensoes, peso, valor, destino, entrega, link) => {
        return { id, pedidos, dimensoes, peso, valor, destino, entrega, link };
    }
    const rows = [
        createData(
            '#3486-1', 
            <Box className="pedidos">
                <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">5951</Button>
                <Button component={Link} to="/pedidos/5952" variant="outlined" size="small">5952</Button>
            </Box>,
            '100 x 200 x 200',
            '100kg',
            'R$500,00',
            'Goiânia/GO',
            '10/05/2025',
            <Button component={Link} to="/remessas/3486-1" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3485-2', 
            <Box className="pedidos">
                <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">5951</Button>
            </Box>,
            '100 x 200 x 200',
            '100kg',
            'R$500,00',
            'Goiânia/GO',
            '10/05/2025',
            <Button component={Link} to="/remessas/3485-1" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'pedidos',
            numeric: false,
            label: 'Pedidos',
        },
        {
            id: 'dimensoes',
            numeric: true,
            label: 'Dimensões',
        },
        {
            id: 'peso',
            numeric: false,
            label: 'Peso',
        },
        {
            id: 'valor',
            numeric: false,
            label: 'Valor',
        },
        {
            id: 'destino',
            numeric: false,
            label: 'Destino',
        },
        {
            id: 'entrega',
            numeric: false,
            label: 'Entrega',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    return (
        <Layout>
            <Title title="Lista de remessas" icon={<LocalShippingIcon/>} />
            <Box className="index_content atividades_list">
                <Box className="filtros">
                    <h2>Filtros:</h2>
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto label="id" list={idList} setValue={setIdFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Pedido" list={pedidosList} setValue={setTeamFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Destino" list={destinoList} setValue={setStatusFilter} width={'100%'} />
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