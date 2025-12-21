import { EFinalidadeCategoria } from "./Enums";

export interface CategoriaDTO {
    id: number;
    descricao: string;
    finalidade: string; 
}

export interface CreateCategoriaDTO {
    descricao: string;
    finalidade: EFinalidadeCategoria;
}

export interface CategoriaResumoDTO {
    id: number;
    descricao: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioCategoriasDTO {
    totalReceitasGeral: number;
    totalDespesasGeral: number;
    saldoGeral: number;
    categorias: CategoriaResumoDTO[];
}