import '~/assets/scss/Index.scss';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Autocomplete, Typography, TextField, Button, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { user_api } from '../api';

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


export default function Usuarios() {
    const { selectedDepartamento, usuarioLogado } = useUser();

    if (usuarioLogado && usuarioLogado.permissao !== 'gerente') {
        return <Navigate to="/" replace />;
    }

    const [error, setError] = useState("");

    const [rows, setRows] = useState([]);

    //dados da tabela
    const createData = (id, title, permissao, equipes, funcionarios) => {
        const acoes = <Box>
            {funcionarios}
            <Button className="link" component={Link} to={`/usuario/${id}`} variant="outlined" size="small">Detalhes</Button>
        </Box>

        return { title, permissao, equipes, acoes };
    }


    const carregar = async () => {
        try {
            const res = await user_api.getUsersDepartamento(selectedDepartamento.id);

            setRows(
                res.data?.map((user) => {
                    return createData(
                        user.id,
                        user.nome,
                        user.permissao,
                        user.equipes_count,
                        user.funcionarios_count
                    );
                }) || []
            );
        } catch (err) {
            setRows([]);
            setError(err.message);
        }
    };

    useEffect(() => {
        carregar();
    }, [selectedDepartamento]);

    const headCells = [
        {
            id: 'nome',
            label: 'Nome',
        },
        {
            id: 'permissao',
            label: 'Permissão',
        },
        {
            id: 'equipes',
            label: 'Equipes',
        },
        {
            id: 'funcionarios',
            label: 'Funcionarios',
        },
    ];


    return (
        <Layout>
            <Title title="Lista de usuários" icon={<GroupsIcon/>} />
            <Box className="index_content">
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
        </Layout>
    )
}