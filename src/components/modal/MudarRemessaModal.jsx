import '~/assets/scss/MudarRemessaModal.scss'
import { useState, useEffect } from 'react';
import InputCalendar from '../InputCalendar';
import InputAuto from '../InputAuto';

import { Box, Button, Tabs, Tab } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { remessa_api } from '../../api';
import EditarRemessa from '../EditarRemessa';

export default function MudarRemessaModal({ newRemessa, setNewRemessa, selectedOrdem, selectedRemessa, setSelectedRemessa, tab, setTab }) {
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
                {tab === 0 && <Remessas selectedOrdem={selectedOrdem} selectedRemessa={selectedRemessa} setSelectedRemessa={setSelectedRemessa} />}
                {tab === 1 && <NovaRemessa newRemessa={newRemessa} setNewRemessa={setNewRemessa} />}
            </div>
        </Box>
    )
}

function Remessas({ selectedOrdem, selectedRemessa, setSelectedRemessa }) {
    const [remessas, setRemessas] = useState(null);

    const carregar = async () => {
        try {
            const res = await remessa_api.getRemessasEmAndamento();
            setRemessas(res.data || null);

            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, []);



    const remessasSelect = remessas ? remessas.filter(item => item.id !== selectedOrdem?.id_remessa).map((item) => ({ label: item.titulo, value: item.id })) : [];

    return (
        <Box>
            <div className="item full">
                <InputAuto 
                    label="Remessa" 
                    list={remessasSelect}
                    setValue={setSelectedRemessa} 
                    value={selectedRemessa}
                    width={'100%'} 
                />
            </div>
        </Box>
    )
}

function NovaRemessa({ newRemessa, setNewRemessa }) {
    return (
        <Box className="nova_remessa_form">
            <EditarRemessa remessa={newRemessa} setRemessa={setNewRemessa} />
        </Box>
    )
}