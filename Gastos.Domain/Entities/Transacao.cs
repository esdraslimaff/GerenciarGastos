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
        if (valor <= 0) throw new DomainException("Valor deve ser positivo.");
        if (pessoa.Idade < 18 && tipo == ETipoTransacao.Receita) throw new DomainException("Menores de idade não podem possuir receitas.");
        if (categoria.Finalidade != EFinalidadeCategoria.Ambas && (int)categoria.Finalidade != (int)tipo) throw new DomainException("Categoria incompatível com o tipo da transação.");
        //Talvez criar um método "Validar" na propria classe.

        Descricao = descricao;
        Valor = valor;
        Tipo = tipo;
        Pessoa = pessoa;
        Categoria = categoria;
    }
}
