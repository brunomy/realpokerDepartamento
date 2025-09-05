import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import Status from '~/components/layout/Status';

import RemessaEditModal from '~/components/modal/RemessaEditModal';

import { useUser } from '~/context/UserContext';

import { remessa_api } from './../api';

export default function Remessas() {
    const { volumes, volumesOP, embalagensOP, usuarioLogado, selectedDepartamento } = useUser();

    const [remessas, setRemessas] = useState([]);

    const [rows, setRows] = useState([]);

    if (usuarioLogado && usuarioLogado.permissao !== 'remessas') {
        return <Navigate to="/" replace />;
    }

    const [openRemessa, setOpenRemessa] = useState(false);
    const [tab, setTab] = useState(0);

    const [selectedRemessa, setSelectedRemessa] = useState(null);
    
    const hoje = dayjs();

    const createData = ({ remessa, titulo }) => {
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
        </Box>

        return { remessa_name, pedidos, criacao, saida, entrega, comprador, cidade_uf };
    }

    const carregar = async () => {
        try {
            const res = await remessa_api.getRemessas();

            setRemessas(res.data || []);

            console.log(res.data);
            

            setRows(
                remessas.map((item) => {
                    return createData({
                        remessa: item,
                        titulo: item.titulo_remessa
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
    }, [openRemessa, selectedDepartamento]);

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
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <RemessaEditModal selectedRemessa={selectedRemessa} open={openRemessa} setOpen={setOpenRemessa} tab={tab} setTab={setTab} />
        </Layout>
    )
}