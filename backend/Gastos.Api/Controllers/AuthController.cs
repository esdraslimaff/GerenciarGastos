using Gastos.Application.DTOs.Login;
using Gastos.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.Login(dto);

            if (token == null)
                return Unauthorized("Usuário ou senha inválidos");

            return Ok(new { token = token, usuario = new { email = dto.Email } });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] CriarLogin dto)
        {
            try
            {
                var usuario = await _authService.Registrar(dto);
                return Created("", new { id = usuario.Id, email = usuario.Email });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
