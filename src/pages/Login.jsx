import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button } from "@mui/material";
import "~/assets/scss/Login.scss";

import { useUser } from "~/context/UserContext";

export default function Login() {
  const { login } = useUser();
  // const [user, setUser] = useState("gerente");
  const [user, setUser] = useState("atividades");
  // const [user, setUser] = useState("bruno");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("equipe");
  }, []);

  return (
    <Container className="login_content">
      <Box className="login">
        <h1>Login departamento</h1>
        <p>Utilize as credenciais cadastradas no sistema.</p>

        <TextField
          className="input"
          label="Usuário"
          variant="outlined"
          size="small"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          className="input"
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={() => login({ user, password, navigate, setError })}>
          Login
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>
    </Container>
  );
}
