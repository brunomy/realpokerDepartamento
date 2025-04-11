import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography } from '@mui/material';

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

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "./components/Layout";
import Title from "./components/Title";
import Modal from './components/Modal';
import ChangeStatus from './components/ChangeStatus';
import Stepper from "./components/Stepper";

import { Volumes } from './Pedido';

import { useUser } from '../context/UserContext';

export default function Ordem() {
    const { 
        usuarioLogado, setUsuarioLogado,
        checklists, setChecklists,
        checklistItem, setChecklistItem,
    } = useUser();
    const [draftChecklist, setDraftChecklist] = useState([]);
    const draftRef = useRef([]);

    useEffect(() => {
        if (checklists.length > 0 && checklistItem.length > 0) {
          const list = checklists
            .filter((item) => item.id_categoria == 1) //Precisa mudar o id
            .map((item) => ({
              ...item,
              itens: checklistItem.filter((i) => i.id_checklist === item.id),
            }));
          setDraftChecklist(list);
          draftRef.current = JSON.parse(JSON.stringify(list));
        }
      }, [checklists, checklistItem]);

    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [statusModalChange, setStatusModalChange] = useState(false);
    const [addVolumeModal, setAddVolumeModal] = useState(false);
    const [status, setStatus] = useState(1);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    const step_list = [
        {
            title: 'Router',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
        },
        {
            title: 'Adesivo',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Cliente',
                    description: 'Aguardando aprovação do cliente'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
        },
        {
            title: 'Tecido',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Cliente',
                    description: 'Aguardando aprovação do cliente'
                },
                {
                    label: 'Impermeabilização',
                    description: 'O tecido precisa ser impermeabilizado'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
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
    const rows = [
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
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <Layout>
            <Title title={"Ordem Nº #"+id} icon={<AssignmentIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Requisitos" />
                    <Tab label="Checklist" />
                    <Tab label="Volumes" />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes 
                    setTab={setTab} 
                    open={statusModalChange} 
                    openModal={setStatusModalChange} 
                    status={status} 
                    setStatus={setStatus} 
                    usuarioLogado={usuarioLogado}
                /> }
                { tab == 1 && <Requisitos step_list={step_list} /> }
                { tab == 2 && <Checklist lista={draftChecklist} /> }
                { tab == 3 && <Volumes openModal={setAddVolumeModal} open={addVolumeModal} headCells={headCells} rows={rows} /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setTab, open, openModal, status, setStatus, usuarioLogado }) {
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
                        <span className="icon"><ShoppingCartTwoToneIcon/></span>
                        <b>PEDIDO: </b><Button variant="contained" size="small" component={Link} to="/pedidos/5951">#5951</Button>
                    </p>
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>PRODUÇÃO: </b>01/11/2024
                    </p>
                    <p>
                        <span className="icon"><GroupsTwoToneIcon/></span>
                        <b>EQUIPE: </b>M1
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>REQUISITOS: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>0/3</Button>
                    </p>
                    <p>
                        <span className="icon"><StairsTwoToneIcon/></span>
                        <b>ETAPA: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(1)}}>0/6</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(3)}}>2</Button>
                    </p>
                    <p>
                        <span className="icon"><TagIcon/></span>
                        <b>CATEGORIA: </b>Mesa de Poker
                    </p>
                
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>DESCRIÇÃO: </b>Mesa de poker profissional
                    </p>
                    {
                        usuarioLogado.permission == "admin" && 
                        <Button variant="contained" onClick={() => openModal(true)}>Alterar status</Button>
                    }
                </Box>
            </Box>

            <Box className="info_produto">
                <h3>
                    <b>PRODUTO: </b>MESA DE POKER PROFISSIONAL PARA CLUBES DE POKER E RESIDÊNCIAS
                </h3>
              
                <Box className="info_table">
                    <div>
                        <h4>TAMANHO DA MESA:</h4>
                        <p>9 (2,40 x 1,10M)</p>
                    </div>
                    <div>
                        <h4>EMBARALHADOR AUTOMÁTICO:</h4>
                        <p>Sem embaralhador</p>
                    </div>
                    <div>
                        <h4>TIPO DA COLUNA DA MESA:</h4>
                        <p>Retangular</p>
                    </div>
                    <div>
                        <h4>TEXTURA DA COLUNA DA MESA:</h4>
                        <p>Branco Fosco</p>
                    </div>
                    <div>
                        <h4>PISTA PARA FICHAS:</h4>
                        <p>Sem embaralhador</p>
                    </div>
                    <div>
                        <h4>EMBARALHADOR AUTOMÁTICO:</h4>
                        <p>Sem pista</p>
                    </div>
                    <div>
                        <h4>PORTA COPOS:</h4>
                        <p>Sem Porta Copos</p>
                    </div>
                    <div>
                        <h4>COURÍSSIMO DA BORDA:</h4>
                        <p>Preto</p>
                    </div>
                    <div>
                        <h4>COR DO TECIDO DA MESA:</h4>
                        <p>Preto</p>
                    </div>
                    <div>
                        <h4>PERSONALIZE COM SUA MARCA:</h4>
                        <p>Sem Logo ou Escrita</p>
                    </div>
                    <div>
                        <h4>DESENHO DE FUNDO:</h4>
                        <p>Sem Personalização</p>
                    </div>
                    <div>
                        <h4>TAMPÃO DE JANTAR / TÊNIS DE MESA:</h4>
                        <p>Sem tampão</p>
                    </div>
                    <div>
                        <h4>TIPO DE BORDA:</h4>
                        <p>Borda Baixa</p>
                    </div>
                    <div>
                        <h4>COR DO LED:</h4>
                        <p>Sem LED</p>
                    </div>
                    <div>
                        <h4>GAVETA E RACK PARA FICHAS:</h4>
                        <p>Para Cash Game + Rack METAL 500 Fichas (39mm)</p>
                    </div>
                    <div>
                        <h4>CONFIGURAÇÃO DO TAMPÃO:</h4>
                        <p>Configuração do Tampão</p>
                    </div>
                </Box>
            </Box>
        </Box>
        <Modal open={open} setOpen={openModal} title="Alterar status">
            <ChangeStatus status={status} setStatus={setStatus} />
        </Modal>
        </>
    )
}
export function Requisitos({ step_list }) {
    return (
        <Box className="requisitos">
            { 
                step_list.map((step, index) => (
                    <RequisitoItem step={step} key={index} />
                ))
            }
        </Box>
    )
}
function RequisitoItem({ step }){
    return (
        <div className="requisito_item">
            <h3>
                <span className="icon">
                    <ChecklistIcon />
                </span>
                {step.title}
            </h3>
            <div className="step_content">
                <Stepper steps={step.steps} />
            </div>
        </div>
    )
}
function Checklist({ lista }) {
    return (
        <Box className="order_checklist">
        {lista?.map((item, index) => (
            <Accordion className="accordion_item" key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="titulo" component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{item.title}</span> <span className="equipe">M1</span>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion_details">
                    {item.itens.map((i, indx) => (
                        <Box className="item" key={indx}>
                            {i.title}
                        </Box>
                    ))}
                </AccordionDetails>
                {/* <AccordionActions>
                    <Button onClick={() => removerUltimoItem(item.id)}>
                        Remover último
                    </Button>
                    <Button onClick={() => adicionarItemVazio(item.id)}>
                        Adicionar
                    </Button>
                </AccordionActions> */}
            </Accordion>
        ))}
        </Box>
    )
}