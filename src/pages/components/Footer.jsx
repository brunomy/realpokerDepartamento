import { useLocation, Link } from 'react-router-dom';
import '~/assets/scss/Footer.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import '@mui/material/BottomNavigationAction';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

export default function Footer() {
    const location = useLocation();
    const path = location.pathname;

    const currentTab = () => {
        if (path.startsWith('/pedidos')) return 'pedidos';
        if (path.startsWith('/atividades')) return 'atividades';
        if (path.startsWith('/checklists')) return 'checklists';
        if (path.startsWith('/remessas')) return 'remessas';
        if (path.startsWith('/equipes')) return 'equipes';
        return null;
      };

    return (
        <BottomNavigation
            className="bottomNavigation"
            sx={{ width: '100%' }}
            value={currentTab()}
            showLabels
        >
            <BottomNavigationAction
                label="Pedidos"
                value="pedidos"
                icon={<ShoppingCartTwoToneIcon />}
                component={Link}
                to="/pedidos"
            />
            <BottomNavigationAction
                label="Atividades"
                value="atividades"
                icon={<AssignmentTwoToneIcon />}
                component={Link}
                to="/atividades"
            />
            <BottomNavigationAction
                label="Checklists"
                value="checklists"
                icon={<CheckBoxTwoToneIcon />}
                component={Link}
                to="/checklists"
            />
            <BottomNavigationAction
                label="Equipes"
                value="equipes"
                icon={<GroupsTwoToneIcon />}
                component={Link}
                to="/equipes"
            />
            <BottomNavigationAction
                label="Remessas"
                value="remessas"
                icon={<LocalShippingTwoToneIcon />}
                component={Link}
                to="/remessas"
            />
        </BottomNavigation>
    )
}