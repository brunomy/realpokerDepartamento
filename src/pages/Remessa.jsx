import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeightIcon from '@mui/icons-material/Height';
import VerticalAlignTopTwoToneIcon from '@mui/icons-material/VerticalAlignTopTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import TagIcon from '@mui/icons-material/Tag';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import ScaleTwoToneIcon from '@mui/icons-material/ScaleTwoTone';

import Layout from "./components/Layout";
import Title from "./components/Title";
import Modal from './components/Modal';
import ChangeStatus from './components/ChangeStatus';

import { Volumes } from './Pedido';

import TransferList from './components/TransferList';

export default function Remessa() {
    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [statusModalChange, setStatusModalChange] = useState(false);
    const [status, setStatus] = useState(1);

    const [left, setLeft] = useState([
        { label: '#5952', value: 5952},
        { label: '#5953', value: 5953},
    ]);
    const [right, setRight] = useState([
        { label: '#5951', value: 5951},
        { label: '#5955', value: 5955},
        { label: '#5956', value: 5956},
        { label: '#5957', value: 5957},
    ]);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    const createData = (id, descricao, dimensoes, peso, criacao) => {
        return {
            id,
            descricao,
            dimensoes,
            peso,
            criacao,
        };
    }
    const rows = [
        createData(
            '#3489787', 
            'Tampa da mesa',
            '200 x 400 x 50',
            '20',
            '01/11/2024',
        ),
        createData(
            '#3489788', 
            'Peças de montagem da mesa',
            '50 x 50 x 50',
            '10',
            '01/11/2024',
        ),
    ];
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
    ];

    return (
        <Layout>
            <Title title={"Remessa Nº #"+id} icon={<LocalShippingIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Volumes" />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && 
                    <>
                        <Informacoes 
                            setStatusModalChange={setStatusModalChange} 
                            open={statusModalChange}
                            status={status} 
                            setStatus={setStatus}
                            setTab={setTab} />
                        <MudarRemessa left={left} setLeft={setLeft} right={right} setRight={setRight}/>
                    </>
                }
                { tab == 1 && <Volumes headCells={headCells} rows={rows} adicionar={false} /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setStatusModalChange, open, setStatus, status, setTab }) {
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
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>ENTREGA: </b>01/11/2024
                    </p>
                    <p>
                        <span className="icon"><LocalAtmTwoToneIcon /></span>
                        <b>VALOR: </b>R$500,00
                    </p>
                    <p>
                        <span className="icon"><ShoppingCartTwoToneIcon/></span>
                        <b>PEDIDOS: </b>
                        <Button variant="contained" size="small" component={Link} to="/pedidos/5952">#5952</Button>
                        <Button variant="contained" size="small" component={Link} to="/pedidos/5952">#5953</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>2</Button>
                    </p>
          
                    <p>
                        <span className="icon"><HeightIcon sx={{ transform: 'rotate(90deg)' }} /></span>
                        <b>LARGURA: </b>250cm
                    </p>
                    <p>
                        <span className="icon"><HeightIcon sx={{ transform: 'rotate(90deg)' }} /></span>
                        <b>COMPRIMENTO: </b>450cm
                    </p>
                    <p>
                        <span className="icon"><VerticalAlignTopTwoToneIcon /></span>
                        <b>ALTURA: </b>100cm
                    </p>
                    <p>
                        <span className="icon"><ScaleTwoToneIcon /></span>
                        <b>PESO: </b>30kg
                    </p>
                    <Button variant="contained" onClick={() => setStatusModalChange(true)}>Alterar status</Button>
                </Box>
            </Box>
        </Box>
        <Modal open={open} setOpen={setStatusModalChange} title="Alterar status">
            <ChangeStatus status={status} setStatus={setStatus} />
        </Modal>
        </>
    )
}

function MudarRemessa({ left, setLeft, right, setRight }) {
    return (
        <Box className="mudar_remessa">
            <TransferList className="teste" left={left} setLeft={setLeft} right={right} setRight={setRight} />
        </Box>
    )
}