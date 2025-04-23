import '~/assets/scss/Index.scss';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';

import dayjs from 'dayjs';

import DataTable from '~/components/DataTable';
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';
import InfoProdutoModal from '../components/modal/InfoProdutoModal';

import { useUser } from '~/context/UserContext';
import Status from '../components/layout/Status';

//icons
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AdicionarVolumeLista from '../components/modal/AdicionarVolumeLista';

export default function Atividades() {
    const { 
        atividadesOP,
        etapas,
        atividades,
        equipes,
        categorias
    } = useUser();

    const hoje = dayjs();

    const [statusFilter, setStatusFilter] = useState([]);
    const [teamFilter, setTeamFilter] = useState([]);
    const [idFilter, setIdFilter] = useState([]);
    const [dateFilterDe, setDateFilterDe] = useState(hoje.format('YYYY-MM-DD'));
    const [dateFilterAte, setDateFilterAte] = useState(hoje.format('YYYY-MM-DD'));

    const statusList = [
        { label: 'Pendente', value: 1},
        { label: 'Em andamento', value: 2},
        { label: 'Parado', value: 3},
        { label: 'Concluído', value: 4},
    ]
    const teamList = [
        { label: 'M1', value: 1},
        { label: 'M2', value: 2},
        { label: 'M3', value: 3}
    ]
    const idList = [
        { label: '#5951', value: 5951},
        { label: '#5952', value: 5952},
        { label: '#5953', value: 5953},
        { label: '#5954', value: 5954},
    ]

    //dados da tabela
    const createData = (item) => {
        console.log(atividades);
        let atividadeItem = atividades.find(a => a.id == item.id_atividade);
        
        const pedido = '#5951';
        const equipe = equipes.find(e => e.id == item.id_equipe).title;
        const producao = item.data;
        const categoria = categorias.find(c => c.id == atividadeItem.id_categoria).title;
        const atividade = <Box>
            <span style={{"fontSize": ".8em"}}>{etapas.find(e => e.id == item.id_etapa).title}</span>
            <br />{atividadeItem.title}
        </Box>;
        const elementStatus = <Status status={item.status} size={'small'} />;
        const acoes = <AcoesAtividades atividade={item} />

        return { pedido, producao, equipe, categoria, atividade, elementStatus, acoes };
    }
    const headCells = [
        {id: 'pedido', label: 'Pedido'},
        {id: 'producao', label: 'Produção'},
        {id: 'equipe', label: 'Equipe'},
        {id: 'categoria', label: 'Categoria'},
        {id: 'atividade', label: 'Atividade'},
        {id: 'status', label: 'Status'},
        {id: 'acoes', label: 'Ações'},
    ];
    const rows = [];

    atividadesOP.map((item) => {
        rows.push(
            createData(item)
        )
    })

    return (
        <Layout>
            <Title title="Lista de atividades" icon={<AssignmentIcon/>} />
            <Box className="index_content atividades_list">
                <Box className="filtros">
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
                </Box>
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows} buttons={true}/>
                </Box>
            </Box>
        </Layout>
    )
}

export function AcoesAtividades({ atividade }){
    const { atividadesOP, setAtividadesOP, volumes } = useUser();
    const volumes_atividade = volumes.filter((volume) => volume.id_atividade == atividade.id_atividade)

    const [open, setOpen] = useState(false);
    const [openVolumes, setOpenVolumes] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);


    const play = () => {
        setAtividadesOP(prev =>
            prev.map(item =>
                item.id === atividade.id ? { ...item, status: 1 } : item
            )
        );
    }
    const pausar = () => {
        setAtividadesOP(prev =>
            prev.map(item =>
                item.id === atividade.id ? { ...item, status: 2 } : item
            )
        );
    }
    const finalizar = () => {

        setAtividadesOP(prev =>
            prev.map(item =>
                item.id === atividade.id ? { ...item, status: 3 } : item
            )
        );
        
        if(volumes_atividade.length != 0){
            setOpenVolumes(true)
        }
    }

    return (
        <>
        <Box className="acoes_atividade">
            { (atividade.status != 3 && atividade.status != -1) &&
                <div className="content_1">
                    <Button className="play" onClick={play}><PlayCircleFilledWhiteTwoToneIcon /></Button>
                    <Button className="pause" onClick={pausar}><PauseCircleFilledTwoToneIcon /></Button>
                    <Button className="concluir" onClick={finalizar}><CheckCircleTwoToneIcon /></Button>
                </div>
            }
                <div className="content_2">
                { (atividade.status != -1 && atividade.status == 3 && volumes_atividade.length != 0) && 
                    <Button className="volumes" onClick={() => setOpenVolumes(true)}><MoveToInboxTwoToneIcon /></Button>
                }
                    <Button className="info" onClick={() => setOpenInfo(true)}><InfoTwoToneIcon /></Button>
                </div>
        </Box>
        <Modal open={open} setOpen={setOpen} title="" >
            {atividade.id}
        </Modal>
        <Modal open={openVolumes} setOpen={setOpenVolumes} title="Adicionar volumes" confirmText=''>
            <AdicionarVolumeLista atividade={atividade} />
        </Modal>
        <Modal open={openInfo} setOpen={setOpenInfo} title="Mesa de poker profissional" confirmText="Fechar">
            <InfoProdutoModal />
        </Modal>
        </>
    )
}