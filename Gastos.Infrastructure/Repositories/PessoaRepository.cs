using Gastos.Domain.Entities;
using Gastos.Domain.Interfaces;
using Gastos.Infrastructure.Context;
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

    }
}
