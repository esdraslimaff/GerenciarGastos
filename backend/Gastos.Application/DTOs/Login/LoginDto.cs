using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.DTOs.Login
{
    public record CriarLogin(string Nome, string Email, string Senha);
    public class LoginDto
    {
        public string Email { get; set; }
        public string Senha { get; set; } 
    }
}
