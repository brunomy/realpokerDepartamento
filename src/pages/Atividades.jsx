import '~/assets/scss/Index.scss';

import { useUser } from '~/context/UserContext';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import InputCalendarWeek from '~/components/InputCalendarWeek'

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
    const { selectedDepartamento } = useUser();

    const [atividades, setAtividades] = useState([]);
    const [rows, setRows] = useState([]);

    const [tab, setTab] = useState(0);
    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    const carregar = async () => {
        try {
            const res = await atividade_api.getAtividadesProducao(selectedDepartamento.id);
            setAtividades(res.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, [selectedDepartamento]);


    useEffect(() => {
        const newRows = [];
        
        atividades['atrasadas']?.forEach(item => {
            newRows.push(createData(item, 'atrasadas'));
        });
        atividades['da_semana']?.forEach(item => {
            newRows.push(createData(item, 'da_semana'));
        });
        atividades['futuras']?.forEach(item => {
            newRows.push(createData(item, 'futuras'));
        });
        
        setRows(newRows);
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
        const status = <Status status={item?.id_status} size={'small'} sx={{ zIndex: 1 }} />;
        const tempo = <TempoAtividade atividade={item} />;
        
        const acoes = <>
            {(tipo === 'atrasadas' && item?.id_status !== 4) && <Box className="atrasada"></Box>}
            {(tipo === 'da_semana' && item?.id_status !== 4) && <Box className="da_semana"></Box>}
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
                    <Tab label="Lista" />
                    <Tab label="Semana" />
                </Tabs>
            </Box>
                <Box className="index_content atividades_list">
                { tab == 0 &&
                    <>
                    {/* <Box className="filtros">
                        <h2>Filtros:</h2>
                        <Box className="filter_list">
                            <Box className="item">
                                <InputAuto label="id" list={idList} setValue={setIdFilter} width={'100%'} />
                            </Box>
                            <Box className="item">
                                <InputAuto label="Equipe" list={teamList} setValue={setTeamFilter} width={'100%'} />
                            </Box>
                            <Box className="item">
                                <InputAuto label="Status" list={statusList} setValue={setStatusFilter} width={'100%'} />
                            </Box>
                            <Box className="item calendario">
                                <InputCalendarRange setFunctionDe={setDateFilterDe} setFunctionAte={setDateFilterAte} />
                            </Box>
                        </Box>
                    </Box> */}
                    <Box className="table_content">
                        <DataTable headCells={headCells} rows={rows} buttons={true}/>
                    </Box>
                    </>
                }
                { tab == 1 &&
                    <Semana />
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
            id_departamento: selectedDepartamento.id,
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
            id_departamento: selectedDepartamento.id,
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
                    { (atividade.id_status == 4 && atividade.volumes_pendentes != 0) && 
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
            atualizar={atualizar} >
            <AdicionarString label='Código' value={codigo} setValue={setCodigo} />
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

function Semana() {
    const { atividadesOP, equipes, etapas, atividades, categorias } = useUser();

    const [primeiroDia, setPrimeiroDia] = useState();
    const [ultimoDia, setUltimoDia] = useState();
    const [atividadesSeparadas, setAtividadesSeparadas] = useState([[], [], [], [], [], []]);
    var separadas;
    const [mudarData, setMudarData] = useState(false)

    useEffect(() => {
        setAtividadesSeparadas([[], [], [], [], [], []])
        setMudarData(false)
        if (primeiroDia) {
            separadas = separarAtividadesPorSemana(primeiroDia, atividadesOP.filter((a) => a.status != -1));
            setAtividadesSeparadas(separadas);
        }
        
    }, [primeiroDia, atividadesOP]);

    return (
        <>
        <div className="calendario_semana">
            { !mudarData && 
                <Button onClick={() => setMudarData(true)} variant="contained" size="small">Alterar semana</Button>
            }
            <Box sx={{display: !mudarData ? 'none' : ''}}>
                <InputCalendarWeek setPrimeiroDia={setPrimeiroDia} setUltimoDia={setUltimoDia} />
            </Box>
        </div>
        <Box className="atividades_semana">

            <div className="dias">
                <span>{primeiroDia}</span> - <span>{ultimoDia}</span>
            </div>

            {/* Aqui você mostra atividades de segunda a sábado */}
            <Box className="semana_calendario">
            {atividadesSeparadas.map((atividadesDia, index) => (
                <div className="dia" key={index} >
                    <h2>
                        { index == 0 && 'Seg'}
                        { index == 1 && 'Ter'}
                        { index == 2 && 'Qua'}
                        { index == 3 && 'Qui'}
                        { index == 4 && 'Sex'}
                        { index == 5 && 'Sab'}

                    </h2>
                    {atividadesDia.length == 0 && <div className="sem_atividade">Sem atividades</div>}
                    {atividadesDia.length != 0 && 
                    <>

                    { atividadesDia?.map((atv, index) => (
                        <div className={"atividade "+(atv.status == 4 ? 'finalizado' : '')}>
                            <p className="pedido">#5952</p>
                            <p className="categoria">{
                                categorias.find(c => c.id == atividades.find(a => a.id == atv.id_atividade).id_categoria).title
                            }</p>
                            <p className="etapa">{etapas.find(e => e.id == atv.id_etapa).title}</p>
                            <p className="atv">{atividades.find(a => a.id == atv.id_atividade).title}</p>
                            <div className="acoes">
                                <p className="equipe">{equipes.find(e => e.id == atv.id_equipe).title}</p>
                                <AcoesAtividades key={index} atividade={atv} />
                            </div>
                        </div>
                    ))}
                    </>
                    }
                </div>
            ))}
            </Box>
        </Box>
        </>
    );
}
  
function separarAtividadesPorSemana(dataSelecionada, atividades) {
    const diasSemana = [[], [], [], [], [], []]; // Segunda (0) até Sábado (5)
  
    const dataBase = dayjs(dataSelecionada, 'DD/MM/YYYY');
    const inicioSemana = dataBase.startOf('week');
    const fimSemana = dataBase.endOf('week');
  
    atividades.forEach((atividade) => {
        const dataAtividade = dayjs(atividade.data, 'DD/MM/YYYY');
    
        // Agora verificamos se a atividade está dentro da semana selecionada
        if (!dataAtividade.isBetween(inicioSemana, fimSemana, 'day', '[]')) {
            return;
        }
    
        const diaSemana = dataAtividade.day(); 
        // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    
        if (diaSemana >= 1 && diaSemana <= 6) {
            diasSemana[diaSemana - 1].push(atividade);
        }
    });
  
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