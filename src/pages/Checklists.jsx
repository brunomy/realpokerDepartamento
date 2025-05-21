import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
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
import AdicionarChecklist from '~/components/modal/AdicionarChecklist';

import { useUser } from '~/context/UserContext';


export default function Checklists() {
    const [pedidoFilter, setPedidoFilter] = useState([]);
    const { atividadesOP, checklistOP } = useUser();

    const atividades = atividadesOP.filter((atividade) => atividade.status == 4).length;
    const checklists = checklistOP.filter((checklist) => checklist.status == 1).length
    const disponiveis = atividades - checklists;


    const pedidosList = [
        { label: '#5951', value: 1},
        { label: '#5952', value: 2},
        { label: '#5953', value: 3},
        { label: '#5955', value: 3},
        { label: '#5956', value: 3}
    ]

    //dados da tabela
    const createData = (pedido, produto, disponiveis, checklists, porcentagem) => {
        return { pedido, produto, disponiveis, checklists, porcentagem };
    }
    const [rows, setRows] = useState([
        createData(
            '5951',
            'Mesa de poker',
            0,
            <Chip label="0/27" />,
            <>
                0%
                <Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button>
            </>
        ),
        createData(
            '5952',
            'Mesa de poker profissional',
            disponiveis,
            <Chip label={checklists+"/27"} />,
            <>
                {Math.floor((100/27)*checklists)}%
                <Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button>
            </>
        ),
        createData('5952','Futmesa',0,<Chip label="27/27" color="success" />,<>100%<Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button></>),
        createData('5953','Cadeira para mesa de poker',0,<Chip label="10/20" />,<>50%<Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button></>),
        createData('5954','Mesa de poker',0,<Chip label="10/20" />,<>50%<Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button></>),
        createData('5954','Cadeira para mesa de poker',0,<Chip label="20/20" color="success" />,<>100%<Button className="link" component={Link} to="/checklists/5951" variant="outlined" size="small">Detalhes</Button></>),
    ]);
    const headCells = [
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
        },
        {
            id: 'porcentagem',
            label: 'Porcentagem',
        },
    ];

    return (
        <Layout>
            <Title title="Lista de checklists" icon={<CheckBoxIcon/>} />
            <Box className="index_content atividades_list">
                <Box className="filtros">
                    <h2>Filtros:</h2>
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto label="Pedido" list={pedidosList} setValue={setPedidoFilter} width={'100%'} />
                        </Box>
                    </Box>
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}