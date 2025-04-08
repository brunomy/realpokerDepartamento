import '~/assets/scss/AdicionarChecklist.scss'
import { useState, useEffect } from 'react';
import InputCalendar from './InputCalendar';
import InputAuto from './InputAuto';

import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdicionarChecklist() {
    const [checklist, setChecklist] = useState([]);
    const [checkname, setCheckname] = useState('');
    const [categoria, setCategoria] = useState(null);
    const [categoriaList, setCategoriaList] = useState([]);

    useEffect(() => {
        console.log(categoriaList);
    }, [categoriaList]);

    const addChecklist = () => {
        if(checkname){
            checklist.push(checkname)
            setCheckname('')
        }
    }
    const removeChecklist = (nome) => {
        setChecklist(prev => prev.filter(item => item !== nome));
    };

    // const salvar(){
    //     setFunc
    // }

    const addCategoria = () => {
        if (categoria) {
            setCategoriaList(prev => [...prev, categoria]);
            setCategoria(null);
        }
    }
    const removeCategorialist = (categoria) => {
        setCategoriaList(prev => prev.filter(item => item.value !== categoria.value));
    }

    const categorias = [
        { label: 'Mesa de poker', value: 'Mesa de poker'},
        { label: 'Futmesa', value: 'Futmesa'},
        { label: 'Cadeira', value: 'Cadeira'},
    ]

    return (
        <Box className="adicionarAtividade">
            <form action="">
                <div className="item full">
                    <TextField label="Descrição" variant="outlined" sx={{width: '100%'}} />
                </div>

                <h3>Categorias</h3>
                <div className="checklist categoria_checklist">
                    <div className="adicionar">
                        <div className="input">
                            <InputAuto 
                                label="Categorias" 
                                list={categorias.filter(
                                    c => !categoriaList.some(item => item.value === c.value)
                                )}
                                setValue={setCategoria} 
                                onChange={(e) => setCategoriaList(e.target.value)}
                                width={'100%'} 
                            />
                        </div>
                        <Button onClick={addCategoria} className="adicionarAtividade" variant="contained" size="large">Adicionar</Button>
                    </div>
                    <div className="list">
                        {
                            categoriaList.length > 0 && (
                                <ul>
                                    {
                                        categoriaList.map((item, index) => (
                                            <li key={index}>
                                                <span>{item['label']}</span>
                                                <Button variant="contained" color="error" onClick={() => removeCategorialist(item)} className="delete">
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
                <h3>Checklist</h3>
                <div className="checklist">
                    <div className="adicionar">
                        <div className="input">
                            <TextField value={checkname} onChange={(e) => setCheckname(e.target.value)} label="Nome" variant="outlined" sx={{width: '100%'}} />
                        </div>
                        <Button onClick={addChecklist} className="adicionarAtividade" variant="contained" size="large">Adicionar</Button>
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