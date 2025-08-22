import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '~/assets/scss/Breadcrumbs.scss';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

export default function Breadcrumbs({ links }) {
    console.log(links);
    
    return (
        <Box className="breadcrumbs">
        {links.length > 0 && 
            <Box sx={{ minHeight: '25px' }}>
                { links.map((item) => (
                    <div className="item">
                        <Button component={Link} to={item.url}>{item.label}</Button>
                        <span><KeyboardArrowRightRoundedIcon /></span>
                    </div>
                ))}
            </Box>
        }
        </Box>
    )
}