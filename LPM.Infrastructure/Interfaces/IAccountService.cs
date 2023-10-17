using LPM.WebApi.Dto;

namespace LPM.WebApi.Interfaces
{
    public interface IAccountService
    {
        Task CreateUserAsync(CheckInViewModel userModel);

        Task<CredentialsViewModel> CreateTokenAsync(LoginViewModel model);
    }
}