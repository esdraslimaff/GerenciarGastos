using Gastos.Application.DTOs.Login;
using Gastos.Application.Interfaces;
using Gastos.Domain.Entities;
using Gastos.Domain.Interfaces.Repositories;
using Gastos.Domain.Interfaces.Seguranca;

namespace Gastos.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IUsuarioRepository _usuarioRepository;

        public AuthService(ITokenGenerator tokenGenerator, IUsuarioRepository usuarioRepository)
        {
            _tokenGenerator = tokenGenerator;
            _usuarioRepository = usuarioRepository;
        }

        public async Task<string> Login(LoginDto loginDto)
        {
            var usuario = await _usuarioRepository.GetByEmailAsync(loginDto.Email);          
            if (usuario == null) return null;
            if (loginDto.Senha != usuario.SenhaHash) return null;

            return _tokenGenerator.GenerateToken(usuario);
        }

        public async Task<Usuario> Registrar(CriarLogin dto)
        {     
            var usuarioExistente = await _usuarioRepository.GetByEmailAsync(dto.Email);
            if (usuarioExistente != null) throw new Exception("E-mail já cadastrado.");

            string senhaHash = dto.Senha;

            var novoUsuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = senhaHash,
                Perfil = "Usuario"
            };

            return await _usuarioRepository.AddAsync(novoUsuario);
        }
    }
}