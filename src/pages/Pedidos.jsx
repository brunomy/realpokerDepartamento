import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import Status from '../components/layout/Status';
import { useUser } from '~/context/UserContext';
import Modal from '~/components/layout/Modal';
import RemessaEditModal from '~/components/modal/RemessaEditModal';

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

import { ordem_api } from './../api';
import { formatarData } from '../Utils';


export default function Pedidos() {
    const { selectedDepartamento, usuarioLogado } = useUser();
    const hoje = dayjs();

    if (usuarioLogado && usuarioLogado.permissao !== 'gerente') {
        return <Navigate to="/" replace />;
    }

    const [openRemessa, setOpenRemessa] = useState(false);
    const [tab, setTab] = useState(0);

    const [selectedRemessa, setSelectedRemessa] = useState(null);

    const [dateFilterDe, setDateFilterDe] = useState(null);
    const [dateFilterAte, setDateFilterAte] = useState(null);

    const [ordens, setOrdens] = useState([]);
    const [ordensAgrupado, setOrdensAgrupado] = useState([]);

    const [rows, setRows] = useState([]);

    const [remessasList, setRemessasList] = useState([]);
    const [remessaFilter, setRemessaFilter] = useState([]);

    useEffect(() => {
        setRows(
            Object.entries(ordensAgrupado)
            .filter(([titulo_remessa, itens]) => 
                remessaFilter?.label ? titulo_remessa === remessaFilter.label : true
            )
            .filter(([titulo_remessa, itens]) => {
                // Se não há nenhum filtro de data, mostra todos
                if (!dateFilterDe && !dateFilterAte) return true;
                
                return itens.some(item => {
                    const dataSaida = item.nova_saida || item.saida;
                    const dataItem = dayjs(dataSaida);
                    
                    // Verifica data DE (se preenchida)
                    const validaDataDe = !dateFilterDe || 
                        dataItem.isAfter(dayjs(dateFilterDe)) || 
                        dataItem.isSame(dayjs(dateFilterDe));
                    
                    // Verifica data ATÉ (se preenchida)
                    const validaDataAte = !dateFilterAte || 
                        dataItem.isBefore(dayjs(dateFilterAte)) || 
                        dataItem.isSame(dayjs(dateFilterAte));
                    
                    // Item é válido se passa em ambas as validações
                    return validaDataDe && validaDataAte;
                });
            })
            .map(([titulo_remessa, itens]) => {
                return createData({
                    remessa: itens,
                    titulo: titulo_remessa
                });
            })
        );
    }, [remessaFilter, dateFilterDe, dateFilterAte, ordensAgrupado]);

    const carregar = async () => {
        setRows([]);

        try {
            const res = await ordem_api.getOrdens(selectedDepartamento.id);

            setOrdens(res.data || []);

            const agrupado = res.data
                .sort((a, b) => a.titulo_remessa.localeCompare(b.titulo_remessa))
                .reduce((acc, item) => {
                    if (!acc[item.titulo_remessa]) {
                    acc[item.titulo_remessa] = [];
                    }
                    acc[item.titulo_remessa].push(item);
                    return acc;
            }, {});

            setOrdensAgrupado(agrupado);

            setRemessasList(
                Object.keys(agrupado).map((key, index) => ({ label: key, value: index }))
            );

            setRows(
                Object.entries(agrupado).map(([titulo_remessa, itens]) => {
                    return createData({
                        remessa: itens,
                        titulo: titulo_remessa
                    });
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!openRemessa && selectedDepartamento?.id) {
            carregar();
        }
    }, [selectedDepartamento]);

    //dados da tabela
    const createData = ({ remessa, titulo }) => {
        const unicos = remessa.filter(
        (item, index, self) =>
            index === self.findIndex((i) => i.id_pedido === item.id_pedido)
        );

        const remessa_name = <Box className="linha_dupla">
            <Button variant="outlined" size="small" onClick={() => { setSelectedRemessa({ id: remessa[0]?.id_remessa, titulo: titulo }); setOpenRemessa(true); setTab(0); }}>{titulo}</Button>
        </Box>
        const pedidos = <Box className="linha_dupla">
            {unicos.map((item) => <div><Button onClick={() => { setSelectedRemessa({ id: remessa[0]?.id_remessa, titulo: titulo }); setOpenRemessa(true); setTab(1); }} variant="outlined" size="small">{item.id_pedido}</Button></div>)}
        </Box>
        const criacao = <Box className="linha_dupla">
            {unicos.map((item) => <div>{formatarData(item.created_at)}</div>)}
        </Box>
        const saida = <Box className="linha_dupla">
            {remessa[0].nova_saida
                ? (<div><Box className={dayjs(remessa[0].nova_saida).isBefore(hoje) ? "data_late" : "data_alert"}>{formatarData(remessa[0].nova_saida)} <ReportProblemTwoToneIcon color="warning"/></Box></div>)
                : (<div><Box className={dayjs(remessa[0].saida).isBefore(hoje) ? "data_late" : ""}>{formatarData(remessa[0].saida)}</Box></div>)
            }
        </Box>

        const entrega = <Box className="linha_dupla">
            {remessa[0].nova_entrega
                ? (<div><Box className={dayjs(remessa[0].nova_entrega).isBefore(hoje) ? "data_late" : "data_alert"}>{formatarData(remessa[0].nova_entrega)} <ReportProblemTwoToneIcon color="warning"/></Box></div>)
                : (<div><Box className={dayjs(remessa[0].entrega).isBefore(hoje) ? "data_late" : ""}>{formatarData(remessa[0].entrega)}</Box></div>)
            }
        </Box>
     
        const comprador = <Box className="linha_dupla">
            <div>{remessa[0].nome}</div>
        </Box>

        const cidade_uf = <Box className="linha_dupla">
            <div>{remessa[0].cidade}/{remessa[0].uf}</div>
            <Button onClick={() => { setSelectedRemessa({ id: remessa[0]?.id_remessa, titulo: titulo }); setOpenRemessa(true); setTab(1); }}  className="link">aaa</Button>
        </Box>

        return { remessa_name, pedidos, criacao, saida, entrega, comprador, cidade_uf };
    }

    const headCells = [
        {
            id: 'remessa_name',
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
            id: 'cidade_uf',
            label: 'Cidade/UF',
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
                            <InputAuto size="large" label="Remessa" list={remessasList} value={remessaFilter} setValue={setRemessaFilter} width={'100%'} />
                        </Box>
                        <Box className="item calendario">
                            <InputCalendarRange label="Saída" setFunctionDe={setDateFilterDe} setFunctionAte={setDateFilterAte} />
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