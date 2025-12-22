using Gastos.Application.DTOs.Pessoa;
using Gastos.Application.Interfaces;
using Gastos.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PessoaDTO>> Post([FromBody] CreatePessoaDTO dto)
        {
            var result = await _pessoaService.CriarAsync(dto);

            return CreatedAtAction(nameof(ObterPorId), new { id = result.Id }, result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var pessoa = await _pessoaService.ObterPorIdAsync(id);

            if (pessoa == null) return NotFound(new { mensagem = "Pessoa não encontrada." });

            return Ok(pessoa);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> ObterTodas()
        {
            var pessoas = await _pessoaService.ObterTodasPessoasAsync();
            return Ok(pessoas);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            await _pessoaService.DeletarAsync(id);
            return NoContent();
        }

        [Authorize]
        [HttpGet("totais")]
        public async Task<IActionResult> ObterRelatorioTotais()
        {
            var relatorio = await _pessoaService.ObterRelatorioTotaisAsync();
            return Ok(relatorio);
        }

    }
}
