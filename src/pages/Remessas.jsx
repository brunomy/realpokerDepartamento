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
        if (!openRemessa && selectedDepartamento?.id) {
            carregar();
        }
    }, [openRemessa, selectedDepartamento]);


    const createData = (item) => {
        const remessa = <Button variant="outlined" size="small" onClick={() => { setSelectedRemessa({ id: item.id, titulo: item.titulo }); setOpenRemessa(true); setTab(0); }}>{item.titulo}</Button>;
        const pedidos = item.pedidos;

        console.log(item.pedidos);
  
        const disponiveis = 1;
        const volumes = 1;
        const embalagens = 1;
        const destino = 1;
        const entrega = 1;
        const status = 1;


        const cidade_uf = `${item.cidade}/${item.uf}`;

        return { remessa, pedidos, disponiveis, volumes, embalagens, destino, entrega, status };
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