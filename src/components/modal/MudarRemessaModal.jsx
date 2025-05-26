import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';
import InputCalendar from '../InputCalendar';
import InputAuto from '../InputAuto';

import { Box, Button, Tabs, Tab } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MudarRemessaModal() {
    const [tab, setTab] = useState(0);
    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Box className="mudar_remessa">
            <Tabs
                value={tab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                <Tab label="Remessas" />
                <Tab label="Nova remessa " />
            </Tabs>

            <div className="tab_content">
                {tab === 0 && <Remessas />}
                {tab === 1 && <NovaRemessa />}
            </div>
        </Box>
    )
}

function Remessas() {
    const [remessa, setRemess] = useState(null);
    const remessas = [
        { label: '5953-1', value: '5953-1'},
        { label: '5954-1', value: '5954-1'},
        { label: '5954-2', value: '5954-2'},
    ]

    return (
        <Box>
            <div className="item full">
                <InputAuto 
                    label="Remessa" 
                    list={remessas}
                    setValue={setRemess} 
                    value={remessa}
                    width={'100%'} 
                />
            </div>
        </Box>
    )
}

function NovaRemessa() {
    const [estado, setEstado] = useState(null);
    const estados = [
        { label: 'GO', value: 'GO'},
        { label: 'MT', value: 'MT'},
        { label: 'DF', value: 'DF'},
    ]
    const [cidade, setCidade] = useState(null);
    const cidades = [
        { label: 'Goiânia', value: 'Goiânia'},
        { label: 'Aparecida de Goiânia', value: 'Aparecida de Goiânia'},
        { label: 'Inhumas', value: 'Inhumas'},
    ]

    return (
        <Box className="nova_remessa_form">
            <div className="item full">
                <InputCalendar label="Entrega" width={'100%'} />
            </div>
            <div className="item">
                <TextField value={''} label="CEP" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item">
                <TextField value={''} label="Número" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item full">
                <TextField value={''} label="Rua" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item full">
                <TextField value={''} label="Complemento" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item full">
                <TextField value={''} label="Bairro" variant="outlined" sx={{width: '100%'}} />
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
                <TextField value={''} label="Destinatário" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item full">
                <TextField value={''} label="Telefone" variant="outlined" sx={{width: '100%'}} />
            </div>
            <div className="item full">
                <TextField value={''} label="CPF/CNPJ" variant="outlined" sx={{width: '100%'}} />
            </div>
        </Box>

    )
}