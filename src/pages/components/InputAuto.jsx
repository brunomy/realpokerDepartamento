import { useState, useRef, useEffect } from 'react';
import { Box, Autocomplete, Typography, TextField } from '@mui/material';

export default function InputAuto({ label, list, setValue, width }) {
    const hint = useRef('');
    const [inputValue, setInputValue] = useState('');

    return (
        <Autocomplete
            onKeyDown={(event) => {
                if (event.key === 'Tab') {
                    if (hint.current) {
                        setInputValue(hint.current);
                        event.preventDefault();
                    }
                }
            }}
            onClose={() => {
                hint.current = '';
            }}
            onChange={(event, newValue) => {
                setInputValue(newValue?.label || '');
                setValue(newValue || null);
            }}
            disablePortal
            inputValue={inputValue}
            id="combo-box-hint-demo"
            options={list}
            sx={{ width: width || 300 }}
            renderInput={(params) => {
                return (
                    <Box sx={{ position: 'relative' }}>
                        <Typography
                        sx={{
                            position: 'absolute',
                            opacity: 0.5,
                            left: 14,
                            top: 16,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: 'calc(100% - 75px)', // Adjust based on padding of TextField
                        }}
                        >
                        {hint.current}
                        </Typography>
                        <TextField
                            {...params}
                            onChange={(event) => {
                                const newValue = event.target.value || '';
                                setInputValue(newValue);
                                const matchingOption = list.find((option) =>
                                option.label.toLowerCase().startsWith(newValue.toLowerCase())
                                );
                                hint.current = matchingOption ? matchingOption.label : '';
                            }}
                            label={label}
                        />
                    </Box>
                );
            }}
        />
    )
}