import '~/assets/scss/AdicionarAtividade.scss'
import { useState } from 'react';
import InputCalendar from './InputCalendar';
import InputAuto from './InputAuto';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarAtividade() {
    const [equipe, setEquipe] = useState(null);
    const [checklist, setChecklist] = useState([]);
    const [checkname, setCheckname] = useState('');

    const selecionarPredefinido = (value) => {
        if (value && Array.isArray(value.value)) {
          setChecklist(prev => [...prev, ...value.value]);
        }
    };

    const addChecklist = (value) => {
        if (value) {
          setChecklist(prev => [...prev, value]);
          setCheckname('');
        }
    };
    const removeChecklist = (nome) => {
        setChecklist(prev => prev.filter(item => item !== nome));
      };

    const equipeList = [
        { label: 'M1', value: 1},
        { label: 'M2', value: 2},
        { label: 'M3', value: 3},
        { label: 'M4', value: 4},
    ]
    const checkList = [
        { label: 'Criar mesa', value: ["Medir as partes da mesa", "Cortar partes da mesa", "Polir partes da mesa", "Montar a mesa"]},
        { label: 'Mesa com porta copos', value: ["Abrir buracos na mesa", "Polir os buracos", "Encaixar porta copo"]},
    ]

    return (
        <Box className="adicionarAtividade">
            <form action="">
                <div className="item">
                    <InputCalendar label="Selecione a data" width={'100%'} />
                </div>
                <div className="item">
                    <InputAuto label="Equipe" list={equipeList} setValue={setEquipe} width={'100%'} />
                </div>
                <div className="item full">
                    <TextField label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>
                <h3>Checklist</h3>
                <div className="checklist">
                    <div className="select">
                        <InputAuto label="Checklists" list={checkList} setValue={selecionarPredefinido} width={'100%'} />
                    </div>
                    <div className="adicionar">
                        <div className="input">
                            <TextField value={checkname} onChange={(e) => setCheckname(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                        </div>
                        <Button onClick={() => addChecklist(checkname)} className="adicionarAtividade" variant="contained" size="large">Adicionar</Button>
                    </div>
                    <div className="list">
                        {
                            checklist.length > 0 && (
                                <ul>
                                    {
                                        checklist.map((item, index) => (
                                            <li key={index}>
                                                <span>{item}</span>
                                                <Button variant="contained" color="error" onClick={() => removeChecklist(item)} className="delete">
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