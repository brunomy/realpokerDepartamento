import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from './components/DataTable';
import Layout from "./components/Layout";
import Title from "./components/Title";
import InputAuto from './components/InputAuto';
import InputCalendarRange from './components/InputCalendarRange';

import Modal from './components/Modal';
import AdicionarChecklist from './components/AdicionarChecklist';

export default function Checklists() {
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
    const createData = (id, descricao, categorias, acoes) => {
        return {
            id,
            descricao,
            categorias,
            acoes,
        };
    }
    const [rows, setRows] = useState([
        createData(
            '#3489787', 
            'Criar mesa',
            <Box className="categorias">
                <Chip label="Mesa de poker" />
                <Chip label="Futmesa" />
            </Box>,
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
        createData(
            '#3489787', 
            'Mesa com porta copos',
            <Box className="categorias">
                <Chip label="Mesa de poker" />
            </Box>,
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
        createData(
            '#3489787', 
            'Criar cadeira',
            <Box className="categorias">
                <Chip label="Cadeira" />
            </Box>,
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
    ]);
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'categorias',
            numeric: false,
            label: 'Categorias',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
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
                            <InputAuto label="id" list={idList} setValue={setIdFilter} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Categoria" list={categorias} setValue={setCategoria} width={'100%'} />
                        </Box>
                        <Box className="item">
                            <InputAuto label="Descrição" list={descricaoList} setValue={setDescricao} width={'100%'} />
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