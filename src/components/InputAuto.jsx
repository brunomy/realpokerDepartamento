import { useState, useRef, useEffect } from 'react';
import { Box, Autocomplete, Typography, TextField } from '@mui/material';

export default function InputAuto({ label, list, setValue, width, value = null }) {
    const hint = useRef('');
    const [inputValue, setInputValue] = useState('');

    // Atualiza o inputValue visível baseado no value selecionado
    useEffect(() => {
        if (value?.label) {
            setInputValue(value.label);
        } else {
            setInputValue('');
        }
    }, [value]);

    return (
        <Autocomplete
            sx={{ maxWidth: '100%' }}
            value={value} // <- valor selecionado
            inputValue={inputValue} // <- texto no input
            onChange={(event, newValue) => {
                setInputValue(newValue?.label || '');
                setValue(newValue || null);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Tab' && hint.current) {
                    setInputValue(hint.current);
                    event.preventDefault();
                }
            }}
            onClose={() => (hint.current = '')}
            options={list}
            isOptionEqualToValue={(option, val) => option?.id === val?.id}
            getOptionLabel={(option) => option?.label || ''}
            sx={{ width: width || 300 }}
            renderInput={(params) => (
                <Box sx={{ position: 'relative' }}>
                    <Typography
                        sx={{
                            position: 'absolute',
                            opacity: 0.5,
                            left: 14,
                            top: 16,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: 'calc(100% - 75px)',
                        }}
                    >
                        {hint.current}
                    </Typography>
                    <TextField
                        {...params}
                        onChange={(event) => {
                            const newValue = event.target.value || '';
                            setInputValue(newValue);
                            const match = list.find((option) =>
                                option.label.toLowerCase().startsWith(newValue.toLowerCase())
                            );
                            hint.current = match ? match.label : '';
                        }}
                        label={label}
                    />
                </Box>
            )}
        />
    );
}
