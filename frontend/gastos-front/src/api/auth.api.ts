import api  from './axios';

export interface LoginInput {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
    usuario: {
        email: string;
    }
}

export interface RegisterDTO {
    nome: string;
    email: string;
    senha: string;
}

export const authService = {
    login: async (data: LoginInput) => {
        const response = await api.post<LoginResponse>('/Auth/login', data);
        return response.data;
    },
    
    register: async (data: RegisterDTO) => {
        const response = await api.post('/Auth/register', data);
        return response.data;
    }
};