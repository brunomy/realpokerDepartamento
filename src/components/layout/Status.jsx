import { Chip } from '@mui/material';

export default function Status({ status, size = '' }) {
    return(
        <>
        { status == -1 && <Chip size={size} className="stats" color="error" label="Falha" /> }
        { status == 0 && <Chip size={size} className="stats" label="Pendente" /> }
        { status == 1 && <Chip size={size} className="stats" color="primary" label="Em andamento" /> }
        { status == 2 && <Chip size={size} className="stats" color="warning" label="Parado" /> }
        { status == 3 && <Chip size={size} className="stats" color="success" label="Finalizado" /> }
        </>
    )
}