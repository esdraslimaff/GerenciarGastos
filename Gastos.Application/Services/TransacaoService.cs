using Gastos.Application.DTOs.Transacao;
using Gastos.Application.Exceptions;
using Gastos.Application.Interfaces;
using Gastos.Domain.Entities;
using Gastos.Domain.Exceptions;
using Gastos.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public TransacaoService(
            ITransacaoRepository transacaoRepository,
            IPessoaRepository pessoaRepository,
            ICategoriaRepository categoriaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<TransacaoDTO> CriarAsync(CreateTransacaoDTO dto)
        {
            var pessoa = await _pessoaRepository.GetByIdAsync(dto.PessoaId);
            if (pessoa == null) throw new NotFoundException(nameof(Pessoa), pessoa.Id);

            var categoria = await _categoriaRepository.GetByIdAsync(dto.CategoriaId);
            if (categoria == null) throw new NotFoundException(nameof(Categoria), dto.CategoriaId);

            var transacao = new Transacao(dto.Descricao, dto.Valor, dto.Tipo, pessoa, categoria);

            var created = await _transacaoRepository.AddAsync(transacao);

            return new TransacaoDTO(created.Id, created.Descricao, created.Valor, created.Tipo.ToString(), pessoa.Nome, categoria.Descricao
            );
        }

        public async Task<IEnumerable<TransacaoDTO>> ObterTodasAsync()
        {
            var transacoes = await _transacaoRepository.ObterTodasComDetalhesAsync();

            return transacoes.Select(t => new TransacaoDTO(
                t.Id,
                t.Descricao,
                t.Valor,
                t.Tipo.ToString(),
                t.Pessoa.Nome,
                t.Categoria.Descricao
            ));
        }
    }
}
