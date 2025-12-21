using Gastos.Domain.Enums;
using Gastos.Domain.Exceptions;

namespace Gastos.Domain.Entities;

public class Transacao : BaseEntity
{
    public string Descricao { get; private set; }
    public decimal Valor { get; private set; }
    public ETipoTransacao Tipo { get; private set; }

    public int PessoaId { get; private set; }
    public Pessoa Pessoa { get; private set; }

    public int CategoriaId { get; private set; }
    public Categoria Categoria { get; private set; }

    protected Transacao() { }

    public Transacao(string descricao, decimal valor, ETipoTransacao tipo, Pessoa pessoa, Categoria categoria)
    {
        Validar(descricao, valor, tipo, pessoa, categoria);

        Descricao = descricao;
        Valor = valor;
        Tipo = tipo;
        Pessoa = pessoa;
        Categoria = categoria;
    }

    private static void Validar(string descricao, decimal valor, ETipoTransacao tipo, Pessoa pessoa, Categoria categoria)
    {
        if (string.IsNullOrWhiteSpace(descricao))
            throw new DomainException("Descrição da transação é obrigatória.");

        if (valor <= 0)
            throw new DomainException("Valor da transação deve ser positivo.");

        if (pessoa is null)
            throw new DomainException("Pessoa é obrigatória para a transação.");

        if (categoria is null)
            throw new DomainException("Categoria é obrigatória para a transação.");

        if (pessoa.Idade < 18 && tipo == ETipoTransacao.Receita)
            throw new DomainException("Menores de idade não podem possuir receitas.");

        if (categoria.Finalidade != EFinalidadeCategoria.Ambas && categoria.Finalidade != (EFinalidadeCategoria)tipo)
        {
            throw new DomainException("Categoria incompatível com o tipo da transação.");
        }
    }
}
