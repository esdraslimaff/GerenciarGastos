import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <AttachMoneyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 4, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.1rem' }}
                    >
                        GASTOS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                        <Button component={RouterLink} to="/" sx={{ color: 'white', display: 'block' }}>
                            Dashboard
                        </Button>
                        <Button component={RouterLink} to="/pessoas" sx={{ color: 'white', display: 'block' }}>
                            Pessoas
                        </Button>
                        <Button component={RouterLink} to="/categorias" sx={{ color: 'white', display: 'block' }}>
                            Categorias
                        </Button>
                        <Button component={RouterLink} to="/transacoes" sx={{ color: 'white', display: 'block' }}>
                            Transações
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}