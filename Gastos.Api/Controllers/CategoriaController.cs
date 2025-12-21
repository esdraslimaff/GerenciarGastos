using Gastos.Application.DTOs.Categoria;
using Gastos.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CreateCategoriaDTO dto)
        {
                var categoria = await _categoriaService.CriarAsync(dto);
                return Created($"/api/categoria/{categoria.Id}", categoria);

        }

        [HttpGet]
        public async Task<IActionResult> ObterTodas()
        {
            var categorias = await _categoriaService.ObterTodasAsync();
            return Ok(categorias);
        }

        [HttpGet("totais")]
        public async Task<IActionResult> ObterRelatorioTotais()
        {
            var relatorio = await _categoriaService.ObterRelatorioTotaisAsync();
            return Ok(relatorio);
        }
    }
}
