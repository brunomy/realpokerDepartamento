import { useLocation, Link } from 'react-router-dom';
import '~/assets/scss/Footer.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import '@mui/material/BottomNavigationAction';

import { useUser } from '~/context/UserContext';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone';

export default function Footer() {
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const location = useLocation();
    const path = location.pathname;

    const currentTab = () => {
        if (path.includes('/pedidos')) return 'pedidos';
        if (path.includes('/ordens')) return 'ordens';
        if (path.includes('/atividades')) return 'atividades';
        if (path.includes('/configuracoes')) return 'configuracoes';
        if (path.includes('/checklists')) return 'checklists';
        if (path.includes('/remessas')) return 'remessas';
        if (path.includes('/equipes')) return 'equipes';
        return 'ordens'; // fallback
    };

    return (
        <BottomNavigation
            className="bottomNavigation"
            sx={{ width: '100%' }}
            value={currentTab() ?? 'ordens'}
            showLabels
        >
            <BottomNavigationAction
                label="Pedidos"
                value="pedidos"
                icon={<ShoppingCartTwoToneIcon />}
                component={Link}
                to="/pedidos"
                sx={{ display: usuarioLogado.permission === "admin" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Ordens"
                value="ordens"
                icon={<FactoryTwoToneIcon />}
                component={Link}
                to="/ordens"
                showLabel
            />
            <BottomNavigationAction
                label="Atividades"
                value="atividades"
                icon={<AssignmentTwoToneIcon />}
                component={Link}
                to="/atividades"
                showLabel
            />
            <BottomNavigationAction
                label="Remessas"
                value="remessas"
                icon={<LocalShippingTwoToneIcon />}
                component={Link}
                to="/remessas"
                showLabel
                sx={{ display: usuarioLogado.permission === "admin" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Equipes"
                value="equipes"
                icon={<GroupsTwoToneIcon />}
                component={Link}
                to="/equipes"
                showLabel
                sx={{ display: usuarioLogado.permission === "admin" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Configurações"
                value="configuracoes"
                icon={<SettingsApplicationsTwoToneIcon />}
                component={Link}
                to="/configuracoes"
                showLabel
            />
        </BottomNavigation>
    )
}