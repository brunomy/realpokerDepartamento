import '~/assets/scss/Index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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


export default function Equipes() {
    const [openModal, setOpenModal] = useState(false);
    const { equipes, setEquipes, funcionarios } = useUser();
    const [novaEquipe, setNovaEquipe] = useState();

    const adicionarEquipe = () => setEquipes([...equipes, novaEquipe])
    const deletarEquipe = (id) => {
        setEquipes(equipes.filter((equipe) => equipe.id != id))
    }

    //dados da tabela
    const createData = (equipe, num_funcionarios) => {
        const title = equipe.title
        const descricao = equipe.descricao
        const func = num_funcionarios
        const excluir = <Box>
            <Button color="error" sx={
                {float: 'right', minWidth: 0, zIndex: 1}
            } onClick={() => deletarEquipe(equipe.id)}><DeleteTwoToneIcon /></Button>
            <Button className="link" component={Link} to={`/equipes/${equipe.id}`} variant="outlined" size="small">Detalhes</Button>
        </Box>

        return { title, descricao, func, excluir };
    }
    const rows = [];
    equipes.map((equipe) => {
        const num_funcionarios = funcionarios.filter((f) => f.id_equipe == equipe.id).length
        rows.push(createData(equipe, num_funcionarios))
    })

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
            <Title title="Lista de equipes" icon={<GroupsIcon/>} />
            <Box className="index_content">
                <br />
                <br />
                <Box className="table_content">
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="relatorio" variant="contained" onClick={() => setOpenModal(true)}>Criar equipe</Button>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar equipe" confirm={adicionarEquipe}>
                <AdicionarEquipe setNovaEquipe={setNovaEquipe} equipes={equipes} />
            </Modal>
        </Layout>
    )
}