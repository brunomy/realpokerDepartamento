import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
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

    //dados
    const createDataOrdens = ({ id, remessa, categoria, descricao, producao, conclusao, requisitos, status }) => {
        const rem = <Button component={Link} to={"/remessas/"+remessa} variant="outlined" size="small">{remessa}</Button>;
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

        return { rem, cat, desc, prod, conc, req, stats};
    }
    const rowsOrdens = [
        createDataOrdens({ 
            id: 1,
            remessa: '5951-1',
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
            categoria: 'Futmesa',
            descricao: 'Futmesa',
            producao: '04/04/2025',
            conclusao: '22/04/2025',
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
            <Title title={"Pedido Nº #"+id} icon={<ShoppingCartIcon/>} />
            <Box className="show_content">
                <Informacoes 
                    volumesOP={volumesOP}
                    status={calculoStatusPedido()} />
                <Ordens headCells={headCellsOrdens} rows={rowsOrdens}/>
            </Box>
        </Layout>
    )
}

function Informacoes({ volumesOP}) {
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
                        <b>REMESSA(s): </b><Button component={Link} to="/remessas/5951" variant="outlined" size="small">5951-1</Button>
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

