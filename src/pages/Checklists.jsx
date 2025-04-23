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

export default function Checklists() {
    const [tab, setTab] = useState(0);

    const [idFilter, setIdFilter] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [descricao, setDescricao] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const descricaoList = [
        { label: 'Criar mesa', value: 1},
        { label: 'Mesa com porta copos', value: 2},
        { label: 'Criar cadeira', value: 3},
    ]
    const idList = [
        { label: '#5951', value: 5951},
        { label: '#5952', value: 5952},
        { label: '#5953', value: 5953},
        { label: '#5954', value: 5954},
    ]
    const categorias = [
        { label: 'Mesa de poker', value: 5951},
        { label: 'Futmesa', value: 5952},
        { label: 'Cadeiras', value: 5952},
    ]

    //dados da tabela
    const createData = (categorias, acoes) => {
        return {
            categorias,
            acoes,
        };
    }
    const [rows, setRows] = useState([
        createData(
            'Mesa de poker',
            <Box className="acoes">
                <Button component={Link} to={`/checklists/1`} variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
    ]);
    const headCells = [
        {
            id: 'categoria',
            numeric: false,
            label: 'Categoria',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout>
            <Title title="Lista de checklists" icon={<CheckBoxIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Fábrica" />
                    <Tab label="Fichas" />
                    <Tab label="Comunicação" />
                </Tabs>
            </Box>
            <Box className="index_content atividades_list">
                <Box className="filtros">
                    <h2>Filtros:</h2>
                    <Box className="filter_list">
                        <Box className="item">
                            <InputAuto value={{id: 1, label: 'M2'}} label="Categoria" list={categorias} setValue={setCategoria} width={'100%'} />
                        </Box>
                    </Box>
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar checklist</Button>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar checklist">
                <AdicionarChecklist />
            </Modal>
        </Layout>
    )
}