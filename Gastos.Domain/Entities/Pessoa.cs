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
        ValidarDados(nome, idade);
        Nome = nome;
        Idade = idade;
    }

    public void Atualizar(string nome, int idade)
    {
        ValidarDados(nome, idade);
        Nome = nome;
        Idade = idade;
    }

    private static void ValidarDados(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome)) throw new DomainException("Nome é obrigatório.");

        if (idade <= 0) throw new DomainException("Idade deve ser maior que zero.");
    }
}
