import '~/assets/scss/Show.scss';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography, Switch } from '@mui/material';

import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FactoryIcon from '@mui/icons-material/Factory';
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

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';
import Stepper from "~/components/Stepper";
import InputCalendar from '~/components/InputCalendar';
import InputAuto from '~/components/InputAuto';
import DataTable from '~/components/DataTable';


import { useUser } from '~/context/UserContext';
import SelecionarEtapa from '~/components/SelecionarEtapa';
import VistoriaChecklist from '~/components/modal/VistoriaChecklist';

import dayjs from 'dayjs';
import Status from '~/components/layout/Status';
import { Volumes } from './Pedido';
import { calculoStatusPedido } from './Pedidos';

export default function Ordem() {
    const { 
        atividadesOP, etapasOP, volumesOP,
        etapas,
        atividades,
        checklists,
        equipes
    } = useUser();

    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [status, setStatus] = useState(calculoStatusPedido());

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

    const breadcrumbs = [
        {
            label: 'Pedido #5951',
            url: '/pedidos/5951'
        },
        {
            label: `Ordem #${id}`,
            url: `/ordens/${id}`
        },
    ]

    return (
        <Layout>
            <Title title={"Ordem Nº #"+id} icon={<FactoryIcon/>} breadcrumbs={breadcrumbs} />
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
                    <Tab label="Etapas " />
                    <Tab label="Atividades" disabled={!atividadesOP.find(item => item.ativo === 1)} />
                    <Tab label="Checklist" disabled={!atividadesOP.find(item => item.ativo === 1)} />
                    <Tab label="Volumes" disabled={!atividadesOP.find(item => item.ativo === 1) || volumesOP.length == 0} />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes 
                    setTab={setTab} 
                    status={status} 
                /> }
                { tab == 1 && <Requisitos step_list={step_list} /> }
                { tab == 2 && <Etapas etapas={etapas.filter(e => e.id_categoria === 1)} atividades={atividades} equipes={equipes} /> }
                { tab == 3 && <Atividades atividadesOP={atividadesOP.filter((a) => a.ativo == 1)} atividades={atividades} etapas={etapas} equipes={equipes} /> }
                { tab == 4 && <Checklist etapas={etapas} etapasOP={etapasOP} checklists={checklists} equipes={equipes} /> }
                { tab == 5 && <Volumes /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ setTab, status }) {
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
                        <Button variant="contained" size="small" onClick={() => {setTab(2)}}>0/6</Button>
                    </p>
                    <p>
                        <span className="icon"><ArchiveTwoToneIcon/></span>
                        <b>VOLUMES: </b>
                        <Button variant="contained" size="small" onClick={() => {setTab(6)}}>2</Button>
                    </p>
                    <p>
                        <span className="icon"><TagIcon/></span>
                        <b>CATEGORIA: </b>Mesa de Poker
                    </p>
                
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>DESCRIÇÃO: </b>Mesa de poker profissional
                    </p>
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
        </>
    )
}
function Requisitos({ step_list }) {
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
function RequisitoItem({ step }) {
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
function Etapas ({ etapas = [], atividades = [], equipes = [] }) {
    const { etapasOP, setEtapasOP } = useUser();

    const [openModal, setOpenModal] = useState(false);
    const [selecionadasModal, setSelecionadasModal] = useState(etapasOP ? etapasOP : []);

    const salvarSelecionadas = () => {
        setEtapasOP(selecionadasModal);
    };

    return (
        <Box className="ordem_etapas">
            <Box className="selecionar_etapas">
                <Button variant="contained" size="small" onClick={() => setOpenModal(true)}>Selecionar Etapa</Button>
            </Box>
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                title="Selecionar Etapa"
                confirm={salvarSelecionadas}
            >
                <SelecionarEtapa
                    etapas={etapas}
                    selecionadas={selecionadasModal}
                    setSelecionadasModal={setSelecionadasModal}
                />
            </Modal>

            <Box className="etapas">
            {etapas
                .filter(etapa => etapasOP.includes(etapa.id))
                .map((item, index) => (
                <Accordion className="accordion_item" key={index} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="titulo" component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{item.title}</span>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="accordion_details">
                    {atividades.filter(atividade => atividade.id_etapa === item.id).map(atividade => (
                        <AtividadeItem
                            atividade={atividade}
                            equipes={equipes}
                            key={atividade.id}
                        />
                    ))}
                    </AccordionDetails>
                </Accordion>
            ))}
            </Box>
        </Box>
    )
}
function AtividadeItem({ atividade, equipes }) {
    const { atividadesOP, setAtividadesOP, volumes, volumesOP, setVolumesOP } = useUser();
    const { id } = useParams();
    
    const formatarArray = () => {
        return equipes.map((equipe) => ({
            id: equipe.id,
            label: equipe.title
        }));
    };
    const atualizarAtividade = (id, novoValor) => {
        setAtividadesOP((prevAtividades) =>
            prevAtividades.map((atividade) =>
                atividade.id === id
                ? { ...atividade, ...novoValor } // Atualiza os campos desejados
                : atividade
            )
        );
    };

    var find = atividadesOP.find(item => item.id_atividade == atividade.id && item.status != -1);

    const [checked, setChecked] = useState(find?.ativo);
    const [equipeSelecionada, setEquipeSelecionada] = useState(formatarArray().find(item => item.id === find?.id_equipe) || null);
    const [dataSelecionada, setDataSelecionada] = useState(find?.data || '');

    useEffect(() => {
        if(checked && equipeSelecionada && dataSelecionada && dataSelecionada != "Invalid Date" && !find){

            setAtividadesOP((prev) => [
                ...prev,
                {
                    id: atividadesOP.length + 1,
                    id_ordem: id,
                    id_etapa: atividade.id_etapa,
                    id_atividade: atividade.id,
                    id_equipe: equipeSelecionada.id,
                    data: dataSelecionada,
                    ativo: 1,
                    status: 0,
                },
            ]);
            find = atividadesOP.find(item => item.id_atividade == atividade.id && item.status != -1);
        }
        else if(find?.status == 0 && dataSelecionada && dataSelecionada != "Invalid Date" && equipeSelecionada){
            atualizarAtividade(find.id, {
                id_equipe: equipeSelecionada?.id,
                data: dataSelecionada,
                ativo: checked ? 1 : 0,
            });
        }
        
    }, [checked, equipeSelecionada, dataSelecionada]);

    return (
        <Box className={`atividade_etapa ${checked ? 'checked' : ''} ${(find != undefined && find.status != 0) ? 'disabled' : ''}`}>
            <h2>{atividade.title} <Switch checked={checked} onChange={(e) => {setChecked(e.target.checked)}}  /></h2>
            { find != undefined && 
                <Box className='running'>
                    <Button component={Link} to={`/atividades/${find?.id}`} variant="outlined" size="small">Detalhes</Button>
                    <span className="stats">
                        <Status status={find?.status} />
                    </span>
                </Box>
            }
            <div>
                <div className="item">
                    <InputCalendar
                        label="Data"
                        width={'100%'}
                        value={dataSelecionada}
                        setValue={setDataSelecionada}
                    />
                </div>
                <div className="item">
                    <InputAuto 
                        label="Equipe" 
                        list={formatarArray()}
                        value={equipeSelecionada}
                        setValue={setEquipeSelecionada}
                    />
                </div>
            </div>
        </Box>
    );
}
function Atividades({ atividadesOP, atividades, etapas, equipes }) {
    const createData = (id, equipe, producao, titulo, etapa, status, link) => {
        const elementStatus = <Status status={status} size='small' />;

        return { id, equipe, producao, titulo, etapa, elementStatus, link };
    }
    const headCells = [
        {id: 'id', label: 'Id'},
        {id: 'equipe', label: 'Equipe'},
        {id: 'producao', label: 'Produção'},
        {id: 'titulo', label: 'Título'},
        {id: 'etapa', label: 'Etapa'},
        {id: 'status', label: 'Status'},
        {id: 'link', label: 'Link'},
    ];
    const rows = [];

    atividadesOP.map((item) => {
        rows.push(
            createData(
                item.id,
                equipes.find(e => e.id == item.id_equipe).title,
                item.data,
                atividades.find(a => a.id == item.id_atividade).title,
                etapas.find(e => e.id == item.id_etapa).title,
                item.status,
                <Button component={Link} to={`/atividades/${item.id}`} variant="outlined" size="small">Detalhes</Button>
            )
        )
    })

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
        </Box>
    );
}
function Checklist({ etapas, etapasOP, checklists, equipes }) {
    const { checklistOP, setChecklistOP, atividadesOP, setAtividadesOP, setVolumesOP, volumesOP } = useUser();
    
    const [openModal, setOpenModal] = useState(false);
    const [checklistSelecionado, setChecklistSelecionado] = useState(null);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

    const [observacao, setObservacao] = useState('');
    const [falha, setFalha] = useState(0);


    const atualizarStatusAtividade = (atividade, novoStatus) => {
        const prevAtividades = atividadesOP.map(item =>
            item.id === atividade.id ? { ...item, status: novoStatus } : item
        )
        setAtividadesOP([...prevAtividades, {
            id: atividadesOP.length + 1,
            id_ordem: atividade.id_ordem,
            id_etapa: atividade.id_etapa,
            id_atividade: atividade.id_atividade,
            id_equipe: atividade.id_equipe,
            ativo: 1,
            data: atividade.data,
            status: 0
        }])
    };
    const abrirModalVistoria = (checklist , atividade) => {
        setChecklistSelecionado(checklist)
        setAtividadeSelecionada(atividade)
        setFalha(0)
        setObservacao('')

        setOpenModal(true)
    }
    const fazerVistoria = () => {
        if(falha){
            const cadastrados = checklistOP
            .filter(item => item.id_ativ == atividadeSelecionada.id && item.id_atividade == checklistSelecionado.id_atividade)
            .map(item => item.id_checklist);
    
            const todosCheckAtv = checklists.filter(item => item.id_atividade == checklistSelecionado.id_atividade);
        
            const naoCadastrados = todosCheckAtv.filter(item2 =>
                !cadastrados.includes(item2.id) && item2.id !== checklistSelecionado.id
            );
        
            const novoItem = {
                id: checklistOP.length + 1,
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: checklistSelecionado.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: observacao,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 0
            };
        
            const novosItens = naoCadastrados.map((item, i) => ({
                id: checklistOP.length + 2 + i, // evita conflito de ID
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: item.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: 'Falha no checklist: ' + checklistSelecionado.title,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 0
            }));
        
            setChecklistOP(prev => [...prev, novoItem, ...novosItens]);
        
            setChecklistOP(prev =>
                prev.map(item =>
                    item.id_ativ === atividadeSelecionada.id ? { ...item, status: 0 } : item
                )
            );

            setVolumesOP(prev => prev.filter(item => item.id_ativ != atividadeSelecionada.id));
            atualizarStatusAtividade(atividadeSelecionada, -1);
        } else {
            setChecklistOP([...checklistOP, {
                id: checklistOP.length + 1,
                id_ordem: atividadeSelecionada.id_ordem,
                id_ativ: atividadeSelecionada.id,
                id_checklist: checklistSelecionado.id,
                id_atividade: checklistSelecionado.id_atividade,
                id_etapa: checklistSelecionado.id_etapa,
                id_equipe: atividadeSelecionada.id_equipe,
                observacao: observacao,
                data: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                status: 1
            }])
        }
    }

    return (
        <Box className="checklist">
            {etapasOP.map((item, index) => (
                <ChecklistEtapa 
                    key={index}
                    atividadesOP={atividadesOP.filter((a) => a.id_etapa == item && a.ativo == 1)} 
                    checklists={checklists} 
                    etapa={etapas.find((e) => e.id == item)} 
                    equipes={equipes}
                    openModal={abrirModalVistoria}/> 
            ))}
            <Modal open={openModal} setOpen={setOpenModal} title="Fazer vistoria" confirm={fazerVistoria}>
                <VistoriaChecklist setObservacao={setObservacao} setFalha={setFalha} title={checklistSelecionado?.title} />
            </Modal>
        </Box>
    )
}
function ChecklistEtapa({ etapa, atividadesOP, checklists, equipes, openModal }) {
    const { atividades } = useUser();

    return (
        <>
            {atividadesOP.length > 0 && 
                <Box className="checklist_etapa">
                    <h3>{etapa.title}</h3>
                    <div className="checklist_itens">
                        {atividadesOP.map((atividade, index) => {
                            const equipe = equipes.find(e => e.id == atividade.id_equipe);

                            const atividadeData = atividades.find(item => item.id == atividade.id_atividade);

                            return (
                                <>
                                <h4><span>{equipe.title}</span> {atividadeData.title}</h4>
                                <ChecklistAtividade 
                                    key={index} 
                                    checklists={checklists.filter((c) => c.id_atividade == atividade.id_atividade)} 
                                    atividade={atividade} 
                                    openModal={openModal}/>
                                </>
                            )
                        })}
                    </div>
                </Box>
            }
        </>
    )
}
function ChecklistAtividade({ checklists, atividade, openModal }) {
    const { checklistOP } = useUser();
    
    return (
        <>
        {checklists.map((checklist, index) => {
            const checklistData = checklistOP.find(item => item.id_ativ === atividade.id && item.id_checklist === checklist.id);

            return (
                <Box className={"item "+
                    (checklistData?.status == 1 ? 'success' : '')+
                    (checklistData?.status == 0 ? 'error' : '')
                } key={index}>
                    <div className="text">
                        <h5>{checklist.title}</h5>
                        {checklistData?.observacao && 
                            <p className="observacoes">Observações: {checklistData?.observacao || 'Nenhuma'}</p>
                        }
                        {(atividade.status < 3 && atividade.status !== -1) &&
                            <p className="observacoes">Aguardando a atividade ser finalizada!</p>
                        }
                    </div>
                    {(atividade.status === 3 && !checklistData) &&
                        <Button variant="outlined" size="small" onClick={() => openModal(checklist, atividade)}>
                            Fazer vistoria
                        </Button>
                    }
                </Box>
            );
        })}
        </>
    );
}
