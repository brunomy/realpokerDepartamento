import { Chip, Box } from '@mui/material';

export default function Status({ status, size = '', porcentagem = null }) {
    var andamentoText = '';
    var paradoText = '';

    if(porcentagem == null){
        andamentoText = "Em andamento";
        paradoText = "Parado";
    } else {
        andamentoText = "Em andamento "+Math.floor(porcentagem)+"%"
        paradoText = "Parado "+Math.floor(porcentagem)+"%"
    }

    return(
        <>
        { status == -1 && <Chip size={size} className="stats" color="error" label="Falha" /> }
        { (status == 0 || status == null) && <Chip size={size} className="stats" label="Pendente" /> }
        { status == 1 && <Chip size={size} className="stats" color="info" label="Em produção" /> }
        { status == 2 && <Chip size={size} className="stats" color="primary" label={andamentoText} /> }
        { status == 3 && <Chip size={size} className="stats" color="warning" label={paradoText} /> }
        { status == 4 && <Chip size={size} className="stats" color="success" label="Finalizado" /> }
        </>
    )
}

export function StatusChecklist({ status, size = '' }) {
    return(
        <>
        { status == -1 && <Chip size={size} className="stats" color="error" label="Recusado" /> }
        { (status == 0 || status == null) && <Chip size={size} className="stats" label="Pendente" /> }
        { status == 1 && <Chip size={size} className="stats" color="success" label="Aprovado" /> }
        </>
    )
}