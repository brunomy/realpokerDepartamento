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
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Layout from "~/components/layout/Layout";
import Title from "~/components/layout/Title";
import { useUser } from "~/context/UserContext";
import { Checklist } from "./Ordem";

export default function ChecklistOrder() {
    const { id } = useParams();
    const { checklists, checklistItem, setChecklistItem, setChecklists } = useUser();


    return (
        <Layout>
            <Title title={`Checklist Nº #${id}`} icon={<CheckBoxIcon />} />
            <Box className="show_content">
                <Box className="checklist_content">
                    <Checklist />
                </Box>
            </Box>
        </Layout>
    );
}