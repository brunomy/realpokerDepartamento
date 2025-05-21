import { Chip, Box } from '@mui/material';

export default function Status({ status, size = '', porcentagem = null }) {
    var andamentoText = '';

    if(porcentagem == null){
        andamentoText = "Em andamento"
    } else {
        andamentoText = "Em andamento "+porcentagem+"%"
    }

    return(
        <>
        { status == -1 && <Chip size={size} className="stats" color="error" label="Falha" /> }
        { status == 0 && <Chip size={size} className="stats" label="Pendente" /> }
        { status == 1 && <Chip size={size} className="stats" color="primary" label={andamentoText} /> }
        { status == 2 && <Chip size={size} className="stats" color="warning" label="Parado" /> }
        { status == 3 && <Chip size={size} className="stats" color="secondary" label="Vistoria" /> }
        { status == 4 && <Chip size={size} className="stats" color="success" label="Finalizado" /> }
        </>
    )
}