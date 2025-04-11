import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

import Layout from "./components/Layout";
import Title from "./components/Title";
import DataTable from './components/DataTable';
import Modal from './components/Modal';
import AdicionarAtividade from './components/AdicionarAtividade';
import ChangeStatus from './components/ChangeStatus';
import AdicionarVolume from './components/AdicionarVolume';

import { useUser } from '~/context/UserContext';

export default function Pedidos() {
    const { ordens, setOrdens } = useUser();

    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [addVolumeModal, setAddVolumeModal] = useState(false);
    const [status, setStatus] = useState(1);


    //dados
    const createDataOrdens = (id, categoria, descricao, producao, status, link) => {
        return { id, categoria, descricao, producao, status, link };
    }
    const rowsOrdens = [
        createDataOrdens(
            '#3568',
            <Chip className="stats" size="small" label="Mesa de poker" />,
            'Mesa de poker profissional',
            '11/042025',
            <Chip className="stats" size="small" color="primary" label="Em andamento" />,
            <Button component={Link} to="/ordens/3568" variant="outlined" size="small">Detalhes</Button>
        ),
        createDataOrdens(
            '#3569',
            <Chip className="stats" size="small" label="Mesa de poker" />,
            'Mesa de poker redonda',
            '11/042025',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/ordens/3569" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCellsOrdens = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'categoria',
            numeric: false,
            label: 'Categoria',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'producao',
            numeric: true,
            label: 'Produção',
        },
        {
            id: 'status',
            numeric: true,
            label: 'Status',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    const createData = (id, descricao, dimensoes, peso, criacao, acoes) => {
        return {
            id,
            descricao,
            dimensoes,
            peso,
            criacao,
            acoes,
        };
    }
    const rowsVolumes = [
        createData(
            '#3489787', 
            'Tampa da mesa',
            '200 x 400 x 50',
            '20',
            '01/11/2024',
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
        createData(
            '#3489788', 
            'Peças de montagem da mesa',
            '50 x 50 x 50',
            '10',
            '01/11/2024',
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
    ];
    const headCellsVolumes = [
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
            id: 'dimensoes',
            numeric: false,
            label: 'Dimensões (cm)',
        },
        {
            id: 'peso',
            numeric: true,
            label: 'Peso (kg)',
        },
        {
            id: 'criacao',
            numeric: true,
            label: 'Criação',
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
            <Title title={"Pedido Nº #"+id} icon={<ShoppingCartIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Ordens" />
                    <Tab label="Volumes" />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes 
                    status={status} 
                    setTab={setTab} />
                }
                { tab == 1 && <Ordens headCells={headCellsOrdens} rows={rowsOrdens}/> }
                { tab == 2 && <Volumes 
                    openModal={setAddVolumeModal} 
                    open={addVolumeModal} 
                    headCells={headCellsVolumes} 
                    rows={rowsVolumes} />
                }
            </Box>
        </Layout>
    )
}

function Informacoes({ status, setTab}) {
    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">
                { status == 0 && <Chip className="stats" label="Pendente" /> }
                { status == 1 && <Chip className="stats" color="primary" label="Em andamento" /> }
                { status == 2 && <Chip className="stats" color="error" label="Parado" /> }
                { status == 3 && <Chip className="stats" color="success" label="Finalizado" /> }
                <Box className="info">
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>REMESSA: </b>33045-1
                    </p>
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>ENTREGA: </b>01/11/2024
                    </p>
                    <p>
                        <span className="icon"><PermIdentityTwoToneIcon/></span>
                        <b>COMPRADOR(A): </b>João Felipe
                    </p>
                    <p>
                        <span className="icon"><FmdGoodTwoToneIcon/></span>
                        <b>CIDADE / EST: </b>Goiânia / GO
                    </p>
                    <p>
                        <span className="icon"><AssignmentTwoToneIcon/></span>
                        <b>ORDENS: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>1/2</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(2)}}>2</Button>
                    </p>
                </Box>
            </Box>
        </Box>
        </>
    )
}


export function Ordens({ headCells, rows }) {
    return (
        <>
        <Box className="table_content">
            <DataTable headCells={headCells} rows={rows}/>
        </Box>
        </>
    )
}

export function Volumes({ openModal, open, adicionar = true, headCells, rows }) {
    return (
        <>
        <Box className="table_content">
            <DataTable headCells={headCells} rows={rows}/>
            { adicionar && 
                <>
                <Button className="adicionar" variant="contained" onClick={() => openModal(true)}>Adicionar volume</Button>
                <Modal open={open} setOpen={openModal} title="Adicionar volume">
                    <AdicionarVolume/>
                </Modal>
                </>
            }
        </Box>
        </>
    )
}