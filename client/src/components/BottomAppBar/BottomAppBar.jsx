

import { AppBar, Toolbar, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import './BottomAppBar.css';


const BottomAppBar= () => {
    return(
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, height: '45px', backgroundColor: '#facfaf' }}>

            <Toolbar sx={{ justifyContent: 'center' }}>

             <Link to='/create'>
                <Fab
                    color="secondary"
                    arial-label="add"
                    sx={{ 
                        position:'absolute', 
                        left: '50%' ,
                        bottom: 30, 
                        zIndex: 1,
                        '&:hover': {
                            backgroundColor: '#ff4081',
                            transition: 'background-color 0.3s',
                        },
                    }}
                    >
                        <AddIcon />
                    </Fab>
                 </Link>

            </Toolbar>
           </AppBar>
        </Box>
    );
}

export default BottomAppBar