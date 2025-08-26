import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';

import { Box, Button, Tabs, Tab } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditarRemessa from './EditarRemessa';
import Modal from '../layout/Modal';
import { remessa_api } from '../../api';
import { converterDataParaBanco } from '../../Utils';

export default function RemessaEdit({ selectedRemessa, open, setOpen }) {
    const [tab, setTab] = useState(0);
    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const [remessa, setRemessa] = useState(null);

    const carregar = async () => {
        try {
            const res = await remessa_api.getRemessa(selectedRemessa?.id);

            setRemessa(res.data || null);

        } catch (err) {
            console.log(err);
        }
    };
    const salvar = async () => {
        if (!remessa?.id) {
            alert('Erro: ID da remessa não encontrado');
            return;
        }

        // Validações básicas
        if (!remessa.titulo || !remessa.entrega || !remessa.nome || !remessa.telefone || 
            !remessa.cep || !remessa.id_estado || !remessa.id_cidade || 
            !remessa.endereco || !remessa.numero || !remessa.bairro) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            const payload = {
                titulo: remessa.titulo || '',
                entrega: converterDataParaBanco(remessa.entrega) || '',
                nova_entrega: remessa.nova_entrega ? converterDataParaBanco(remessa.nova_entrega) : null,
                saida: remessa.saida ? converterDataParaBanco(remessa.saida) : null,
                nova_saida: remessa.nova_saida ? converterDataParaBanco(remessa.nova_saida) : null,
                nome: remessa.nome || '',
                telefone: remessa.telefone || '',
                cpf_cnpj: remessa.cpf_cnpj || null,
                cep: remessa.cep || '',
                id_estado: remessa.id_estado || 0,
                id_cidade: remessa.id_cidade || 0,
                endereco: remessa.endereco || '',
                numero: remessa.numero || '',
                bairro: remessa.bairro || '',
                complemento: remessa.complemento || '',
                id_status: remessa.id_status || null,
                n_nota: remessa.n_nota || null,
                coleta: remessa.coleta ? converterDataParaBanco(remessa.coleta) : null
            };

            const response = await remessa_api.updateRemessa(remessa.id, payload);
            console.log('Resposta da API:', response);
            
            setOpen(false);
        } catch (error) {
            console.error('Erro ao salvar remessa:', error);
        }
    };

    useEffect(() => {
        if (selectedRemessa && open) {
            carregar();
        } else {
            setRemessa(null);
        }
    }, [open, selectedRemessa]);

    return (
        <Modal open={open} setOpen={setOpen} title={`Remessa ${selectedRemessa?.titulo}`} confirm={salvar}  sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}>
            <Box className="mudar_remessa">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Ordens" />
                </Tabs>

                <div className="tab_content">
                    { tab === 0 && <EditarRemessa remessa={remessa} setRemessa={setRemessa} /> }
                </div>
            </Box>
        </Modal>
    )
}