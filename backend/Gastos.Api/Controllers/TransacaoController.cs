using Gastos.Application.DTOs.Transacao;
using Gastos.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreateTransacaoDTO dto)
        {
                var transacao = await _transacaoService.CriarAsync(dto);
                return Created($"/api/transacao/{transacao.Id}", transacao);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> ObterTodas()
        {
            var transacoes = await _transacaoService.ObterTodasAsync();
            return Ok(transacoes);
        }
    }
}
