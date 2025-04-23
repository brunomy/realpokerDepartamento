import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import Status from '../components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

export default function Ordens() {
    const hoje = dayjs();

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
    const createDataOrdens = (id, Pedido, categoria, descricao, producao, status, link) => {
        return { id, Pedido, categoria, descricao, producao, status, link };
    }
    const rowsOrdens = [
        createDataOrdens(
            '#3568',
            <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">#5951</Button>,
            <Chip className="stats" size="small" label="Mesa de poker" />,
            'Mesa de poker profissional',
            '11/04/2025',
            <Status status={calculoStatusPedido()} size={'small'} />,
            <Button component={Link} to="/ordens/3568" variant="outlined" size="small">Detalhes</Button>
        )
    ];
    const headCellsOrdens = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'pedido',
            numeric: false,
            label: 'Pedido',
        },
        {
            id: 'categoria',
            numeric: false,
            label: 'Categoria',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'producao',
            numeric: true,
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

    return (
        <Layout>
            <Title title="Lista de ordens" icon={<FactoryIcon/>} />
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
                    <DataTable headCells={headCellsOrdens} rows={rowsOrdens}/>
                    <Button className="relatorio" variant="contained"><PictureAsPdfIcon/> Gerar relatório</Button>
                </Box>
            </Box>
        </Layout>
    )
}