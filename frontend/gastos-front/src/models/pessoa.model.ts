export interface PessoaDTO {
    id: number;
    nome: string;
    idade: number;
}

export interface CreatePessoaDTO {
    nome: string;
    idade: number;
}


export interface PessoaResumoDTO {
    id: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioPessoasDTO {
    totalReceitasGeral: number;
    totalDespesasGeral: number;
    saldoGeral: number;
    pessoas: PessoaResumoDTO[];
}