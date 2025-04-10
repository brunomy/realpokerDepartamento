import '~/assets/scss/Show.scss';

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

import DataTable from './components/DataTable';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

import Layout from "./components/Layout";
import Title from "./components/Title";
import Modal from './components/Modal';

import { Volumes, Atividades } from './Pedido';
import TransferList from './components/TransferList';
import AdicionarFuncionario from './components/AdicionarFuncionario';

export default function Equipe() {
    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const [addAtividadeModal, setAddAtividadeModal] = useState(false);

    const [addVolumeModal, setAddVolumeModal] = useState(false);

    const [openModal, setOpenModal] = useState(false);


    const [left, setLeft] = useState([
        { label: 'Bruno', value: 5952},
        { label: 'João', value: 5953},
        { label: 'Rafael', value: 5953},
        { label: 'Pedro', value: 5953},
        { label: 'José', value: 5953},
    ]);
    const [right, setRight] = useState([
        { label: 'Matheus', value: 5951},
        { label: 'Alisson', value: 5955},
    ]);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    //dados funcionarios
    const createDataFuncionarios = (nome, funcao, contratacao, telefone) => {
        return { nome, funcao, contratacao, telefone };
    }
    const rowsFuncionarios = [
        createDataFuncionarios(
            'Bruno', 
            'Pintor',
            '10/01/2025',
            '(62) 99999-9999',
        ),
        createDataFuncionarios(
            'João', 
            'Serralheiro',
            '10/01/2025',
            '(62) 99999-9999',
        ),
        createDataFuncionarios(
            'Rafael', 
            'Montador',
            '10/01/2025',
            '(62) 99999-9999',
        ),
        createDataFuncionarios(
            'Pedro', 
            'Montador',
            '10/01/2025',
            '(62) 99999-9999',
        ),
        createDataFuncionarios(
            'José', 
            'Transportador',
            '10/01/2025',
            '(62) 99999-9999',
        ),

    ];
    const headCellsFuncionarios = [
        {
            id: 'nome',
            numeric: false,
            label: 'Nome',
        },
        {
            id: 'funcao',
            numeric: false,
            label: 'Função',
        },
        {
            id: 'contratacao',
            numeric: false,
            label: 'Contratação',
        },
        {
            id: 'telefone',
            numeric: false,
            label: 'Telefone',
        },
    ];

    //dados atividades
    const createDataAtividades = (id, descricao, criacao, status, link) => {
        return {
            id,
            descricao,
            criacao,
            status,
            link,
        };
    }
    const rowsAtividades = [
        createDataAtividades(
            '#34897', 
            'Cortar + Montar Base 1 Coluna Retangular',
            '01/11/2024',
            <Chip className="stats" size="small" label="Pendente" />,
            <Button component={Link} to="/atividades/34897" variant="outlined" size="small">Detalhes</Button>
        ),
        createDataAtividades(
            '#34898', 
            'Cortar Também Dividido + Réguas',
            '01/11/2024',
            <Chip className="stats" size="small" color="primary" label="Em andamento" />,
            <Button component={Link} to="/atividades/34898" variant="outlined" size="small">Detalhes</Button>
        ),
        createDataAtividades(
            '#34899', 
            'Fazer Furo das Vailhas Tampão Dividido	',
            '01/11/2024',
            <Chip className="stats" size="small" color="error" label="Parado" />,
            <Button component={Link} to="/atividades/34899" variant="outlined" size="small">Detalhes</Button>
        ),
        createDataAtividades(
            '#34900', 
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/34900" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCellsAtividades = [
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
            id: 'criacao',
            numeric: false,
            label: 'Criação',
        },
        {
            id: 'status',
            numeric: true,
            label: 'Status',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    //dados volumes
    const createDataVolumes = (id, descricao, dimensoes, peso, criacao, atividade) => {
        return {
            id,
            descricao,
            dimensoes,
            peso,
            criacao,
            atividade
        };
    }
    const rowsVolumes = [
        createDataVolumes(
            '#3489787', 
            'Tampa da mesa',
            '200 x 400 x 50',
            '20',
            '01/11/2024',
            <Button component={Link} to="/atividades/34897" variant="outlined" size="small">#34897</Button>
        ),
        createDataVolumes(
            '#3489788', 
            'Peças de montagem da mesa',
            '50 x 50 x 50',
            '10',
            '01/11/2024',
            <Button component={Link} to="/atividades/34897" variant="outlined" size="small">#34897</Button>
        ),
    ];
    const headCellsVolumes = [
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
            id: 'atividade',
            numeric: false,
            label: 'Atividade',
        },
    ];

    return (
        <Layout>
            <Title title={"Equipe #"+id} icon={<GroupsIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Atividades" />
                    <Tab label="Volumes" />
                    <Tab label="Membros" />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && (
                    <>
                    <Informacoes /> 
                    <Funcionarios headCells={headCellsFuncionarios} rows={rowsFuncionarios} setOpenModal={setOpenModal} />
                    <Modal open={openModal} setOpen={setOpenModal} title="Adicionar funcionário">
                        <AdicionarFuncionario />
                    </Modal>
                    </>
                )}
                { tab == 1 && <Atividades 
                    equipe={true} 
                    headCells={headCellsAtividades} 
                    rows={rowsAtividades}
                /> }
                { tab == 2 && <Volumes 
                    adicionar={false} 
                    headCells={headCellsVolumes} 
                    rows={rowsVolumes}
                /> }
                { tab == 3 && <Membros 
                    left={left}
                    setLeft={setLeft}
                    right={right}
                    setRight={setRight}
                /> }
            </Box>
        </Layout>
    )
}

function Informacoes() {
    return (
        <Box className="informacoes">
            <Box className="info_pedido">
                <Box className="info">
                    <p>
                        <span className="icon"><GroupsTwoToneIcon/></span>
                        <b>EQUIPE: </b>M1
                    </p>
                    <p>
                        <span className="icon"><GroupTwoToneIcon/></span>
                        <b>FUNCIONÁRIOS: </b>5
                    </p>
                    <p>
                        <span className="icon"><AssignmentTwoToneIcon/></span>
                        <b>ATIVIDADES: </b> 4
                    </p>
                    <p>
                        <span className="icon"><CheckBoxTwoToneIcon/></span>
                        <b>CHECKLISTS: </b> 5/20
                    </p>
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>DESCRIÇÃO: </b>Responsável por montar mesas
                    </p>
                </Box>
            </Box>
        </Box>
    )
}

function Membros({ left, setLeft, right, setRight }) {
    return (
        <Box className="mudar_membros">
            <br /><br />
            <TransferList left={left} setLeft={setLeft} right={right} setRight={setRight} />
        </Box>
    )
}

function Funcionarios({headCells, rows, setOpenModal}) {
    return (
        <Box className="funcionarios_content">
            <DataTable headCells={headCells} rows={rows}/>
            <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar funcionario</Button>
        </Box>
    )
}