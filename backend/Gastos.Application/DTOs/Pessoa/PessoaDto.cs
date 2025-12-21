using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.DTOs.Pessoa
{
    public record CreatePessoaDTO(string Nome, int Idade);
    public record UpdatePessoaDTO(int Id, string Nome, int Idade);
    public record PessoaDTO(int Id, string Nome, int Idade);

    public record PessoaResumoDTO(int Id, string Nome, decimal TotalReceitas, decimal TotalDespesas)
    {
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }

    public record RelatorioPessoasDTO(decimal TotalReceitasGeral, decimal TotalDespesasGeral,IEnumerable<PessoaResumoDTO> Pessoas)
    {
        public decimal SaldoGeral => TotalReceitasGeral - TotalDespesasGeral;
    }
}
