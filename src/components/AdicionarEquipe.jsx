import '~/assets/scss/AdicionarEquipe.scss'
import InputCalendar from './InputCalendar';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarEquipe() {
    return (
        <Box className="adicionarEquipe">
            <form action="">
                <div className="item full">
                    <TextField label="Nome da equipe" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}