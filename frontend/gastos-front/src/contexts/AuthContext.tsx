import React, { createContext, useState, useContext, useEffect } from 'react';
import { type LoginInput, type LoginResponse, authService } from '../api/auth.api';
import  api from '../api/axios';

interface AuthContextData {
    signed: boolean;
    user: LoginResponse['usuario'] | null;
    login: (data: LoginInput) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginResponse['usuario'] | null>(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('gastos_user');
        const storagedToken = localStorage.getItem('gastos_token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }
    }, []);

    async function login(data: LoginInput) {
        const response = await authService.login(data);

        setUser(response.usuario);

        localStorage.setItem('gastos_user', JSON.stringify(response.usuario));
        localStorage.setItem('gastos_token', response.token);

        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('gastos_user');
        localStorage.removeItem('gastos_token');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}