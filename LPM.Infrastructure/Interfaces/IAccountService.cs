using LPM.Infrastructure.Dto;

namespace LPM.WebApi.Interfaces
{
    public interface IAccountService
    {
        Task CreateUserAsync(CheckInDto userModel);

        Task<CredentialsDto> CreateTokenAsync(LoginDto model);
    }
}