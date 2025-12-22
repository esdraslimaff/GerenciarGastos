using Gastos.Domain.Interfaces;
using Gastos.Domain.Interfaces.Repositories;
using Gastos.Domain.Interfaces.Seguranca;
using Gastos.Infrastructure.Auth;
using Gastos.Infrastructure.Context;
using Gastos.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Gastos.Infrastructure.DependencyInjection;

public static class InfrastructureConfiguration
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<MyContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IPessoaRepository, PessoaRepository>();
        services.AddScoped<ICategoriaRepository, CategoriaRepository>();
        services.AddScoped<ITransacaoRepository, TransacaoRepository>();
        services.AddScoped<IUsuarioRepository, UsuarioRepository>();
        services.AddScoped<ITokenGenerator, JwtTokenGenerator>();
        return services;
    }
}