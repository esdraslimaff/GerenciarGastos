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
    public class PessoaRepository : BaseRepository<Pessoa>, IPessoaRepository
    {
        public PessoaRepository(MyContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Pessoa>> ObterTodasComTransacoesAsync()
        {
            return await _context.Pessoas
                .Include(p => p.Transacoes)
                .AsNoTracking()
                .ToListAsync();
        }

    }
}
