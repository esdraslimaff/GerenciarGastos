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
    public class CategoriaRepository : BaseRepository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(MyContext context) : base(context) { }

        public async Task<IEnumerable<Categoria>> ObterTodasComTransacoesAsync()
        {
            return await _context.Set<Categoria>()
                .Include(c => c.Transacoes)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
