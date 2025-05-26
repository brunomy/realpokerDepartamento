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
import MudarRemessaModal from '../components/modal/MudarRemessaModal';
import EditarRemessa from '../components/modal/EditarRemessa';

export default function Remessa() {
    const { id } = useParams();

    return (
        <Layout>
            <Title title={"Remessa Nº #"+id} icon={<LocalShippingIcon/>} />
            <Box className="show_content">
                <EditarRemessaAtual />

                <ProdutosRemessa />

               <Volumes remessa={true} />
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

function EditarRemessaAtual() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Box sx={{padding: '20px 20px 0'}}>
            <Button variant="contained" size="small" onClick={() => setOpenModal(true)}>Editar remessa</Button>

            <Modal 
                open={openModal}
                setOpen={setOpenModal}
                title="Editar remessa">

                <EditarRemessa />
            </Modal>
        </Box>
    )
}

function MudarRemessa({ left, setLeft, right, setRight }) {
    return (
        <Box className="mudar_remessa">
            <TransferList className="teste" left={left} setLeft={setLeft} right={right} setRight={setRight} />
        </Box>
    )
}

function ProdutosRemessa() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Box className="produtos_remessa">
            <div className="item finalizado">
                <h2>Mesa de poker profissional personalizada</h2>
                <p>Pedido: 5951</p>
                <p>Porcentagem: 100%</p>
                <p>Conclusão: 22/04/2025</p>
                <p>Volumes embalados: 0/5</p>
                <Button variant="outlined" size="small" onClick={() => setOpenModal(true)}>Mudar remessa</Button>
            </div>

            <div className="item">
                <h2>Mesa de poker profissional</h2>
                <p>Pedido: 5952</p>
                <p>Porcentagem: 10%</p>
                <p>Conclusão: 22/04/2025</p>
                <p>Volumes embalados: 0/6</p>
                <Button variant="outlined" size="small" onClick={() => setOpenModal(true)}>Mudar remessa</Button>
            </div>

            <div className="item">
                <h2>Futmesa</h2>
                <p>Pedido: 5952</p>
                <p>Porcentagem: 10%</p>
                <p>Conclusão: <span className="atrasado">16/04/2025</span></p>
                <p>Volumes embalados: 0/3</p>
                <Button variant="outlined" size="small" onClick={() => setOpenModal(true)}>Mudar remessa</Button>
            </div>
            
            <Modal open={openModal} setOpen={setOpenModal} title="Mudar remessa" sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}>
                <MudarRemessaModal />
            </Modal>
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
        
        const volumeConf = volumesOP.find(item => item.id_volume == volume.id);

        const pedido = "5951";
        const title = volume.title;
        const dimensoes = volumeConf?.comprimento ? `${volumeConf?.comprimento} x ${volumeConf?.largura} x ${volumeConf?.altura}` : ''
        const peso = volumeConf?.peso;

        const checklistAtv = checklists?.filter(item => item.id_atividade == volume.id_atividade);
        const checklistFinalizado = checklistOP.filter(item => item.id_ativ == volumeConf?.id_ativ && item.status == 1);

        const statusCheck = `${checklistFinalizado.length}/${checklistAtv.length}`;
        var chipStatus = null;
        if(checklistFinalizado.length == checklistAtv.length){
            chipStatus = <Chip className="stats" size='small' color="success" label={statusCheck} />
        } else {
            chipStatus = <Chip className="stats" size='small' label={statusCheck} />
        }
        
        const atividadeConf = atividadesOP.find(item => (item.id_atividade == volume?.id_atividade && item.status != -1));
        
        const atividadeStatus = <Status size="small" status={atividadeConf?.status ? atividadeConf?.status : 0} />;

        var embalado = null;
        if(volumeConf?.id_embalagem == null){
            embalado = <Chip className="stats" size='small' label={'Não'} />
        } else {
            embalado = <Chip className="stats" size='small' color="success" label={'Sim'} />
        }
        
        return { pedido, title, dimensoes, peso, atividadeStatus, chipStatus, embalado };
    }

    const volumesPrevistos = volumes.filter(item2 =>
        atividadesOP.some(item1 => item1.id_atividade === item2.id_atividade)
    );

    const rowsNaoEmbalados = [];
    volumesPrevistos.map((item) => {
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
            label: 'Peso (kg)',
        },
        {
            id: 'atividade',
            label: 'Atividade',
        },
        {
            id: 'statusCheck',
            label: 'Checklist',
        },
        {
            id: 'embalado',
            label: 'Embalado',
        }
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