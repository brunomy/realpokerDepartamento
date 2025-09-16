import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip, Tabs, Tab } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';

import Modal from '~/components/layout/Modal';

import { useUser } from '~/context/UserContext';
import { checklist_api } from './../api';


export default function Checklists({ finalizados = false }) {
    const { selectedDepartamento, usuarioLogado } = useUser();
    const [rows, setRows] = useState([]);

    if (usuarioLogado && usuarioLogado.permissao !== 'checklists') {
        return <Navigate to="/" replace />;
    }

    const carregar = async () => {
        setRows([]);
        try {
            if(!finalizados){
                const res = await checklist_api.getOrdensChecklist(selectedDepartamento?.id);

                setRows(
                    res.data.map(item => {
                        return createData(item);
                    })
                );
            } else {
                const res = await checklist_api.getOrdensChecklistFinalizados(selectedDepartamento?.id);

                setRows(
                    res.data.map(item => {
                        return createData(item);
                    })
                );
            }
            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if(selectedDepartamento){
            carregar();
        }
    }, [selectedDepartamento, finalizados]); 

    //dados da tabela
    const createData = (item) => {
        const remessa = item.nome_remessa;
        const pedido = item.id_pedido;
        const produto = item.nome_produto;
        const disponiveis = <Chip label={`${item.disponiveis || 0}`} color={(item.disponiveis + item.checklists_concluidos) == item.checklists && item.disponiveis != 0 ? 'warning' : 'default'} sx={{ width: '100%' }} />;
        const checklists = <>
            <Chip label={`${item.checklists_concluidos || 0}/${item.checklists || 0}`} color={item.checklists_concluidos == item.checklists ? 'success' : 'default'} sx={{ width: '100%' }} />
            <Button className="link" component={Link} to={`/checklist/${item.id}`} variant="outlined" size="small">Detalhes</Button>
        </>;
        return { remessa, pedido, produto, disponiveis, checklists };
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
            id: 'produto',
            label: 'Produto',
        },
        {
            id: 'disponiveis',
            label: 'Disponíveis',
        },
        {
            id: 'checklists',
            label: 'Checklists',
        }
    ];

    return (
        <Layout>
            <Title title="Lista de checklists" icon={<CheckBoxIcon/>} />
            <Box className="index_content atividades_list">
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}