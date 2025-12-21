import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tabs, Tab } from '@mui/material';
import { pessoaService } from '../api/pessoa.api';
import { categoriaService } from '../api/categoria.api';
import type { RelatorioPessoasDTO } from '../models/pessoa.model';
import type { RelatorioCategoriasDTO } from '../models/categoria.model';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const Dashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [relatorioPessoas, setRelatorioPessoas] = useState<RelatorioPessoasDTO | null>(null);
    const [relatorioCategorias, setRelatorioCategorias] = useState<RelatorioCategoriasDTO | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [dadosPessoas, dadosCategorias] = await Promise.all([
                pessoaService.getTotais(),
                categoriaService.getTotais()
            ]);
            
            setRelatorioPessoas(dadosPessoas);
            setRelatorioCategorias(dadosCategorias);
        } catch (error) {
            console.error("Erro ao carregar dashboard (verifique se a API está rodando)", error);
        }
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Dashboard Financeiro</Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabIndex} onChange={handleChangeTab}>
                    <Tab label="Totais por Pessoa" />
                    <Tab label="Totais por Categoria" />
                </Tabs>
            </Box>

            {/* TAB 1: RELATÓRIO DE PESSOAS */}
            {tabIndex === 0 && relatorioPessoas && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><b>Nome</b></TableCell>
                                <TableCell align="right"><b>Receitas</b></TableCell>
                                <TableCell align="right"><b>Despesas</b></TableCell>
                                <TableCell align="right"><b>Saldo</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {relatorioPessoas.pessoas.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.nome}</TableCell>
                                    <TableCell align="right" sx={{ color: 'green' }}>{formatCurrency(p.totalReceitas)}</TableCell>
                                    <TableCell align="right" sx={{ color: 'red' }}>{formatCurrency(p.totalDespesas)}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: p.saldo >= 0 ? 'blue' : 'red' }}>
                                        {formatCurrency(p.saldo)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                <TableCell><b>TOTAL GERAL</b></TableCell>
                                <TableCell align="right"><b>{formatCurrency(relatorioPessoas.totalReceitasGeral)}</b></TableCell>
                                <TableCell align="right"><b>{formatCurrency(relatorioPessoas.totalDespesasGeral)}</b></TableCell>
                                <TableCell align="right" sx={{ color: relatorioPessoas.saldoGeral >= 0 ? 'blue' : 'red' }}>
                                    <b>{formatCurrency(relatorioPessoas.saldoGeral)}</b>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* TAB 2: RELATÓRIO DE CATEGORIAS */}
            {tabIndex === 1 && relatorioCategorias && (
                 <TableContainer component={Paper}>
                 <Table>
                     <TableHead>
                         <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                             <TableCell><b>Descrição</b></TableCell>
                             <TableCell align="right"><b>Receitas</b></TableCell>
                             <TableCell align="right"><b>Despesas</b></TableCell>
                             <TableCell align="right"><b>Saldo</b></TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
                         {relatorioCategorias.categorias.map((c) => (
                             <TableRow key={c.id}>
                                 <TableCell>{c.descricao}</TableCell>
                                 <TableCell align="right" sx={{ color: 'green' }}>{formatCurrency(c.totalReceitas)}</TableCell>
                                 <TableCell align="right" sx={{ color: 'red' }}>{formatCurrency(c.totalDespesas)}</TableCell>
                                 <TableCell align="right" sx={{ fontWeight: 'bold', color: c.saldo >= 0 ? 'blue' : 'red' }}>
                                     {formatCurrency(c.saldo)}
                                 </TableCell>
                             </TableRow>
                         ))}
                         <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                             <TableCell><b>TOTAL GERAL</b></TableCell>
                             <TableCell align="right"><b>{formatCurrency(relatorioCategorias.totalReceitasGeral)}</b></TableCell>
                             <TableCell align="right"><b>{formatCurrency(relatorioCategorias.totalDespesasGeral)}</b></TableCell>
                             <TableCell align="right" sx={{ color: relatorioCategorias.saldoGeral >= 0 ? 'blue' : 'red' }}>
                                 <b>{formatCurrency(relatorioCategorias.saldoGeral)}</b>
                             </TableCell>
                         </TableRow>
                     </TableBody>
                 </Table>
             </TableContainer>
            )}
        </Container>
    );
};