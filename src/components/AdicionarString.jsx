import '~/assets/scss/AdicionarString.scss'
import InputCalendar from './InputCalendar';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarString({value, setValue}) {
    return (
        <Box className="adicionarString">
            <form action="">
                <div className="item full">
                    <TextField value={value} onChange={
                        (e) => {
                            setValue(e.target.value)
                        }
                    } label="Título" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}