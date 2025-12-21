import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box } from '@mui/material';
import { pessoaService } from '../../api/pessoa.api';
import type { CreatePessoaDTO, PessoaDTO } from '../../models/pessoa.model';

export const ListaPessoas = () => {
    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
    const [novoNome, setNovoNome] = useState('');
    const [novaIdade, setNovaIdade] = useState('');

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const dados = await pessoaService.getAll();
            setPessoas(dados);
        } catch (error) {
            console.error('Erro ao carregar', error);
        }
    };

    const handleSalvar = async () => {
        if (!novoNome || !novaIdade) return;
        
        const dto: CreatePessoaDTO = { 
            nome: novoNome, 
            idade: parseInt(novaIdade) 
        };

        await pessoaService.create(dto);
        setNovoNome('');
        setNovaIdade('');
        carregar();
    };

    const handleDeletar = async (id: number) => {
        if(confirm('Deseja excluir?')) {
            await pessoaService.delete(id);
            carregar();
        }
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Pessoas</Typography>
            
            {}
            {}
            <Paper sx={{ 
                p: 2, 
                mb: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2,
                alignItems: 'center' 
            }}>
                <TextField 
                    label="Nome" 
                    size="small" 
                    value={novoNome} 
                    onChange={e => setNovoNome(e.target.value)} 
                    fullWidth 
                    sx={{ flex: 1 }} 
                />
                
                <TextField 
                    label="Idade" 
                    type="number" 
                    size="small" 
                    value={novaIdade} 
                    onChange={e => setNovaIdade(e.target.value)} 
                    fullWidth
                    sx={{ flex: { xs: 1, sm: 0.3 } }} 
                />

                <Button 
                    variant="contained" 
                    onClick={handleSalvar}
                    fullWidth
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Adicionar
                </Button>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pessoas.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.nome}</TableCell>
                                <TableCell>{p.idade}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => handleDeletar(p.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};