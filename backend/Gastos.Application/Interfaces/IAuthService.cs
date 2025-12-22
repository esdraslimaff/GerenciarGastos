using Gastos.Application.DTOs.Login;
using Gastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(LoginDto loginDto);
        Task<Usuario> Registrar(CriarLogin criarLoginDto);
    }
}
