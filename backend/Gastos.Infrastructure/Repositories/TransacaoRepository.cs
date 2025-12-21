using Gastos.Domain.Entities;
using Gastos.Domain.Interfaces;
using Gastos.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Infrastructure.Repositories
{
    public class TransacaoRepository : BaseRepository<Transacao>, ITransacaoRepository
    {
        public TransacaoRepository(MyContext context) : base(context) { }

        public async Task<IEnumerable<Transacao>> ObterTodasComDetalhesAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
