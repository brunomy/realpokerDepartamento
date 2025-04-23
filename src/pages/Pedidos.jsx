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
import Status from '../components/layout/Status';
import { useUser } from '~/context/UserContext';

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

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
    const createData = () => {
        const id = '#5951'
        const ordens = '0/1'
        const criacao = '01/04/2025'
        const conclusao = <Box className="data_late">22/04/2025 <TimerTwoToneIcon color="error"/></Box>
        const saida = <Box className="data_alert">28/04/2025 <ReportProblemTwoToneIcon color="warning"/></Box>
        const entrega = '02/05/2025'
        const comprador = 'João Felipe'
        const status = <Status status={calculoStatusPedido()} size={'small'} />
        const link = <Button component={Link} to="/pedidos/5951" variant="outlined" size="small">Detalhes</Button>

        return { id, ordens, criacao, conclusao, saida, entrega, comprador, status, link };
    }
    const rows = [
        createData(),
    ];
    const headCells = [
        {
            id: 'id',
            label: 'Id',
        },
        {
            id: 'ordens',
            label: 'Ordens',
        },
        {
            id: 'criacao',
            label: 'Criação',
        },
        {
            id: 'conclusao',
            label: 'Conclusão',
        },
        {
            id: 'saida',
            label: 'Saída',
        },
        {
            id: 'entrega',
            label: 'Entrega',
        },
        {
            id: 'comprador',
            label: 'Comprador',
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

export function calculoStatusPedido(){
    const { atividadesOP, checklistOP, volumesOP, } = useUser();

    const atividadesAndamento = atividadesOP.find((item) => item.status == 1)
    const atividadesFinalizadas = atividadesOP.filter((item) => item.status == 3)

    if(!atividadesOP)
        return 0
    if(atividadesAndamento)
        return 1
    if(atividadesFinalizadas.length != 0 && atividadesFinalizadas.length == atividadesOP.length)
        return 3
    else if(atividadesFinalizadas.length > 0){
        return 1
    }

    return 0
}