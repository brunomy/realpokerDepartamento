import { Chip, Box } from '@mui/material';

export default function Status({ status, size = '', porcentagem = null, sx }) {
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
        { status == -1 && <Chip size={size} className="stats" color="error" label="Falha" sx={sx} /> }
        { (status == 0 || status == null) && <Chip size={size} className="stats" label="Pendente" sx={sx} /> }
        { status == 1 && <Chip size={size} className="stats" label="Em produção" sx={sx} /> }
        { status == 2 && <Chip size={size} className="stats" color="primary" label={andamentoText} sx={sx} /> }
        { status == 3 && <Chip size={size} className="stats" color="warning" label={paradoText} sx={sx} /> }
        { status == 4 && <Chip size={size} className="stats" color="success" label="Finalizado" sx={sx} /> }
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