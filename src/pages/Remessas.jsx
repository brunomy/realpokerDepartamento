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
import Status from '~/components/layout/Status';

import { useUser } from '~/context/UserContext';

export default function Remessas() {
    const hoje = dayjs();
    const { volumes, volumesOP, embalagensOP } = useUser();

    const naoEmbalados = volumesOP.filter(item => item.id_embalagem == null);

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
    const createData = (remessa, pedidos, produtos, disponiveis, volumes, embalagens, destino, entrega, status) => {
        return { remessa, pedidos, produtos, disponiveis, volumes, embalagens, destino, entrega, status };
    }
    const rows = [
        createData(
            '5951-1',
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="5951" />
                <Chip className="stats" size="small" label="5952" />
            </Box>,
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="Mesa de poker" />
                <Chip className="stats" size="small" label="Mesa de poker profissional" />
                <Chip className="stats" size="small" label="Futmesa" />
            </Box>,
            naoEmbalados.length,
            volumesOP.filter((v) => v.id_embalagem != null).length+'/'+volumes.length,
            embalagensOP.length,
            'Goiânia/GO',
            '02/05/2025',
            <>
            <Status status={volumesOP.filter((v) => v.id_embalagem != null).length == 0 ? 0 : 1} size={'small'} />
            <Button className="link" component={Link} to="/remessas/5951-1" variant="outlined" size="small">Detalhes</Button>
            </>
        ),
        createData(
            '5953-1',
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="5953" />
            </Box>,
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="Cadeira para mesa de poker" />
            </Box>,
            0,
            "8/10",
            3,
            'Goiânia/GO',
            '26/05/2025',
            <>
            <Status status={1} size={'small'} />
            <Button className="link" component={Link} to="/remessas/5953-1" variant="outlined" size="small">Detalhes</Button>
            </>
        ),
        createData(
            '5954-1',
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="5954" />
            </Box>,
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="Mesa de poker" />
            </Box>,
            0,
            "7/15",
            2,
            'Goiânia/GO',
            '26/06/2025',
            <>
            <Status status={1} size={'small'} />
            <Button className="link" component={Link} to="/remessas/5954-1" variant="outlined" size="small">Detalhes</Button>
            </>
        ),
        createData(
            '5954-2',
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="5954" />
            </Box>,
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '250px', padding: '5px 0' }}>
                <Chip className="stats" size="small" label="Cadeira para mesa de poker" />
            </Box>,
            0,
            "7/7",
            2,
            'Inhumas/GO',
            '26/06/2025',
            <>
            <Status status={4} size={'small'} />
            <Button className="link" component={Link} to="/remessas/5954-2" variant="outlined" size="small">Detalhes</Button>
            </>
        ),

    ];
    const headCells = [
        {
            id: 'remessa',
            label: 'Remessa',
        },
        {
            id: 'pedidos',
            label: 'Pedidos',
        },
        {
            id: 'produtos',
            label: 'Produtos',
        },
        {
            id: 'disponiveis',
            label: 'Disponíveis',
        },
        {
            id: 'volumes',
            label: 'Volumes',
        },
        {
            id: 'embalagens',
            label: 'Embalagens',
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