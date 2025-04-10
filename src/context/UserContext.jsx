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

  const [atividades, setAtividades] = useState([
    {
      id: 3489857,
      id_pedido: 5951,
      equipe: 'M1',
      descricao: 'Cortar + Montar Base 1 Coluna Retangular',
      data: '01/11/2024',
      categoria: 'Mesas de Poker',
      status: 0,
      checklists: [
        'Medir a mesa',
        'Cortar Mesa',
        'Cortar coluna',
        'Montar a mesa',
      ],
      volumes: [
        {
          id: 3489787,
          descricao: 'Tampa da mesa',
          largura: 200,
          comprimento: 400,
          altura: 50,
          peso: 20,
        }
      ],
    },
    {
      id: 3489858,
      id_pedido: 5952,
      equipe: 'M2',
      descricao: 'Montagem de mesa retangular com LED',
      data: '02/11/2024',
      categoria: 'Mesas de Poker',
      status: 1,
      checklists: [
        'Separar LEDs',
        'Instalar iluminação',
        'Testar circuito',
        'Aprovar com cliente',
      ],
      volumes: [
        {
          id: 3489788,
          descricao: 'Base da mesa com LED',
          largura: 220,
          comprimento: 400,
          altura: 60,
          peso: 25,
        }
      ],
    },
    {
      id: 3489859,
      id_pedido: 5953,
      equipe: 'M3',
      descricao: 'Montagem de Futmesa modelo P',
      data: '03/11/2024',
      categoria: 'Futmesa',
      status: 2,
      checklists: [
        'Montar estrutura',
        'Fixar traves',
        'Instalar acabamento',
      ],
      volumes: [
        {
          id: 3489789,
          descricao: 'Estrutura futmesa',
          largura: 180,
          comprimento: 350,
          altura: 55,
          peso: 18,
        }
      ],
    },
    {
      id: 3489860,
      id_pedido: 5954,
      equipe: 'M4',
      descricao: 'Montagem de Cadeira Gamer com estofado premium',
      data: '04/11/2024',
      categoria: 'Cadeiras',
      status: 3,
      checklists: [
        'Unir base com assento',
        'Parafusar apoio de braço',
        'Verificar encosto',
      ],
      volumes: [
        {
          id: 3489790,
          descricao: 'Cadeira desmontada',
          largura: 70,
          comprimento: 70,
          altura: 90,
          peso: 15,
        }
      ],
    }
  ])

  return (
    <UserContext.Provider value={{ 
      usuarioLogado, 
      setUsuarioLogado,
      atividades,
      setAtividades,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
