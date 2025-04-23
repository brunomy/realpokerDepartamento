import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import DataTable from '~/components/DataTable';
import Modal from '~/components/layout/Modal';

import { useUser } from '~/context/UserContext';
import Status from '../components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import FreeCancellationTwoToneIcon from '@mui/icons-material/FreeCancellationTwoTone';

export default function Pedidos() {
    const { volumesOP } = useUser();

    const { id } = useParams();

    const [tab, setTab] = useState(0);

    //dados
    const createDataOrdens = () => {
        const id = '#5951-1';
        const remessa = <Button component={Link} to="/remessas/5951" variant="outlined" size="small">#5951</Button>;
        const categoria = <Chip className="stats" size="small" label="Mesa de poker" />;
        const descricao = 'Mesa de poker profissional';
        const producao = '03/04/2025';
        const conclusao = <Box className="data_late">22/04/2025 <TimerTwoToneIcon color="error"/></Box>;
        const status = <Status status={calculoStatusPedido()} size={'small'} />;
        const link = <Button component={Link} to="/ordens/5951-1" variant="outlined" size="small">Detalhes</Button>;

        return { id, remessa, categoria, descricao, producao, conclusao, status, link };
    }
    const rowsOrdens = [createDataOrdens()];
    const headCellsOrdens = [
        {
            id: 'id',
            label: 'Id',
        },
        {
            id: 'remessa',
            label: 'Remessa',
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
            id: 'status',
            label: 'Status',
        },
        {
            id: 'link',
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
                    <Tab label="Volumes" disabled={volumesOP.length == 0} />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && 
                    <>
                    <Informacoes 
                        volumesOP={volumesOP}
                        status={calculoStatusPedido()} 
                        setTab={setTab} />
                    <Ordens headCells={headCellsOrdens} rows={rowsOrdens}/>
                    </>
                }
                { tab == 1 && <Volumes /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setTab, volumesOP}) {
    return (
        <>
        <Box className="informacoes" sx={{paddingBottom: '0 !important'}}>
            <Box className="info_pedido">
                <Box className="info">
                    <p>
                        <span className="icon"><EventAvailableTwoToneIcon/></span>
                        <b>CONCLUSÃO: </b>22/04/2025
                    </p>
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>SAÍDA: </b>28/04/2025 
                        <Button className="editar" variant="outlined" size="small"><FreeCancellationTwoToneIcon />Alterar data</Button>
                    </p>
                    <p>
                        <span className="icon"><LocalShippingTwoToneIcon/></span>
                        <b>REMESSA(s): </b><Button component={Link} to="/remessas/5951" variant="outlined" size="small">#5951</Button>
                    </p>
                    <p>
                        <span className="icon"><PermIdentityTwoToneIcon/></span>
                        <b>CLIENTE: </b>João Felipe
                    </p>
                    <p>
                        <span className="icon"><FmdGoodTwoToneIcon/></span>
                        <b>CIDADE / EST: </b>Goiânia / GO
                    </p>
                    <p>
                        <span className="icon"><MoveToInboxTwoToneIcon/></span>
                        <b>VOLUMES: </b>{volumesOP.length}
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
        <Box className="table_content" sx={{paddingTop: '0 !important'}}>
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