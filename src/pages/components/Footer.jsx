import { useLocation, Link } from 'react-router-dom';
import '~/assets/scss/Footer.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import '@mui/material/BottomNavigationAction';

import { useUser } from '../../context/UserContext';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

export default function Footer() {
    const { usuarioLogado, setUsuarioLogado } = useUser();
    const location = useLocation();
    const path = location.pathname;

    const currentTab = () => {
        if (path.includes('/pedidos')) return 'pedidos';
        if (path.includes('/atividades')) return 'atividades';
        if (path.includes('/checklists')) return 'checklists';
        if (path.includes('/remessas')) return 'remessas';
        if (path.includes('/equipes')) return 'equipes';
        return 'atividades'; // fallback
    };

    return (
        <BottomNavigation
            className="bottomNavigation"
            sx={{ width: '100%' }}
            value={currentTab() ?? 'atividades'}
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
                label="Atividades"
                value="atividades"
                icon={<AssignmentTwoToneIcon />}
                component={Link}
                to="/atividades"
                showLabel
            />
            <BottomNavigationAction
                label="Checklists"
                value="checklists"
                icon={<CheckBoxTwoToneIcon />}
                component={Link}
                to="/checklists"
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
                label="Remessas"
                value="remessas"
                icon={<LocalShippingTwoToneIcon />}
                component={Link}
                to="/remessas"
                showLabel
                sx={{ display: usuarioLogado.permission === "admin" ? 'flex' : 'none' }}
            />
        </BottomNavigation>
    )
}