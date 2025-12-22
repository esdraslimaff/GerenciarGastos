import { ETipoTransacao } from "./Enums";

export interface TransacaoDTO {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    nomePessoa: string;
    nomeCategoria: string;
}

export interface CreateTransacaoDTO {
    descricao: string;
    valor: number;
    tipo: ETipoTransacao;
    pessoaId: number;
    categoriaId: number;
}