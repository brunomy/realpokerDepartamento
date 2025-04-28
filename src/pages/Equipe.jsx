import '~/assets/scss/Show.scss';

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Chip, Tabs, Tab } from '@mui/material';



//LAYOUT
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';

//COMPONENTS
import DataTable from '~/components/DataTable';

//MODAIS
import AdicionarFuncionario from '~/components/modal/AdicionarFuncionario';

//ICONS
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useUser } from '~/context/UserContext';

export default function Equipe() {
    const { id } = useParams();
    const { setFuncionarios, funcionarios, equipes } = useUser();
    const [novoFuncionario, setNovoFuncionario] = useState();

    const equipe = equipes.find((e) => e.id == id)
    const funcionariosEquipe = funcionarios.filter((func) => func.id_equipe == id)
    

    console.log(funcionariosEquipe);
    
    const [openModal, setOpenModal] = useState(false);

    const adicionarFuncionario = () => setFuncionarios([...funcionarios, novoFuncionario])
    const deletarFuncionario = (id) => {
        setFuncionarios(funcionarios.filter((func) => func.id != id))
    }

    //dados funcionarios
    const createData = (funcionario) => {
        const nome = funcionario.nome
        const funcao = funcionario.funcao
        const usuario = funcionario.usuario
        const senha = funcionario.senha
        const senhaMascarada = '●'.repeat(senha.length);
        const excluir = <Box>
            <Button color="error" sx={
                {float: 'right', minWidth: 0, zIndex: 1}
            } onClick={() => deletarFuncionario(funcionario.id)}><DeleteTwoToneIcon /></Button>
            <Button className="link" component={Link} to={`/equipes/${equipe.id}`} variant="outlined" size="small">Detalhes</Button>
        </Box>

        return { nome, funcao, usuario, senhaMascarada,  excluir };
    }
    const rows = [];

    funcionariosEquipe.map((f) => {
        rows.push(createData(f))
    })

    const headCells = [
        {
            id: 'nome',
            label: 'Nome',
        },
        {
            id: 'funcao',
            label: 'Função',
        },
        {
            id: 'usuario',
            label: 'Usuário',
        },
        {
            id: 'senha',
            label: 'Senha',
        },
        {
            id: 'deletar',
            align: "right",
            label: 'Deletar',
        },
    ];


    return (
        <Layout>
            <Title title={"Equipe #"+id} icon={<GroupsIcon/>} />
            <Box className="show_content">
                <Informacoes equipe={equipe} funcionarios={funcionariosEquipe} /> 
                <Funcionarios headCells={headCells} rows={rows} setOpenModal={setOpenModal} />
                <Modal open={openModal} setOpen={setOpenModal} title="Adicionar funcionário" confirm={adicionarFuncionario}>
                    <AdicionarFuncionario setNovoFuncionario={setNovoFuncionario} funcionarios={funcionarios} equipeId={id}/>
                </Modal>
            </Box>
        </Layout>
    )
}

function Informacoes({ equipe, funcionarios }) {
    return (
        <Box className="informacoes">
            <Box className="info_pedido">
                <Box className="info">
                    <p>
                        <span className="icon"><GroupsTwoToneIcon/></span>
                        <b>EQUIPE: </b>{ equipe.title }
                    </p>
                    <p>
                        <span className="icon"><GroupTwoToneIcon/></span>
                        <b>FUNCIONÁRIOS: </b>{ funcionarios.length }
                    </p>
                    <p className="full">
                        <span className="icon"><InfoTwoToneIcon/></span>
                        <b>DESCRIÇÃO: </b>{ equipe.descricao }
                    </p>
                </Box>
            </Box>
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