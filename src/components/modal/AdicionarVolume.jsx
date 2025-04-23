import '~/assets/scss/AdicionarVolume.scss'
import { useState } from 'react';
import InputAuto from '../InputAuto';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useUser } from '~/context/UserContext';

export default function AdicionarVolume({ value, setValue, id_atividade }) {
    const { volumes } = useUser();

    const formatarArray = () => {
        let volumes_atividade = volumes.filter((volume) => volume.id_atividade == id_atividade)
        return volumes_atividade.map((volume) => ({
            id: volume.id,
            label: volume.title
        }));
    };

    const [selectedVolume, setSelectedVolume] = useState(null);
    const onChange = (newValue) => {
        setSelectedVolume(newValue);
        setValue({ ...value, id_volume: selectedVolume.id })
    }

    return (
        <Box className="adicionarVolume">
            <form action="">
                <div className="item full">
                    <InputAuto
                        value={selectedVolume}
                        setValue={onChange}
                        label="Volume"
                        list={formatarArray()}
                        width={'100%'}
                    />
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