import { Link } from 'react-router-dom';
import { Container, Box, TextField, Button } from '@mui/material';
import '~/assets/scss/Login.scss';

export default function Login() {
    return (
        <Container className="login_content">
            <Box className="login">
                <h1>Login departamento</h1>
                <p>Utilize as credenciais cadastrradas no sistema.</p>
                <TextField className="input" label="User" variant="outlined" size="small" />
                <TextField className="input" label="Password" variant="outlined" size="small" />
                <Button component={Link} to="/pedidos" variant="contained">Login</Button>
            </Box>
        </Container>
    );
}