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
      id_etapa: 0,
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
  const [volumes, setVolumes] = useState([
    {
      id: 0,
      id_categoria: 1, 
      id_etapa: 1,
      id_atividade: 0,
      title: 'Borda da mesa',
    },
    { id: 1,id_categoria: 1, id_etapa: 1, id_atividade: 0, title: 'Suporte da borda',},
    { id: 2, id_categoria: 1, id_etapa: 1, id_atividade: 1, title: 'Tiras de couro' },
    { id: 3, id_categoria: 1, id_etapa: 1, id_atividade: 2, title: 'Porta copos' },
    { id: 4, id_categoria: 1, id_etapa: 1, id_atividade: 3, title: 'Suporte para pé de mesa' },
  ])

  const [equipes, setEquipes] = useState([
    {
      id: 1,
      title: 'M1',
      descricao: "Responsável por montagem",
      usuario: 'm1',
      senha: '1234'
    },
    {id: 2,title: 'M2',descricao: "Responsável por montagem",usuario: 'm2',senha: '1234'},
    {id: 3,title: 'M3',descricao: "Responsável por montagem",usuario: 'm3',senha: '1234'},
    {id: 4,title: 'M4',descricao: "Responsável por montagem",usuario: 'm4',senha: '1234'}
  ])
  const [funcionarios, setFuncionarios] = useState([{
    id: 0,
    id_equipe: 1,
    nome: 'Bruno Yosimura',
    funcao: "Montador",
    usuario: 'bruno',
    senha: '1234',
    hashCode: 'asdkjhasdlkajfçkfdasjakjsdasdasdadasd'
  }])

  //etapas de um OP
  const [etapasOP, setEtapasOP] = useState([1, 2, 3, 4, 5, 6])
  const [atividadesOP, setAtividadesOP] = useState([
    {
        "id": 1,
        "id_ordem": "5951-1",
        "id_etapa": 1,
        "id_atividade": 0,
        "id_equipe": 1,
        "data": "28/04/2025",
        "ativo": 1,
        "status": 0
    },
    {"id": 2,"id_ordem": "5951-1","id_etapa": 1,"id_atividade": 1,"id_equipe": 2,"data": "28/04/2025","ativo": 1,"status": 0},{"id": 3,"id_ordem": "5951-1","id_etapa": 1,"id_atividade": 2,"id_equipe": 3,"data": "28/04/2025","ativo": 1,"status": 0},{"id": 4,"id_ordem": "5951-1","id_etapa": 1,"id_atividade": 3,"id_equipe": 4,"data": "28/04/2025","ativo": 1,"status": 0},{"id": 5,"id_ordem": "5951-1","id_etapa": 1,"id_atividade": 4,"id_equipe": 1,"data": "28/04/2025","ativo": 1,"status": 0},{"id": 6,"id_ordem": "5951-1","id_etapa": 2,"id_atividade": 5,"id_equipe": 4,"data": "29/04/2025","ativo": 1,"status": 0},{"id": 7,"id_ordem": "5951-1","id_etapa": 2,"id_atividade": 6,"id_equipe": 3,"data": "29/04/2025","ativo": 1,"status": 0},{"id": 8,"id_ordem": "5951-1","id_etapa": 2,"id_atividade": 7,"id_equipe": 1,"data": "29/04/2025","ativo": 1,"status": 0},{"id": 9,"id_ordem": "5951-1","id_etapa": 3,"id_atividade": 8,"id_equipe": 1,"data": "30/04/2025","ativo": 1,"status": 0},{"id": 10,"id_ordem": "5951-1","id_etapa": 3,"id_atividade": 9,"id_equipe": 2,"data": "30/04/2025","ativo": 1,"status": 0},{"id": 11,"id_ordem": "5951-1","id_etapa": 3,"id_atividade": 10,"id_equipe": 3,"data": "30/04/2025","ativo": 1,"status": 0},{"id": 12,"id_ordem": "5951-1","id_etapa": 4,"id_atividade": 11,"id_equipe": 1,"data": "01/05/2025","ativo": 1,"status": 0},{"id": 13,"id_ordem": "5951-1","id_etapa": 4,"id_atividade": 12,"id_equipe": 2,"data": "01/05/2025","ativo": 1,"status": 0},{"id": 14,"id_ordem": "5951-1","id_etapa": 4,"id_atividade": 13,"id_equipe": 3,"data": "01/05/2025","ativo": 1,"status": 0},{"id": 15,"id_ordem": "5951-1","id_etapa": 4,"id_atividade": 14,"id_equipe": 4,"data": "01/05/2025","ativo": 1,"status": 0},{"id": 16,"id_ordem": "5951-1","id_etapa": 4,"id_atividade": 15,"id_equipe": 4,"data": "01/05/2025","ativo": 1,"status": 0},{"id": 17,"id_ordem": "5951-1","id_etapa": 5,"id_atividade": 16,"id_equipe": 1,"data": "02/05/2025","ativo": 1,"status": 0},{"id": 18,"id_ordem": "5951-1","id_etapa": 5,"id_atividade": 17,"id_equipe": 4,"data": "02/05/2025","ativo": 1,"status": 0},{"id": 19,"id_ordem": "5951-1","id_etapa": 5,"id_atividade": 18,"id_equipe": 3,"data": "02/05/2025","ativo": 1,"status": 0},{"id": 20,"id_ordem": "5951-1","id_etapa": 5,"id_atividade": 19,"id_equipe": 1,"data": "02/05/2025","ativo": 1,"status": 0},{"id": 21,"id_ordem": "5951-1","id_etapa": 5,"id_atividade": 20,"id_equipe": 2,"data": "02/05/2025","ativo": 1,"status": 0},{"id": 22,"id_ordem": "5951-1","id_etapa": 6,"id_atividade": 21,"id_equipe": 1,"data": "03/05/2025","ativo": 1,"status": 0}
  ])
  const [checklistOP, setChecklistOP] = useState([])
  const [volumesOP, setVolumesOP] = useState([])
  const [embalagensOP, setEmbalagensOP] = useState([])

  return (
    <UserContext.Provider value={{ 
      usuarioLogado, setUsuarioLogado,
      categorias, setCategorias,
      etapas, setEtapas,
      atividades, setAtividades,
      checklists, setChecklists,
      volumes, setVolumes,
      equipes, setEquipes,
      funcionarios, setFuncionarios,

      etapasOP, setEtapasOP,
      atividadesOP, setAtividadesOP,
      checklistOP, setChecklistOP,
      volumesOP, setVolumesOP,
      embalagensOP, setEmbalagensOP,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
