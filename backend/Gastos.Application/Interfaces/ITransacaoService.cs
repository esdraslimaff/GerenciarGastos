using Gastos.Application.DTOs.Transacao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Interfaces
{
    public interface ITransacaoService
    {
        Task<TransacaoDTO> CriarAsync(CreateTransacaoDTO dto);
        Task<IEnumerable<TransacaoDTO>> ObterTodasAsync();
    }
}
