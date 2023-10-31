using Microsoft.AspNetCore.Http;

namespace LPM.Infrastructure.Interfaces
{
    public interface IFillerService
    {
        Task FillDBByExcelAsync(IFormFile file, Guid currentUserId);
    }
}
