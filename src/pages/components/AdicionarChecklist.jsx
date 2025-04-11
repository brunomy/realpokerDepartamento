import '~/assets/scss/AdicionarChecklist.scss'
import { useState, useEffect } from 'react';
import InputCalendar from './InputCalendar';
import InputAuto from './InputAuto';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarChecklist() {
    const [etapas, setEtapas] = useState([]);
    const [etapaName, setEtapaName] = useState('');
    const [categoria, setCategoria] = useState(null);

    const addEtapa = () => {
        if(etapaName){
            etapas.push(etapaName)
            setEtapaName('')
        }
    }
    const removeEtapa = (nome) => {
        setEtapas(prev => prev.filter(item => item !== nome));
    };

    // const salvar(){
    //     setFunc
    // }


    const categorias = [
        { label: 'Mesa de poker', value: 'Mesa de poker'},
        { label: 'Futmesa', value: 'Futmesa'},
        { label: 'Cadeira', value: 'Cadeira'},
    ]

    return (
        <Box className="adicionarAtividade">
            <form action="">
                <div className="item full">
                    <InputAuto 
                        label="Categoria" 
                        list={categorias}
                        setValue={setCategoria} 
                        value={categoria}
                        width={'100%'} 
                    />
                </div>

                <h3>Etapas</h3>
                <div className="etapas">
                    <div className="adicionar">
                        <div className="input">
                            <TextField value={etapaName} onChange={(e) => setEtapaName(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                        </div>
                        <Button onClick={addEtapa} className="adicionarAtividade" variant="contained" size="large">Adicionar</Button>
                    </div>
                    <div className="list">
                        {
                            etapas.length > 0 && (
                                <ul>
                                    {
                                        etapas.map((item, index) => (
                                            <li key={index}>
                                                <span>{item}</span>
                                                <Button variant="contained" color="error" onClick={() => removeEtapa(item)} className="delete">
                                                    <DeleteIcon />
                                                </Button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </div>
                </div>
            </form>
        </Box>
    )
}