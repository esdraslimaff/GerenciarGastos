using Gastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Domain.Interfaces
{
    public interface IPessoaRepository : IRepository<Pessoa>
    {
        //TO-DO: Inserir métodos como: Buscar todas pessoas com totais de despesas e receitas, etc...
    }
}
