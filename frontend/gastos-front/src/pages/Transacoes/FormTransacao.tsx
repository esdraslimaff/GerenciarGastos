import React, { useEffect, useState, useMemo } from 'react';
import { Container, Typography, Button, TextField, MenuItem, Paper, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pessoaService } from '../../api/pessoa.api';
import { categoriaService } from '../../api/categoria.api';
import { transacaoService } from '../../api/transacao.api';
import type { PessoaDTO } from '../../models/pessoa.model';
import type { CategoriaDTO } from '../../models/categoria.model';
import { ETipoTransacao } from '../../models/Enums';

export const FormTransacao = () => {
    const navigate = useNavigate();
    
    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState<ETipoTransacao>(ETipoTransacao.Despesa);
    const [pessoaId, setPessoaId] = useState<number | ''>('');
    const [categoriaId, setCategoriaId] = useState<number | ''>('');

    const [erro, setErro] = useState('');
    const [aviso, setAviso] = useState('');

    useEffect(() => {
        const carregar = async () => {
            const p = await pessoaService.getAll();
            const c = await categoriaService.getAll();
            setPessoas(p);
            setCategorias(c);
        };
        carregar();
    }, []);

    useEffect(() => {
        if (!pessoaId) return;
        const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);
        
        if (pessoaSelecionada && pessoaSelecionada.idade < 18) {
            setAviso(`Nota: ${pessoaSelecionada.nome} é menor de idade. Apenas Despesas são permitidas.`);
            setTipo(ETipoTransacao.Despesa);
        } else {
            setAviso('');
        }
    }, [pessoaId, pessoas]);

    const categoriasFiltradas = useMemo(() => {
        return categorias.filter(cat => {
            if (tipo === ETipoTransacao.Despesa) {
                return cat.finalidade === 'Despesa' || cat.finalidade === 'Ambas';
            } else {
                return cat.finalidade === 'Receita' || cat.finalidade === 'Ambas';
            }
        });
    }, [categorias, tipo]);

    useEffect(() => {
        if (categoriaId) {
            const aindaValida = categoriasFiltradas.find(c => c.id === categoriaId);
            if (!aindaValida) setCategoriaId('');
        }
    }, [tipo, categoriasFiltradas]);


    const handleSalvar = async () => {
        if (!pessoaId || !categoriaId || valor <= 0 || !descricao) {
            setErro("Preencha todos os campos. Valor deve ser positivo.");
            return;
        }

        const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);
        if (pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === ETipoTransacao.Receita) {
            setErro("Erro de segurança: Menor de idade não pode ter receita.");
            return;
        }

        try {
            await transacaoService.create({
                descricao,
                valor,
                tipo,
                pessoaId: Number(pessoaId),
                categoriaId: Number(categoriaId)
            });
            navigate('/transacoes');
        } catch (error) {
            setErro("Erro ao salvar. Verifique se o backend está rodando.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Nova Transação</Typography>
                
                {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
                {aviso && <Alert severity="info" sx={{ mb: 2 }}>{aviso}</Alert>}

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    
                    {}
                    <TextField
                        select
                        label="Pessoa"
                        value={pessoaId}
                        onChange={e => setPessoaId(Number(e.target.value))}
                    >
                        {pessoas.map(p => (
                            <MenuItem key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</MenuItem>
                        ))}
                    </TextField>

                    {}
                    <TextField
                        select
                        label="Tipo"
                        value={tipo}
                        onChange={e => setTipo(Number(e.target.value))}
                        disabled={!!(pessoaId && pessoas.find(p => p.id === pessoaId)?.idade! < 18)}
                    >
                        <MenuItem value={ETipoTransacao.Despesa}>Despesa</MenuItem>
                        <MenuItem value={ETipoTransacao.Receita}>Receita</MenuItem>
                    </TextField>

                    {}
                    <TextField 
                        label="Descrição" 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                    />
                    
                    {}
                    <TextField 
                        label="Valor" 
                        type="number" 
                        value={valor} 
                        onChange={e => setValor(parseFloat(e.target.value))} 
                        inputProps={{ min: 0.01, step: 0.01 }}
                    />

                    {}
                    <TextField
                        select
                        label="Categoria"
                        value={categoriaId}
                        onChange={e => setCategoriaId(Number(e.target.value))}
                        helperText={tipo === ETipoTransacao.Despesa ? "Exibindo categorias de Despesa/Ambas" : "Exibindo categorias de Receita/Ambas"}
                    >
                        {categoriasFiltradas.length === 0 ? (
                            <MenuItem disabled>Nenhuma categoria compatível encontrada</MenuItem>
                        ) : (
                            categoriasFiltradas.map(c => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.descricao} ({c.finalidade})
                                </MenuItem>
                            ))
                        )}
                    </TextField>

                    <Button variant="contained" size="large" onClick={handleSalvar}>
                        Salvar
                    </Button>
                    <Button variant="text" onClick={() => navigate('/transacoes')}>
                        Voltar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};