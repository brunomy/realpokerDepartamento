import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/Layout";
import Title from "~/components/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';

import { useUser } from '~/context/UserContext';

export default function Atividades() {
    const { 
        atividadesOP,
        etapas,
        atividades,
        equipes
    } = useUser();

    const hoje = dayjs();

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

    //dados da tabela
    const createData = (id, equipe, producao, titulo, etapa, status, link) => {
        var elementStatus;
        if(status == -1){
            elementStatus = <Chip className="stats" color="error" label="Falha" />
        }
        if(status == 0){
            elementStatus = <Chip className="stats" label="Pendente" />
        }
        else if(status == 1){
            elementStatus = <Chip className="stats" color="primary" label="Em andamento" />
        }
        else if(status == 2){
            elementStatus = <Chip className="stats" color="warning" label="Parado" />
        }
        else if(status == 3){
            elementStatus = <Chip className="stats" color="success" label="Finalizado" />
        }

        return { id, equipe, producao, titulo, etapa, elementStatus, link };
    }
    const headCells = [
        {id: 'id', label: 'Id'},
        {id: 'equipe', label: 'Equipe'},
        {id: 'producao', label: 'Produção'},
        {id: 'titulo', label: 'Título'},
        {id: 'etapa', label: 'Etapa'},
        {id: 'status', label: 'Status'},
        {id: 'link', label: 'Link'},
    ];
    const rows = [];

    atividadesOP.map((item) => {
        rows.push(
            createData(
                item.id,
                equipes.find(e => e.id == item.id_equipe).title,
                item.data,
                atividades.find(a => a.id == item.id_atividade).title,
                etapas.find(e => e.id == item.id_etapa).title,
                item.status,
                <Button component={Link} to={`/atividades/${item.id}`} variant="outlined" size="small">Detalhes</Button>
            )
        )
    })

    return (
        <Layout>
            <Title title="Lista de atividades" icon={<AssignmentIcon/>} />
            <Box className="index_content atividades_list">
                <Box className="filtros">
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
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="relatorio" variant="contained"><PictureAsPdfIcon/> Gerar relatório</Button>
                </Box>
            </Box>
        </Layout>
    )
}