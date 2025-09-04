import { useLocation, Link } from 'react-router-dom';
import '~/assets/scss/Footer.scss';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState, useEffect } from 'react';
import { user_api } from './../../api';

import '@mui/material/BottomNavigationAction';

import { useUser } from '~/context/UserContext';

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';

export default function Footer() {
    const { usuarioLogado, selectedDepartamento } = useUser();
    const location = useLocation();
    const path = location.pathname;

    const currentTab = () => {
        if (path.includes('/pedidos')) return 'pedidos';
        if (path.includes('/ordens') || path.includes('/ordem')) return 'ordens';
        if (path.includes('/atividades')) return 'atividades';
        if (path.includes('/configuracoes')) return 'configuracoes';
        if (path.includes('/checklists')) return 'checklists';
        if (path.includes('/remessas')) return 'remessas';
        if (path.includes('/usuarios') || path.includes('/usuario') || path.includes('/equipe')) return 'usuarios';
        return 'ordens'; // fallback
    };

    return (<>
        { usuarioLogado.permissao === "gerente" && <>
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
                label="Equipes"
                value="usuarios"
                icon={<GroupsTwoToneIcon />}
                component={Link}
                to="/usuarios"
                showLabel
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
        </>}

        { usuarioLogado.permissao === "atividades" && 
        <BottomNavigation
            className="bottomNavigation"
            sx={{ width: '100%' }}
            value={currentTab() ?? 'ordens'}
            showLabels
        >
            <BottomNavigationAction
                label="Atividades"
                value="atividades"
                icon={<AssignmentTwoToneIcon />}
                component={Link}
                to="/atividades"
                showLabel
            />

            <BottomNavigationAction
                label="Equipes"
                value="usuarios"
                icon={<GroupsTwoToneIcon />}
                component={Link}
                to={"/usuario/" + usuarioLogado.id}
                showLabel
            />
        </BottomNavigation>
        }
        { false && 
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
                sx={{ display: usuarioLogado.permissao === "gerente" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Ordens"
                value="ordens"
                icon={<FactoryTwoToneIcon />}
                component={Link}
                to="/ordens"
                showLabel
                sx={{ display: usuarioLogado.permissao === "gerente" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Atividades"
                value="atividades"
                icon={<AssignmentTwoToneIcon />}
                component={Link}
                to="/atividades"
                showLabel
                sx={{ display: usuarioLogado.permissao === "atividades" ? 'flex' : 'none' }}

            />
            <BottomNavigationAction
                label="Checklists"
                value="checklists"
                icon={<CheckBoxTwoToneIcon />}
                component={Link}
                to="/checklists"
                showLabel
                sx={{ display: usuarioLogado.permissao === "checklists" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Remessas"
                value="remessas"
                icon={<LocalShippingTwoToneIcon />}
                component={Link}
                to="/remessas"
                showLabel
                sx={{ display: usuarioLogado.permissao === "remessas" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Equipes"
                value="usuarios"
                icon={<GroupsTwoToneIcon />}
                component={Link}
                to="/usuarios"
                showLabel
                sx={{ display: usuarioLogado.permissao === "gerente" ? 'flex' : 'none' }}
            />
            <BottomNavigationAction
                label="Configurações"
                value="configuracoes"
                icon={<SettingsApplicationsTwoToneIcon />}
                component={Link}
                to="/configuracoes"
                showLabel
                sx={{ display: usuarioLogado.permissao === "gerente" ? 'flex' : 'none' }}
            />
        </BottomNavigation>
        }
    </>
    )
}