import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

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

import { useUser } from '~/context/UserContext';

import { ordem_api } from './../api';
import { formatarData } from '../Utils';
import RemessaEditModal from '../components/modal/RemessaEditModal';

export default function Ordens() {
    const { selectedDepartamento, usuarioLogado } = useUser();
    const hoje = dayjs();

    if (usuarioLogado && usuarioLogado.permissao !== 'gerente') {
        return <Navigate to="/" replace />;
    }

    const [ordens, setOrdens] = useState([]);
    const [selectedRemessa, setSelectedRemessa] = useState(null);
    const [openRemessa, setOpenRemessa] = useState(false);

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

    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState(0);

    const carregar = async () => {
        try {
            const res = await ordem_api.getOrdens(selectedDepartamento.id);

            setOrdens(res.data || []);

            setRows(
                res.data.map(item => {
                    return createData({
                        id: item.id,
                        remessa: { id: item.id_remessa, titulo: item.titulo_remessa },
                        pedido: item.id_pedido,
                        categoria: item.nome_categoria,
                        nome: item.nome_produto,
                        quantidade: item.agrupavel ? item.quantidade : 1,
                        producao: item.data_producao,
                        conclusao: item.maior_data_atividade,
                        requisitos: item.requisitos,
                        status: item.id_status,
                        atividades: item.atividades,
                        atividades_finalizadas: item.atividades_finalizadas
                    });
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, [selectedDepartamento]); 


    //dados da tabela
    const createData = ({ id, remessa, pedido, categoria, nome, quantidade, producao, conclusao, requisitos, status, atividades, atividades_finalizadas }) => {
        const rem = <Button variant="outlined" size="small" onClick={() => { setSelectedRemessa({ id: remessa.id, titulo: remessa.titulo }); setOpenRemessa(true); setTab(0); }}>{remessa.titulo}</Button>
        const ped = <Button variant="outlined" size="small" onClick={() => { setSelectedRemessa({ id: remessa.id, titulo: remessa.titulo }); setOpenRemessa(true); setTab(1); }}>{pedido}</Button>
        
        const cat = <Chip className="stats" size="small" label={categoria} />;
        const desc = nome;
        const prod = formatarData(producao);
        const conc = formatarData(conclusao);
        const qtd = quantidade;
  
        let requisitos_array = [];
        
        try {
            if (requisitos && typeof requisitos === 'string') {
                requisitos_array = JSON.parse(requisitos);
            } else if (Array.isArray(requisitos)) {
                requisitos_array = [];
            }
        } catch (error) {
            console.error('Erro ao parsear requisitos:', error);
            requisitos = [];
        }

        const req = <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
           { requisitos_array?.map((req, index) => {
                if(req.nome){
                    return (
                        <Chip key={index} size="small" label={req.nome} color={ req.status === 1 ? "success" : "default" } />
                    )
                }
            })}
          
        </Box>;
        const porcentagem = atividades ? (atividades_finalizadas / atividades) * 100 : 0;

        const stats = <>
            <Status status={status} porcentagem={porcentagem} size={'small'} />
            <Button className="link" component={Link} to={"/ordem/"+id} variant="outlined" size="small">Detalhes</Button>
        </>

        return { rem, ped, cat, desc, qtd, prod, conc, req, stats};
    }

    const headCells = [
        {
            id: 'remessa',
            label: 'Remessa',
        },
        {
            id: 'pedido',
            label: 'Pedido',
        },
        {
            id: 'categoria',
            label: 'Categoria',
        },
        {
            id: 'descricao',
            label: 'Produto',
        },
        {
            id: 'qtd',
            label: 'Qtd.',
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
            id: 'requisitos',
            label: 'Requisitos',
        },
        {
            id: 'status',
            label: 'Status',
        },

    ];

    return (
        <Layout>
            <Title title="Lista de ordens" icon={<FactoryIcon/>} />
            <Box className="index_content atividades_list">
                {/* <Box className="filtros">
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
                </Box> */}
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <RemessaEditModal selectedRemessa={selectedRemessa} open={openRemessa} setOpen={setOpenRemessa} tab={tab} setTab={setTab} />
        </Layout>
    )
}