import  api from './axios';
import type { CategoriaDTO, CreateCategoriaDTO, RelatorioCategoriasDTO } from '../models/categoria.model';

export const categoriaService = {
    getAll: async () => {
        const response = await api.get<CategoriaDTO[]>('/Categoria');
        return response.data;
    },
    getTotais: async () => {
        const response = await api.get<RelatorioCategoriasDTO>('/Categoria/totais');
        return response.data;
    },
    create: async (data: CreateCategoriaDTO) => {
        const response = await api.post('/Categoria', data);
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/Categoria/${id}`);
    }
};