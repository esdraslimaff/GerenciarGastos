using Gastos.Domain.Enums;
using Gastos.Domain.Exceptions;

namespace Gastos.Domain.Entities;

public class Categoria:BaseEntity
{
    public string Descricao { get; private set; }
    public EFinalidadeCategoria Finalidade { get; private set; }
    public ICollection<Transacao> Transacoes { get; private set; } = new List<Transacao>();

    public Categoria(string descricao, EFinalidadeCategoria finalidade)
    {
        Validar(descricao, finalidade);

        Descricao = descricao;
        Finalidade = finalidade;
    }

    private static void Validar(string descricao, EFinalidadeCategoria finalidade)
    {
        if (string.IsNullOrWhiteSpace(descricao)) throw new DomainException("Descrição da categoria é obrigatória.");

        if (!Enum.IsDefined(typeof(EFinalidadeCategoria), finalidade)) throw new DomainException("Finalidade da categoria é inválida.");
    }
}
