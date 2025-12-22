import  api  from './axios';
import type { CreatePessoaDTO, PessoaDTO, RelatorioPessoasDTO } from '../models/pessoa.model';

export const pessoaService = {
    getAll: async () => {
        const response = await api.get<PessoaDTO[]>('/Pessoa');
        return response.data;
    },
    getTotais: async () => {
        const response = await api.get<RelatorioPessoasDTO>('/Pessoa/totais');
        return response.data;
    },
    create: async (data: CreatePessoaDTO) => {
        const response = await api.post('/Pessoa', data);
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/Pessoa/${id}`);
    }
};