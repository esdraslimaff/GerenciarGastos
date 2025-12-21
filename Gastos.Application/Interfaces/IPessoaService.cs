using Gastos.Application.DTOs.Pessoa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Interfaces
{
    public interface IPessoaService
    {
        Task<PessoaDTO> CriarAsync(CreatePessoaDTO dto);
        Task<IEnumerable<PessoaDTO>> ObterTodasPessoasAsync();
        Task<PessoaDTO?> ObterPorIdAsync(int id);
        Task DeletarAsync(int id);
        Task<RelatorioPessoasDTO> ObterRelatorioTotaisAsync();
    }
}
