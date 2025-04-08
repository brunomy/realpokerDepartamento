import { Box, Button } from '@mui/material';
import '~/assets/scss/ChangeStatus.scss';

export default function ChangeStatus({ status, setStatus }) {
    return (
        <Box className="changeStatus">
            <Button className={status == 0 ? 'active' : ''} onClick={() => setStatus(0)} variant="contained" color="default">Pendente</Button>
            <Button className={status == 1 ? 'active' : ''} onClick={() => setStatus(1)} variant="contained" color="primary">Em andamento</Button>
            <Button className={status == 2 ? 'active' : ''} onClick={() => setStatus(2)} variant="contained" color="error">Parado</Button>
            <Button className={status == 3 ? 'active' : ''} onClick={() => setStatus(3)} variant="contained" color="success">Finalizado</Button>
        </Box>
    )
}