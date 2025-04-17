import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography, Switch } from '@mui/material';

import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import TagIcon from '@mui/icons-material/Tag';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "~/components/Layout";
import Title from "~/components/Title";
import Modal from '~/components/Modal';
import ChangeStatus from '~/components/ChangeStatus';
import Stepper from "~/components/Stepper";
import InputCalendar from '~/components/InputCalendar';
import InputAuto from '~/components/InputAuto';
import DataTable from '~/components/DataTable';

import { useUser } from '~/context/UserContext';
import SelecionarEtapa from '~/components/SelecionarEtapa';
import VistoriaChecklist from '~/components/VistoriaChecklist';
import AdicionarVolume from '~/components/AdicionarVolume';


import dayjs from 'dayjs';
import DataTableSelect from '~/components/DataTableSelect';
import Status from '../components/Status';

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

    return (
        <Layout>
            <Title title={"Atividade Nº #"+id} icon={<AssignmentIcon/>} />
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
            </Box>
        </Layout>
    )
}

function Informacoes({ setTab, open, openModal, status, setStatus, atividade }) {
    const { etapas, atividades, equipes, categorias } = useUser();

    const [statusModal, setStatusModal] = useState(status);

    const equipe = equipes.find((equipe) => equipe.id == atividade?.id_equipe);
    const etapa = etapas.find((etapa) => etapa.id == atividade?.id_etapa);
    const categoria = categorias.find((categoria) => categoria.id == etapa?.id_categoria);
    const atividadeDescricao = atividades.find((item) => item.id == atividade?.id_atividade);
    

    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">
                <Status status={status} />

                <Box className="info">
                    <p>
                        <span className="icon"><ShoppingCartTwoToneIcon/></span>
                        <b>PEDIDO: </b><Button variant="contained" size="small" component={Link} to="/pedidos/5951">#5951</Button>
                    </p>
                    <p>
                        <span className="icon"><FactoryTwoToneIcon/></span>
                        <b>ORDEM: </b><Button variant="contained" size="small" component={Link} to={`/ordens/${atividade.id_ordem}`}>#{atividade?.id_ordem}</Button>
                    </p>
                    <p>
                        <span className="icon"><GroupsTwoToneIcon/></span>
                        <b>EQUIPE: </b>{equipe.title}
                    </p>
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>PRODUÇÃO: </b>{atividade.data}
                    </p>
                    <p >
                        <span className="icon"><TagIcon/></span>
                        <b>CATEGORIA: </b>{categoria.title}
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>2</Button>
                    </p>
                    <p>
                        <span className="icon"><StairsTwoToneIcon/></span>
                        <b>ETAPA: </b>{etapa.title}
                    </p>
                
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>DESCRIÇÃO: </b>{atividadeDescricao.title}
                    </p>
                    {
                        (status != -1 && status != 3) && 
                        <Button variant="contained" onClick={() => openModal(true)}>Alterar status</Button>
                    }
                </Box>
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
    var selecionados = volumesOP.map(v => v.id_volume)
    const [ids, setIds] = useState(selecionados);
    
    const selectListener = (idsSelecionados) => {
        setIds(idsSelecionados);
      
        setVolumesOP(prevVolumes => {
          const volumesFiltrados = prevVolumes.filter(
            item => item.id_ativ !== id && !idsSelecionados.includes(item.id_ativ)
          );
      
          const novos = idsSelecionados.map((id_volume, index) => ({
            id: volumesFiltrados.length + index + 1,
            id_ativ: id,
            id_atividade: atividade.id_atividade,
            id_volume: id_volume,
            id_embalagem: null,
          }));
      
          const resultado = [...volumesFiltrados, ...novos];
          return resultado;
        });
      };

    const createData = (id, volume, comprimento, largura, altura, peso) => {
        return { id, volume, comprimento, largura, altura, peso };
    }
    const createDataItem = () => {
        return (volumes.filter((item) => item.id_atividade == atividade.id_atividade))?.map((volume) => {
            return createData(
                volume.id,
                volume.title,
                volume.comprimento,
                volume.largura,
                volume.altura,
                volume.peso
            );
        }) || []
    }
    useEffect(() => {
        setRows(createDataItem())
    },[volumes])

    const [rows, setRows] = useState(createDataItem());

    const columns = [
        { field: 'volume', headerName: 'Volume', width: 400 },
        { field: 'comprimento', headerName: 'Comprimento', width: 110 },
        { field: 'largura', headerName: 'Largura', width: 110 },
        { field: 'altura', headerName: 'Altura', width: 110 },
        { field: 'peso', headerName: 'Peso', width: 110 },
    ];
      
    return (
        <>
        <Box className="table_content">
            <DataTableSelect ids={ids} setIds={selectListener} rows={rows} columns={columns}/>
        </Box>
        </>
    )
}