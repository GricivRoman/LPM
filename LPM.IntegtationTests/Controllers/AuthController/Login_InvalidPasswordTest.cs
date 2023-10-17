using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net.Http.Json;
using System.Net;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class Login_InvalidPasswordTest : TestWebApplicationFactory
    {
        public Login_InvalidPasswordTest()
        {
            rootUrl = "/account";
        }

        [Theory]
        [InlineData("123")]
        [InlineData("TTTTOELNSAD23145")]
        public async Task Login_InvalidPassword_ReturnFail(string passwordGuess)
        {
            var checkInModel = new CheckInViewModel
            {
                UserName = "Test",
                Email = "TestEmail@gmail.com",
                Password = "R12345qwe"
            };

            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", checkInModel);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var loginModel = new LoginViewModel
            {
                UserNameOrEmail = "TestEmail@gmail.com",
                Password = passwordGuess
            };

            response = await _httpClient.PostAsJsonAsync($"{rootUrl}/login", loginModel);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

            var message = (await response.Content.ReadFromJsonAsync<ExeptionDto>()).Message;
            Assert.Equal("Invalid password", message);
        }

    }
}
