import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from '../InputCalendar';
import { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarFuncionario({ setNovoFuncionario, funcionarios, equipeId }) {
    const [nome, setNome] = useState()
    const [funcao, setFuncao] = useState()
    const [usuario, setUsuario] = useState()
    const [senha, setSenha] = useState()
    const [hash, setHash] = useState()

    useEffect(() => {
        setNovoFuncionario({
            id: funcionarios.length + 1,
            id_equipe: equipeId,
            nome: nome,
            funcao: funcao,
            usuario: usuario,
            senha: senha,
            hash: hash
        })
    }, [nome, funcao, usuario, senha, hash])

    return (
        <Box className="adicionarEquipe">
            <form action="">
                <div className="item full">
                    <TextField value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={funcao} onChange={(e) => setFuncao(e.target.value)} label="Função" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={usuario} onChange={(e) => setUsuario(e.target.value)} label="Usuário" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={hash} onChange={(e) => setHash(e.target.value)} type="password" label="Código" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}