import '~/assets/scss/Show.scss';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, memo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography, Switch } from '@mui/material';

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
import { Volumes } from './Remessa';
import { calculoStatusPedido } from './Pedidos';

//icons
import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FactoryIcon from '@mui/icons-material/Factory';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import TurnedInTwoToneIcon from '@mui/icons-material/TurnedInTwoTone';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import InfoProdutoModal from '../components/modal/InfoProdutoModal';
import { Historico } from './Atividade';
import { ordem_api, config_api, atividade_api } from './../api';
import { converterDataParaBanco, formatarData } from '../Utils';

export default function Ordem() {
    const { selectedDepartamento } = useUser();
    const navigate = useNavigate();
    const prevDepartamento = useRef(null);

    const [ordem, setOrdem] = useState(null);

    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            label: 'Ordens',
            url: '/ordens'
        },
    ]);

    const [error, setError] = useState(null);


    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/ordens");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);

    const carregar = async () => {
        try {
            const res = await ordem_api.getOrdem(id);

            setOrdem({
                ...res.data,
                requisitos: res.data.requisitos ? JSON.parse(res.data.requisitos) : []
            });
            
            setBreadcrumbs([
                {
                    label: 'Ordens',
                    url: '/ordens'
                },
                {
                    label: res.data?.nome_produto,
                    url: `/ordem/${res.data?.id}`
                },
            ]);
        } catch (err) {
            setError(err.message);
        }
    };

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
                    <Tab label="Histórico"  />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab === 0 && <Informacoes ordem={ordem}
                    setTab={setTab} 
                    status={status} 
                /> }
                { tab === 1 && <Requisitos step_list={step_list} /> }
                { tab === 2 && <Etapas ordem={ordem} etapasOld={etapas.filter(e => e.id_categoria === 1)} atividades={atividades} equipes={equipes} /> }
                { tab === 3 && <Atividades ordem={ordem} atividadesOP={atividadesOP.filter((a) => a.ativo === 1)} atividades={atividades} etapas={etapas} equipes={equipes} /> }
                { tab === 4 && <Checklist /> }
                { tab === 5 && <Historico /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ ordem, setTab, status }) {
    const { volumesOP } = useUser();

    return (
        <>
        <Box className="informacoes">
            <Box className="info_pedido">

                <Box className="info">
                    <p>
                        <span className="icon"><CalendarMonthTwoToneIcon/></span>
                        <b>PRODUÇÃO: </b>{formatarData(ordem?.data_producao)}
                    </p>
                    <p>
                        <span className="icon"><EventAvailableTwoToneIcon/></span>
                        <b>CONCLUSÃO: </b>{formatarData(ordem?.data_conclusao)}
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>REQUISITOS: </b> {ordem?.requisitos?.filter(r => r.status === 1).length}/{ordem?.requisitos?.length}
                    </p>
                    <p>
                        <span className="icon"><MoveToInboxTwoToneIcon/></span>
                        <b>VOLUMES: </b> 
                    </p>
                    <p>
                        <span className="icon"><TurnedInTwoToneIcon/></span>
                        <b>CATEGORIA: </b>{ordem?.nome_categoria || ''}
                    </p>
                
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>PRODUTO: </b>{ordem?.nome_produto}
                    </p>
                    <p className="full">
                        <span className="icon"><HandymanTwoToneIcon/></span>
                        <b>STATUS: </b><Status status={ordem?.id_status} />
                    </p>
                    
                </Box>
            </Box>
            { ordem && <InfoProduto ordem_id={ordem.id} /> }
        </Box>
        </>
    )
}
export function InfoProduto({ ordem_id }) {
    const [error, setError] = useState(null);
    const [produto, setProduto] = useState(null);
    const [id, setId] = useState(ordem_id);
    const [zoomImage, setZoomImage] = useState(null);
    const [openZoom, setOpenZoom] = useState(false);

    const handleImageClick = (imageSrc, title) => {
        setZoomImage({ src: imageSrc, title });
        setOpenZoom(true);
    };

    const carregar = async () => {
        try {
            const res = await ordem_api.getProduto(id);

            setProduto({
                ...res.data,
                atributos: res.data.atributos ? JSON.parse(res.data.atributos) : []
            });

        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        carregar();
    }, [id]);

    return (
        <Box className="info_produto">
            <h3>
                <b>{produto?.nome_produto}</b><br/>
                <Box sx={{ mt: .5 }}>{produto?.nome_categoria}</Box>
                { produto?.agrupavel == 1 && 
                    <Box sx={{ mt: 1 }}>Qtd: {produto?.quantidade}</Box>
                }
            </h3>
            <div className={"obs_anexo "+(produto?.anexo || produto?.foto_final ? 'hasPhoto' : '')}>
                <div className="obs">
                    <h4>OBSERVAÇÕES:</h4>
                    <p>{produto?.observacao}</p>
                </div>

                { (produto?.anexo || produto?.foto_final) &&
                    <div className="anexo">
                        { produto?.anexo && 
                        <div>
                            <h4>ANEXO:</h4>
                            <div className="image">
                                <img 
                                    src={'https://realpoker.com.br/uploads/'+produto?.anexo} 
                                    alt="Anexo" 
                                    onClick={() => handleImageClick('https://realpoker.com.br/uploads/'+produto?.anexo, 'Anexo')}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                        }

                        { produto?.foto_final &&
                        <div>
                            <h4>FINAL:</h4>
                            <div className="image">
                                <img 
                                    src={'https://realpoker.com.br/uploads/'+produto?.foto_final} 
                                    alt="Foto Final" 
                                    onClick={() => handleImageClick('https://realpoker.com.br/uploads/'+produto?.foto_final, 'Foto Final')}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>
            
        
            <Box className="info_table">
                { produto?.atributos?.map((attr, index) => (
                    <div key={index}>
                        <h4>{attr?.nome_conjunto}:</h4>
                        <p>
                            <span className="nome">{attr?.nome_atributo}</span>
                            { attr?.cor ? <span className="color" style={{ background: attr.cor }}></span> : null }
                            { attr?.texto ? <span className="texto">{attr.texto}</span> : null }
                        </p>
                    </div>
                ))}
            </Box>

            {/* Modal de Zoom */}
            <Modal 
                open={openZoom} 
                setOpen={setOpenZoom} 
                title={zoomImage?.title || 'Imagem'} 
                confirmText="Fechar"
                confirm={() => {}}
                sx={{
                    '& .MuiDialogContent-root': { 
                        textAlign: 'center',
                        padding: '20px'
                    }
                }}
            >
                {zoomImage && (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        maxHeight: '70vh',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src={zoomImage.src} 
                            alt={zoomImage.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}
                        />
                    </Box>
                )}
            </Modal>
        </Box>
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

function Etapas({ ordem }) {
    const { selectedDepartamento } = useUser();
    const [etapas, setEtapas] = useState([]);
    const [atividades, setAtividades] = useState([]);

    const [equipes, setEquipes] = useState([]);

    const carregar = async () => {
        try {
            const res = await config_api.getEtapasAtividadesByCategory(ordem?.id_categoria);

            const etapasArray = [];
            
            Object.keys(res.data).forEach(key => {
                if (key !== 'atividades' && !isNaN(key)) {
                    const etapa = res.data[key];
                    etapasArray.push({
                        ...etapa,
                        atividades: etapa.atividades ? JSON.parse(etapa.atividades) : []
                    });
                }
            });

            setEtapas(etapasArray);

            const res2 = await config_api.getEquipesAtividade(selectedDepartamento?.id);
            setEquipes(res2.data);

            const res3 = await atividade_api.getAtividadesOrdem(ordem?.id);
            setAtividades(res3.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (ordem?.id){
            carregar();
        }
    }, [ordem]);

    const [openModalInfo, setOpenModalInfo] = useState(false);

    const [expandedId, setExpandedId] = useState(null);
    const handleExpanded = (id) => (event, isExpanded) => {
        setExpandedId(isExpanded ? id : null);
    };

    return (
        <Box className="ordem_etapas">
            <Box className="selecionar_etapas">
                <Button variant="contained" color="warning" onClick={() => setOpenModalInfo(true)}>Informações do Produto</Button>
                <Button variant="contained" onClick={() => setOpenModalInfo(true)}>Enviar para produção</Button>
                <Modal
                    open={openModalInfo}
                    setOpen={setOpenModalInfo}
                    title={ordem.nome_categoria}
                    confirmText='Fechar'
                >
                    <InfoProdutoModal ordem={ordem} />
                </Modal>
            </Box>
            { etapas.length > 0 &&
                <Box className="etapas">
                    { etapas?.map((etapa, index) => {
                        return (
                            <Accordion 
                                className="accordion_item" 
                                key={etapa.id} 
                                expanded={expandedId === etapa.id}
                                onChange={handleExpanded(etapa.id)}
                                TransitionProps={{ unmountOnExit: true }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                                    <Typography className="titulo" component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <span>{etapa.titulo}</span>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className="accordion_details">
                                    {etapa.atividades?.map((atividade) => (
                                        <AtividadeItem
                                            etapa={etapa}
                                            ordem={ordem}
                                            atividade={atividade}
                                            equipes={equipes}
                                            atividade_criada={atividades?.find(a => a.id_conf_atividade === atividade.id)}
                                            key={atividade.id}
                                        />
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            }
        </Box>
    )
}
const AtividadeItem = memo(function AtividadeItem({ ordem, etapa, atividade, equipes, atividade_criada }) {
    const { id } = useParams();
    const isFirstRun = useRef(true);
    const [idAtividade, setIdAtividade] = useState(atividade_criada ? atividade_criada.id : null);

    const formatarArray = () => {
        return equipes.map((equipe) => ({
            id: equipe.id,
            label: equipe.nome
        }));
    };

    const [checked, setChecked] = useState(false);
    const [equipeSelecionada, setEquipeSelecionada] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState(dayjs().format('DD/MM/YYYY'));

    // Inicializa os valores quando atividade_criada estiver disponível
    useEffect(() => {
        if (atividade_criada) {
            setChecked(true);
            setIdAtividade(atividade_criada.id);
            
            const equipe_cadastrada = equipes.find(e => e.id === atividade_criada.id_equipe);
            if (equipe_cadastrada) {
                setEquipeSelecionada({
                    id: equipe_cadastrada.id,
                    label: equipe_cadastrada.nome
                });
            }
            
            const dataFormatada = formatarData(atividade_criada.data);
            if (dataFormatada && dataFormatada !== "Invalid Date") {
                setDataSelecionada(dataFormatada);
            }
        } else {
            setChecked(false);
            setEquipeSelecionada(null);
            setDataSelecionada(dayjs().format('DD/MM/YYYY'));
        }
    }, [atividade_criada, equipes]);

    useEffect(() => {
        // Pula a primeira execução
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const criarAtividade = async () => {
            if(checked && equipeSelecionada && dataSelecionada && dataSelecionada !== "Invalid Date"){
                try {
                    const response = await atividade_api.createAtividade({
                        id: idAtividade,
                        id_ordem: ordem.id,
                        id_conf_etapa: atividade.id_conf_etapa,
                        etapa: etapa.titulo,
                        id_conf_atividade: atividade.id,
                        atividade: atividade.titulo,
                        id_equipe: equipeSelecionada?.id || equipeSelecionada,
                        id_status: 0,
                        data: converterDataParaBanco(dataSelecionada)
                    });
                    
                    setIdAtividade(response.data);
                } catch (error) {
                    console.error('Erro ao criar atividade:', error);
                }
            }
        };

        criarAtividade();
    }, [checked, equipeSelecionada, dataSelecionada]);

    return (
        <Box className={`atividade_etapa ${checked ? 'checked' : 'disabled'}`}>
            <h2 style={{ color: checked ? '#000' : '#999999', marginBottom: 10 }}>{atividade.titulo} <Switch checked={checked} onChange={(e) => {setChecked(e.target.checked)}}  /></h2>
            <div>
                <div className="item">
                    <InputCalendar
                        label="Data"
                        width={'100%'}
                        value={dataSelecionada}
                        setValue={setDataSelecionada}
                        disabled={!checked}
                    />
                </div>
                <div className="item">
                    <InputAuto 
                        label="Equipe" 
                        list={formatarArray()}
                        value={equipeSelecionada}
                        setValue={setEquipeSelecionada}
                        disabled={!checked}
                    />
                </div>
            </div>
        </Box>
    );
});

function Atividades({ atividadesOP, atividades, etapas, equipes }) {
    const createData = (item) => {
        const id = item.id;
        const equipe = (equipes.find(e => e.id === item.id_equipe) || {}).title || '-';
        const producao = item.data;
        const titulo = (atividades.find(a => a.id === item.id_atividade) || {}).title || '-';
        const etapa = (etapas.find(e => e.id === item.id_etapa) || {}).title || '-';
        
        const status = <>
            <Status status={item.status} size='small' />
            <Button className="link" component={Link} to={`/atividades/${item.id}`} variant="outlined" size="small">Detalhes</Button>
        </>;
        
        return { id, equipe, producao, titulo, etapa, status };
    }

    const headCells = [
        {id: 'id', label: 'Id'},
        {id: 'equipe', label: 'Equipe'},
        {id: 'producao', label: 'Produção'},
        {id: 'titulo', label: 'Título'},
        {id: 'etapa', label: 'Etapa'},
        {id: 'status', label: 'Status'},
    ];

    const rows = atividadesOP.map((item) => createData(item));

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
        </Box>
    );
}

export function Checklist() {
    const { 
        checklists, checklistOP, setChecklistOP, 
        atividadesOP, setAtividadesOP, 
        setVolumesOP, volumesOP, 
        etapas, etapasOP,
        equipes
    } = useUser();
    
    const [openModal, setOpenModal] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
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
            .filter(item => item.id_ativ === atividadeSelecionada.id && item.id_atividade === checklistSelecionado.id_atividade)
            .map(item => item.id_checklist);
    
            const todosCheckAtv = checklists.filter(item => item.id_atividade === checklistSelecionado.id_atividade);
        
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
                id: checklistOP.length + 2 + i, 
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

            setVolumesOP(prev => prev.filter(item => item.id_ativ !== atividadeSelecionada.id));
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
            <Button className="info_produto" variant="contained" size="small" onClick={() => setOpenModalInfo(true)}>
                <InfoTwoToneIcon />
                Informaçoes do produto
            </Button>
            {etapasOP.map((item, index) => (
                <ChecklistEtapa 
                    key={index}
                    atividadesOP={atividadesOP.filter((a) => a.id_etapa === item && a.ativo === 1)} 
                    checklists={checklists} 
                    etapa={etapas.find((e) => e.id === item)} 
                    equipes={equipes}
                    openModal={abrirModalVistoria}/> 
            ))}
            <Modal open={openModal} setOpen={setOpenModal} title="Fazer vistoria" confirm={fazerVistoria}>
                <VistoriaChecklist setObservacao={setObservacao} setFalha={setFalha} title={checklistSelecionado?.title} />
            </Modal>
            <Modal open={openModalInfo} setOpen={setOpenModalInfo} title="Informações do produto" confirmText="Fechar">
                <InfoProdutoModal />
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
                            const equipe = equipes.find(e => e.id === atividade.id_equipe);

                            const atividadeData = atividades.find(item => item.id === atividade.id_atividade);

                            return (
                                <>
                                <h4><span>{equipe.title}</span> {atividadeData.title}</h4>
                                <ChecklistAtividade 
                                    key={index} 
                                    checklists={checklists.filter((c) => c.id_atividade === atividade.id_atividade)} 
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
                    (checklistData?.status === 1 ? 'success' : '')+
                    (checklistData?.status === 0 ? 'error' : '')
                } key={index}>
                    <div className="text">
                        <h5>{checklist.title}</h5>
                        {checklistData?.observacao && 
                            <p className="observacoes">Observações: {checklistData?.observacao || 'Nenhuma'}</p>
                        }
                        {(atividade.status < 4 && atividade.status !== -1) &&
                            <p className="observacoes">Aguardando a atividade ser finalizada!</p>
                        }
                    </div>
                    {(atividade.status === 4 && !checklistData) &&
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
