import "~/assets/scss/Show.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Layout from "./components/Layout";
import Title from "./components/Title";
import { useUser } from "../context/UserContext";

export default function Checklist() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { checklists, checklistItem, setChecklistItem, setChecklists } = useUser();

    const [draftChecklist, setDraftChecklist] = useState([]);
    const draftRef = useRef([]);

    useEffect(() => {
        const list = checklists
            .filter((item) => item.id_categoria == id)
            .map((item) => ({
                ...item,
                itens: checklistItem.filter((i) => i.id_checklist === item.id),
            }));
        setDraftChecklist(list);
        draftRef.current = JSON.parse(JSON.stringify(list));
    }, [checklists, checklistItem]);

    const editarItem = (checklistId, itemIndex, novoTexto) => {
        const checklist = draftRef.current.find((c) => c.id === checklistId);
        if (checklist) {
            checklist.itens[itemIndex].title = novoTexto;
        }
    };

    const editarTitle = (checklistId, novoTitulo) => {
        const checklist = draftRef.current.find((c) => c.id === checklistId);
        if (checklist) {
            checklist.title = novoTitulo;
            setDraftChecklist([...draftRef.current]);
        }
    };

    const removerUltimoItem = (checklistId) => {
        const checklist = draftRef.current.find((c) => c.id === checklistId);
        if (checklist) checklist.itens.pop();
        setDraftChecklist([...draftRef.current]);
    };

    const adicionarItemVazio = (checklistId) => {
        const checklist = draftRef.current.find((c) => c.id === checklistId);
        if (checklist) checklist.itens.push({ id_checklist: checklistId, title: "" });
        setDraftChecklist([...draftRef.current]);
    };

    const deletarChecklist = (checklistId) => {
        draftRef.current = draftRef.current.filter(c => c.id !== checklistId);
        setDraftChecklist([...draftRef.current]);
    };

    const salvarAlteracoes = () => {
        const checklistsDoDepartamentoCategoria = checklists.filter(
            (c) => c.id_categoria == id && c.id_departamento === 1
        );

        const idsChecklistParaRemover = checklistsDoDepartamentoCategoria.map(
            (c) => c.id
        );

        const novosItens = draftRef.current.flatMap(
            (checklist) => checklist.itens
        );

        const novosChecklists = draftRef.current.map(({ itens, ...rest }) => rest);

        setChecklistItem((prev) => [
            ...prev.filter((item) => !idsChecklistParaRemover.includes(item.id_checklist)),
            ...novosItens
        ]);

        setChecklists((prev) => [
            ...prev.filter((item) => !idsChecklistParaRemover.includes(item.id)),
            ...novosChecklists
        ]);

        navigate('/checklists');
    };

    return (
        <Layout>
            <Title title={`Checklist Nº #${id}`} icon={<AssignmentIcon />} />
            <Box className="show_content">
                <h2 className="title" style={{ margin: '20px 0 15px' }}>Etapas:</h2>
                <form className="form_accordion">
                    {draftChecklist.map((item, index) => (
                        <Accordion className="accordion_item" key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {item.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="accordion_details">
                                <Box className="acoes">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            const novoTitulo = prompt("Editar título:", item.title);
                                            if (novoTitulo !== null) editarTitle(item.id, novoTitulo);
                                    }} size="small">
                                        Editar título
                                    </Button>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        onClick={() => deletarChecklist(item.id)} size="small" color="error">
                                        Excluir Etapa
                                    </Button>
                                </Box>
                                <Box className="input_content">
                                    {item.itens.map((i, idx) => (
                                        <ChecklistItemField
                                            key={idx}
                                            label={idx + 1}
                                            value={i.title}
                                            onChange={(e) => editarItem(item.id, idx, e.target.value)}
                                        />
                                    ))}
                                </Box>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button onClick={() => removerUltimoItem(item.id)}>
                                    Remover último
                                </Button>
                                <Button onClick={() => adicionarItemVazio(item.id)}>
                                    Adicionar
                                </Button>
                            </AccordionActions>
                        </Accordion>
                    ))}
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={salvarAlteracoes}
                            sx={{ display: 'block', margin: '0 0 20px auto' }}
                        >
                            Salvar alterações
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}

const ChecklistItemField = memo(({ value, onChange, label }) => {
    return (
        <Box className="item">
            <TextField
                label={label}
                variant="standard"
                fullWidth
                defaultValue={value}
                onChange={onChange}
              />
        </Box>
    );
});
