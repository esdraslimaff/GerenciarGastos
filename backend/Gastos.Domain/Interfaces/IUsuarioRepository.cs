using Gastos.Domain.Entities;

namespace Gastos.Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario> GetByEmailAsync(string email);
        Task<Usuario> AddAsync(Usuario usuario);
    }
}