using Gastos.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.DTOs.Categoria
{
    public record CreateCategoriaDTO(string Descricao, EFinalidadeCategoria Finalidade);
    public record CategoriaDTO(int Id, string Descricao, string Finalidade);

    public record CategoriaResumoDTO(int Id, string Descricao, decimal TotalReceitas, decimal TotalDespesas)
    {
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }

    public record RelatorioCategoriasDTO(decimal TotalReceitasGeral, decimal TotalDespesasGeral, IEnumerable<CategoriaResumoDTO> Categorias)
    {
        public decimal SaldoGeral => TotalReceitasGeral - TotalDespesasGeral;
    }
}
