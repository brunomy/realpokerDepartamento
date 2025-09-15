import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from '../InputCalendar';
import { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarFuncionario({ novoFuncionario, setNovoFuncionario, funcionarios }) {
    const [nome, setNome] = useState(novoFuncionario?.nome || '')
    const [funcao, setFuncao] = useState(novoFuncionario?.funcao || '')
    const [senha, setSenha] = useState(novoFuncionario?.senha || '')
    const [codigo, setCodigo] = useState(novoFuncionario?.codigo || '')

    useEffect(() => {
        setNovoFuncionario({
            id: novoFuncionario?.id,
            nome: nome,
            funcao: funcao,
            senha: senha,
            codigo: codigo
        })
    }, [nome, funcao, senha, codigo])

    return (
        <Box className="adicionarEquipe">
            <form action="">
                <div className="item full">
                    <TextField error={funcionarios.some((funcionario) => funcionario.nome === nome && funcionario.id !== novoFuncionario?.id)} value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.nome === nome && funcionario.id !== novoFuncionario?.id) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>O nome desse funcionário já existe</p>}
                </div>
                <div className="item full">
                    <TextField value={funcao} onChange={(e) => setFuncao(e.target.value)} label="Função" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField 
                        inputProps={{
                            maxLength: 4,
                            inputMode: "numeric",
                        }}
                    error={funcionarios.some((funcionario) => funcionario.senha === senha && funcionario.id !== novoFuncionario?.id)} value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.senha === senha && funcionario.id !== novoFuncionario?.id) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>Senha já cadastrada na equipe</p>}
                </div>
                <div className="item full">
                    <TextField error={funcionarios.some((funcionario) => funcionario.codigo === codigo && funcionario.id !== novoFuncionario?.id)} value={codigo} onChange={(e) => setCodigo(e.target.value)} type="password" label="Código" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.codigo === codigo && funcionario.id !== novoFuncionario?.id) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>Código já cadastrado na equipe</p>}
                </div>
            </form>
        </Box>
    )
}