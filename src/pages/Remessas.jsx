import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';

export default function Remessas() {
    const hoje = dayjs();

    const [statusFilter, setStatusFilter] = useState([]);
    const [pedidoFilter, setPedidoFilter] = useState([]);
    const [idFilter, setIdFilter] = useState([]);
    const [destinoFilter, setDestinoFilter] = useState([]);

    const destinoList = [
        { label: 'Goiânia', value: 1},
    ]
    const statusList = [
        { label: 'Pendente', value: 1},
        { label: 'Em andamento', value: 2},
        { label: 'Parado', value: 3},
        { label: 'Concluído', value: 4},
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
    const createData = (pedidos, ordens, destino, entrega, status, link) => {
        return { pedidos, ordens, destino, entrega, status, link };
    }
    const rows = [
        createData(
            <Box className="pedidos">
                <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">#5951</Button>
            </Box>,
            <Box className="pedidos">
                <Button component={Link} to="/ordens/3568" variant="outlined" size="small">#3568</Button>
            </Box>,
            'Goiânia/GO',
            '10/05/2025',
            <Chip className="stats" size="small" label="Pendente" />,
            <Button component={Link} to="/remessas/5951" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'pedidos',
            label: 'Pedidos',
        },
        {
            id: 'ordens',
            label: 'Ordens',
        },
        {
            id: 'destino',
            label: 'Destino',
        },
        {
            id: 'entrega',
            label: 'Entrega',
        },
        {
            id: 'status',
            label: 'Status',
        },
        {
            id: 'link',
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
                            <InputAuto label="Status" list={statusList} setValue={setStatusFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Ordem" list={pedidosList} setValue={setPedidoFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Destino" list={destinoList} setValue={setDestinoFilter} width={'100%'} />
                        </Box>
                    </Box>
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                    <div className="buttons">
                        <Button className="relatorio" variant="contained">Criar remessa</Button>
                    </div>
                </Box>
            </Box>
        </Layout>
    )
}