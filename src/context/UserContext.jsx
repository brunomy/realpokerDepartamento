import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(
    {
        id: 1,
        permission: 'admin',
        name: 'Bruno'
    }
  );

  return (
    <UserContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
