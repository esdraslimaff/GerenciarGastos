export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

// export const getTipoTransacaoLabel = (tipo: number) => tipo === 1 ? 'Receita' : 'Despesa';
// export const getFinalidadeLabel = (fin: number) => {
//     switch(fin) {
//         case 1: return 'Despesa';
//         case 2: return 'Receita';
//         default: return 'Ambas';
//     }
// }