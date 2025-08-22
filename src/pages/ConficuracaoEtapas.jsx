import "~/assets/scss/Show.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
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
import SaveIcon from '@mui/icons-material/Save';

export default function ConficuracaoEtapas() {
    const navigate = useNavigate();
    const prevDepartamento = useRef(null);

    const { selectedDepartamento } = useUser();
    const { id } = useParams();

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    const [novo, setNovo] = useState("");

    const [categoria, setCategoria] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            label: 'Configurações',
            url: '/configuracoes'
        },
    ]);

    useEffect(() => {
        if (prevDepartamento.current !== null && prevDepartamento.current !== selectedDepartamento) {
            navigate("/configuracoes");
        }
        if (selectedDepartamento?.id) {
            carregar();
        }
        prevDepartamento.current = selectedDepartamento;
    }, [selectedDepartamento]);

    useEffect(() => {
        setNovo('');
    }, [openModal]);

    const carregar = async () => {
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

            setCategoria(res.data?.categoria);
            
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

    const adicionar = async () => {
        try {
            const payload = {
                id_categoria: id,
                id_departamento: selectedDepartamento.id,
                titulo: novo,
            };

            const res = await config_api.createEtapa(payload);

            console.log("Etapa criada:", res.data);

            carregar();

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

            carregar();
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
                    <Box className="actions" sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', pb: 3 }}>
                        <MudarTitulo objeto={{ titulo: categoria?.nome }} disabled />
                        <Button className="adicionar" variant="contained" onClick={() => setOpenModal(true)}>Adicionar etapa</Button>
                    </Box>
                    <DataTable headCells={headCells} rows={rows}/>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} title="Adicionar etapa" confirm={adicionar}>
                <AdicionarString value={novo} setValue={setNovo} />
            </Modal>
        </Layout>
    );
}

export function MudarTitulo({ objeto, onClick, disabled }) {
    const [novo, setNovo] = useState(objeto?.titulo);

    useEffect(() => {
        setNovo(objeto?.titulo ?? "");
    }, [objeto]);
    
    const handleClick = () => {
        onClick(objeto.id, novo);
    };

    return (
        <Box className="titulo">
            <Box sx={{
                display: "flex",
                gap: "5px",
                width: "350px",
                margin: "0 0 0 auto"
            }}>
                <TextField
                    value={novo}
                    onChange={(e) => setNovo(e.target.value)}
                    fullWidth
                    size="small"
                    disabled={disabled}
                />
                { novo !== objeto?.titulo && novo && (
                    <Button onClick={handleClick} variant="contained"><SaveIcon /></Button>
                )}
            </Box>
        </Box>
    );
}