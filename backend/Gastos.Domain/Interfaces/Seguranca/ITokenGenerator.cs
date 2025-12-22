using Gastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Domain.Interfaces.Seguranca
{
    public interface ITokenGenerator
    {
        string GenerateToken(Usuario usuario);
    }
}
