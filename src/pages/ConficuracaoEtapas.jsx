import "~/assets/scss/Show.scss";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DataTable from '~/components/DataTable';

import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import { useUser } from "~/context/UserContext";

import Modal from '~/components/layout/Modal';
import AdicionarString from '~/components/modal/AdicionarString';
import { config_api } from './../api';

export default function ConficuracaoEtapas() {
    const { selectedDepartamento } = useUser();
    const { id } = useParams();

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    const [novaEtapa, setNovaEtapa] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        if (selectedDepartamento?.id) {
            carregarEtapas();
        }
    }, [selectedDepartamento]);

    const carregarEtapas = async () => {
        try {
            const res = await config_api.getEtapas(selectedDepartamento.id, id);

            setBreadcrumbs([
                {
                    label: 'Configurações',
                    url: '/configuracoes'
                },
                {
                    label: res.data?.categoria?.nome || 'Categoria',
                    url: `/configuracoes/${id}/etapas`
                }
            ]);
            
            setRows(
                res.data?.etapas?.map((etapa) => {
                    return createData(
                        etapa.titulo,
                        etapa.atividades_count,
                        etapa.checklists_count,
                        etapa.volumes_count,
                        <Box className="acoes">
                            <Button className="link" component={Link} to={`/configuracoes/etapa/${etapa.id}/atividades`} variant="outlined" size="small">
                                <EditSquareIcon />
                            </Button>
                            <Button onClick={() => {deletar(etapa.id)}} variant="outlined" size="small"><DeleteIcon /></Button>
                        </Box>
                    );
                }) || []
            );
        } catch (err) {
            setRows([]);
            setError(err.message);
        }
    };

    const adicionarEtapa = async () => {
        try {
            const payload = {
                id_categoria: id,
                id_departamento: selectedDepartamento.id,
                titulo: novaEtapa,
            };

            const res = await config_api.createEtapa(payload);

            console.log("Etapa criada:", res.data);

            carregarEtapas();

            setOpenModal(false);
        } catch (err) {
            console.error("Erro ao criar etapa:", err.message);
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta etapa?")) return;

        try {
            const res = await config_api.deleteEtapa(id);
            console.log(res.message);

            carregarEtapas();
        } catch (err) {
            console.error("Erro ao deletar etapa:", err.message);
        }
    };


    //dados da tabela
    const createData = (etapa, atividades, checklists, volumes, acoes) => {
        return { etapa, atividades, checklists, volumes, acoes };
    }

    const headCells = [
        {
            id: 'etapa',
            numeric: false,
            label: 'Etapa',
        },
        {
            id: 'atividades',
            numeric: false,
            label: 'Atividades',
        },
        {
            id: 'checklists',
            numeric: false,
            label: 'Checklists',
        },
        {
            id: 'volumes',
            numeric: false,
            label: 'Volumes',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <Layout>
            <Title title={`Configuração de etapas`} icon={<SettingsApplicationsIcon />} breadcrumbs={breadcrumbs} />
            <Box className="show_content">
                <Box className="table_content" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                    <DataTable headCells={headCells} rows={rows}/>
                    <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar etapa</Button>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar etapa" confirm={adicionarEtapa}>
                <AdicionarString value={novaEtapa} setValue={setNovaEtapa} />
            </Modal>
        </Layout>
    );
}