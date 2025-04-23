import '~/assets/scss/VistoriaChecklist.scss'

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function VistoriaChecklist({setObservacao, setFalha, title}) {
    return (
        <Box className="vistoriaChecklist">
            <form action="">
                <p>{title}</p>
                <div className="item full">
                    <div className="checkbox">
                        <FormGroup>
                            <FormControlLabel onChange={(e) => setFalha(e.target.checked ? 1 : 0)} value={1} control={<Switch />} label="Atividade com falha?" />
                        </FormGroup>
                    </div>
                </div>
                <div className="item full">
                    <TextField onChange={(e) => setObservacao(e.target.value)} label="Observação" variant="outlined" sx={{width: '100%'}} />
                </div>
            </form>
        </Box>
    )
}