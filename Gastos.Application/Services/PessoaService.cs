using Gastos.Application.DTOs.Pessoa;
using Gastos.Application.Exceptions;
using Gastos.Application.Interfaces;
using Gastos.Domain.Entities;
using Gastos.Domain.Enums;
using Gastos.Domain.Exceptions;
using Gastos.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoaService(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        public async Task<PessoaDTO> CriarAsync(CreatePessoaDTO dto)
        {
            var pessoa = new Pessoa(dto.Nome, dto.Idade);

            var created = await _pessoaRepository.AddAsync(pessoa);

            return new PessoaDTO(created.Id, created.Nome, created.Idade);
        }

        public async Task<IEnumerable<PessoaDTO>> ObterTodasPessoasAsync()
        {
            var pessoas = await _pessoaRepository.GetAllAsync();
            return pessoas.Select(p => new PessoaDTO(p.Id, p.Nome, p.Idade));
        }

        public async Task<PessoaDTO?> ObterPorIdAsync(int id)
        {
            var p = await _pessoaRepository.GetByIdAsync(id);
            return p == null ? null : new PessoaDTO(p.Id, p.Nome, p.Idade);
        }

        public async Task<RelatorioPessoasDTO> ObterRelatorioTotaisAsync()
        {
            var pessoas = await _pessoaRepository.ObterTodasComTransacoesAsync();

            var listaResumo = pessoas.Select(p => new PessoaResumoDTO(
                p.Id,
                p.Nome,
                TotalReceitas: p.Transacoes.Where(t => t.Tipo == ETipoTransacao.Receita).Sum(t => t.Valor),
                TotalDespesas: p.Transacoes.Where(t => t.Tipo == ETipoTransacao.Despesa).Sum(t => t.Valor)
            )).ToList();

            return new RelatorioPessoasDTO(
                TotalReceitasGeral: listaResumo.Sum(x => x.TotalReceitas),
                TotalDespesasGeral: listaResumo.Sum(x => x.TotalDespesas),
                Pessoas: listaResumo
            );
        }

        public async Task<PessoaDTO> AtualizarAsync(UpdatePessoaDTO dto)
        {
            var pessoa = await _pessoaRepository.GetByIdAsync(dto.Id) ?? throw new NotFoundException(nameof(Pessoa), dto.Id);

            pessoa.Atualizar(dto.Nome, dto.Idade);

            await _pessoaRepository.UpdateAsync(pessoa);

            return new PessoaDTO(pessoa.Id, pessoa.Nome, pessoa.Idade);
        }

        public async Task DeletarAsync(int id)
        {
            var pessoa = await _pessoaRepository.GetByIdAsync(id) ?? throw new NotFoundException(nameof(Pessoa), id);

            await _pessoaRepository.DeleteAsync(pessoa);
        }
    }
}
