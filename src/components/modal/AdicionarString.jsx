import '~/assets/scss/AdicionarString.scss'
import InputCalendar from '../InputCalendar';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarString({value, setValue, label = 'Título', type = 'text'}) {
    return (
        <Box className="adicionarString">
            <div className="item full">
                <TextField type={type} value={value} onChange={
                    (e) => {
                        setValue(e.target.value)
                    }
                } label={label} variant="outlined" sx={{width: '100%'}} />
            </div>
        </Box>
    )
}