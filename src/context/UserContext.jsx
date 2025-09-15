import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { user_api } from "./../api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);

  const [equipes, setEquipes] = useState([]);
  const [selectedEquipe, setSelectedEquipe] = useState(() => {
    const savedUser = localStorage.getItem("equipe");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const carregarDepartamentos = async (idUser) => {
    try {
      const res = await user_api.getDepartamentos(idUser);
      setDepartamentos(res.data);

      if(res.data.filter(item => item.id === selectedDepartamento?.id).length === 0 && res.data.length > 0) {
        setSelectedDepartamento(res.data[0]);
      }
    } catch (err) {
      console.error("Erro:", err.message);
    }
  }
  
  const login = async ({ user, password, navigate, setError, checkUser }) => {
    try {
      const res = await user_api.login({ user, password });
      
      if (res.token) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.removeItem("equipe");
        setSelectedEquipe(null);
        setUsuarioLogado(res.user);

        carregarDepartamentos(res.user.id);

        if (res.user.permissao === "gerente") {
          navigate("/pedidos");
        } else if( res.user.permissao === "atividades") {
          navigate("/atividades");
        } else if( res.user.permissao === "checklists") {
          navigate("/checklists");
        } else if( res.user.permissao === "remessas") {
          navigate("/remessas");
        }
      }
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  const carregarEquipes = async () => {
      try {
          const res = await user_api.getUserEquipes(usuarioLogado.id, selectedDepartamento.id);
          
          setEquipes(res.data?.equipes || []);
      } catch (err) {
          console.log(err.message);
      }
  };

  useEffect(() => {
    if(usuarioLogado?.permissao === "atividades"){
        if (selectedDepartamento?.id) {
            carregarEquipes();
        }
    }
  }, [selectedDepartamento]);

  return (
    <UserContext.Provider value={{ 
      usuarioLogado, setUsuarioLogado,
      login,

      departamentos, setDepartamentos,
      selectedDepartamento, setSelectedDepartamento,
      carregarDepartamentos,

      equipes, carregarEquipes,
      selectedEquipe, setSelectedEquipe,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
