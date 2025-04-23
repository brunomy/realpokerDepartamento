import '~/assets/scss/AdicionarFuncionario.scss'
import InputCalendar from '../InputCalendar';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarFuncionario() {
    return (
        <Box className="adicionarFuncionario">
            <form action="">
                <div className="item full">
                    <TextField label="Nome" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <InputCalendar label="Data de contratação" width={'100%'} />
                </div>
                <div className="item">
                    <TextField label="Função" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <TextField label="Usuário" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <TextField label="Senha" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}