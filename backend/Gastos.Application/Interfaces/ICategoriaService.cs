using Gastos.Application.DTOs.Categoria;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastos.Application.Interfaces
{
    public interface ICategoriaService
    {
        Task<CategoriaDTO> CriarAsync(CreateCategoriaDTO dto);
        Task<IEnumerable<CategoriaDTO>> ObterTodasAsync();
        Task<RelatorioCategoriasDTO> ObterRelatorioTotaisAsync();
        Task DeletarAsync(int id);
    }
}
