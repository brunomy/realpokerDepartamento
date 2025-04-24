import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import Status from '~/components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

//icons
import FactoryIcon from '@mui/icons-material/Factory';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

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


    const createDataOrdens = () => {
        const id = <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">#5951-1</Button>;
        const remessa = <Button component={Link} to="/remessas/5951" variant="outlined" size="small">#5951</Button>;
        const categoria = <Chip className="stats" size="small" label="Mesa de poker" />;
        const descricao = 'Mesa de poker profissional';
        const producao = '03/04/2025';
        const conclusao = <Box className="data_late">22/04/2025 <TimerTwoToneIcon color="error"/></Box>;
        const status = <Status status={calculoStatusPedido()} size={'small'} />;
        const link = <Button component={Link} to="/ordens/5951-1" variant="outlined" size="small">Detalhes</Button>;

        return { id, remessa, categoria, descricao, producao, conclusao, status, link };
    }
    const rowsOrdens = [createDataOrdens()];
    const headCellsOrdens = [
        {
            id: 'id',
            label: 'Id',
        },
        {
            id: 'remessa',
            label: 'Remessa',
        },
        {
            id: 'categoria',
            label: 'Categoria',
        },
        {
            id: 'descricao',
            label: 'Descrição',
        },
        {
            id: 'producao',
            label: 'Produção',
        },
        {
            id: 'conclusao',
            label: 'Conclusão',
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
                </Box>
            </Box>
        </Layout>
    )
}