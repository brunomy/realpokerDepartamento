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
      title: 'Mesas de Poker'
    },
    { id: 2, title: 'Futmesa'},
    { id: 3, title: 'Mesa de Outros Jogos'},
    { id: 4, title: 'Cadeiras'}
  ])
  const [etapas, setEtapas] = useState([
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
      id: 4,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Montagem Final'
    },
    {
      id: 5,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Coluna'
    },
    {
      id: 6,
      id_departamento: 1,
      id_categoria: 1,
      title: 'Embalagem e Cotação'
    },
    {
      id: 7,
      id_departamento: 1,
      id_categoria: 2,
      title: 'Embalagem e Cotação'
    },
  ])
  const [atividades, setAtividades] = useState([
    {
      id: 0,
      id_etapa: 1,
      id_categoria: 1,
      title: 'Cortar borda'
    },
    { id: 1, id_etapa: 1, id_categoria: 1, title: 'Cortar couro' },
    { id: 2, id_etapa: 1, id_categoria: 1, title: 'Furar buracos dos porta copos na Borda/Pista' },
    { id: 3, id_etapa: 1, id_categoria: 1, title: 'Encaixar Router' },
    { id: 4, id_etapa: 1, id_categoria: 1, title: 'Instalar USB' },

    { id: 5, id_etapa: 2, id_categoria: 1, title: 'Pintar couro' },
    { id: 6, id_etapa: 2, id_categoria: 1, title: 'Cortar couro' },
    { id: 7, id_etapa: 2, id_categoria: 1, title: 'Costurar tecido da borda dos porta copos' },

    { id: 8, id_etapa: 3, id_categoria: 1, title: 'Pintar furo da gaveta' },
    { id: 9, id_etapa: 3, id_categoria: 1, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },
    { id: 10, id_etapa: 3, id_categoria: 1, title: 'Imprimir arte do cliente no couro' },

    { id: 11, id_etapa: 4, id_categoria: 1, title: 'Pintar furo da gaveta' },
    { id: 12, id_etapa: 4, id_categoria: 1, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 13, id_etapa: 4, id_categoria: 1, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 14, id_etapa: 4, id_categoria: 1, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 15, id_etapa: 4, id_categoria: 1, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 16, id_etapa: 5, id_categoria: 1, title: 'Pintar furo da gaveta' },
    { id: 17, id_etapa: 5, id_categoria: 1, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 18, id_etapa: 5, id_categoria: 1, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 19, id_etapa: 5, id_categoria: 1, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 20, id_etapa: 5, id_categoria: 1, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 21, id_etapa: 6, id_categoria: 1, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },
  ])
  const [checklists, setChecklists] = useState([
    {
      id: 0,
      id_categoria: 1, 
      id_etapa: 1,
      id_atividade: 0,
      title: 'Conferir medida da borda'
    },
    { id: 1, id_categoria: 1, id_etapa: 1, id_atividade: 1, title: 'Conferir medida do couro' },
    { id: 2, id_categoria: 1, id_etapa: 1, id_atividade: 2, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 3, id_categoria: 1, id_etapa: 1, id_atividade: 2, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 4, id_categoria: 1, id_etapa: 1, id_atividade: 3, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 5, id_categoria: 1, id_etapa: 1, id_atividade: 4, title: 'Conferir distância do USB e Indução' },

    { id: 6, id_categoria: 1, id_etapa: 2, id_atividade: 5, title: 'A cor do couro esta de acordo com o pedido' },
    { id: 7, id_categoria: 1, id_etapa: 2, id_atividade: 6, title: 'Conferir medida da borda' },
    { id: 8, id_categoria: 1, id_etapa: 2, id_atividade: 6, title: 'Conferir medida do couro' },
    { id: 9, id_categoria: 1, id_etapa: 2, id_atividade: 7, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 10, id_categoria: 1, id_etapa: 2, id_atividade: 7, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },

    { id: 11, id_categoria: 1, id_etapa: 3, id_atividade: 8, title: 'Conferir pintura furo da gaveta' },
    { id: 12, id_categoria: 1, id_etapa: 3, id_atividade: 9, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 13, id_categoria: 1, id_etapa: 3, id_atividade: 10, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 14, id_categoria: 1, id_etapa: 3, id_atividade: 11, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 15, id_categoria: 1, id_etapa: 3, id_atividade: 12, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 16, id_categoria: 1, id_etapa: 4, id_atividade: 13, title: 'Pintar furo da gaveta' },
    { id: 17, id_categoria: 1, id_etapa: 4, id_atividade: 14, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 18, id_categoria: 1, id_etapa: 4, id_atividade: 15, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 19, id_categoria: 1, id_etapa: 4, id_atividade: 16, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 20, id_categoria: 1, id_etapa: 4, id_atividade: 17, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 21, id_categoria: 1, id_etapa: 5, id_atividade: 18, title: 'Pintar furo da gaveta' },
    { id: 22, id_categoria: 1, id_etapa: 5, id_atividade: 19, title: 'Colocar o tecido no centro da pista pra avaliar se a Router saiu do ponto' },
    { id: 23, id_categoria: 1, id_etapa: 5, id_atividade: 20, title: 'Medir o diâmetro do furo dos porta copos na Borda/Pista' },
    { id: 24, id_categoria: 1, id_etapa: 5, id_atividade: 20, title: 'Medir o distaciamento dos porta copos na Borda/Pista' },
    { id: 25, id_categoria: 1, id_etapa: 5, id_atividade: 20, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },

    { id: 26, id_categoria: 1, id_etapa: 6, id_atividade: 21, title: 'Conferir se a arte do tecido no e-mail está batendo com a arte do tecido impresso' },
  ])

  const [equipes, setEquipes] = useState([
    {
      id: 1,
      title: 'M1'
    },
    {
      id: 2,
      title: 'M2'
    },
    {
      id: 3,
      title: 'M3'
    },
    {
      id: 4,
      title: 'M4'
    },
  ])

  //etapas de um OP
  const [etapasOP, setEtapasOP] = useState([])
  const [atividadesOP, setAtividadesOP] = useState([])
  const [checklistOP, setChecklistOP] = useState([])

  return (
    <UserContext.Provider value={{ 
      usuarioLogado, setUsuarioLogado,
      categorias, setCategorias,
      ordens, setOrdens,
      etapas, setEtapas,
      atividades, setAtividades,
      checklists, setChecklists,
      equipes, setEquipes,

      etapasOP, setEtapasOP,
      atividadesOP, setAtividadesOP,
      checklistOP, setChecklistOP
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
