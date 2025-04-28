import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from '../InputCalendar';
import { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarEquipe({ setNovaEquipe, equipes }) {
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [usuario, setUsuario] = useState()
    const [senha, setSenha] = useState()

    useEffect(() => {
        setNovaEquipe({
            id: equipes.length + 1,
            title: nome,
            descricao: descricao,
            usuario: usuario,
            senha: senha
        })
    }, [nome, descricao, usuario, senha])

    return (
        <Box className="adicionarEquipe">
            <form action="">
                <div className="item full">
                    <TextField value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)} label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={usuario} onChange={(e) => setUsuario(e.target.value)} label="Usuário" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}