import '~/assets/scss/AdicionarVolumeLista.scss'
import { useState, useEffect } from 'react';
import { atividade_api } from './../../api';

import InputAuto from '../InputAuto';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import Modal from '~/components/layout/Modal';
import AdicionarString from './../../components/modal/AdicionarString';


import { useUser } from '~/context/UserContext';

export default function AdicionarVolumeLista({ atividade, atualizar }) {
    const [volumes, setVolumes] = useState([]);

    const carregar = async () => {
        try {
            atualizar();
            const res = await atividade_api.getVolumesAtividade(atividade.id);
            
            setVolumes(res.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    return (
        <Box className="adicionarVolumeLista">
            { volumes?.map((item) => <VolumeItem item={item} carregar={carregar} atividade={atividade} />)}
        </Box>
    )
}

function VolumeItem({ item, carregar, atividade}) {
    const { usuarioLogado } = useUser();

    const [open, setOpen] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [status, setStatus] = useState(0);

    useEffect(() => {
        setCodigo('')
    }, [open]);
    
    const [check, setCheck] = useState(item?.status == 1 ? true : false);
    const [comprimento, setComprimento] = useState(item?.comprimento || '');
    const [largura, setLargura] = useState(item?.largura || '');
    const [altura, setAltura] = useState(item?.altura || '');
    const [peso, setPeso] = useState(item?.peso || '');

    const salvar = async () => {
        if(comprimento == '' || comprimento == 0){
            alert('Preencha o comprimento')
            return
        }
        if(largura == '' || largura == 0){
            alert('Preencha a largura')
            return
        }
        if(altura == '' || altura == 0){
            alert('Preencha a altura')
            return
        }
        if(peso == '' || peso == 0){
            alert('Preencha o peso')
            return
        }

        const payload = {
            id_user: usuarioLogado.id,
            id_departamento: atividade.id_departamento,
            id_equipe: atividade.id_equipe,
            id_ordem: atividade.id_ordem,
            id_atividade: atividade.id,
            codigo: codigo,
            titulo: item.volume,
            comprimento: comprimento,
            largura: largura,
            altura: altura,
            peso: peso,
            status: status
        }

        const res = await atividade_api.updateVolume(item.id, payload);
        return res
    }

    return (
        <Box className={'volume_item' + (find ? ' volume_adicionado' : '')}>
            { item?.status == 0 && (
                <>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup className="check_content">
                        <FormControlLabel 
                            control={
                                <Switch checked={check} onChange={(e) => setCheck(e.target.checked)} />
                            }
                            label={item.volume}
                        />
                        { check && <Button size="small" variant="contained" onClick={() => { setStatus(1); setOpen(true); }}>Salvar</Button>}
                    </FormGroup>
                </FormControl>
                { check && 
                    <Box className="dimensoes_form">
                        <div className="item">
                            <TextField size="small" value={comprimento} onChange={(e) => setComprimento(e.target.value)} label="Comprimento" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField size="small" value={largura} onChange={(e) => setLargura(e.target.value)} label="Largura" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField size="small" value={altura} onChange={(e) => setAltura(e.target.value)} label="Altura" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                },
                            }} />
                        </div>
                        <div className="item">
                            <TextField size="small" value={peso} onChange={(e) => setPeso(e.target.value)} label="Peso" variant="outlined" sx={{width: '100%'}} slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="start">gramas</InputAdornment>,
                                },
                            }} />
                        </div>
                    </Box>

                }
                </>
            )}

            { item?.status == 1 && (
                <Box>
                    <div className="title_content">
                        <h2>{item.volume}</h2>
                        <Button color="error"  onClick={() => { setStatus(0); setOpen(true); }}><DeleteTwoToneIcon  /></Button>
                    </div>
                    <div className="dimensoes">
                        <div>
                            <h3>Dimensões</h3>
                            <span>{item.comprimento} x {item.largura} x {item.altura}</span>
                        </div>
                        <div>
                            <h3>Peso</h3>
                            <span>{item.peso}</span>
                        </div>
                    </div>
                </Box>
            )}

            <Modal open={open} setOpen={setOpen} title="Insira o seu código" confirmText="Confirmar" 
                confirmReturn={salvar} 
                atualizar={carregar} clearInputs={() => setCodigo('')}>
                <AdicionarString label='Código' value={codigo} setValue={setCodigo} type='password' />
            </Modal>
        </Box>
    )
}