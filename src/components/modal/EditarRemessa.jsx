import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';
import InputCalendar from '../InputCalendar';

import { Box, Button, Tabs, Tab, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { formatarData, formatCEP, formatTelefone, formatCpfCnpj, converterDataParaBanco, validarCEP, validarTelefone, validarCpfCnpj } from '../../Utils';
import { remessa_api } from '../../api';
import Loading from '../Loading';

export default function EditarRemessa({ remessa, setRemessa }) {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [initialCep, setInitialCep] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregar();
    }, []);

    useEffect(() => {
        // Carregar cidades quando remessa carrega e tem estado
        if (remessa?.id_estado && estados.length > 0) {
            carregarCidades(remessa.id_estado);
        }
    }, [remessa?.id_estado, estados]);

    const carregar = async () => {
        try {
            const resEstados = await remessa_api.getEstados();
            setEstados(resEstados.data || []);

            if (remessa?.id_estado) {
                const resCidades = await remessa_api.getCidades(remessa.id_estado);
                setCidades(resCidades.data || []);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const findEstadoIdByUF = (uf) => {
        const estado = estados.find(e => e.uf === uf);
        return estado ? estado.id : null;
    };

    const findCidadeIdByName = (nomeCidade, estadoId) => {
        const cidade = cidades.find(c => 
            c.cidade.toLowerCase() === nomeCidade.toLowerCase() && 
            c.id_estado === estadoId
        );
        return cidade ? cidade.id : null;
    };

    const carregarCidades = async (estadoId) => {
        if (!estadoId) {
            setCidades([]);
            return;
        }
        
        try {
            const res = await remessa_api.getCidades(estadoId);
            setCidades(res.data || []);
        } catch (err) {
            console.error('Erro ao carregar cidades:', err);
        }
    };

    useEffect(() => {
        if (remessa?.cep && !initialCep) {
            setInitialCep(remessa.cep);
        }
    }, [remessa]);

    const buscarCEP = async (cep) => {
        try {
            const cleanCep = cep.replace(/\D/g, '');
            if (cleanCep.length === 8) {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    const estadoId = findEstadoIdByUF(data.uf);
                    
                    if (estadoId) {
                        // Carregar cidades do estado
                        try {
                            const resCidades = await remessa_api.getCidades(estadoId);
                            const cidadesDoEstado = resCidades.data || [];
                            setCidades(cidadesDoEstado);
                            
                            // Buscar ID da cidade após carregar as cidades
                            const cidade = cidadesDoEstado.find(c => 
                                c.cidade.toLowerCase() === data.localidade.toLowerCase() && 
                                c.id_estado === estadoId
                            );
                            const cidadeId = cidade ? cidade.id : null;
                            
                            setRemessa(prev => ({
                                ...prev,
                                endereco: data.logradouro || '',
                                bairro: data.bairro || '',
                                id_estado: estadoId,
                                id_cidade: cidadeId
                            }));
                        } catch (cidadeError) {
                            console.error('Erro ao carregar cidades:', cidadeError);
                            // Fallback: salvar apenas estado
                            setRemessa(prev => ({
                                ...prev,
                                endereco: data.logradouro || '',
                                bairro: data.bairro || '',
                                id_estado: estadoId
                            }));
                        }
                    } else {
                        setRemessa(prev => ({
                            ...prev,
                            endereco: data.logradouro || '',
                            bairro: data.bairro || '',
                            cidade: data.localidade || ''
                        }));
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const handleCEPChange = (e) => {
        const formatted = formatCEP(e.target.value);
        setRemessa({ ...remessa, cep: formatted });
        
        const cleanCep = formatted.replace(/\D/g, '');
        if (cleanCep.length === 8) {
            buscarCEP(formatted);
        }
    };

    const handleTelefoneChange = (e) => {
        const formatted = formatTelefone(e.target.value);
        setRemessa({ ...remessa, telefone: formatted });
    };

    const handleCpfCnpjChange = (e) => {
        const formatted = formatCpfCnpj(e.target.value);
        setRemessa({ ...remessa, cpf_cnpj: formatted });
    };

    const handleDateChange = (field, newValue) => {
        const dataConvertida = converterDataParaBanco(newValue);
        setRemessa({ ...remessa, [field]: dataConvertida });
    };

    // Don't render if remessa is not loaded yet
    if (!remessa) {
        return <Loading />;
    }

    return (
        <Box className="mudar_remessa">
            <Box className="nova_remessa_form">
                <div className="item" style={{ position: 'relative' }}>
                    <InputCalendar 
                        label="Saída" 
                        width={'100%'} 
                        value={remessa?.nova_saida ? formatarData(remessa?.nova_saida) : formatarData(remessa?.saida)} 
                        setValue={(newValue) => handleDateChange('nova_saida', newValue)} 
                    />
                    { (remessa?.nova_saida != null) && 
                        <p style={{
                            position: 'absolute',
                            fontSize: 10,
                            bottom: 2,
                            right: 12,
                            pointerEvents: 'none',
                            color: '#ed6c02'
                        }}>Data inicial: <b>{formatarData(remessa?.saida)}</b></p>
                    }
                </div>
                <div className="item" style={{ position: 'relative' }}>
                    <InputCalendar 
                        label="Entrega" 
                        width={'100%'} 
                        value={remessa?.nova_entrega ? formatarData(remessa?.nova_entrega) : formatarData(remessa?.entrega)} 
                        setValue={(newValue) => handleDateChange('nova_entrega', newValue)} 
                    />
                    { (remessa?.nova_entrega != null) && 
                        <p style={{
                            position: 'absolute',
                            fontSize: 10,
                            bottom: 2,
                            right: 12,
                            pointerEvents: 'none',
                            color: '#ed6c02'
                        }}>Data inicial: <b>{formatarData(remessa?.entrega)}</b></p>
                    }
                </div>
                <div className="item">
                    <TextField
                        label="CEP"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        size="small"
                        value={remessa?.cep || ""}
                        onChange={handleCEPChange}
                        error={(remessa?.cep && !validarCEP(remessa.cep) || !remessa?.cep)}
                        inputProps={{
                            maxLength: 10,
                            placeholder: "00.000-000"
                        }}
                    />
                </div>
                <div className="item">
                    <TextField 
                        value={remessa?.numero || ""} 
                        label="Número" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={(e) => setRemessa({ ...remessa, numero: e.target.value })}
                        error={!remessa?.numero}
                    />
                </div>
                <div className="item full">
                    <TextField 
                        value={remessa?.endereco || ""} 
                        label="Rua" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={(e) => setRemessa({ ...remessa, endereco: e.target.value })}
                        error={!remessa?.endereco}
                    />
                </div>
                <div className="item full">
                    <TextField 
                        value={remessa?.complemento || ""} 
                        label="Complemento" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={(e) => setRemessa({ ...remessa, complemento: e.target.value })}
                    />
                </div>
                <div className="item full">
                    <TextField 
                        value={remessa?.bairro || ""} 
                        label="Bairro" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={(e) => setRemessa({ ...remessa, bairro: e.target.value })}
                        error={!remessa?.bairro}
                    />
                </div>
                <div className="item">
                    <FormControl fullWidth size="small">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={remessa?.id_estado || ''}
                            label="Estado"
                            onChange={(e) => {
                                const estadoId = e.target.value;
                                setRemessa({ ...remessa, id_estado: estadoId, id_cidade: '' });
                                carregarCidades(estadoId);
                            }}
                        >
                            {estados.map((estado) => (
                                <MenuItem key={estado.id} value={estado.id}>
                                    {estado.estado} - {estado.uf}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="item">
                    <FormControl fullWidth size="small">
                        <InputLabel>Cidade</InputLabel>
                        <Select
                            value={remessa?.id_cidade || ''}
                            label="Cidade"
                            onChange={(e) => setRemessa({ ...remessa, id_cidade: e.target.value })}
                            disabled={!remessa?.id_estado}
                            error={!remessa?.id_cidade}
                        >
                            {cidades.length === 0 && remessa?.id_estado && (
                                <MenuItem disabled value="">
                                    Carregando cidades...
                                </MenuItem>
                            )}
                            {cidades.map((cidade) => (
                                <MenuItem key={cidade.id} value={cidade.id}>
                                    {cidade.cidade}
                                </MenuItem>
                            ))}
                            {cidades.length === 0 && !remessa?.id_estado && (
                                <MenuItem disabled value="">
                                    Selecione um estado primeiro
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="item full">
                    <TextField 
                        value={remessa?.nome || ""} 
                        label="Destinatário" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={(e) => setRemessa({ ...remessa, nome: e.target.value })}
                        error={!remessa?.nome}
                    />
                </div>
                <div className="item">
                    <TextField 
                        value={remessa?.telefone || ""} 
                        label="Telefone" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={handleTelefoneChange}
                        error={(remessa?.telefone && !validarTelefone(remessa.telefone)) || !remessa?.telefone}
                        inputProps={{
                            maxLength: 15,
                            placeholder: "(00) 00000-0000"
                        }}
                    />
                </div>
                <div className="item">
                    <TextField 
                        value={remessa?.cpf_cnpj || ""} 
                        label="CPF/CNPJ" 
                        variant="outlined" 
                        sx={{width: '100%'}} 
                        size="small"
                        onChange={handleCpfCnpjChange}
                        error={(remessa?.cpf_cnpj && !validarCpfCnpj(remessa.cpf_cnpj)) || !remessa?.cpf_cnpj}
                        inputProps={{
                            maxLength: 18,
                        }}
                    />
                </div>
            </Box>
        </Box>
    )
}