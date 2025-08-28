import '~/assets/scss/InfoProdutoModal.scss'

import { Box } from '@mui/material';
import { InfoProduto } from '../../pages/Ordem';

export default function InfoProdutoModal({ ordem }) {
    return (
        <Box className="infoProdutoModal">
            <InfoProduto ordem_id={ordem?.id} />
        </Box>
    )
}