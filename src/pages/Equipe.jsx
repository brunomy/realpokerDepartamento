import '~/assets/scss/Show.scss';

import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
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

import { user_api } from './../api';
import { MudarTitulo } from './ConficuracaoEtapas';

export default function Equipe() {
    const { id } = useParams();
    const { selectedDepartamento, usuarioLogado } = useUser();

    if (usuarioLogado && (usuarioLogado.permissao !== 'gerente' && usuarioLogado.permissao !== 'atividades')) {
        return <Navigate to="/" replace />;
    }

    const [userEquipe, setUserEquipe] = useState(null);

    const navigate = useNavigate();
    const prevDepartamento = useRef(null);

    const [novoFuncionario, setNovoFuncionario] = useState();

    const [openModal, setOpenModal] = useState(false);

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    const [equipe, setEquipe] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);

    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            label: 'Usuários',
            url: '/usuarios'
        },
    ]);

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/usuarios");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);


    //dados funcionarios
    const createData = (funcionario) => {
        const nome = funcionario.nome
        const funcao = funcionario.funcao
        const senha = funcionario.senha
        const codigo = funcionario.codigo
        
        const excluir = <Box>
            <Button color="error" sx={
                {float: 'right', minWidth: 0, zIndex: 1}
            } onClick={() => deletar(funcionario.id)}><DeleteTwoToneIcon /></Button>
        </Box>

        return { nome, funcao, senha, codigo, excluir };
    }

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
            id: 'senha',
            label: 'Senha',
        },
        {
            id: 'codigo',
            label: 'Código',
        },
        {
            id: 'deletar',
            align: "right",
            label: 'Deletar',
        },
    ];

    const carregar = async () => {
        try {
            const res = await user_api.getFuncionarios(id);

            if(usuarioLogado.permissao !== "gerente" && res.user?.id != usuarioLogado.id){
                navigate("/usuario/" + usuarioLogado.id);
            }

            setBreadcrumbs([
                {
                    label: 'Usuários',
                    url: '/usuarios',
                    disabled: usuarioLogado.permissao !== "gerente"
                },
                {
                    label: res.user?.nome || 'Usuário',
                    url: `/usuario/${res.user?.id}`
                },
                {
                    label: res.equipe?.nome || 'Equipe',
                    url: `/equipe/${id}`
                }
            ]);

            setFuncionarios(res?.data);
            setEquipe(res?.equipe);
            
            setRows(
                res.data?.map((funcionario) => {
                    return createData(funcionario);
                }) || []
            );
        } catch (err) {
            setRows([]);
            setError(err.message);
        }
    };

    const adicionar = async () => {
        try {
            const payload = {
                id_equipe: id,
                nome: novoFuncionario?.nome,
                funcao: novoFuncionario?.funcao,
                senha: novoFuncionario?.senha,
                codigo: novoFuncionario?.codigo,
            };

            const res = await user_api.createFuncionario(payload);

            carregar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar funcionário:", err.message);
        }
    };

    const editar = async (id, titulo) => {
        try {
            const payload = {
                titulo: titulo,
            };

            const res = await user_api.updateEquipe(id, payload);

            carregar();
        } catch (err) {
            console.error("Erro ao criar equipe:", err.message);
        }
    }

    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) return;

        try {
            const res = await user_api.deleteFuncionario(id);

            carregar();
        } catch (err) {
            console.error("Erro ao deletar funcionário:", err.message);
        }
    };

    return (
        <Layout>
            <Title title={"Equipe #"+id} icon={<GroupsIcon/>} breadcrumbs={breadcrumbs} />
            <Box className="show_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                <Box className="table_content">
                    <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
                        <MudarTitulo objeto={{ id: equipe?.id, titulo: equipe?.nome }} onClick={editar} />
                        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar funcionario</Button>
                    </Box>
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
                <Modal open={openModal} setOpen={setOpenModal} title="Adicionar funcionário" confirm={adicionar}
                    disabled={
                        funcionarios.some((funcionario) => funcionario.nome === novoFuncionario?.nome ||
                        !novoFuncionario?.nome) ||
                        funcionarios.some((funcionario) => funcionario.senha === novoFuncionario?.senha ||
                        !novoFuncionario?.senha) ||
                        funcionarios.some((funcionario) => funcionario.codigo === novoFuncionario?.codigo ||
                        !novoFuncionario?.codigo)
                        }>
                    <AdicionarFuncionario setNovoFuncionario={setNovoFuncionario} funcionarios={funcionarios} equipeId={id}/>
                </Modal>
            </Box>
        </Layout>
    )
}