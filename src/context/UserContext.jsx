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

  const [ordens, setOrdens] = useState([
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

  const [categorias, setCategorias] = useState([
    {
      id: 1,
      id_departamento: 1,
      nome: 'Mesas de Poker',
    },
    { id: 2, nome: 'Futmesa', },
    { id: 3, nome: 'Cadeiras', }
  ])
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Montagem Inicial'
    },
    {
      id: 2,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Intalação de Couro'
    },
    {
      id: 3,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Instalação de Tecido'
    },
    {
      id: 3,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Montagem Final'
    },
    {
      id: 4,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Coluna'
    },
    {
      id: 5,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Embalagem e Cotação'
    },
    {
      id: 6,
      id_departamento: 1,
      id_categoria: 2,
      title: 'Embalagem e Cotação'
    },
  ])

  const [checklistItem, setChecklistItem] = useState([
    {
      id: 0,
      id_checklist: 1,
      title: 'Conferir medida da borda'
    },
    { id: 0, id_checklist: 1, title: 'Conferir medida do couro' },
    { id: 0, id_checklist: 1, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 1, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 1, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 0, id_checklist: 1, title: 'Conferir distância do USB e Indução' },

    { id: 0, id_checklist: 2, title: 'A cor do couro esta de acordo com o pedido' },
    { id: 0, id_checklist: 2, title: 'Conferir medida da borda' },
    { id: 0, id_checklist: 2, title: 'Conferir medida do couro' },
    { id: 0, id_checklist: 2, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 2, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },

    { id: 0, id_checklist: 3, title: 'Pintar furo da gaveta' },
    { id: 0, id_checklist: 3, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 0, id_checklist: 3, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 3, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 3, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 0, id_checklist: 4, title: 'Pintar furo da gaveta' },
    { id: 0, id_checklist: 4, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 0, id_checklist: 4, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 4, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 4, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 0, id_checklist: 5, title: 'Pintar furo da gaveta' },
    { id: 0, id_checklist: 5, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 0, id_checklist: 5, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 5, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 0, id_checklist: 5, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },
  ])



  return (
    <UserContext.Provider value={{ 
      usuarioLogado, setUsuarioLogado,
      categorias, setCategorias,
      ordens, setOrdens,
      checklists, setChecklists,
      checklistItem, setChecklistItem
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
