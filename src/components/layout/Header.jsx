import '~/assets/scss/Header.scss';

import * as React from 'react';
import { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { useUser } from "~/context/UserContext";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const { usuarioLogado, departamentos, selectedDepartamento, setSelectedDepartamento, carregarDepartamentos } = useUser();

  const [active, setActive] = useState(false)



  useEffect(() => {
    carregarDepartamentos(usuarioLogado.id);
  }, [active]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Box className="left">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setActive(true)}
            >
              <MenuIcon />
            </IconButton>
            <h1>{selectedDepartamento?.nome}</h1>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={"menu "+(active ? 'active' : '') }>
        <Box className="menu_content">
          <Button onClick={() => setActive(false)} className="close" variant="contained"><CancelTwoToneIcon />Fechar</Button>
          <div className="links">
            { departamentos && (
              departamentos.map((departamento) => (
                <Button
                  key={departamento.id}
                  variant="contained"
                  className={selectedDepartamento.id === departamento.id ? 'active' : ''}
                  onClick={() => {
                    setSelectedDepartamento(departamento);
                    setActive(false);
                  }}
                >
                  {departamento.nome}
                </Button>
              ))
            )}
          </div>
          <Button className="logout" variant="contained" onClick={logout}><MeetingRoomTwoToneIcon /> Logout</Button>
        </Box>
      </Box>
    </Box>
  );
}