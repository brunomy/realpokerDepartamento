import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import EditSquareIcon from '@mui/icons-material/EditSquare';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";

import { useUser } from "~/context/UserContext";

import { config_api } from './../api';

export default function Configuracoes() {
    const { selectedDepartamento, usuarioLogado } = useUser();

    if (usuarioLogado && usuarioLogado.permissao !== 'gerente') {
        return <Navigate to="/" replace />;
    }

    const [error, setError] = useState(null);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await config_api.getCategorias(selectedDepartamento.id);

                setRows(
                    res.data?.map((categoria) => {
                        return createData(
                            categoria.nome,
                            categoria.etapas_count,
                            categoria.atividades_count,
                            categoria.checklists_count,
                            <>
                            {categoria.volumes_count}
                                <Button className="link" component={Link} to={`/configuracoes/${categoria.id}`} variant="outlined" size="small">
                                    <EditSquareIcon />
                                </Button>
                            </>
                        );
                    }) || []
                );
            } catch (err) {
                setRows([]);
                setError(err.message);
            }
        };
        if (selectedDepartamento?.id) {
            fetchCategorias();
        }
    }, [selectedDepartamento]);



    //dados da tabela
    const createData = (categorias, etapas, atividades, checklists, volumes, acoes) => {
        return { categorias, etapas, atividades, checklists, volumes, acoes};
    }
  
    const headCells = [
        {
            id: 'categoria',
            numeric: false,
            label: 'Categoria',
        },
        {
            id: 'etapas',
            numeric: true,
            label: 'Etapas',
        },
        {
            id: 'atividades',
            numeric: true,
            label: 'Atividades',
        },
        {
            id: 'checklists',
            numeric: true,
            label: 'Checklists',
        },
        {
            id: 'volumes',
            numeric: true,
            label: 'Volumes',
        },
    ];

    return (
        <Layout>
            <Title title="Configuração de produção" icon={<SettingsApplicationsIcon/>} />
            <Box className="index_content">
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}