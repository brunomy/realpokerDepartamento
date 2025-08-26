import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';

import { Box, Button, Tabs, Tab, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditarRemessa from './EditarRemessa';
import Modal from '../layout/Modal';
import { remessa_api } from '../../api';
import { converterDataParaBanco, validarCEP, validarTelefone, validarCpfCnpj } from '../../Utils';

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
            setTab(0);
        } else {
            setRemessa(null);
        }
    }, [open, selectedRemessa]);

    return (
        <Modal 
            open={open} setOpen={setOpen} 
            title={`Remessa ${selectedRemessa?.titulo}`} 
            confirm={salvar}  
            disabled={!validate(remessa)}
            sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}>
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

                <div className="tab_content" style={{ height: '500px' }}>
                    { tab === 0 && <EditarRemessa remessa={remessa} setRemessa={setRemessa} /> }
                    { tab === 1 && <ListaOrdensRemessa idRemessa={remessa?.id} /> }
                </div>
            </Box>
        </Modal>
    )
}

function validate(remessa){
    if (!remessa) return false;

    const requiredFields = [
        'titulo',
        'entrega',
        'nome',
        'telefone',
        'cep',
        'id_estado',
        'id_cidade',
        'endereco',
        'complemento',
        'cpf_cnpj',
        'numero',
        'bairro'
    ];

    // Verifica se todos os campos obrigatórios estão preenchidos
    for (let field of requiredFields) {
        if (!remessa[field]) {
            return false;
        }
    }

    // Validações de formato
    // Valida CEP
    if (!validarCEP(remessa.cep)) {
        return false;
    }

    // Valida telefone
    if (!validarTelefone(remessa.telefone)) {
        return false;
    }

    // Valida CPF/CNPJ (se preenchido)
    if (remessa.cpf_cnpj && !validarCpfCnpj(remessa.cpf_cnpj)) {
        return false;
    }

    return true;
}

function ListaOrdensRemessa({ idRemessa }){
    const [ordens, setOrdens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (idRemessa) {
            carregar();
        }
    }, [idRemessa]);

    const carregar = async () => {
        if (!idRemessa) return;
        
        setLoading(true);
        try {
            const res = await remessa_api.getOrdensRemessa(idRemessa);
            console.log('Resposta da API getOrdensRemessa:', res.data);
            
            // Garante que ordens seja sempre um array
            const ordensData = res?.data;
            setOrdens(res?.data);
            console.log('ordens', ordens);
            
            
        } catch (err) {
            console.error('Erro ao carregar ordens da remessa:', err);
            setOrdens([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography>Carregando ordens...</Typography>
            </Box>
        );
    }

    if (!Array.isArray(ordens) || ordens.length === 0) {
        return (
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography color="textSecondary">
                    Nenhuma ordem encontrada para esta remessa
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            {ordens.map(ordem => (
                <Box key={ordem.id} sx={{ 
                    marginBottom: 2, 
                    padding: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1 
                }}>
                    <Typography variant="h6">{ordem.titulo || 'Ordem sem título'}</Typography>
                    {ordem.descricao && (
                        <Typography variant="body2" color="textSecondary">
                            {ordem.descricao}
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
}