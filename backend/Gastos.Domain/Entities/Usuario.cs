using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Domain.Entities
{
    public class Usuario:BaseEntity
    {
        public string Nome { get; set; }
        public string Email { get; set; }

        public string SenhaHash { get; set; }
        public string Perfil { get; set; }

    }
}
