import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography, Switch } from '@mui/material';


import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';
import ChangeStatus from '~/components/modal/ChangeStatus';
import Stepper from "~/components/Stepper";
import InputCalendar from '~/components/InputCalendar';
import DataTable from '~/components/DataTable';

import { useUser } from '~/context/UserContext';
import SelecionarEtapa from '~/components/SelecionarEtapa';
import AdicionarVolume from '~/components/modal/AdicionarVolume';


import dayjs from 'dayjs';
import Status from '../components/layout/Status';

//icons
import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import TurnedInTwoToneIcon from '@mui/icons-material/TurnedInTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import { InfoProduto } from './Ordem';


export default function Atividade() {
    const { 
        usuarioLogado, 
        atividadesOP, setAtividadesOP,
        etapas, atividades, equipes, categorias
    } = useUser();
    const { id } = useParams();

    const atividade = atividadesOP.find((atividade) => atividade.id == id);
    
    const [tab, setTab] = useState(0);

    const [statusModalChange, setStatusModalChange] = useState(false);
    const [status, setStatus] = useState(atividade?.status);

    const atualizarStatusAtividade = (atividade, novoStatus) => {
        setAtividadesOP(prev =>
            prev.map(item =>
                item.id === atividade.id ? { ...item, status: novoStatus } : item
            )
        );
    };
    useEffect(() => {
        atualizarStatusAtividade(atividade, status);
    },[status])

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    const breadcrumbs = [
        {
            label: 'Pedido #5951',
            url: '/pedidos/5951'
        },
        {
            label: `Ordem #${atividade.id_ordem}`,
            url: `/ordens/${atividade.id_ordem}`
        },
        {
            label: `Atividade #${id}`,
            url: `/atividades/${id}`
        },
    ]

    return (
        <Layout>
            <Title title={"Atividade Nº #"+id} icon={<AssignmentIcon/>} breadcrumbs={breadcrumbs} />
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
                    <Tab label="Histórico" />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes 
                    atividade={atividade}
                    setTab={setTab} 
                    open={statusModalChange} 
                    openModal={setStatusModalChange} 
                    status={status} 
                    setStatus={setStatus} 
                    usuarioLogado={usuarioLogado}
                /> }
                { tab == 1 && <Volumes id={id} atividade={atividade} /> }
                { tab == 2 && <Historico /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setTab, open, openModal, status, setStatus, atividade }) {
    const { etapas, atividades, equipes, categorias, volumesOP } = useUser();

    const [statusModal, setStatusModal] = useState(status);

    const equipe = equipes.find((equipe) => equipe.id == atividade?.id_equipe);
    const etapa = etapas.find((etapa) => etapa.id == atividade?.id_etapa);
    const categoria = categorias.find((categoria) => categoria.id == etapa?.id_categoria);
    const atividadeDescricao = atividades.find((item) => item.id == atividade?.id_atividade);

    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">
                <Box className="info">
                    <p>
                        <span className="icon"><GroupsTwoToneIcon/></span>
                        <b>EQUIPE: </b>{equipe.title}
                    </p>
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>PRODUÇÃO: </b>{atividade.data}
                    </p>
                    <p>
                        <span className="icon"><TurnedInTwoToneIcon/></span>
                        <b>CATEGORIA: </b>Mesa de Poker
                    </p>
                    <p>
                        <span className="icon"><StairsTwoToneIcon/></span>
                        <b>ETAPA: </b>{etapa.title}
                    </p>
                    <p>
                        <span className="icon"><MoveToInboxTwoToneIcon/></span>
                        <b>VOLUMES: </b> {volumesOP.length}
                    </p>
                
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>ATIVIDADE: </b>{atividadeDescricao.title}
                    </p>
                    <p className="full">
                        <span className="icon"><HandymanTwoToneIcon/></span>
                        <b>STATUS: </b><Status status={status} />
                    </p>
                    {
                        (status != -1 && status != 3) && 
                        <Button variant="contained" onClick={() => openModal(true)}>Alterar status</Button>
                    }
                </Box>
                <br />
                <InfoProduto />
            </Box>
        </Box>
        <Modal open={open} setOpen={openModal} title="Alterar status" confirm={() => setStatus(statusModal)}>
            <ChangeStatus status={statusModal} setStatus={setStatusModal} />
        </Modal>
        </>
    )
}

