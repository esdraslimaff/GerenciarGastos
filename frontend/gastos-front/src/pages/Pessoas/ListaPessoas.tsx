import React, { useEffect, useState } from 'react';
import { 
    Container, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, TextField,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { pessoaService } from '../../api/pessoa.api';
import type { CreatePessoaDTO, PessoaDTO } from '../../models/pessoa.model';
import { toast } from 'react-toastify';

export const ListaPessoas = () => {
    const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
    const [novoNome, setNovoNome] = useState('');
    const [novaIdade, setNovaIdade] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [idParaDeletar, setIdParaDeletar] = useState<number | null>(null);

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const dados = await pessoaService.getAll();
            setPessoas(dados);
        } catch (error) {
            toast.error('Erro ao carregar lista de pessoas.');
        }
    };

    const handleSalvar = async () => {
        if (!novoNome || !novaIdade) {
            toast.warning('Por favor, preencha Nome e Idade.');
            return;
        }

        const idadeInt = parseInt(novaIdade);
        if (idadeInt < 0) {
            toast.warning('A idade deve ser um número positivo.');
            return;
        }
        
        try {
            const dto: CreatePessoaDTO = { 
                nome: novoNome, 
                idade: idadeInt
            };
    
            await pessoaService.create(dto);
            toast.success('Pessoa cadastrada com sucesso!');
            
            setNovoNome('');
            setNovaIdade('');
            carregar();
        } catch (error) {
            toast.error('Erro ao salvar pessoa.');
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
            await pessoaService.delete(idParaDeletar);
            toast.success('Pessoa excluída com sucesso.');
            carregar();
        } catch (error) {
            toast.error('Erro ao excluir pessoa.');
        } finally {
            fecharModalDelete();
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Pessoas</Typography>
            
            <Paper sx={{ p: 2, mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
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

                <Button variant="contained" onClick={handleSalvar} fullWidth sx={{ width: { xs: '100%', sm: 'auto' } }}>
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
                                    <Button color="error" onClick={() => abrirModalDelete(p.id)}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                        Deseja realmente excluir esta pessoa? <br/>
                        <strong>Atenção:</strong> Todas as transações vinculadas a ela também serão apagadas.
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