import '~/assets/scss/Index.scss';

import { useUser } from '~/context/UserContext';

import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip, Tabs, Tab } from '@mui/material';
import dayjs from 'dayjs';
import { atividade_api } from './../api';
import { formatarData, calcularTempoAtividade, formatarDataHora } from '../Utils';

//LAYOUT
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';

//COMPONENTS
import Status from '../components/layout/Status';
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import DataTable from '~/components/DataTable';

//MODAIS
import InfoProdutoModal from '../components/modal/InfoProdutoModal';
import AdicionarString from '../components/modal/AdicionarString';
import AdicionarVolumeLista from '../components/modal/AdicionarVolumeLista';

//ICONS
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function Atividades() {
    const { selectedDepartamento, selectedEquipe, usuarioLogado } = useUser();

    if (usuarioLogado && usuarioLogado.permissao !== 'atividades') {
        return <Navigate to="/" replace />;
    }

    const [atividades, setAtividades] = useState([]);
    const [atividadesHoje, setAtividadesHoje] = useState([]);
    const [atividadesSemana, setAtividadesSemana] = useState([]);
    const [atividadesAtrasadas, setAtividadesAtrasadas] = useState([]);
    const [rows, setRows] = useState([]);

    const [tab, setTab] = useState(0);
    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    const carregar = async () => {
        try {
            const res = await atividade_api.getAtividadesProducao(selectedDepartamento?.id);
            
            const atividadesFiltradas = {
                atrasadas: selectedEquipe ? 
                    (res.data['atrasadas'] || []).filter(item => item.id_equipe === selectedEquipe.id) : 
                    (res.data['atrasadas'] || []),
                hoje: selectedEquipe ? 
                    (res.data['hoje'] || []).filter(item => item.id_equipe === selectedEquipe.id) : 
                    (res.data['hoje'] || []),
                semana: selectedEquipe ? 
                    (res.data['semana'] || []).filter(item => item.id_equipe === selectedEquipe.id) : 
                    (res.data['semana'] || []),
                futuras: selectedEquipe ? 
                    (res.data['futuras'] || []).filter(item => item.id_equipe === selectedEquipe.id) : 
                    (res.data['futuras'] || [])
            };
        
            setAtividades(atividadesFiltradas);

            const semana = [
                ...(atividades['hoje'] || []),
                ...(atividades['semana'] || [])
            ].sort((a, b) => {
                const dataA = new Date(a.data);
                const dataB = new Date(b.data);
                return dataA - dataB; // ASC (crescente)
            });

            setAtividadesSemana(selectedEquipe ? semana.filter(item => item.id_equipe === selectedEquipe.id) : semana);
            setAtividadesAtrasadas(selectedEquipe ? res.data['atrasadas'].filter(item => item.id_equipe === selectedEquipe.id) : res.data['atrasadas']);
            setAtividadesHoje(selectedEquipe ? res.data['hoje'].filter(item => item.id_equipe === selectedEquipe.id) : res.data['hoje']);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, [selectedDepartamento, tab, selectedEquipe]);


    useEffect(() => {
        setRows([]);
        const newRows = [];

        if(tab == 0){
            atividades['hoje']?.forEach(item => {
                newRows.push(createData(item, 'hoje'));
            });
            setRows(newRows);
        }
        if(tab == 1){
            const semana = [
                ...(atividades['hoje'] || []),
                ...(atividades['semana'] || [])
            ].sort((a, b) => {
                const dataA = new Date(a.data);
                const dataB = new Date(b.data);
                return dataA - dataB; // ASC (crescente)
            });

            setAtividadesSemana(semana);
        }
        if(tab == 2){
            atividadesAtrasadas?.forEach(item => {
                newRows.push(createData(item, 'atrasadas'));
            });

            setRows(newRows);
        }
        if(tab == 3){
            atividades['atrasadas']?.forEach(item => {
                newRows.push(createData(item, 'atrasadas'));
            });
            
            // Junta os arrays 'hoje' e 'semana' e ordena por data ASC
            const semana = [
                ...(atividades['hoje'] || []),
                ...(atividades['semana'] || [])
            ].sort((a, b) => {
                const dataA = new Date(a.data);
                const dataB = new Date(b.data);
                return dataA - dataB; // ASC (crescente)
            });
            
            // Adiciona as atividades ordenadas às rows
            semana.forEach(item => {
                // Determina o tipo baseado na data original
                const tipo = atividades['hoje']?.includes(item) ? 'hoje' : 'semana';
                newRows.push(createData(item, tipo));
            });
            
            atividades['futuras']?.forEach(item => {
                newRows.push(createData(item, 'futuras'));
            });

            setRows(newRows);
        }
    }, [atividades]);

    const createData = (item, tipo) => {
        const remessa = item?.titulo_remessa;
        const equipe = item?.nome_equipe;
        const producao = formatarData(item?.data);
        const atividade = <Box>
            <span style={{"fontSize": "0.7em"}}>{item?.etapa}</span>
            <br />{item?.atividade}
            { item?.fim && <>
            <br /><span style={{"fontSize": "0.7em"}}>Finalizada: {formatarDataHora(item.fim)}</span>
            </>}
        </Box>;
        const status = <Status status={item?.id_status == 1 && item?.fim != null ? -1 : item?.id_status} size={'small'} sx={{ zIndex: 1 }} />;
        const tempo = <TempoAtividade atividade={item} />;
        
        const acoes = <>
            {(tipo === 'atrasadas' && item?.id_status !== 4) && <Box className="atrasada"></Box>}
            {(tipo === 'semana' && item?.id_status !== 4) && <Box className="semana"></Box>}
            {(tipo === 'hoje' && item?.id_status !== 4) && <Box className="hoje"></Box>}
            {(tipo === 'futuras' && item?.id_status !== 4) && <Box className="futuras"></Box>}
            {item?.id_status === 4 && <Box className="finalizada"></Box>}
            <AcoesAtividades atividade={item} atualizar={carregar} />
        </>

        return { remessa, equipe, producao, atividade, status, tempo, acoes };
    }

    const headCells = [
        {id: 'remessa', label: 'Remessa', width: '10px'},
        {id: 'equipe', label: 'Equipe', width: '10px'},
        {id: 'producao', label: 'Produção', width: '10px'},
        {id: 'atividade', label: 'Atividade'},
        {id: 'status', label: 'Status', width: '10px'},
        {id: 'tempo', label: 'Tempo', width: '10px'},
        {id: 'acoes', label: 'Ações', align: 'right', width: '10px'},
    ];

    return (
        <Layout>
            <Title title="Lista de atividades" icon={<AssignmentIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Hoje" />
                    <Tab label="Semana" />
                    <Tab label={<>{atividadesAtrasadas.length > 0 ? atividadesAtrasadas.length+ ' ' : ''}Atrasada{atividadesAtrasadas.length > 1 ? 's' : ''}</>} disabled={atividadesAtrasadas.length === 0} />
                    <Tab label="Lista" />
                </Tabs>
            </Box>
            <Box className="index_content atividades_list">
                { (tab == 0 || tab == 2 || tab == 3) &&
                    <>
                    <Box className="table_content">
                        <DataTable headCells={headCells} rows={rows} buttons={true}/>
                    </Box>
                    </>
                }
                { tab == 1 &&
                    <Semana atividades={atividadesSemana} atualizar={carregar} />
                }
            </Box>
        </Layout>
    )
}

export function AcoesAtividades({ atividade, atualizar }){
    const { selectedDepartamento, usuarioLogado } = useUser();

    const { atividadesOP, setAtividadesOP, volumes, volumesOP } = useUser();
    const volumes_atividade = volumes.filter((volume) => volume.id_atividade == atividade.id_atividade)
    const volumesEnviados = volumesOP.filter((volume) => volume.id_ativ == atividade.id)

    const [codigo, setCodigo] = useState('');
    const [acao, setAcao] = useState('');

    const [open, setOpen] = useState(false);
    const [openVolumes, setOpenVolumes] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const playAtividade = async () => {
        const payload = {
            id_user: usuarioLogado.id,
            id_departamento: selectedDepartamento?.id,
            id_ordem: atividade.id_ordem,
            id_equipe: atividade.id_equipe,
            codigo: codigo,
            titulo: atividade.atividade,
            inicio: atividade.inicio
        }
        
        const res = await atividade_api.iniciarAtividade(atividade.id, payload);
        return res
    }

    const pausar = async () => {
        const payload = {
            id_user: usuarioLogado.id,
            id_departamento: selectedDepartamento?.id,
            id_ordem: atividade.id_ordem,
            id_equipe: atividade.id_equipe,
            codigo: codigo,
            titulo: atividade.atividade,
            tempo: atividade.tempo,
            inicio: atividade.inicio,
            pausa: atividade.pausa,
        }
        
        const res = await atividade_api.pararAtividade(atividade.id, payload);
        return res
    }

    const concluir = async () => {
        const payload = {
            id_user: usuarioLogado.id,
            id_departamento: selectedDepartamento.id,
            id_ordem: atividade.id_ordem,
            id_equipe: atividade.id_equipe,
            codigo: codigo,
            titulo: atividade.atividade,
            tempo: atividade.tempo,
            inicio: atividade.inicio,
            pausa: atividade.pausa,
            id_status: atividade.id_status
        }
        
        const res = await atividade_api.finalizarAtividade(atividade.id, payload);
        if(atividade.volumes > 0){
            setOpenVolumes(true);
        }
        return res
    }

    useEffect(() => {
        setCodigo('')
    }, [open]);

    return (
        <>
        <Box className="acoes_atividade">
            { (atividade.id_status != 4) &&
                <div className="content_1">
                    { atividade.id_status != 2 &&
                    <Button className="play" onClick={() => {setOpen(true); setAcao('play');}}><PlayCircleFilledWhiteTwoToneIcon /></Button>
                    }
                    { (atividade.id_status == 2) &&
                    <Button className="pause" onClick={() => {setOpen(true); setAcao('stop');}}><PauseCircleFilledTwoToneIcon /></Button>
                    }
                    { (atividade.id_status == 2 || atividade.id_status == 3) &&
                    <Button className="concluir" onClick={() => {setOpen(true); setAcao('finalizar');}}><CheckCircleTwoToneIcon /></Button>
                    }
                </div>
            }
                <div className="content_2">
                    { (atividade.id_status == 4 && atividade.volumes != 0) && 
                    <Button className="volumes" onClick={() => setOpenVolumes(true)}>
                        <ArchiveIcon />
                        <span 
                            className={'numero '+
                                (atividade.volumes_pendentes == atividade.volumes ? 'vazio ' : '')+
                                ((atividade.volumes_pendentes < atividade.volumes && atividade.volumes_pendentes != 0) ? 'incompleto ' : '')
                            }
                        >{atividade.volumes - atividade.volumes_pendentes}</span>
                    </Button>
                    }
                    <Button className="info" onClick={() => setOpenInfo(true)}><InfoTwoToneIcon /></Button>
                </div>
        </Box>

        <Modal open={open} setOpen={setOpen} title="Insira o seu código" confirmText="Confirmar" 
            confirmReturn={acao === 'play' ? playAtividade : acao === 'stop' ? pausar : concluir} 
            atualizar={atualizar} clearInputs={() => setCodigo('')}>
            <AdicionarString label='Código' value={codigo} setValue={setCodigo} type='password' />
        </Modal>

        <Modal open={openVolumes} setOpen={setOpenVolumes} title="Adicionar volumes" confirmText=''>
            <AdicionarVolumeLista atividade={atividade} atualizar={atualizar} />
        </Modal>
        <Modal open={openInfo} setOpen={setOpenInfo} title="Mesa de poker profissional" confirmText="Fechar">
            <InfoProdutoModal ordem={{ id: atividade.id_ordem }} />
        </Modal>
        </>
    )
}

function Semana({ atividades, atualizar }) {
    const { selectedDepartamento } = useUser();
    const [atividadesSeparadas, setAtividadesSeparadas] = useState([[], [], [], [], [], []]);

    useEffect(() => {
        if (atividades && atividades.length > 0) {
            const separadas = separarAtividadesPorSemana(atividades);
            setAtividadesSeparadas(separadas);
        } else {
            setAtividadesSeparadas([[], [], [], [], [], []]);
        }
    }, [atividades, selectedDepartamento]);

    return (
        <>
        <Box className="atividades_semana table_content">
            <Box className="semana_calendario">
            {atividadesSeparadas?.map((atividadesDia, index) => {
                const hoje = dayjs();
                const diaAtual = hoje.day();
                
                const diaIndex = index + 1;
                const isHoje = diaAtual === diaIndex;

                return (
                <div className={`dia ${isHoje ? 'hoje_' : ''}`}  key={index}>
                    <h2>
                        {index === 0 && 'Seg'}
                        {index === 1 && 'Ter'}
                        {index === 2 && 'Qua'}
                        {index === 3 && 'Qui'}
                        {index === 4 && 'Sex'}
                        {index === 5 && 'Sáb'}
                    </h2>
                    {atividadesDia?.length === 0 && <div className="sem_atividade">Sem atividades</div>}
                    {atividadesDia?.length > 0 && 
                        atividadesDia?.map((atv, atividadeIndex) => (
                            <div key={atividadeIndex} 
                            className={
                                "atividade " + (
                                atv.id_status === 2 ? 'em andamento' :
                                atv.id_status === 3 ? 'parado' :
                                atv.id_status === 4 ? 'finalizado' : ''
                            )}>
                                <p className="pedido">{atv.titulo_remessa}</p>
                                <p className="etapa">{atv.etapa}</p>
                                <p className="atv">{atv.atividade}</p>
                                <div className="acoes">
                                    <p className="equipe">{atv.nome_equipe}</p>
                                    <TempoAtividade atividade={atv} />
                                    <AcoesAtividades atividade={atv} atualizar={atualizar} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                )
            })}
            </Box>
        </Box>
        </>
    );
}
  
function separarAtividadesPorSemana(atividades) {
    const diasSemana = [[], [], [], [], [], []];
  
    if(atividades){
        atividades?.forEach((atividade) => {
            const dataAtividade = dayjs(atividade.data);
            
            const diaSemana = dataAtividade.day();
        
            if (diaSemana >= 1 && diaSemana <= 6) {
                diasSemana[diaSemana - 1].push(atividade);
            }
        });
    }

    return diasSemana;
}

export function TempoAtividade({ atividade, size = "small" }) {
    const [tempoAtual, setTempoAtual] = useState(calcularTempoAtividade(atividade));

    useEffect(() => {
        // Só cria intervalo se a atividade estiver em andamento (status 2)
        if (atividade?.id_status === 2) {
            const interval = setInterval(() => {
                setTempoAtual(calcularTempoAtividade(atividade));
            }, 1000);

            return () => clearInterval(interval);
        } else {
            // Se não está em andamento, calcula uma vez
            setTempoAtual(calcularTempoAtividade(atividade));
        }
    }, [atividade?.id_status, atividade?.inicio, atividade?.pausa, atividade?.fim]);

    return <Chip color={atividade?.id_status === 2 ? "primary" : atividade?.id_status === 3 ? "warning" : atividade?.id_status === 4 ? "success" : "default"} size={size} label={tempoAtual} />;
}