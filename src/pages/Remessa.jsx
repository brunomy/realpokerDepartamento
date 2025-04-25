import '~/assets/scss/Show.scss';

import { useUser } from '~/context/UserContext';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && 
                    <>
                        <Informacoes 
                            status={status} 
                            setTab={setTab} />
                        <MudarRemessa left={left} setLeft={setLeft} right={right} setRight={setRight}/>
                    </>
                }
                { tab == 1 && <Volumes remessa={true} /> }
            </Box>
        </Layout>
    )
}

function Informacoes({ status, setTab }) {
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

export function Volumes({ remessa = false }) {
    const { atividadesOP, volumes, volumesOP, setVolumesOP, checklists, checklistOP, embalagensOP, setEmbalagensOP } = useUser();
    
    const [openModal, setOpenModal] = useState(false);

    const naoEmbalados = volumesOP.filter(item => item.id_embalagem == null);
    const embalados = volumesOP.filter(item => item.id_embalagem != null);

    //TABELA NAO EMBALADOS
    const createData = (volume) => {
        const volumeConf = volumes.find(item => item.id == volume.id_volume);
        const title = volumeConf.title;
        const dimensoes = `${volume.comprimento} x ${volume.largura} x ${volume.altura}`
        const peso = volume.peso;

        const checklistAtv = checklists?.filter(item => item.id_atividade == volumeConf.id_atividade);
        const checklistFinalizado = checklistOP.filter(item => item.id_ativ == volume.id_ativ && item.status == 1);

        const statusCheck = `${checklistFinalizado.length}/${checklistAtv.length}`;
        var chipStatus = null;
        if(checklistFinalizado.length == checklistAtv.length){
            chipStatus = <Chip className="stats" size='small' color="success" label={statusCheck} />
        } else {
            chipStatus = <Chip className="stats" size='small' label={statusCheck} />
        }
        
        const atividadeConf = atividadesOP.find(item => (item.id == volume.id_ativ && item.status != -1));
        const atividadeLink = <Button variant="outlined" size="small" component={Link} to={`/atividades/${atividadeConf.id}`}>#{atividadeConf.id}</Button>;
        
        const remessaLink = <Button variant="contained" size="small" component={Link} to={`/remessas/${volume.id_remessa}`} sx={{ boxShadow: 'none' }}>#{volume.id_remessa}</Button>;
        
        return { title, dimensoes, peso, chipStatus, atividadeLink, remessaLink };
    }
 
    const rowsNaoEmbalados = [];
    naoEmbalados.map((item) => {
        rowsNaoEmbalados.push(
            createData(item)
        )
    })

    // TABELA EMBALADOS
    const rowEmbalados = [];
    embalados.map((item) => {
        rowEmbalados.push(
            createData(item)
        )
    })
    const headCells = [
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
            label: 'Peso (kg)',
        },
        {
            id: 'statusCheck',
            label: 'Checklist',
        },
        {
            id: 'atividade',
            label: 'Atividade',
        },
        {
            id: 'remessa',
            label: 'Remessa',
        },
    ];

    //TABELA EMBALAGEM
    const deletarEmbalagem = (embalagem) => {
        setEmbalagensOP(prev => prev.filter(emb => emb.id !== embalagem.id));

        setVolumesOP(prev =>
            prev.map(vol =>
            vol.id_embalagem === embalagem.id
                ? { ...vol, id_embalagem: null }
                : vol
            )
        );
    }
    const createDataEmbalagem = (embalagem) => {
        const descricao = embalagem.descricao
        const dimensoes = `${embalagem.comprimento} x ${embalagem.largura} x ${embalagem.altura}`
        const peso = embalagem.peso

        const volumesEmbalagem = embalados.filter(volume => volume.id_embalagem === embalagem.id)

        const volumesResult = volumesEmbalagem.map((item, index) => {
            const volumeConf = volumes.find(vol => vol.id == item.id_volume);
            const title = volumeConf?.title || 'Volume'; // fallback de segurança
            return <Chip key={index} size="small" label={title} sx={{margin: '3px 3px'}}/>;
        });
        
        // const volumes = ''
        const acoes = <Button onClick={() => deletarEmbalagem(embalagem)}
        color="error" sx={{
            margin: '0 0 0 auto',
            display: 'flex',
            padding: '10px',
            minWidth: '0'
        }}
        ><DeleteTwoToneIcon /></Button>

        return { descricao, dimensoes, peso, volumesResult, acoes };
    }
    const rowEmbalagens = [];
    embalagensOP.map((item) => {
        rowEmbalagens.push(
            createDataEmbalagem(item)
        )
    })
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
            label: 'Peso (kg)',
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
            <div className="volume_content">
                <h3>
                    Não embalados

                    { (remessa && naoEmbalados.length != 0) &&
                    <Button size="small" onClick={() => setOpenModal(true)}>Embalar</Button>
                    }
                </h3>
                <DataTable headCells={headCells} rows={rowsNaoEmbalados}/>
            </div>
            { !remessa &&
            <div className="volume_content">
                <h3>Embalados</h3>
                <DataTable headCells={headCells} rows={rowEmbalados}/>
            </div>
            }
            { remessa && 
            <div className="volume_content">
                <h3>Embalagens</h3>
                <DataTable headCells={headCellsEmbalagens} rows={rowEmbalagens}/>
            </div>
            }

            <Embalar openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
    )
}

function Embalar({ openModal, setOpenModal }) {
    const { volumesOP, setVolumesOP, embalagensOP, setEmbalagensOP } = useUser();

    const [descricao, setDescricao] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [largura, setLargura] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [volumesSelecionados, setVolumesSelecionados] = useState([]);

    const adicionarVolumeNaEmbalagem = (id, idEmbalagem) => {
        setVolumesOP(prev =>
          prev.map(item =>
            item.id === id ? { ...item, id_embalagem: idEmbalagem } : item
          )
        );
      };
    
    const salvar = () => {
        const novaEmbalagem = {
            id: embalagensOP.length,
            id_remessa: '5951',
            descricao: descricao,
            comprimento: comprimento,
            largura: largura,
            altura: altura,
            peso: peso,
        }
        setEmbalagensOP([...embalagensOP, novaEmbalagem])

        volumesSelecionados.map((id) => { adicionarVolumeNaEmbalagem(id, novaEmbalagem.id) })

        setVolumesSelecionados([])
    }
    
    return (
        <Modal 
            open={openModal}
            setOpen={setOpenModal}
            title="Embalar volumes prontos"
            confirm={salvar}>

            <AdicionarEmbalagem 
                descricao={descricao} setDescricao={setDescricao}
                comprimento={comprimento} setComprimento={setComprimento}
                largura={largura} setLargura={setLargura}
                altura={altura} setAltura={setAltura}
                peso={peso} setPeso={setPeso}
                volumesSelecionados={volumesSelecionados} setVolumesSelecionados={setVolumesSelecionados} />
        </Modal>
    )
}