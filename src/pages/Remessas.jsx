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
import { formatarData } from '../Utils';

export default function Remessas() {
    const { usuarioLogado } = useUser();
    const [tab, setTab] = useState(0);
    const [openRemessa, setOpenRemessa] = useState(false);
    const [selectedRemessa, setSelectedRemessa] = useState(null);
    const hoje = dayjs();
    const [remessas, setRemessas] = useState([]);
    const [rows, setRows] = useState([]);

    if (usuarioLogado && usuarioLogado.permissao !== 'remessas') {
        return <Navigate to="/" replace />;
    }

    const carregar = async () => {
        try {
            const res = await remessa_api.getRemessas();

            setRemessas(res.data || []);

            setRows(
                res.data.map((item) => {
                    return createData(item);
                })
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!openRemessa) {
            carregar();
        }
    }, [openRemessa]);


    const createData = (item) => {
        const remessa = <Button variant="outlined" size="small" onClick={() => { setSelectedRemessa({ id: item.id, titulo: item.titulo }); setOpenRemessa(true); setTab(0); }}>{item.titulo}</Button>;
        const array_pedidos = Array.isArray(item.pedidos) 
        ? item.pedidos 
        : item.pedidos 
            ? item.pedidos.replace(/[\[\]]/g, '').split(',').map(num => num.trim())
            : [];

        const pedidos = <Box className="linha_dupla">
            {array_pedidos.map((pedido) => <div><Button onClick={() => { setSelectedRemessa({ id: item.id, titulo: item.titulo }); setOpenRemessa(true); setTab(1); }} variant="outlined" size="small">{pedido}</Button></div>)}
        </Box>

        const disponiveis = <Chip className="stats" size="small" label={ item.volumes_disponiveis - item.volumes_embalados } color={item.volumes === 0 || item.volumes_disponiveis - item.volumes_embalados == 0 ? 'default' : item.volumes_embalados === item.volumes ? 'success' : item.volumes_disponiveis + item.volumes_embalados === item.volumes ? 'warning' : 'default'} />;
        const volumes = <Chip className="stats" size="small" label={`${item.volumes_embalados}/${item.volumes}`} color={item.volumes === 0 ? 'default' : item.volumes_embalados === item.volumes ? 'success' : 'default'} />;
        const embalagens = <Chip className="stats" size="small" label={item.embalagens} />;
        const destino = `${item.cidade}/${item.uf}`;
        // const entrega = formatarData(item.nova_entrega ? item.nova_entrega : item.entrega);
        // const saida = formatarData(item.nova_saida ? item.nova_saida : item.saida);

        const saida = <Box className="linha_dupla">
            {item.nova_saida
                ? (<div><Box className={dayjs(item.nova_saida).isBefore(hoje) ? "data_late" : "data_alert"}>{formatarData(item.nova_saida)} <ReportProblemTwoToneIcon color="warning"/></Box></div>)
                : (<div><Box className={dayjs(item.saida).isBefore(hoje) ? "data_late" : ""}>{formatarData(item.saida)}</Box></div>)
            }
        </Box>

        const entrega = <Box className="linha_dupla">
            {item.nova_entrega
                ? (<div><Box className={dayjs(item.nova_entrega).isBefore(hoje) ? "data_late" : "data_alert"}>{formatarData(item.nova_entrega)} <ReportProblemTwoToneIcon color="warning"/></Box></div>)
                : (<div><Box className={dayjs(item.entrega).isBefore(hoje) ? "data_late" : ""}>{formatarData(item.entrega)}</Box></div>)
            }
        </Box>

        const status = <>
            <Status status={item.id_status} size="small" />
            <Button className="link" component={Link} to={"/remessa/"+item.id} variant="outlined" size="small">Detalhes</Button>
        </>


        const cidade_uf = `${item.cidade}/${item.uf}`;

        return { remessa, pedidos, disponiveis, volumes, embalagens, destino, saida, entrega, status };
    }

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
            id: 'saida',
            label: 'Saída',
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