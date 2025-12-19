using Gastos.Domain.Exceptions;

namespace Gastos.Domain.Entities;

public class Pessoa : BaseEntity
{
    public string Nome { get; private set; }
    public int Idade { get; private set; }

    public ICollection<Transacao> Transacoes { get; private set; } = new List<Transacao>();

    protected Pessoa() { }

    public Pessoa(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome)) throw new DomainException("Nome é obrigatório.");
        if (idade <= 0) throw new DomainException("Idade deve ser positiva.");

        Nome = nome;
        Idade = idade;
    }
}
