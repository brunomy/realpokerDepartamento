import Footer from "./Footer";
import Header from "./Header";
import { Container, Box, TextField, Button } from '@mui/material';
import '~/assets/scss/Layout.scss'
import { useUser } from "~/context/UserContext";

export default function Layout({ children }){
    const { selectedEquipe } = useUser();

    return (
        <Box className="layout_content">
            <Header />
            <Box className={'content '+(selectedEquipe ? 'equipe' : '')}>
                {children}
            </Box>
            {!selectedEquipe && <Footer />}
        </Box>
    )
}