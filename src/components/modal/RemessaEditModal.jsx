import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';

import { Box, Button, Tabs, Tab, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditarRemessa from '../EditarRemessa';
import Modal from '../layout/Modal';
import { remessa_api } from '../../api';
import { converterDataParaBanco, validarCEP, validarTelefone, validarCpfCnpj } from '../../Utils';
import Status from '~/components/layout/Status';
import { useUser } from '~/context/UserContext';
import { Link } from 'react-router-dom';

export default function RemessaEditModal({ selectedRemessa, open, setOpen, tab, setTab }) {
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
        <Modal 
            open={open} setOpen={setOpen} 
            title={`Remessa ${selectedRemessa?.titulo}`} 
            confirm={salvar}  
            disabled={!validateRemessa(remessa) || tab === 1}
            sx={{'& .MuiDialogContent-root': { paddingTop: '0'}}}>
            <Box className="mudar_remessa">
                { tab != null && 
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
                }

                <div className="tab_content" style={{ height: '500px' }}>
                    { tab === 0 && <EditarRemessa remessa={remessa} setRemessa={setRemessa} /> }
                    { tab === 1 && <ListaOrdensRemessa idRemessa={remessa?.id} /> }
                </div>
            </Box>
        </Modal>
    )
}

export function validateRemessa(remessa){
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
        'cpf_cnpj',
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
    const { selectedDepartamento, usuarioLogado } = useUser();
    const [ordens, setOrdens] = useState([]);
    const [ordensAgrupadas, setOrdensAgrupadas] = useState({});
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
            var res;
            if(usuarioLogado.permissao === 'gerente'){
                res = await remessa_api.getOrdensRemessaDepartamento(selectedDepartamento.id, idRemessa);
            }
            if(usuarioLogado.permissao === 'remessas'){
                res = await remessa_api.getOrdensRemessa(idRemessa);
            }
            
            const ordensData = res?.data || [];
            setOrdens(ordensData);
            
            // Agrupa as ordens por id_pedido
            const agrupadas = ordensData.reduce((acc, ordem) => {
                const idPedido = ordem.id_pedido;
                if (!acc[idPedido]) {
                    acc[idPedido] = [];
                }
                acc[idPedido].push(ordem);
                return acc;
            }, {});
            
            setOrdensAgrupadas(agrupadas);
        } catch (err) {
            console.error('Erro ao carregar ordens da remessa:', err);
            setOrdens([]);
            setOrdensAgrupadas({});
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
        <Box sx={{ pb: 2}}>
            {Object.entries(ordensAgrupadas).map(([idPedido, ordensGrupo]) => (
                <Box key={idPedido} sx={{ 
                    marginBottom: 3, 
                    border: '2px solid #1976d2', 
                    borderRadius: 1,
                    overflow: 'hidden'
                }}>
                    {/* Cabeçalho do Pedido */}
                    <Box sx={{ 
                        backgroundColor: '#1976d2', 
                        color: 'white', 
                        px: 1.5,
                        py: .5 
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Pedido #{idPedido}
                        </Typography>
                        <Typography variant="body2">
                            {ordensGrupo.length} {ordensGrupo.length === 1 ? 'item' : 'itens'}
                        </Typography>
                    </Box>
                    
                    {/* Lista de Ordens do Pedido */}
                    <Box sx={{ backgroundColor: 'white', '& >div:nth-child(even)': { backgroundColor: '#84848417' } }}>
                        {ordensGrupo.map((ordem, index) => {
                            // Converte string JSON dos requisitos para array
                            if(ordem.departamentos){
                                ordem.departamentos = typeof ordem.departamentos === 'string' ? JSON.parse(ordem.departamentos) : ordem.departamentos;
                            }
                            
                            let requisitos = [];
                            try {
                                if (ordem.requisitos && typeof ordem.requisitos === 'string') {
                                    requisitos = JSON.parse(ordem.requisitos);
                                } else if (Array.isArray(ordem.requisitos)) {
                                    requisitos = ordem.requisitos;
                                }
                            } catch (error) {
                                console.error('Erro ao parsear requisitos:', error);
                                requisitos = [];
                            }

                            return(
                                <Box key={ordem.id} sx={{
                                    padding: 1.5,
                                    borderBottom: index < ordensGrupo.length - 1 ? '1px solid #e0e0e0' : 'none',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}>
                                    <Button component={usuarioLogado.permissao === 'gerente' ? Link : 'div'} to={`/ordem/`+ordem.id} sx={{ position: 'absolute', left: 0, top: 0, background: 'transparent', width: '100%', height: '100%' }}></Button>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                        {ordem.nome_produto}
                                    </Typography>
                                    {ordem.resumo && (
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            {ordem.resumo}
                                        </Typography>
                                    )}
                                    { ordem.id_status != null && <Status status={ordem.id_status} size={'small'} />}

                                    { ordem.departamentos?.length > 0 ? ordem.departamentos.map((item, idx) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }} key={idx}>
                                            <h3 style={{fontSize: '12px'}}>{item.nome_departamento}:</h3>
                                            <Box>
                                                <Status key={idx} status={item.id_status} size={'small'} />
                                            </Box>
                                        </Box>
                                    )) : null }


                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, mb: 1 }}>
                                        {ordem.agrupavel === 1 && 
                                            <Typography variant="caption" sx={{ 
                                                backgroundColor: '#e3f2fd', 
                                                padding: '2px 8px', 
                                                borderRadius: 1 
                                            }}>
                                                Qtd: {ordem.quantidade}
                                            </Typography>
                                        }
                                        <Typography variant="caption" sx={{ 
                                            backgroundColor: '#fff3e0', 
                                            padding: '2px 8px', 
                                            borderRadius: 1 
                                        }}>
                                            Prazo: {ordem.prazo_producao} dias
                                        </Typography>
                                        {ordem.observacao && (
                                            <Typography variant="caption" sx={{ 
                                                backgroundColor: '#f3e5f5', 
                                                padding: '2px 8px', 
                                                borderRadius: 1 
                                            }}>
                                                📝 {ordem.observacao}
                                            </Typography>
                                        )}
                                    </Box>
                                    
                                    {/* Exibição dos Requisitos */}
                                    {requisitos.length > 0 && (
                                        <Box sx={{ mt: 2 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {requisitos.filter(req => req.status === 0)
                                                    .sort((a, b) => a.ordem - b.ordem)
                                                    .map((requisito, reqIndex) => (
                                                    <Box key={reqIndex} sx={{ 
                                                        border: '1px solid #e0e0e0', 
                                                        borderRadius: 1, 
                                                        padding: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        backgroundColor: requisito.status === 1 ? '#e8f5e8' : '#fff'
                                                    }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                               {requisito.nome}: 
                                                            </Typography>
                                                        </Box>
                                                        
                                                        {/* Dependências */}
                                                        {requisito.dependencias && requisito.dependencias.length > 0 && (
                                                            <Box>
                                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap'}}>
                                                                    {requisito.dependencias.filter(dep => dep.status === 0).map((dep, depIndex) => (
                                                                        <Box key={depIndex} sx={{
                                                                            backgroundColor: dep.cor || '#e0e0e0',
                                                                            color: 'white',
                                                                            padding: '2px 6px',
                                                                            borderRadius: 1,
                                                                            fontSize: '12px',
                                                                            fontWeight: 'bold',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 0.5
                                                                        }}>
                                                                            {dep.nome}
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}