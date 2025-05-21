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
    const createData = ({ remessas, pedidos, criacoes, conclusoes, saidas, entregas, clientes, status }) => {
        const remessa = <Box className="linha_dupla">
            {remessas.map((r) => <div><Button component={Link} to={"/remessas/"+r} variant="outlined" size="small">{r}</Button></div>)}
        </Box>
        const pedido = <Box className="linha_dupla">
            {pedidos.map((p) => <div><Button component={Link} to={"/pedidos/"+p} variant="outlined" size="small">{p}</Button></div>)}
        </Box>
        const criacao = <Box className="linha_dupla">
            {criacoes.map((c) => <div>{c}</div>)}
        </Box>
        const conclusao = <Box className="linha_dupla">
            {conclusoes.map((c) => <div>{c}</div>)}
        </Box>
        const saida = <Box className="linha_dupla">
            {saidas.map((s, index) => {
                if(index == 1)
                    return (<div><Box className="data_late">{s} <TimerTwoToneIcon color="error"/></Box></div>)
                else
                    return (<div>{s}</div>)
            })}
        </Box>
        const entrega = <Box className="linha_dupla">
            {entregas.map((e) => {
                if(e == '02/05/2025')
                    return (<div><Box className="data_alert">{e} <ReportProblemTwoToneIcon color="warning"/></Box></div>)
                else
                    return (<div>{e}</div>)
            })}
        </Box>
        const comprador = <Box className="linha_dupla">
            {clientes.map((c) => <div>{c}</div>)}
        </Box>
        const status2 = <Box className="linha_dupla">
            {status.map((s) => <div><Status status={s} size={'small'} /></div>)}
        </Box>

        return { remessa, pedido, criacao, conclusao, saida, entrega, comprador, status2 };
    }
    const rows = [
        createData({ 
            remessas: ['5951-1'], 
            pedidos: ['5951', '5952'], 
            criacoes: ['01/04/2025', '01/04/2025'],
            conclusoes: ['22/04/2025', '22/04/2025'],
            saidas: ['22/04/2025', '28/04/2025'],
            entregas: ['02/05/2025', '02/05/2025'],
            clientes: ['João Felipe'],
            status: [1, calculoStatusPedido()]
        }),
        createData({ 
            remessas: ['5953-1'], 
            pedidos: ['5953'], 
            criacoes: ['01/05/2025'],
            conclusoes: ['22/05/2025'],
            saidas: ['24/05/2025'],
            entregas: ['26/05/2025'],
            clientes: ['Bruno Yoshimura'],
            status: [1]
        }),
        createData({ 
            remessas: ['5954-1', '5954-2'], 
            pedidos: ['5954'], 
            criacoes: ['01/06/2025'],
            conclusoes: ['22/06/2025'],
            saidas: ['24/06/2025'],
            entregas: ['26/06/2025'],
            clientes: ['Bruno Yoshimura'],
            status: [2]
        }),
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
        // {
        //     id: 'link',
        //     label: 'Link',
        // },
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
                </Box>
            </Box>
        </Layout>
    )
}

export function calculoStatusPedido(){
    const { atividadesOP } = useUser();

    const atividadesAndamento = atividadesOP.find((item) => item.status == 1)
    const atividadesFinalizadas = atividadesOP.filter((item) => item.status == 4)

    if(!atividadesOP)
        return 0
    if(atividadesAndamento)
        return 1
    if(atividadesFinalizadas.length != 0 && atividadesFinalizadas.length == atividadesOP.length)
        return 4
    else if(atividadesFinalizadas.length > 0){
        return 1
    }

    return 0
}