import '~/assets/scss/Show.scss';
import '~/assets/scss/Pedido.scss';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Tabs, Tab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArchiveIcon from '@mui/icons-material/Archive';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import StairsIcon from '@mui/icons-material/Stairs';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import Layout from "./components/Layout";
import Title from "./components/Title";
import Stepper from "./components/Stepper";
import DataTable from './components/DataTable';

export default function Pedidos() {
    const { id } = useParams();

    const [tab, setTab] = useState(3);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    return (
        <Layout>
            <Title title={"Pedido Nº #"+id} icon={<ShoppingCartIcon/>} />
            <Box className="tabs_content">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab label="Informações" />
                    <Tab label="Requisitos" />
                    <Tab label="Atividades" />
                    <Tab label="Volumes" />
                    <Tab label="Finalizar pedido" disabled />
                </Tabs>
            </Box>
            <Box className="show_content">
                { tab == 0 && <Informacoes /> }
                { tab == 1 && <Requisitos /> }
                { tab == 2 && <Atividades /> }
                { tab == 3 && <Volumes /> }
            </Box>
        </Layout>
    )
}

function Informacoes() {
    return (
        <Box className="informacoes">
            <Box className="info_pedido">
                <Chip className="stats"  color="primary" label="Em andamento" />
                <Box className="info">
                    <p>
                        <span className="icon"><ArchiveIcon/></span>
                        <b>REMESSA: </b>33045-1
                    </p>
                    <p>
                        <span className="icon"><PersonIcon/></span>
                        <b>COMPRADOR(A): </b>João Felipe
                    </p>
                    <p>
                        <span className="icon"><LocationPinIcon/></span>
                        <b>CIDADE / EST: </b>Goiânia / GO
                    </p>
                    <p>
                        <span className="icon"><StoreIcon/></span>
                        <b>VENDEDOR: </b>Daniele
                    </p>
                    <Button variant="contained">Alterar status</Button>
                </Box>
            </Box>

            <Box className="info_produto">
                <h3>
                    <b>PRODUTO: </b>MESA DE POKER PROFISSIONAL PARA CLUBES DE POKER E RESIDÊNCIAS
                </h3>
                <p>
                    <b>Quantidade: </b>1
                </p>
                <Box className="info_table">
                    <div>
                        <h4>TAMANHO DA MESA:</h4>
                        <p>9 (2,40 x 1,10M)</p>
                    </div>
                    <div>
                        <h4>EMBARALHADOR AUTOMÁTICO:</h4>
                        <p>Sem embaralhador</p>
                    </div>
                    <div>
                        <h4>TIPO DA COLUNA DA MESA:</h4>
                        <p>Retangular</p>
                    </div>
                    <div>
                        <h4>TEXTURA DA COLUNA DA MESA:</h4>
                        <p>Branco Fosco</p>
                    </div>
                    <div>
                        <h4>PISTA PARA FICHAS:</h4>
                        <p>Sem embaralhador</p>
                    </div>
                    <div>
                        <h4>EMBARALHADOR AUTOMÁTICO:</h4>
                        <p>Sem pista</p>
                    </div>
                    <div>
                        <h4>PORTA COPOS:</h4>
                        <p>Sem Porta Copos</p>
                    </div>
                    <div>
                        <h4>COURÍSSIMO DA BORDA:</h4>
                        <p>Preto</p>
                    </div>
                    <div>
                        <h4>COR DO TECIDO DA MESA:</h4>
                        <p>Preto</p>
                    </div>
                    <div>
                        <h4>PERSONALIZE COM SUA MARCA:</h4>
                        <p>Sem Logo ou Escrita</p>
                    </div>
                    <div>
                        <h4>DESENHO DE FUNDO:</h4>
                        <p>Sem Personalização</p>
                    </div>
                    <div>
                        <h4>TAMPÃO DE JANTAR / TÊNIS DE MESA:</h4>
                        <p>Sem tampão</p>
                    </div>
                    <div>
                        <h4>TIPO DE BORDA:</h4>
                        <p>Borda Baixa</p>
                    </div>
                    <div>
                        <h4>COR DO LED:</h4>
                        <p>Sem LED</p>
                    </div>
                    <div>
                        <h4>GAVETA E RACK PARA FICHAS:</h4>
                        <p>Para Cash Game + Rack METAL 500 Fichas (39mm)</p>
                    </div>
                    <div>
                        <h4>CONFIGURAÇÃO DO TAMPÃO:</h4>
                        <p>Configuração do Tampão</p>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
function Requisitos() {
    const step_list = [
        {
            title: 'Router',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
        },
        {
            title: 'Adesivo',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Cliente',
                    description: 'Aguardando aprovação do cliente'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
        },
        {
            title: 'Tecido',
            steps: [
                {
                    label: 'Pendente',
                    description: 'Ainda não iniciado'
                },
                {
                    label: 'Cliente',
                    description: 'Aguardando aprovação do cliente'
                },
                {
                    label: 'Impermeabilização',
                    description: 'O tecido precisa ser impermeabilizado'
                },
                {
                    label: 'Concluído',
                    description: 'Finalizar este requisito (não é possível reverter este estado)'
                },
            ]
        },
    ];

    return (
        <Box className="requisitos">
            { 
                step_list.map((step, index) => (
                    <RequisitoItem step={step} key={index} />
                ))
            }
        </Box>
    )
}
export function RequisitoItem({ step }){
    return (
        <div className="requisito_item">
            <h3>
                <span className="icon">
                    <StairsIcon />
                </span>
                {step.title}
            </h3>
            <div className="step_content">
                <Stepper steps={step.steps} />
            </div>
        </div>
    )
}
function Atividades() {
    const createData = (id, equipe, descricao, criacao, status, link) => {
        return {
            id,
            equipe,
            descricao,
            criacao,
            status,
            link,
        };
    }
    const rows = [
        createData(
            '#34897', 
            'M1',
            'Cortar + Montar Base 1 Coluna Retangular',
            '01/11/2024',
            <Chip className="stats" size="small" label="pendente" />,
            <Button component={Link} to="/atividades/34897" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#34898', 
            'M2',
            'Cortar Também Dividido + Réguas',
            '01/11/2024',
            <Chip className="stats" size="small" color="primary" label="Em andamento" />,
            <Button component={Link} to="/atividades/34898" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#34899', 
            'M3',
            'Fazer Furo das Vailhas Tampão Dividido	',
            '01/11/2024',
            <Chip className="stats" size="small" color="error" label="Parado" />,
            <Button component={Link} to="/atividades/34899" variant="outlined" size="small">Detalhes</Button>
        ),
        createData(
            '#34900', 
            'M1',
            'Fitar Borda Alta',
            '01/11/2024',
            <Chip className="stats" size="small" color="success" label="Finalizado" />,
            <Button component={Link} to="/atividades/34900" variant="outlined" size="small">Detalhes</Button>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'equipe',
            numeric: false,
            label: 'Equipe',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'criacao',
            numeric: false,
            label: 'Criação',
        },
        {
            id: 'status',
            numeric: true,
            label: 'Status',
        },
        {
            id: 'link',
            numeric: false,
            label: 'Link',
        },
    ];

    return (
        <Box className="atividades">
            <DataTable headCells={headCells} rows={rows}/>
            <Button className="adicionar" variant="contained">Adicionar atividade</Button>
        </Box>
    )
}

function Volumes() {
    const createData = (id, descricao, dimensoes, peso, criacao, acoes) => {
        return {
            id,
            descricao,
            dimensoes,
            peso,
            criacao,
            acoes,
        };
    }
    const rows = [
        createData(
            '#3489787', 
            'Tampa da mesa',
            '200 x 400 x 50',
            '20',
            '01/11/2024',
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
        createData(
            '#3489788', 
            'Peças de montagem da mesa',
            '50 x 50 x 50',
            '10',
            '01/11/2024',
            <Box className="acoes">
                <Button variant="outlined" size="small"><EditSquareIcon /></Button>
                <Button variant="outlined" size="small"><DeleteIcon /></Button>
            </Box>
        ),
    ];
    const headCells = [
        {
            id: 'id',
            numeric: false,
            label: 'Id',
        },
        {
            id: 'descricao',
            numeric: false,
            label: 'Descrição',
        },
        {
            id: 'dimensoes',
            numeric: false,
            label: 'Dimensões (cm)',
        },
        {
            id: 'peso',
            numeric: true,
            label: 'Peso (kg)',
        },
        {
            id: 'criacao',
            numeric: true,
            label: 'Criação',
        },
        {
            id: 'acoes',
            numeric: false,
            align: "right",
            label: 'Ações',
        },
    ];

    return (
        <Box className="volumes">
            <DataTable headCells={headCells} rows={rows}/>
            <Button className="adicionar" variant="contained">Adicionar volume</Button>
        </Box>
    )
}