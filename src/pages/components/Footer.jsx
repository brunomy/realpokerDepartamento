import * as React from 'react';
import '~/assets/scss/Footer.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';

import '@mui/material/BottomNavigationAction';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Footer() {
    const [value, setValue] = React.useState('pedidos');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation className="bottomNavigation" sx={{ width: '100%' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Pedidos"
                value="pedidos"
                icon={<ShoppingCartIcon />}
                component={Link}
                to="/pedidos"
            />
            <BottomNavigationAction
                label="Atividades"
                value="atividades"
                icon={<AssignmentIcon />}
                component={Link}
                to="/atividades"
            />
            <BottomNavigationAction
                label="Remessas"
                value="remessas"
                icon={<LocalShippingIcon />}
                component={Link}
                to="/remessas"
            />
            <BottomNavigationAction 
                label="Equipes" 
                value="equipes" 
                icon={<GroupsIcon />}
                component={Link}
                to="/equipes"
            />
        </BottomNavigation>
    )
}