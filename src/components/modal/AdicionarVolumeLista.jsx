import '~/assets/scss/AdicionarVolumeLista.scss'
import { useState, useEffect } from 'react';
import InputAuto from '../InputAuto';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useUser } from '~/context/UserContext';

export default function AdicionarVolumeLista({ atividade }) {
    const { volumes } = useUser();
    let volumes_atividade = volumes.filter((volume) => volume.id_atividade == atividade.id_atividade)

    return (
        <Box className="adicionarVolumeLista">
            { volumes_atividade?.map((item) => <VolumeItem item={item} atividade_id={atividade.id} />)}
        </Box>
    )
}

function VolumeItem({item, atividade_id}) {
    const { volumesOP, setVolumesOP } = useUser();
    
    var find = volumesOP.find(volume => (
        volume.id_ativ == atividade_id && volume.id_volume == item.id
    ));

    useEffect(() => {
        find = volumesOP.find(volume => (
            volume.id_ativ == atividade_id && volume.id_volume == item.id
        ));
    }, [volumesOP])

    const [check, setCheck] = useState(false);
    const [comprimento, setComprimento] = useState('');
    const [largura, setLargura] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');

    const salvar = () => {
        if(comprimento == ''){
            alert('Preencha o comprimento')
            return
        }
        if(largura == ''){
            alert('Preencha a largura')
            return
        }
        if(altura == ''){
            alert('Preencha a altura')
            return
        }
        if(peso == ''){
            alert('Preencha o peso')
            return
        }

        setVolumesOP([
            ...volumesOP,
            {
                id: volumesOP.length + 1,
                id_ativ: atividade_id,
                id_atividade: item.id_atividade,
                id_etapa: item.id_etapa,
                id_volume: item.id,
                id_remessa: 5951,
                id_embalagem: null,
                comprimento: comprimento,
                largura: largura,
                altura: altura,
                peso: peso
            },
        ]);
    }

    const deletar = () => {
        setVolumesOP(volumesOP.filter(volume => volume.id !== find.id))
    }

    return (
        <Box className={'volume_item' + (find ? ' volume_adicionado' : '')}>
            { !find && (
                <>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup className="check_content">
                        <FormControlLabel 
                            control={
                                <Switch checked={check} onChange={(e) => setCheck(e.target.checked)} />
                            }
                            label={item.title}
                        />
                        { check && <Button size="small" variant="contained" onClick={salvar}>Salvar</Button>}
                    </FormGroup>
                </FormControl>
                { check && 
                    <Box className="dimensoes_form">
                        <div className="item">
                            <TextField value={comprimento} onChange={(e) => setComprimento(e.target.value)} label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField value={largura} onChange={(e) => setLargura(e.target.value)} label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField value={altura} onChange={(e) => setAltura(e.target.value)} label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField value={peso} onChange={(e) => setPeso(e.target.value)} label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                },
                            }} />
                        </div>
                    </Box>

                }
                </>
            )}

            { find && (
                <Box>
                    <div className="title_content">
                        <h2>{item.title}</h2>
                        <Button color="error" onClick={deletar}><DeleteTwoToneIcon  /></Button>
                    </div>
                    <div className="dimensoes">
                        <div>
                            <h3>Dimensões</h3>
                            <span>{find.comprimento} x {find.largura} x {find.altura}</span>
                        </div>
                        <div>
                            <h3>Peso</h3>
                            <span>{find.peso}</span>
                        </div>
                    </div>
                </Box>
            )}
        </Box>
    )
}