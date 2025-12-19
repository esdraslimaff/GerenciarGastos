using Gastos.Domain.Enums;
using Gastos.Domain.Exceptions;

namespace Gastos.Domain.Entities;

public class Categoria:BaseEntity
{
    public string Descricao { get; private set; }
    public EFinalidadeCategoria Finalidade { get; private set; }

    public Categoria(string descricao, EFinalidadeCategoria finalidade)
    {
        if (string.IsNullOrWhiteSpace(descricao)) throw new DomainException("Descrição é obrigatória."); 
        Descricao = descricao;
        Finalidade = finalidade;
    }
    //TO-DO: Fazer validações na própria classe(Fortalecerá o Dominio), e também inserir erros em constantes para não ficar solto.
}
