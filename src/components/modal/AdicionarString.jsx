import '~/assets/scss/AdicionarString.scss'
import InputCalendar from '../InputCalendar';
import { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarString({value, setValue, label = 'Título', type = 'text'}) {
    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box className="adicionarString">
            <div className="item full">
                <TextField 
                    type={type} 
                    value={value} 
                    autoFocus 
                    inputRef={inputRef}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }} 
                    label={label} 
                    variant="outlined" 
                    sx={{width: '100%'}} 
                />
            </div>
        </Box>
    )
}