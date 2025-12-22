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
import { authService, type RegisterDTO } from '../../api/auth.api';

export const RegisterPage = () => {
    const navigate = useNavigate();

    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setErro('');
        
        
        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        if (!nome || !email || !senha) {
            setErro('Preencha todos os campos.');
            return;
        }

        try {
            setLoading(true);
            
           
            const dadosCadastro: RegisterDTO = {
                nome,
                email,
                senha
            };

            
            await authService.register(dadosCadastro);

            setSucesso(true);
            
            
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);

        } catch (error) {
            if (error instanceof Error) {            
                setErro(error.message);
            } else {
                setErro('Erro ao tentar cadastrar usuário.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" align="center">Crie sua Conta</Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                    Preencha os dados abaixo
                </Typography>

                
                {erro && <Alert severity="error">{erro}</Alert>}
                {sucesso && <Alert severity="success">Cadastro realizado com sucesso! Redirecionando...</Alert>}

                <TextField 
                    label="Nome Completo" 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    fullWidth 
                    required
                />

                <TextField 
                    label="Email" 
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    fullWidth 
                    required
                />

                <TextField 
                    label="Senha" 
                    type="password" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)} 
                    fullWidth 
                    required
                />

                <TextField 
                    label="Confirmar Senha" 
                    type="password" 
                    value={confirmarSenha} 
                    onChange={e => setConfirmarSenha(e.target.value)} 
                    fullWidth 
                    error={senha !== confirmarSenha && confirmarSenha !== ''}
                    helperText={senha !== confirmarSenha && confirmarSenha !== '' ? "Senhas não conferem" : ""}
                />

                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handleRegister}
                    disabled={loading || sucesso}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                <Box textAlign="center" mt={2}>
                    <Link component={RouterLink} to="/" variant="body2">
                        Já tem uma conta? Faça Login
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};