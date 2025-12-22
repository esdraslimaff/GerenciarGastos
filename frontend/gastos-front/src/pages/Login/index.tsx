import React, { useState } from 'react';
import { 
    Container, 
    Paper, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert, 
    Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        setErro('');
        try {
            await login({ email, senha });
            navigate('/dashboard'); 
        } catch (error) {
            if (error instanceof Error) {
                setErro("Dados de login inválidos. Verifique o e-mail e a senha.");
            } else {
                setErro('Ocorreu um erro inesperado ao tentar logar.');
            }
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" align="center">Sistema de Gastos</Typography>
                <Typography variant="body2" align="center" color="textSecondary">Faça login para continuar</Typography>

                {erro && <Alert severity="error">{erro}</Alert>}

                <TextField 
                    label="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    fullWidth 
                />
                <TextField 
                    label="Senha" 
                    type="password" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)} 
                    fullWidth 
                />

                <Button variant="contained" size="large" onClick={handleLogin}>
                    Entrar
                </Button>

                <Box textAlign="center" mt={2}>
                    <Link component={RouterLink} to="/register" variant="body2">
                        Não tem conta? Cadastre-se
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};