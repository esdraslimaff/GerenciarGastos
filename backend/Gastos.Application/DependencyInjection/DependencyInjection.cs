using Gastos.Application.Interfaces;
using Gastos.Application.Services;
using Gastos.Domain.Interfaces.Repositories;
using Gastos.Domain.Interfaces.Seguranca;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<ITransacaoService, TransacaoService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}
