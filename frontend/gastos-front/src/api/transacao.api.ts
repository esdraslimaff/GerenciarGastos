import  api  from './axios';
import type { CreateTransacaoDTO, TransacaoDTO } from '../models/transacao.model';

export const transacaoService = {
    getAll: async () => {
        const response = await api.get<TransacaoDTO[]>('/Transacao');
        return response.data;
    },
    create: async (data: CreateTransacaoDTO) => {
        const response = await api.post('/Transacao', data);
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/Transacao/${id}`);
    }
};