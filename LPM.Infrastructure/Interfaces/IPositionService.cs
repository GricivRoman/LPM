using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IPositionService
    {
        Task<List<SelectItemDto<Guid>>> GettPositionSelectItemList(PagedQueryFilter filter);
    }
}
