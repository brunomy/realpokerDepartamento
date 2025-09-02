import '~/assets/scss/Show.scss';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, memo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab, Typography, Switch, Card, CardContent, CardActions } from '@mui/material';

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
import { ordem_api, config_api, atividade_api, checklist_api, volumes_api } from './../api';
import { converterDataParaBanco, formatarData, formatarDataHora } from '../Utils';
import { StatusChecklist } from '../components/layout/Status';

export default function Ordem({resetOrdem = false}) {
    const { id } = useParams();
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
            return;
        }

        if (selectedDepartamento?.id && !ordem) {
            carregar();
        }

        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento, ordem, navigate]);


    const carregar = async () => {
        if (!id) return;
        
        try {
            const res = await ordem_api.getOrdem(id);

            let requisitos = [];
            if (res.data.requisitos) {
                try {
                    requisitos = JSON.parse(res.data.requisitos);
                } catch (error) {
                    console.error('Erro ao fazer parse dos requisitos:', error);
                    requisitos = [];
                }
            }

            setOrdem({
                ...res.data,
                requisitos: requisitos
            });

            console.log('Dados carregados da API:', res.data);
            console.log('Requisitos recebidos:', res.data.requisitos);

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

    const [tab, setTab] = useState(0);

    const [status, setStatus] = useState(calculoStatusPedido());

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

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
                    <Tab label="Atividades" disabled={!ordem?.id_status} />
                    <Tab label="Checklist" disabled={!ordem?.id_status} />
                    <Tab label="Volumes" disabled={!ordem?.id_status} />
                    <Tab label="Histórico" disabled={!ordem?.id_status} />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab === 0 && <Informacoes ordem={ordem}
                    setTab={setTab} 
                    status={status} 
                /> }
                { tab === 1 && <Requisitos atualizarOrdem={carregar} requisitos_ordem={ordem?.requisitos} /> }
                { tab === 2 && <Etapas atualizarOrdem={carregar} ordem={ordem} /> }
                { tab === 3 && <Atividades /> }
                { tab === 4 && <Checklist /> }
                { tab === 5 && <Volumes /> }
                { tab === 6 && <Historico /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ ordem, setTab, status }) {
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
                        <b>CONCLUSÃO: </b>{formatarData(ordem?.maior_data_atividade)}
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>REQUISITOS: </b> {Array.isArray(ordem?.requisitos) ? ordem.requisitos.filter(r => r.status === 1).length : 0}/{Array.isArray(ordem?.requisitos) ? ordem.requisitos.length : 0}
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>ATIVIDADES: </b> {ordem?.atividades_finalizadas}/{ordem?.atividades}
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>CHECKLISTS: </b> {ordem?.checklists_finalizados}/{ordem?.checklists}
                    </p>
                    <p>
                        <span className="icon"><MoveToInboxTwoToneIcon/></span>
                        <b>VOLUMES: </b>{ordem?.volumes_embalados}/{ordem?.volumes || 0}
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

function Requisitos({ atualizarOrdem, requisitos_ordem }) {
    const [requisitos, setRequisitos] = useState([]);
    
    useEffect(() => {
        setRequisitos(requisitos_ordem);
    }, [requisitos_ordem]);

    return (
        <Box className="requisitos">
            { 
                requisitos.map((item, index) => (
                    <RequisitoItem atualizarOrdem={atualizarOrdem} requisito={item} key={index} />
                ))
            }
        </Box>
    )
}
function RequisitoItem({ requisito, atualizarOrdem }) {
    const concluirDependencia = async (dependenciaId) => {
        if (!window.confirm("Tem certeza que deseja concluir esta dependência?")) return;
        
        try {
            const response = await ordem_api.concluirDependencia(dependenciaId);
            atualizarOrdem();
        } catch (error) {
            console.error('Erro ao concluir dependência:', error);
            alert('Erro ao concluir dependência. Verifique sua conexão e tente novamente.');
        }
    };

    const concluirRequisito = async () => {
        if (!window.confirm("Tem certeza que deseja concluir este requisito?")) return;
        
        try {
            const response = await ordem_api.concluirRequisito(requisito.id);
            atualizarOrdem();
        } catch (error) {
            console.error('Erro ao concluir requisito:', error);
            alert('Erro ao concluir requisito. Verifique sua conexão e tente novamente.');
        }
    };

    
    return (
        <div className="requisito_item">
            <h3>
                <span className="icon">
                    <ChecklistIcon />
                </span>
                {requisito.nome}
            </h3>
            <div className="step_content">
                {requisito.dependencias?.map((dependencia) => (
                    <div className={`dependencia ${dependencia.status ? 'concluida' : ''}`}>
                        <h4>
                            {dependencia?.nome}
                        </h4>

                        { dependencia.status ? 
                            <Button variant="contained" color="success" size="small">{ formatarDataHora(dependencia?.updated_at) }</Button> : 
                            <Button variant="contained"size="small" onClick={() => concluirDependencia(dependencia.id)}>Concluir</Button>
                        }
                    </div>
                ))}

                { (requisito.dependencias?.filter(item => item.status == 0).length === 0 &&
                    requisito.status == 0) &&
                    <Button variant="contained" onClick={concluirRequisito}>Concluir Requisito</Button>
                }
                { requisito.status == 1 && <Button variant="contained" color="success">{formatarDataHora(requisito.updated_at)}</Button> }
            </div>
        </div>
    )
}

function Etapas({ ordem, atualizarOrdem }) {
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

    const enviarProducao = async () => {
        if (!window.confirm("Tem certeza que deseja enviar esta ordem para produção?")) return;

        try {
            const response = await ordem_api.enviarProducao(ordem.id);
            atualizarOrdem();
        } catch (error) {
            console.error('Erro ao concluir dependência:', error);
            alert('Erro ao concluir dependência. Verifique sua conexão e tente novamente.');
        }
    }

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
                <Button disabled={(ordem.id_status != 0 && ordem.id_status != null) || !atividades} variant="contained" onClick={() => enviarProducao()}>Enviar para produção</Button>
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
                    { etapas?.filter(etapa => etapa.atividades.length > 0).map((etapa, index) => {
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
                                            carregar={carregar}
                                            atualizarOrdem={atualizarOrdem}
                                            key={atividade?.id}
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
const AtividadeItem = memo(function AtividadeItem({ ordem, etapa, atividade, equipes, atividade_criada, carregar, atualizarOrdem }) {
    const { id } = useParams();
    const isFirstRun = useRef(true);
    const [idAtividade, setIdAtividade] = useState(atividade_criada ? atividade_criada.id : null);

    const formatarArray = () => {
        return equipes.map((equipe) => ({
            id: equipe.id,
            label: equipe.nome
        }));
    };

    const [checked, setChecked] = useState(atividade_criada ? true : false);
    const [equipeSelecionada, setEquipeSelecionada] = useState(atividade_criada ? {
        id: atividade_criada.id_equipe,
        label: equipes.find(e => e.id === atividade_criada.id_equipe)?.nome
    } : null);
    const [dataSelecionada, setDataSelecionada] = useState(atividade_criada ? formatarData(atividade_criada.data) : dayjs().format('DD/MM/YYYY'));

    const criarAtividade = async () => {
        try {
            const response = await atividade_api.createAtividade({
                id: idAtividade,
                id_ordem: ordem.id,
                id_conf_etapa: atividade.id_conf_etapa,
                etapa: etapa.titulo,
                id_conf_atividade: atividade.id,
                atividade: atividade.titulo,
                id_equipe: equipeSelecionada?.id || equipeSelecionada,
                id_status: (ordem.id_status === 0 || ordem.id_status === null) ? 0 : 1, // Se a ordem estiver em produção, iniciar a atividade como "Em produção"
                data: converterDataParaBanco(dataSelecionada)
            });
            
            setIdAtividade(response.data);
            atualizarOrdem();
        } catch (error) {
            console.error('Erro ao criar atividade:', error);
        }
    };

    const editarAtividade = async () => {
        try {
            const payload = {
                "id_equipe": equipeSelecionada?.id || equipeSelecionada,
                "id_status": ordem.id_status !== 0 || ordem.id_status !== null ? 1 : 0,
                "data": converterDataParaBanco(dataSelecionada)
            };

            const res = await atividade_api.updateAtividade(idAtividade, payload);
        } catch (err) {
            console.error("Erro ao atualizar atividade:", err.message);
        }
    }

    const deletarAtividade = async () => {
        try {
            if(idAtividade){
                const res = await atividade_api.deleteAtividade(idAtividade);
                setIdAtividade(null);
                atualizarOrdem();
            }
        } catch (err) {
            console.error("Erro ao deletar atividade:", err.message);
        }
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if(checked && equipeSelecionada && dataSelecionada && dataSelecionada !== "Invalid Date"){
            if(!idAtividade){
                criarAtividade();
            } else if(atividade_criada.id_status <= 1 && (
                atividade_criada.id_equipe !== equipeSelecionada?.id ||
                atividade_criada.data !== converterDataParaBanco(dataSelecionada)
            )){
                editarAtividade();
            }
        } else if(idAtividade){
            deletarAtividade();
        }
        carregar();
    }, [checked, equipeSelecionada, dataSelecionada]);
    
    return (
        atividade ? 
        <Box className={`atividade_etapa ${checked ? 'checked' : 'disabled'}`}>
            <h2 style={{ color: checked ? '#000' : '#999999', marginBottom: 10 }}>{atividade?.titulo} 
                { atividade_criada && atividade_criada?.id_status > 1 ? 
                    <Status status={atividade_criada ? atividade_criada?.id_status : 0} size='small' />
                    : <Switch checked={checked} onChange={(e) => {setChecked(e.target.checked)}}  />
                }
            </h2>
            <div>
                <div className="item">
                    <InputCalendar
                        label="Data"
                        width={'100%'}
                        value={dataSelecionada}
                        setValue={setDataSelecionada}
                        disabled={!checked || (atividade_criada && atividade_criada?.id_status > 1)}
                    />
                </div>
                <div className="item">
                    <InputAuto 
                        label="Equipe" 
                        list={formatarArray()}
                        value={equipeSelecionada}
                        setValue={setEquipeSelecionada}
                        disabled={!checked || (atividade_criada && atividade_criada?.id_status > 1)}
                    />
                </div>
            </div>
        </Box> : null
    );
});

function Atividades() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [atividades, setAtividades] = useState([]);
    const [rows, setRows] = useState([]);

    const carregar = async () => {
        if (!id) return;
        
        try {
            const res = await atividade_api.getAtividadesOrdem(id);

            setAtividades(res.data);

            setRows(
                res.data.map((item) => createData(item))
            );
            
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        setRows(
            atividades.map((item) => createData(item))
        );
    }, [atividades]);

    useEffect(() => {
        carregar();
    }, [id]);

    const createData = (item) => {
        const equipe = item?.nome_equipe;
        const etapa = item?.etapa;
        const atividade_name = item?.atividade;
        const producao = formatarData(item?.data);
        const tempo = item?.tempo ? item.tempo : '00:00';
        const fim = item?.fim ? item.fim : '-';

        const status = <>
            <Status status={item.id_status} size='small' />
            <Button className="link" variant="outlined" size="small">Detalhes</Button>
        </>;
        
        return { equipe, etapa, atividade_name, producao, tempo, fim, status };
    }

    const headCells = [
        {id: 'equipe', label: 'Equipe'},
        {id: 'etapa', label: 'Etapa'},
        {id: 'atividade', label: 'Atividade'},
        {id: 'producao', label: 'Produção'},
        {id: 'tempo', label: 'Tempo'},
        {id: 'fim', label: 'Fim'},
        {id: 'status', label: 'Status'},
    ];

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
        </Box>
    );
}

function Checklist() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [checklists, setChecklists] = useState([]);
    const [rows, setRows] = useState([]);
    const [openObservacaoModal, setOpenObservacaoModal] = useState(false);
    const [observacaoSelecionada, setObservacaoSelecionada] = useState('');

    const abrirModalObservacao = (observacao) => {
        setObservacaoSelecionada(observacao);
        setOpenObservacaoModal(true);
    };

    const carregar = async () => {
        if (!id) return;
        
        try {
            const res = await checklist_api.getChecklistOrdem(id);

            setChecklists(res.data);

            setRows(
                res.data.map((item) => createData(item))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        setRows(
            checklists.map((item) => createData(item))
        );
    }, [checklists]);

    useEffect(() => {
        carregar();
    }, [id]);

    const createData = (item) => {
        const equipe = item?.nome_equipe;
        const etapa = item?.etapa;
        const checagem = item?.checklist;

        const status_atividade = <>
            <Status status={item.status_atividade} size='small' />
        </>;

        const observacao = item?.observacao ? 
            <Button 
                variant="outlined" 
                size="small" 
                onClick={() => abrirModalObservacao(item.observacao)}
            >
                Observação
            </Button> : null;

        const status = <>
            <StatusChecklist status={item.status} size='small' />
            <Button className="link" variant="outlined" size="small">Detalhes</Button>
        </>;
        
        return { equipe, etapa, checagem, observacao, status_atividade, status };
    }

    const headCells = [
        {id: 'equipe', label: 'Equipe'},
        {id: 'etapa', label: 'Etapa'},
        {id: 'checagem', label: 'Checagem'},
        {id: 'observacao', label: 'Observação'},
        {id: 'status_atividade', label: 'Atividade'},
        {id: 'status', label: 'Status'},
    ];

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
            
            <Modal 
                open={openObservacaoModal} setOpen={setOpenObservacaoModal} 
                title={`Observação`} 
                confirmText='Fechar'
                sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}>

                <Box sx={{
                    minWidth: 500,
                    p: '10px 0 0',
                }}>
                    <Typography variant="body1" sx={{
                        fontSize: '18px',
                        color: '#373737',
                    }}>
                        {observacaoSelecionada}
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}

function Volumes() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [volumes, setVolumes] = useState([]);
    const [rows, setRows] = useState([]);

    const carregar = async () => {
        if (!id) return;
        
        try {
            const res = await volumes_api.getVolumesOrdem(id);

            setVolumes(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        setRows(
            volumes.map((item) => createData(item))
        );
    }, [volumes]);

    useEffect(() => {
        carregar();
    }, [id]);

    const createData = (item) => {
        const volume = item?.volume;
        const comprimento = item?.comprimento;
        const largura = item?.largura;
        const altura = item?.altura;
        const peso = item?.peso;

        const atividade = <Status status={item?.atividade_status} size='small' />;
        
        const checklist = <Chip size="small" color={item?.checklist_finalizado === item?.checklist ? "success" : ""} label={ 
            item?.checklist_finalizado === item?.checklist ? "Finalizado" : `${item?.checklist_finalizado}/${item?.checklist}` } 
            sx={{width: '100%'}}
        />;

        const embalagem = <Chip size="small" color={item?.id_embalagem ? "success" : ""} label={item?.id_embalagem ? id_embalagem : "Não embalado"} sx={{width: '100%'}}/>;

        return { volume, comprimento, largura, altura, peso, atividade, checklist, embalagem };
    }

    const headCells = [
        {id: 'volume', label: 'Volume'},
        {id: 'comprimento', label: 'Comprimento'},
        {id: 'largura', label: 'Largura'},
        {id: 'altura', label: 'Altura'},
        {id: 'peso', label: 'Peso'},
        {id: 'atividade', label: 'Atividade'},
        {id: 'checklist', label: 'Checklist'},
        {id: 'embalagem', label: 'Embalagem'},
    ];

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
        </Box>
    );
}
