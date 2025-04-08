import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

import dayjs from 'dayjs';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

export default function Equipes() {

    //dados da tabela
    const createData = (id, nome, descricao, funcionarios, presentes, link) => {
        return {
            id,
            nome,
            descricao,
            funcionarios,
            presentes,
            link,
        };
    }
    const rows = [
        createData(
            '#1', 
            'M1',
            'Responsável por montar mesas',
            '5',
            '5',
            <Button component={Link} to="/equipes/1" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#2', 
            'M2',
            'Responsável por pintar mesas',
            '4',
            '4',
            <Button component={Link} to="/equipes/2" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#3', 
            'M3',
            'Responsável por dar o acabamento',
            '4',
            '3',
            <Button component={Link} to="/equipes/3" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#4', 
            'M4',
            'Responsável por dar o acabamento',
            '4',
            '4',
            <Button component={Link} to="/equipes/4" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'nome',
            numeric: false,
            label: 'Nome',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'funcionarios',
            numeric: false,
            label: 'Funcionarios',
        },
        {
            id: 'presentes',
            numeric: false,
            label: 'Presentes',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    return (
        <Layout>
            <Title title="Lista de equipes" icon={<GroupsIcon/>} />
            <Box className="index_content">
                <br />
                <br />
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}