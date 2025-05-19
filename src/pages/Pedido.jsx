import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import DataTable from '~/components/DataTable';

import { useUser } from '~/context/UserContext';
import Status from '../components/layout/Status';
import { calculoStatusPedido } from './Pedidos';

import { Volumes } from './Remessa';


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
        const requisitos = <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
            <Chip size="small" color="success" label="Router" />
            <Chip size="small" label="Adesivo" />
            <Chip size="small" label="Tecido" />
        </Box>;
        const status = <>
            <Status status={calculoStatusPedido()} size={'small'} />
            <Button className="link" component={Link} to="/ordens/5951-1" variant="outlined" size="small">Detalhes</Button>
        </>

        return { id, remessa, categoria, descricao, producao, conclusao, requisitos, status };
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
            id: 'requisitos',
            label: 'Requisitos',
        },
        {
            id: 'status',
            label: 'Status',
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

