import React, { useEffect, useState } from 'react';
import { 
    Container, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, 
    Alert, Box, Chip
} from '@mui/material';
import { categoriaService } from '../../api/categoria.api';
import type { CategoriaDTO, CreateCategoriaDTO } from '../../models/categoria.model';
import { EFinalidadeCategoria } from '../../models/Enums';

export const ListaCategorias = () => {
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<EFinalidadeCategoria>(EFinalidadeCategoria.Despesa);
    const [erro, setErro] = useState('');

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const dados = await categoriaService.getAll();
            setCategorias(dados);
        } catch (error) {
            console.error('Erro ao carregar', error);
        }
    };

    const handleSalvar = async () => {
        if (!descricao) {
            setErro('A descrição é obrigatória.');
            return;
        }

        try {
            const dto: CreateCategoriaDTO = { 
                descricao, 
                finalidade 
            };
            await categoriaService.create(dto);
            
            setDescricao('');
            setFinalidade(EFinalidadeCategoria.Despesa);
            setErro('');
            carregar();
        } catch (error) {
            setErro('Erro ao salvar categoria.');
        }
    };

    const handleDeletar = async (id: number) => {
        if(confirm('Deseja excluir esta categoria?')) {
            try {
                await categoriaService.delete(id);
                carregar();
            } catch (error) {
                alert('Não é possível excluir categoria que já possui transações.');
            }
        }
    };

    const renderFinalidade = (textoFinalidade: string) => {
        let cor: "default" | "error" | "success" | "warning" = "default";
        
        if (textoFinalidade === 'Despesa') cor = "error";
        else if (textoFinalidade === 'Receita') cor = "success";
        else cor = "warning";

        return <Chip label={textoFinalidade} color={cor} size="small" variant="outlined" />;
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Categorias</Typography>
            
            {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

            {}
            {}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Nova Categoria</Typography>
                
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    gap: 2, 
                    alignItems: 'center' 
                }}>
                    <TextField 
                        label="Descrição" 
                        size="small" 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                        fullWidth
                        sx={{ flex: 1 }} 
                    />
                    
                    <TextField
                        select
                        label="Finalidade"
                        size="small"
                        value={finalidade}
                        onChange={e => setFinalidade(Number(e.target.value))}
                        fullWidth
                        sx={{ width: { xs: '100%', sm: '150px' } }}
                    >
                        <MenuItem value={EFinalidadeCategoria.Despesa}>Despesa</MenuItem>
                        <MenuItem value={EFinalidadeCategoria.Receita}>Receita</MenuItem>
                        <MenuItem value={EFinalidadeCategoria.Ambas}>Ambas</MenuItem>
                    </TextField>

                    <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleSalvar}
                        fullWidth
                        sx={{ width: { xs: '100%', sm: 'auto' }, height: 40 }}
                    >
                        Adicionar
                    </Button>
                </Box>
            </Paper>

            {/* Listagem */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell width="10%">ID</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell width="20%">Finalidade</TableCell>
                            <TableCell width="10%">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((c) => (
                            <TableRow key={c.id} hover>
                                <TableCell>{c.id}</TableCell>
                                <TableCell>{c.descricao}</TableCell>
                                <TableCell>{renderFinalidade(c.finalidade)}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => handleDeletar(c.id)}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categorias.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Nenhuma categoria cadastrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};