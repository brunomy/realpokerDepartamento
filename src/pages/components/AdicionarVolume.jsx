import '~/assets/scss/AdicionarVolume.scss'
import { useState } from 'react';
import InputAuto from './InputAuto';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function AdicionarVolume({ value, setValue }) {
    return (
        <Box className="adicionarVolume">
            <form action="">
                <div className="item full">
                    <TextField value={value.descricao} onChange={(e) => setValue({ ...value, descricao: e.target.value })} label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <TextField value={value.comprimento} onChange={(e) => setValue({ ...value, comprimento: e.target.value })} label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField value={value.largura} onChange={(e) => setValue({ ...value, largura: e.target.value })} label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField value={value.altura} onChange={(e) => setValue({ ...value, altura: e.target.value })} label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField value={value.peso} onChange={(e) => setValue({ ...value, peso: e.target.value })} label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }} />
                </div>
            </form>
        </Box>
    )
}