function Volumes({ id, atividade }) {
    const { volumesOP, setVolumesOP, volumes } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [novoVolume, setNovoVolume] = useState({});
    const [rows, setRows] = useState([]);

    const adicionarVolume = () => {
        setVolumesOP([
            ...volumesOP,
            {
                id: volumesOP.length + 1,
                id_ativ: id,
                id_etapa: atividade.id_etapa,
                id_volume: novoVolume.id_volume,
                id_remessa: 5951,
                id_embalagem: null,
                comprimento: novoVolume.comprimento,
                largura: novoVolume.largura,
                altura: novoVolume.altura,
                peso: novoVolume.peso
            },
        ]);
        setNovoVolume({});
        setOpenModal(false);
    }
    const deletar = (id) => {
        setVolumesOP(volumesOP.filter(item => item.id !== id))
    }

    const createDataItens = () => {
        return (volumesOP.filter((item) => item.id_ativ == id))?.map((item) => {
            let volume = volumes.find((volume) => volume.id == item.id_volume);

            return createData(
                volume.title,
                item.comprimento,
                item.largura,
                item.altura,
                item.peso,
                <Box className="acoes">
                    <Button onClick={() => {deletar(item.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                </Box>
            );
        }) || [] 
    }

    useEffect(() => {
        setRows(createDataItens())
    },[volumesOP])

    const createData = (id, volume, comprimento, largura, altura, peso) => {
        return { id, volume, comprimento, largura, altura, peso };
    }

    const headCells = [
        { id: 'volume', label: 'Volume', },
        { id: 'comprimento', label: 'Comprimento', },
        { id: 'largura', label: 'Largura', },
        { id: 'altura', label: 'Altura', },
        { id: 'peso', label: 'Peso', },
        {
            id: 'acoes',
            align: "right",
            label: 'Ações',
        },
    ];
      
    return (
        <>
        <Box className="table_content">
            <DataTable headCells={headCells} rows={rows}/>
            <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar volume</Button>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar volume" confirm={adicionarVolume}>
                <AdicionarVolume 
                    value={novoVolume} 
                    setValue={setNovoVolume} 
                    id_atividade={atividade.id_atividade}
                />
            </Modal>
        </Box>
        </>
    )
}

export function Historico() {
    const createData = (data, descricao, equipe, responsavel) => {
        return { data, descricao, equipe, responsavel };
    }

    const rows = [
        createData('05/05/2025 às 13:30', 'Iniciou a atividade "Cortar borda"', 'M1', 'Bruno'),
        createData('05/05/2025 às 13:35', 'Parou a atividade "Cortar borda"', 'M1', 'Bruno'),
        createData('05/05/2025 às 13:50', 'Retomou a atividade "Cortar borda"', 'M1', 'Bruno'),
        createData('05/05/2025 às 14:30', 'Finalizou a atividade "Cortar borda"', 'M1', 'Bruno'),
        createData('05/05/2025 às 14:30', 'A atividade "Cortar borda" gerou o volume "Borda da mesa"', 'M1', 'Bruno'),
        createData('05/05/2025 às 14:30', 'A atividade "Cortar borda" gerou o volume "Suporte da borda"', 'M1', 'Bruno'),
    ]

    const headCells = [
        { id: 'data', label: 'Data', },
        { id: 'descricao', label: 'Descrição', },
        { id: 'equipe', label: 'Equipe', },
        { id: 'responsavel', label: 'Responsável', },
    ];
    return (
        <Box className="historico">
            <DataTable headCells={headCells} rows={rows} />
        </Box>
    )
}