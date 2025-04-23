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

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import DataTable from '~/components/DataTable';
import Modal from '~/components/layout/Modal';

import { useUser } from '~/context/UserContext';
import Status from '../components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

export default function Pedidos() {
    const { ordens, setOrdens, volumesOP } = useUser();

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
            '11/04/2025',
            <Status status={calculoStatusPedido()} size={'small'} />,
            <Button component={Link} to="/ordens/3568" variant="outlined" size="small">Detalhes</Button>
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
                    <Tab label="Volumes" disabled={volumesOP.length == 0} />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes 
                    volumesOP={volumesOP}
                    status={calculoStatusPedido()} 
                    setTab={setTab} />
                }
                { tab == 1 && <Ordens headCells={headCellsOrdens} rows={rowsOrdens}/> }
                { tab == 2 && <Volumes /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ status, setTab, volumesOP}) {
    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">
                <Status status={status} />
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
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>0/1</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(2)}}>{volumesOP.length}</Button>
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

export function Volumes() {
    const { atividadesOP, volumes, volumesOP, checklists, checklistOP } = useUser();

    const naoEmbalados = volumesOP.filter(item => item.id_embalagem == null);
    const embalados = volumesOP.filter(item => item.id_embalagem != null);

    const createData = (volume) => {
        const volumeConf = volumes.find(item => item.id == volume.id_volume);
        const title = volumeConf.title;
        const dimensoes = volume.comprimento + ' x ' + volume.largura + ' x ' + volume.altura;
        const peso = volume.peso;


        const checklistAtv = checklists?.filter(item => item.id_atividade == volumeConf.id_atividade);
        const checklistFinalizado = checklistOP.filter(item => item.id_ativ == volume.id_ativ && item.status == 1);

        const statusCheck = `${checklistFinalizado.length}/${checklistAtv.length}`;
        var chipStatus = null;
        if(checklistFinalizado.length == checklistAtv.length){
            chipStatus = <Chip className="stats" size='small' color="success" label={statusCheck} />
        } else {
            chipStatus = <Chip className="stats" size='small' label={statusCheck} />
        }
        
        const atividadeConf = atividadesOP.find(item => (item.id == volume.id_ativ && item.status != -1));
        const atividadeLink = <Button variant="outlined" size="small" component={Link} to={`/atividades/${atividadeConf.id}`}>#{atividadeConf.id}</Button>;
        
        const remessaLink = <Button variant="contained" size="small" component={Link} to={`/remessas/${volume.id_remessa}`} sx={{ boxShadow: 'none' }}>#{volume.id_remessa}</Button>;
        
        return { title, dimensoes, peso, chipStatus, atividadeLink, remessaLink };
    }
 
    const rowsNaoEmbalados = [];
    naoEmbalados.map((item) => {
        rowsNaoEmbalados.push(
            createData(item)
        )
    })

    const rowEmbalados = [];
    embalados.map((item) => {
        rowEmbalados.push(
            createData(item)
        )
    })
    const headCells = [
        {
            id: 'volume',
            label: 'Volume',
        },
        {
            id: 'dimensoes',
            numeric: false,
            label: 'Dimensões (cm)',
        },
        {
            id: 'peso',
            label: 'Peso (kg)',
        },
        {
            id: 'statusCheck',
            label: 'Checklist',
        },
        {
            id: 'atividade',
            label: 'Atividade',
        },
        {
            id: 'remessa',
            label: 'Remessa',
        },
    ];


    return (
        <Box className="volumes">
            <div className="volume_content">
                <h3>
                    Não embalados
                </h3>
                <DataTable headCells={headCells} rows={rowsNaoEmbalados}/>
            </div>
            <div className="volume_content">
                <h3>Embalados</h3>
                <DataTable headCells={headCells} rows={rowEmbalados}/>
            </div>
        </Box>
    )
}