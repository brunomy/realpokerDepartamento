import '~/assets/scss/AdicionarVolume.scss'
import { useState } from 'react';
import InputAuto from './InputAuto';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function AdicionarVolume() {
    return (
        <Box className="adicionarVolume">
            <form action="">
                <div className="item full">
                    <TextField label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <TextField label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        },
                    }} />
                </div>
                <div className="item">
                    <TextField label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }} />
                </div>
            </form>
        </Box>
    )
}