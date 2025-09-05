import '~/assets/scss/Index.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import dayjs from 'dayjs';

//LAYOUT
import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import Modal from '~/components/layout/Modal';

//COMPONENTS
import DataTable from '~/components/DataTable';
import InputAuto from '~/components/InputAuto';
import InputCalendarRange from '~/components/InputCalendarRange';

//MODAIS
import AdicionarEquipe from '~/components/modal/AdicionarEquipe';

//ICONS
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useUser } from '~/context/UserContext';

import { user_api } from './../api';
import { MudarTitulo } from './ConficuracaoEtapas';


export default function Equipes() {
    const { selectedDepartamento, usuarioLogado } = useUser();
    const { id } = useParams();

    if (usuarioLogado && (usuarioLogado.permissao !== 'gerente' && usuarioLogado.permissao !== 'atividades')) {
        return <Navigate to="/" replace />;
    }
    useEffect(() => {
        if(usuarioLogado.permissao !== "gerente" && id != usuarioLogado.id){
            navigate("/usuario/" + usuarioLogado.id);
        }
    }, []);


    const navigate = useNavigate();
    const prevDepartamento = useRef(null);

    const [equipes, setEquipes] = useState([]);

    const [user, setUser] = useState(null);


    const [openModal, setOpenModal] = useState(false);
    const [novaEquipe, setNovaEquipe] = useState();

    const [error, setError] = useState(null);

    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            label: 'Usuários',
            url: '/usuarios',
            disabled: true
        },
    ]);

    const [rows, setRows] = useState([]);

    const carregar = async () => {
        try {
            const res = await user_api.getUserEquipes(id, selectedDepartamento.id);
            
            setEquipes(res.data?.equipes || []);
            setUser(res.data?.user || null);

            setBreadcrumbs([
                {
                    label: 'Usuários',
                    url: '/usuarios',
                    disabled: usuarioLogado.permissao !== "gerente"
                },
                {
                    label: res.data?.user?.nome || 'Usuário',
                    url: `/usuario/${id}`
                }
            ]);

            
            setRows(
                res.data?.equipes?.map((equipe) => {
                    return createData(equipe);
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
                id_user: id,
                id_departamento: selectedDepartamento.id,
                nome: novaEquipe?.nome,
                descricao: novaEquipe?.descricao
            };

            const res = await user_api.createEquipe(payload);

            carregar();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar etapa:", err.message);
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta Equipe?")) return;

        try {
            const res = await user_api.deleteEquipe(id);

            carregar();
        } catch (err) {
            console.error("Erro ao deletar equipe:", err.message);
        }
    };

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento && usuarioLogado.permissao === "gerente") {
            navigate("/usuarios");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);



    //dados da tabela
    const createData = (equipe) => {
        const title = equipe.nome
        const descricao = equipe.descricao
        const func = equipe.funcionarios_count
        const excluir = <Box>
            <Button color="error" sx={
                {float: 'right', minWidth: 0, zIndex: 1, width: '50px !important'}
            } onClick={() => deletar(equipe.id)}><DeleteTwoToneIcon /></Button>
            <Button className="link" component={Link} to={`/equipe/${equipe.id}`} variant="outlined" size="small">Detalhes</Button>
        </Box>

        return { title, descricao, func, excluir };
    }

    const headCells = [
        {
            id: 'nome',
            label: 'Nome',
        },
        {
            id: 'descricao',
            label: 'Descrição',
        },
        {
            id: 'funcionarios',
            label: 'Funcionarios',
        },
        {
            id: 'excluir',
            align: "right",
            label: 'Delete',
        },
    ];


    return (
        <Layout>
            <Title title="Lista de equipes" icon={<GroupsIcon/>} breadcrumbs={breadcrumbs}/>
            <Box className="show_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                <Box className="table_content">
                    <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
                        <MudarTitulo objeto={{ titulo: user?.nome }} disabled />
                        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Criar equipe</Button>
                    </Box>
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar equipe" confirm={adicionar} disabled={equipes.some((equipe) => equipe.nome === novaEquipe?.nome || !novaEquipe?.nome)}>
                <AdicionarEquipe setNovaEquipe={setNovaEquipe} equipes={equipes} />
            </Modal>
        </Layout>
    )
}