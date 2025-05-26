import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';
import InputCalendar from '../InputCalendar';
import InputAuto from '../InputAuto';

import { Box, Button, Tabs, Tab } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditarRemessa() {
    const [estado, setEstado] = useState({ label: 'GO', value: 'GO'});
    const estados = [
        { label: 'GO', value: 'GO'},
        { label: 'MT', value: 'MT'},
        { label: 'DF', value: 'DF'},
    ]
    const [cidade, setCidade] = useState({ label: 'Goiânia', value: 'Goiânia'});
    const cidades = [
        { label: 'Goiânia', value: 'Goiânia'},
        { label: 'Aparecida de Goiânia', value: 'Aparecida de Goiânia'},
        { label: 'Inhumas', value: 'Inhumas'},
    ]

    return (
        <Box className="mudar_remessa">
            <Box className="nova_remessa_form">
                <div className="item full">
                    <InputCalendar label="Entrega" width={'100%'} />
                </div>
                <div className="item">
                    <TextField value={'74581-395'} label="CEP" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <TextField value={'s/n'} label="Número" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={'Rua sp25'} label="Rua" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={'Quadra 08, Lote 25'} label="Complemento" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={'Setor Perim'} label="Bairro" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item">
                    <InputAuto 
                        label="estado" 
                        list={estados}
                        setValue={setEstado} 
                        value={estado}
                        width={'100%'} 
                    />
                </div>
                <div className="item">
                    <InputAuto 
                        label="cidade" 
                        list={cidades}
                        setValue={setCidade} 
                        value={cidade}
                        width={'100%'} 
                    />
                </div>
                <div className="item full">
                    <TextField value={'Bruno Yoshimura'} label="Destinatário" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={'(62) 99555-4991'} label="Telefone" variant="outlined" sx={{width: '100%'}} />
                </div>
                <div className="item full">
                    <TextField value={'700.939.789-23'} label="CPF/CNPJ" variant="outlined" sx={{width: '100%'}} />
                </div>
            </Box>
        </Box>
    )
}