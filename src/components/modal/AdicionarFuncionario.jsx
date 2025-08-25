import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from '../InputCalendar';
import { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarFuncionario({ setNovoFuncionario, funcionarios }) {
    const [nome, setNome] = useState()
    const [funcao, setFuncao] = useState()
    const [senha, setSenha] = useState()
    const [codigo, setCodigo] = useState()

    useEffect(() => {
        setNovoFuncionario({
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
                    <TextField error={funcionarios.some((funcionario) => funcionario.nome === nome)} value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.nome === nome) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>O nome desse funcionário já existe</p>}
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
                    error={funcionarios.some((funcionario) => funcionario.senha === senha)} value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.senha === senha) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>A senha desse funcionário já existe</p>}
                </div>
                <div className="item full">
                    <TextField error={funcionarios.some((funcionario) => funcionario.codigo === codigo)} value={codigo} onChange={(e) => setCodigo(e.target.value)} type="password" label="Código" variant="outlined" sx={{width: '100%'}} />
                    {funcionarios.some((funcionario) => funcionario.codigo === codigo) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>O código desse funcionário já existe</p>}
                </div>
            </form>
        </Box>
    )
}