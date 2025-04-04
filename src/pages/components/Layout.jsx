import Footer from "./Footer";
import Header from "./Header";
import { Container, Box, TextField, Button } from '@mui/material';
import '~/assets/scss/Layout.scss'


export default function Layout({ children }){


    return (
        <Box className="layout_content">
            <Header />
            <Box className="content">
                {children}
            </Box>
            <Footer/>
        </Box>
    )
}