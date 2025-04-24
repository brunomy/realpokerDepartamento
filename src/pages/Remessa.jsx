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
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import MarkunreadMailboxTwoToneIcon from '@mui/icons-material/MarkunreadMailboxTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';
import Status from '~/components/layout/Status';

import { Volumes } from './Pedido';
import { useUser } from '~/context/UserContext';

import TransferList from '~/components/TransferList';

export default function Remessa() {
    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [statusModalChange, setStatusModalChange] = useState(false);
    const [status, setStatus] = useState(1);

    const [left, setLeft] = useState([
        { label: `Pedido: #5951 | Ordem: #3568`, value: 3568},
    ]);
    const [right, setRight] = useState([]);

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
                    <Tab label="Embalagens" />
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
                { tab == 1 && <Volumes /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setStatusModalChange, open, setStatus, status, setTab }) {
    const { volumesOP } = useUser();

    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">
                <Box className="info">
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>ENTREGA: </b>01/11/2024
                    </p>
                    <p>
                        <span className="icon"><AccountBoxTwoToneIcon/></span>
                        <b>DESTINATÁRIO: </b>João Felipe
                    </p>
                    <p>
                        <span className="icon"><ShoppingCartTwoToneIcon/></span>
                        <b>PEDIDOS: </b>
                        <Button variant="contained" size="small" component={Link} to="/pedidos/5951">#5951</Button>
                    </p>
                    <p>
                        <span className="icon"><FactoryTwoToneIcon/></span>
                        <b>ORDENS: </b>
                        <Button variant="contained" size="small" component={Link} to="/ordens/3568">#3568</Button>
                    </p>
                    <p>
                        <span className="icon"><MoveToInboxTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>{volumesOP.length}</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>EMBALAGENS: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(2)}}>0</Button>
                    </p>
                    <p>
                        <span className="icon"><MarkunreadMailboxTwoToneIcon/></span>
                        <b>CEP: </b>74580-340
                    </p>
                    <p>
                        <span className="icon"><FmdGoodTwoToneIcon/></span>
                        <b>CIDADE/UF: </b>Goiânia/GO
                    </p>
                    <p className="full">
                        <span className="icon"><HomeTwoToneIcon/></span>
                        <b>ENDEREÇO: </b>Rua sp 12
                    </p>
                    <p className="full">
                        <span className="icon"><AddBoxTwoToneIcon/></span>
                        <b>COMPLEMENTO: </b>Q 5 Lt 12, próximo ao pamonharia souza
                    </p>
                    <p className="full">
                        <span className="icon"><HandymanTwoToneIcon/></span>
                        <b>STATUS: </b><Status status={status} />
                    </p>
                </Box>
            </Box>
        </Box>
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