import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { transacaoService } from '../../api/transacao.api';
import type { TransacaoDTO } from '../../models/transacao.model';

export const ListaTransacoes = () => {
    const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);

    useEffect(() => {
        const carregar = async () => {
            const dados = await transacaoService.getAll();
            setTransacoes(dados);
        };
        carregar();
    }, []);

    const handleDeletar = async (id: number) => {
        if(confirm('Excluir transação?')) {
            await transacaoService.delete(id);
            setTransacoes(prev => prev.filter(t => t.id !== id));
        }
    }

    return (
        <Container sx={{ mt: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Typography variant="h4">Transações</Typography>
                <Button variant="contained" component={Link} to="/transacoes/nova">Nova Transação</Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Pessoa</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transacoes.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell>{t.id}</TableCell>
                                <TableCell>{t.descricao}</TableCell>
                                <TableCell>{t.nomePessoa}</TableCell>
                                <TableCell>{t.nomeCategoria}</TableCell>
                                <TableCell>R$ {t.valor.toFixed(2)}</TableCell>
                                <TableCell style={{ color: t.tipo === 'Receita' ? 'green' : 'red' }}>
                                    {t.tipo}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};