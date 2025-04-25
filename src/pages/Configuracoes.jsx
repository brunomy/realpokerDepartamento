import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';

import Modal from '~/components/layout/Modal';

import { useUser } from "~/context/UserContext";

export default function Configuracoes() {
    const { etapas, atividades, categorias, checklists, volumes } = useUser();

    //dados da tabela
    const createData = (categorias, etapas, atividades, checklists, volumes, acoes) => {
        return { categorias, etapas, atividades, checklists, volumes, acoes};
    }
    const [rows, setRows] = useState(
        categorias?.map((categoria) => {
            return createData(
                categoria.title,
                etapas.filter((etapa) => etapa.id_categoria == categoria.id).length,
                atividades.filter((atividade) => atividade.id_categoria == categoria.id).length,
                checklists.filter((checklist) => checklist.id_categoria == categoria.id).length,
                <>
                    {volumes.filter((volume) => volume.id_categoria == categoria.id).length}
                    <Button className="link" component={Link} to={`/configuracoes/${categoria.id}`} variant="outlined" size="small">
                        <EditSquareIcon />
                    </Button>
                </>
            );
        }) || [] 
    );
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
                <Box className="table_content filtros">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}