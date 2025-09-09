import '~/assets/scss/Show.scss';

import { useUser } from '~/context/UserContext';

import { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate, useNavigate  } from 'react-router-dom';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';

//LAYOUT
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Status from '~/components/layout/Status';
import Modal from '~/components/layout/Modal';

//COMPONENTS
import DataTable from '~/components/DataTable';
import TransferList from '~/components/TransferList';

//MODAIS

//ICONS
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import MarkunreadMailboxTwoToneIcon from '@mui/icons-material/MarkunreadMailboxTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import AdicionarEmbalagem from '../components/modal/AdicionarEmbalagem';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MudarRemessaModal from '../components/modal/MudarRemessaModal';

import { remessa_api } from './../api';
import RemessaEditModal, { validateRemessa } from '../components/modal/RemessaEditModal';
import { formatarData } from '../Utils';

export default function Remessa() {
    const { id } = useParams();
    const [idRemessa, setIdRemessa] = useState(id);
    const { usuarioLogado } = useUser();
    const [remessa, setRemessa] = useState(null);
    const [volumes, setVolumes] = useState([]);
    const [embalagens, setEmbalagens] = useState([]);
    const [ordens, setOrdens] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [tab, setTab] = useState(0);
    const [remessaDeletada, setRemessaDeletada] = useState(false);

    if (usuarioLogado && usuarioLogado.permissao !== 'remessas') {
        return <Navigate to="/" replace />;
    }

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Não executa na primeira renderização
        }
        
        carregar();
    }, [idRemessa]);

    const carregar = async () => {
        try {
            const res = await remessa_api.getRemessa(idRemessa);
            setRemessa(res.data || null);
            
            // Verifica se a remessa foi deletada
            if (res.data && res.data.deleted_at !== null) {
                setRemessaDeletada(true);
                return; // Para a execução aqui
            }

            const res2 = await remessa_api.getVolumes(idRemessa);
            setVolumes(res2.data || []);
            
            const res3 = await remessa_api.getEmbalagens(idRemessa);
            setEmbalagens(res3.data || []);
            
            const res4 = await remessa_api.getOrdensRemessa(idRemessa);
            setOrdens(res4.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    if (remessaDeletada) {
        return <Navigate to="/remessas" replace />;
    }

    // console.log(volumes.filter(item => item.id_embalagem == null));
    // console.log(ordens);
    

    return (
        <Layout>
            <Title title={"Remessa "+remessa?.titulo} icon={<LocalShippingIcon/>} />
            <Box className="show_content">
                <Box sx={{padding: '20px 20px 20px'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="contained" size="small" color="warning" onClick={() => setOpenEdit(true)}>Editar remessa</Button>
                        <Button variant="contained" size="small" color="success" onClick={() => alert('finalizar')}>Finalizar Remessa</Button>
                    </Box>
                    <RemessaEditModal selectedRemessa={remessa} open={openEdit} setOpen={setOpenEdit} tab={tab} setTab={setTab} />
                </Box>

                <ProdutosRemessa ordens={ordens} atualizar={carregar} _remessa={remessa} setIdRemessa={setIdRemessa} />
               <Volumes volumes={volumes} remessa={remessa} embalagens={embalagens} atualizar={carregar} setEmbalagens={setEmbalagens} />
            </Box>
        </Layout>
    )
}

function ProdutosRemessa({ ordens, atualizar, _remessa, setIdRemessa }) {
    const navigate = useNavigate(); 
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrdem, setSelectedOrdem] = useState(null);
    const [selectedRemessa, setSelectedRemessa] = useState(null);
    const [tab, setTab] = useState(0);
    const [newRemessa, setNewRemessa] = useState(_remessa);

    useEffect(() => {
        setNewRemessa(_remessa);
    }, [_remessa]);

    const mudarRemessa = async () => {
        try {
            const payload = {
                old_remessa: selectedOrdem.id_remessa,
                new_remessa: selectedRemessa.value
            };

            const res = await remessa_api.mudarRemessaOrdem(selectedOrdem.id, payload);

            atualizar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar etapa:", err.message);
        }
    }
    const criarRemessa = async () => {
        try {
            const res = await remessa_api.criarRemessa({ 
                ...newRemessa, 
                id_ordem: selectedOrdem.id, 
                id_pedido_ordem: selectedOrdem.id_pedido 
            });
            
            const novaRemessaId = res.id;
            setOpenModal(false);
            navigate(`/remessa/${novaRemessaId}`);
            setIdRemessa(novaRemessaId);
        } catch (err) {
            console.log('Erro ao criar remessa:', err);
        }
    }


    return (
        <Box className="produtos_remessa">
            { ordens.map((item) => {
                if(item.departamentos){
                    item.departamentos = typeof item.departamentos === 'string' ? JSON.parse(item.departamentos) : item.departamentos;
                }

                return (
                    <div className={"item " + (item.departamentos.length > 0 ? (item.departamentos.find(dep => dep.id_status !== 4) ? "" : "finalizado") : "error")} key={item.id}>
                        <h2>{item.nome_produto}</h2>
                        <div className="info">
                            <div>
                                <p>Pedido: {item.id_pedido}</p>
                                { item.agrupavel == 1 && <p>Quantidade: {item.quantidade}</p> }
                                
                            </div>
                            {item.departamentos.length == 0 && <div className="status_content error">Produto sem departamento</div>}
                            <div className="status_content">
                                { item.departamentos && item.departamentos.map((item, index) => (
                                    <Box key={index}>
                                        <h3>{item.nome_departamento}</h3>
                                        <Status size="small" status={item.id_status} />
                                    </Box>
                                ))

                                }
                            </div>
                        </div>
                        <Button variant="outlined" size="small" onClick={() => {setOpenModal(true); setSelectedOrdem(item);}}>Mudar remessa</Button>
                    </div>
                )
            })}

            <Modal 
                open={openModal} 
                setOpen={setOpenModal} 
                title="Mudar remessa" 
                sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}
                confirm={ tab == 0 ? mudarRemessa : criarRemessa }
                disabled={ tab == 0 ? selectedRemessa == null : !validateRemessa(newRemessa) }

            >
                <MudarRemessaModal newRemessa={newRemessa} setNewRemessa={setNewRemessa} selectedOrdem={selectedOrdem} selectedRemessa={selectedRemessa} setSelectedRemessa={setSelectedRemessa} tab={tab} setTab={setTab} />
            </Modal>
        </Box>
    )
}

export function Volumes({ volumes, remessa, embalagens, setEmbalagens, atualizar }) {
    const { id } = useParams();
    const [rows, setRows] = useState([]);
    const [rowEmbalagens, setRowEmbalagens] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setRows(
            volumes.filter(item => item.id_embalagem == null).map(item => {
                return createData(item);
            })
        );
        setRowEmbalagens(
            embalagens.map(item => {
                return createDataEmbalagem(item);
            })
        );
    }, [volumes, embalagens]);

    

    //TABELA NAO EMBALADOS
    const createData = (volume) => {
        const pedido = volume.id_pedido;
        const title = volume.volume;
        const dimensoes = `${volume.comprimento} x ${volume.largura} x ${volume.altura}`;
        const peso = volume.peso;
        const atividadeStatus = <Status size="small" status={volume.atividade_status} />;

        const checklist = <Chip className="stats" size="small" label={`${volume.checklists_concluidos}/${volume.total_checklists}`} color={volume.checklists_concluidos == volume.total_checklists ? "success" : "default"} />;

        return { pedido, title, dimensoes, peso, atividadeStatus, checklist };
    }

    const headCells = [
        {
            id: 'pedido',
            label: 'Pedido',
        },
        {
            id: 'volume',
            label: 'Volume',
        },
        {
            id: 'dimensoes',
            label: 'Dimensões (cm)',
        },
        {
            id: 'peso',
            label: 'Peso (g)',
        },
        {
            id: 'atividade',
            label: 'Atividade',
        },
        {
            id: 'statusCheck',
            label: 'Checklist',
        }
    ];

    //TABELA EMBALAGEM
    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta Embalagem?")) return;

        try {
            const res = await remessa_api.deleteEmbalagem(id);
            setEmbalagens(res.data || []);
            
            await atualizar();
        } catch (err) {
            console.log(err);
        }
    };

    const createDataEmbalagem = (embalagem) => {
        const descricao = embalagem.descricao
        const dimensoes = `${embalagem.comprimento} x ${embalagem.largura} x ${embalagem.altura}`
        const peso = embalagem.peso

        const volumes = (() => {
            if (!embalagem.volumes) return [];
            if (Array.isArray(embalagem.volumes)) return embalagem.volumes;
            
            try {
                return JSON.parse(embalagem.volumes);
            } catch {
                return [embalagem.volumes];
            }
        })();

        const volumesResult = volumes.map((item, index) => {
            return <Chip key={index} size="small" label={item} sx={{margin: '3px 3px'}}/>;
        });
        
        const acoes = <Button onClick={() => deletar(embalagem.id)} color="error" sx={
                {float: 'right', minWidth: 0, zIndex: 1, width: '50px !important'}
            }><DeleteTwoToneIcon /></Button>

        return { descricao, dimensoes, peso, volumesResult, acoes };
    }
    const headCellsEmbalagens = [
        {
            id: 'descricao',
            label: 'Descrição',
        },
        {
            id: 'dimensoes',
            label: 'Dimensões (cm)',
        },
        {
            id: 'peso',
            label: 'Peso (g)',
        },
        {
            id: 'volumes',
            label: 'Volumes',
        },
        {
            id: 'acoes',
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <Box className="volumes">
            { remessa && rows.length != 0 &&
            <div className="volume_content">
                <h3>
                    Não embalados

                    { (remessa && volumes.filter(vol => (vol.status == 1 && !vol.id_embalagem && vol.total_checklists == vol.checklists_concluidos)).length != 0) &&
                    <Button size="small" onClick={() => setOpenModal(true)}>Embalar</Button>
                    }
                </h3>
                <DataTable headCells={headCells} rows={rows}/>
            </div>
            }
            { remessa && rowEmbalagens.length != 0 &&
            <div className="volume_content">
                <h3>Embalagens</h3>
                <DataTable headCells={headCellsEmbalagens} rows={rowEmbalagens}/>
            </div>
            }

            <Embalar atualizar={atualizar} volumesProntos={volumes.filter(vol => (vol.status == 1 && !vol.id_embalagem && vol.total_checklists == vol.checklists_concluidos))} openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
    )
}

function Embalar({ openModal, setOpenModal, volumesProntos, atualizar }) {
    const { id } = useParams();
    const [descricao, setDescricao] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [largura, setLargura] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [volumesSelecionados, setVolumesSelecionados] = useState([]);

    const salvar = () => {
        remessa_api.criarEmbalagem({
            id_remessa: id,
            descricao: descricao,
            comprimento: comprimento,
            largura: largura,
            altura: altura,
            peso: peso,
            volumes: volumesSelecionados
        }).then((res) => {
            console.log(res);
            atualizar();
            setOpenModal(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <Modal 
            open={openModal}
            setOpen={setOpenModal}
            title="Embalar volumes prontos"
            confirm={salvar}
            disabled={!descricao || !comprimento || !largura || !altura || !peso || volumesSelecionados.length == 0}>

            <AdicionarEmbalagem 
                descricao={descricao} setDescricao={setDescricao}
                comprimento={comprimento} setComprimento={setComprimento}
                largura={largura} setLargura={setLargura}
                altura={altura} setAltura={setAltura}
                peso={peso} setPeso={setPeso}
                volumesSelecionados={volumesSelecionados} setVolumesSelecionados={setVolumesSelecionados} 
                volumes={volumesProntos} />
        </Modal>
    )
}