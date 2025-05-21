import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import Status from '~/components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

//icons
import FactoryIcon from '@mui/icons-material/Factory';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';

import { useUser } from '~/context/UserContext';

export default function Ordens() {
    const hoje = dayjs();

    const { volumes, volumesOP, checklistOP, atividadesOP } = useUser();

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
    const createDataOrdens = ({ id, remessa, pedido, categoria, descricao, producao, conclusao, requisitos, status }) => {
        const rem = <Button component={Link} to={"/remessas/"+remessa} variant="outlined" size="small">{remessa}</Button>;
        const ped = <Button component={Link} to={"/pedidos/"+pedido} variant="outlined" size="small">{pedido}</Button>;
        const cat = <Chip className="stats" size="small" label={categoria} />;
        const desc = descricao;
        const prod = producao;
        var conc;
        if(conclusao == '22/04/2025'){
            conc = <Box className="data_late">{conclusao} <TimerTwoToneIcon color="error"/></Box>;
            
        } else {
            conc = conclusao;
        }
        const req = <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
            {(requisitos == 3 || requisitos == 2 || requisitos == 1) && <Chip size="small" color="success" label="Router" />}
            {(requisitos == 3 || requisitos == 2) && <Chip size="small" label="Adesivo" />}
            {(requisitos == 3) && <Chip size="small" label="Tecido" />}
        </Box>;
        const stats = <>
            <Status status={status} size={'small'} />
            <Button className="link" component={Link} to={"/ordens/"+id} variant="outlined" size="small">Detalhes</Button>
        </>

        return { rem, ped, cat, desc, prod, conc, req, stats};
    }
    const rowsOrdens = [
        createDataOrdens({ 
            id: 3,
            remessa: '5951-1',
            pedido: '5951',
            categoria: 'Mesa de poker',
            descricao: 'Mesa de poker',
            producao: '04/05/2025',
            conclusao: '22/05/2025',
            requisitos: 2,
            status: 1,
        }),
        createDataOrdens({ 
            id: 1,
            remessa: '5951-1',
            pedido: '5952',
            categoria: 'Mesa de poker',
            descricao: 'Mesa de poker profissional',
            producao: '03/04/2025',
            conclusao: '22/04/2025',
            requisitos: 3,
            status: calculoStatusPedido(),
        }),
        createDataOrdens({ 
            id: 2,
            remessa: '5951-1',
            pedido: '5952',
            categoria: 'Futmesa',
            descricao: 'Futmesa',
            producao: '04/04/2025',
            conclusao: '22/04/2025',
            requisitos: 1,
            status: 4,
        }),
        createDataOrdens({ 
            id: 4,
            remessa: '5953-1',
            pedido: '5953',
            categoria: 'Cadeira',
            descricao: 'Cadeira para mesa de poker',
            producao: '04/05/2025',
            conclusao: '22/05/2025',
            requisitos: 1,
            status: 1,
        }),
        createDataOrdens({ 
            id: 5,
            remessa: '5954-1',
            pedido: '5954',
            categoria: 'Mesa de poker',
            descricao: 'Mesa de poker',
            producao: '04/06/2025',
            conclusao: '22/06/2025',
            requisitos: 1,
            status: 2,
        }),
        createDataOrdens({ 
            id: 6,
            remessa: '5954-2',
            pedido: '5954',
            categoria: 'Cadeira',
            descricao: 'Cadeira para mesa de poker',
            producao: '06/06/2025',
            conclusao: '22/06/2025',
            requisitos: 1,
            status: 4,
        }),
    ];
    const headCellsOrdens = [
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
            label: 'Descrição',
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
                    <DataTable headCells={headCellsOrdens} rows={rowsOrdens}/>
                </Box>
            </Box>
        </Layout>
    )
}