using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net.Http.Json;
using System.Net;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class CreateUser_InvalidPasswordTest : TestWebApplicationFactory
    {
        public CreateUser_InvalidPasswordTest()
        {
            rootUrl = "/account";
        }

        [Theory]
        [InlineData("1111111", "Passwords must have at least one lowercase ('a'-'z').")]
        [InlineData("xyz1111", "Passwords must have at least one uppercase ('A'-'Z').")]

        public async Task CreateUser_InvalidPassWord_ReturnBadRequest(string password, string expectedErrorMessage)
        {
            var model = new CheckInViewModel
            {
                UserName = "Test",
                Email = "TestEmail@gmail.com",
                Password = password
            };
            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

            var message = (await response.Content.ReadFromJsonAsync<ExeptionDto>()).Message;
            Assert.Equal(expectedErrorMessage, message);
        }
    }
}
