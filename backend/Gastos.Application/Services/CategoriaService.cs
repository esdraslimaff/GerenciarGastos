using Gastos.Application.DTOs.Categoria;
using Gastos.Application.Interfaces;
using Gastos.Domain.Entities;
using Gastos.Domain.Enums;
using Gastos.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaService(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        public async Task<CategoriaDTO> CriarAsync(CreateCategoriaDTO dto)
        {
            var categoria = new Categoria(dto.Descricao, dto.Finalidade);
            var created = await _categoriaRepository.AddAsync(categoria);

            return new CategoriaDTO(created.Id, created.Descricao, created.Finalidade.ToString());
        }

        public async Task<IEnumerable<CategoriaDTO>> ObterTodasAsync()
        {
            var categorias = await _categoriaRepository.GetAllAsync();
            return categorias.Select(c => new CategoriaDTO(c.Id, c.Descricao, c.Finalidade.ToString()));
        }

        public async Task<RelatorioCategoriasDTO> ObterRelatorioTotaisAsync()
        {
            var categorias = await _categoriaRepository.ObterTodasComTransacoesAsync();

            var listaResumo = categorias.Select(c => new CategoriaResumoDTO(
                c.Id,
                c.Descricao,
                TotalReceitas: c.Transacoes.Where(t => t.Tipo == ETipoTransacao.Receita).Sum(t => t.Valor),
                TotalDespesas: c.Transacoes.Where(t => t.Tipo == ETipoTransacao.Despesa).Sum(t => t.Valor)
            )).ToList();

            return new RelatorioCategoriasDTO(
                TotalReceitasGeral: listaResumo.Sum(x => x.TotalReceitas),
                TotalDespesasGeral: listaResumo.Sum(x => x.TotalDespesas),
                Categorias: listaResumo
            );
        }
    }
}
