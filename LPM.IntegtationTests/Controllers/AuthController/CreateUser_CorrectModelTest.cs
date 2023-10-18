using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net;
using System.Net.Http.Json;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class CreateUser_CorrectModelTest : TestWebApplicationFactory
    {
        public CreateUser_CorrectModelTest()
        {
            rootUrl = "/account";
        }

        [Fact]
        public async Task CreateUser_CorrectModel_ReturnOK()
        {
            var model = new CheckInDto
            {
                UserName = "Test",
                Email = "TestEmail@gmail.com",
                Password = "R12345qwe"
            };

            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
