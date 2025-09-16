import '~/assets/scss/Index.scss';
import { useState, useEffect, useMemo } from 'react';
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

    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState(0);

    const [ordens, setOrdens] = useState([]);
    const [selectedRemessa, setSelectedRemessa] = useState(null);
    const [openRemessa, setOpenRemessa] = useState(false);

    const [remessasList, setRemessasList] = useState([]);
    const [remessaFilter, setRemessaFilter] = useState([]);
    const [pedidosList, setPedidosList] = useState([]);
    const [pedidoFilter, setPedidoFilter] = useState([]);

    const [statusFilter, setStatusFilter] = useState([]);
    const statusList = useMemo(() => [
        { label: 'Pendente', value: 0},
        { label: 'Em produção', value: 1},
        { label: 'Em andamento', value: 2},
        { label: 'Parado', value: 3},
        { label: 'Finalizado', value: 4},
    ], []);

    useEffect(() => {
        setRows(
            ordens
                .filter(i => remessaFilter?.label ? i.titulo_remessa === remessaFilter.label : true)
                .filter(i => pedidoFilter?.value ? i.id_pedido === pedidoFilter.value : true)
                .filter(i => statusFilter?.value != null ? i.id_status === statusFilter.value : true)
                .map(item => {
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
    }, [remessaFilter, pedidoFilter, statusFilter]);



    const carregar = async () => {
        setRows([]);
        try {
            const res = await ordem_api.getOrdens(selectedDepartamento.id);

            setOrdens(res.data || []);

            const remessasUnicas = [...new Set(res.data.map(item => item.titulo_remessa))];
            setRemessasList(
                remessasUnicas.map((titulo_remessa, index) => ({ 
                    label: titulo_remessa, 
                    value: titulo_remessa
                }))
            );

            const pedidosUnicos = [...new Set(res.data.map(item => item?.id_pedido))];
            setPedidosList(
                pedidosUnicos.map((id_pedido, index) => ({ 
                    label: String(id_pedido), 
                    value: id_pedido
                }))
            );

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
            <Box className="index_content">
                <Box className="filtros">
                    <Box className="filtros_header">
                        <h2>Filtros:</h2>
                        <Button size="small" onClick={() => { setRemessaFilter(null), setPedidoFilter(null), setStatusFilter(null) }}>Limpar</Button>
                    </Box>
                        
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto size="large" label="Remessa" list={remessasList} value={remessaFilter} setValue={setRemessaFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto size="large" label="Pedido" list={pedidosList} value={pedidoFilter} setValue={setPedidoFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto size="large" label="Status" list={statusList} value={statusFilter} setValue={setStatusFilter} width={'100%'} />
                        </Box>
                    </Box>
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <RemessaEditModal selectedRemessa={selectedRemessa} open={openRemessa} setOpen={setOpenRemessa} tab={tab} setTab={setTab} />
        </Layout>
    )
}