import React, { useEffect, useState } from 'react';
import { 
    Container, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, 
    Box, Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { categoriaService } from '../../api/categoria.api';
import type { CategoriaDTO, CreateCategoriaDTO } from '../../models/categoria.model';
import { EFinalidadeCategoria } from '../../models/Enums';
import { toast } from 'react-toastify'; 

export const ListaCategorias = () => {
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<EFinalidadeCategoria>(EFinalidadeCategoria.Despesa);

    const [openDialog, setOpenDialog] = useState(false);
    const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null);

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const dados = await categoriaService.getAll();
            setCategorias(dados);
        } catch (error) {
            toast.error('Erro ao carregar categorias.');
        }
    };

    const handleSalvar = async () => {
        if (!descricao.trim()) {
            toast.warning('A descrição é obrigatória.');
            return;
        }

        try {
            const dto: CreateCategoriaDTO = { 
                descricao, 
                finalidade: Number(finalidade) 
            };
            
            await categoriaService.create(dto);
            toast.success('Categoria salva com sucesso!');
            
            setDescricao('');
            setFinalidade(EFinalidadeCategoria.Despesa);
            carregar();
        } catch (error) {
            toast.error('Erro ao salvar categoria.');
        }
    };

    const abrirModalDelete = (id: number) => {
        setIdParaDeletar(id);
        setOpenDialog(true);
    };

    const fecharModalDelete = () => {
        setOpenDialog(false);
        setIdParaDeletar(null);
    };

    const confirmarExclusao = async () => {
        if (idParaDeletar === null) return;

        try {
            await categoriaService.delete(idParaDeletar);
            toast.success('Categoria excluída!');
            carregar();
        } catch (error) {
            toast.error('Não é possível excluir categoria que já possui transações.');
        } finally {
            fecharModalDelete();
        }
    };

    const renderFinalidade = (valor: number | string) => {
        const valorStr = String(valor).toLowerCase();
        const valorNum = Number(valor);
        let label = 'Desconhecido';
        let cor: "default" | "error" | "success" | "warning" = "default";

        if (valorNum === EFinalidadeCategoria.Despesa || valorStr === 'despesa') {
            label = 'Despesa'; cor = 'error';
        } else if (valorNum === EFinalidadeCategoria.Receita || valorStr === 'receita') {
            label = 'Receita'; cor = 'success';
        } else if (valorNum === EFinalidadeCategoria.Ambas || valorStr === 'ambas') {
            label = 'Ambas'; cor = 'warning';
        }

        return <Chip label={label} color={cor} size="small" variant="outlined" />;
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Categorias</Typography>
            
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Nova Categoria</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
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
                    <Button variant="contained" onClick={handleSalvar} fullWidth sx={{ width: { xs: '100%', sm: 'auto' }, height: 40 }}>
                        Adicionar
                    </Button>
                </Box>
            </Paper>

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
                                    {/* Botão agora chama abrirModalDelete em vez de deletar direto */}
                                    <Button color="error" onClick={() => abrirModalDelete(c.id)}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categorias.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">Nenhuma categoria cadastrada.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- COMPONENTE DIALOG (MODAL) --- */}
            <Dialog
                open={openDialog}
                onClose={fecharModalDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmar Exclusão"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja excluir esta categoria?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharModalDelete} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmarExclusao} color="error" autoFocus>
                        Sim, Excluir
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};