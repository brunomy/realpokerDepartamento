import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from '../InputCalendar';
import { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarEquipe({ setNovaEquipe, equipes }) {
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()

    useEffect(() => {
        setNovaEquipe({
            nome: nome,
            descricao: descricao,
        })
    }, [nome, descricao])

    return (
        <Box className="adicionarEquipe">
            <form action="">
                <div className="item full">
                    <TextField error={equipes.some((equipe) => equipe.nome === nome)} value={nome} onChange={(e) => setNome(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                    {equipes.some((equipe) => equipe.nome === nome) && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>O nome dessa equipe já existe</p>}
                </div>
                <div className="item full">
                    <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)} label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}