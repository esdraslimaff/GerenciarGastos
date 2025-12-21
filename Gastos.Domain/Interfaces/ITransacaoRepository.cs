using Gastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Domain.Interfaces
{
    public interface ITransacaoRepository : IRepository<Transacao>
    {
        Task<IEnumerable<Transacao>> ObterTodasComDetalhesAsync();
    }
}
