using Gastos.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.DTOs.Transacao
{
    public record CreateTransacaoDTO(string Descricao, decimal Valor, ETipoTransacao Tipo, int PessoaId, int CategoriaId);

    public record TransacaoDTO(int Id, string Descricao, decimal Valor, string Tipo, string NomePessoa, string NomeCategoria);
}
