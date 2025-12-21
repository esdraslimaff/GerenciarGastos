using Gastos.Application.DTOs.Pessoa;
using Gastos.Application.Interfaces;
using Gastos.Application.Services;
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

        [HttpPost]
        public async Task<ActionResult<PessoaDTO>> Post([FromBody] CreatePessoaDTO dto)
        {
            var result = await _pessoaService.CriarAsync(dto);

            return CreatedAtAction(nameof(ObterPorId), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var pessoa = await _pessoaService.ObterPorIdAsync(id);

            if (pessoa == null) return NotFound(new { mensagem = "Pessoa não encontrada." });

            return Ok(pessoa);
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodas()
        {
            var pessoas = await _pessoaService.ObterTodasPessoasAsync();
            return Ok(pessoas);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            await _pessoaService.DeletarAsync(id);
            return NoContent();
        }

        [HttpGet("totais")]
        public async Task<IActionResult> ObterRelatorioTotais()
        {
            var relatorio = await _pessoaService.ObterRelatorioTotaisAsync();
            return Ok(relatorio);
        }

    }
}
