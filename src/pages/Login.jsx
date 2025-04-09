import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button } from '@mui/material';
import '~/assets/scss/Login.scss';

import { useUser } from '../context/UserContext';

export default function Login() {
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const [user, setUser] = useState('admin');

    const navigate = useNavigate();

    const login = () => {
        setUsuarioLogado(
            {
                id: 1,
                permission: user,
                name: 'Bruno'
            }
        )
        if (user === 'admin') {
            navigate('/pedidos');
        } else {
            navigate('/atividades');
        }
    }

    return (
        <Container className="login_content">
            <Box className="login">
                <h1>Login departamento</h1>
                <p>Utilize as credenciais cadastrradas no sistema.</p>
                <TextField className="input" label="User" variant="outlined" size="small" value={user} onChange={
                    (e) => { setUser(e.target.value) }
                } />
                <TextField className="input" label="Password" variant="outlined" size="small" />
                <Button variant="contained" onClick={login}>Login</Button>
            </Box>
        </Container>
    );
}