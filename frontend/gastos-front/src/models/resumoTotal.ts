export interface PessoaResumo {
    id: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioTotais {
    totalReceitasGeral: number;
    totalDespesasGeral: number;
    saldoGeral: number;
    pessoas: PessoaResumo[];
}