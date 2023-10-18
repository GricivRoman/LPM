using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net.Http.Json;
using System.Net;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class CreateUser_DoubleUserTest : TestWebApplicationFactory
    {
        public CreateUser_DoubleUserTest()
        {
            rootUrl = "/account";
        }

        [Fact]
        public async Task CreateUser_DoubleUser_ReturnBadRequest()
        {
            var model = new CheckInDto
            {
                UserName = "Test",
                Email = "TestEmail@gmail.com",
                Password = "R12345qwe"
            };
            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            model = new CheckInDto
            {
                UserName = "Other",
                Email = "TestEmail@gmail.com",
                Password = "R12345qwe"
            };

            response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            var errorMessage = (await response.Content.ReadFromJsonAsync<ExeptionDto>()).Message;

            Assert.Multiple(() =>
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("User with this E-mail already exists", errorMessage);
            });

            model = new CheckInDto
            {
                UserName = "Test",
                Email = "OtherMail@mail.ru",
                Password = "R12345qwe"
            };

            response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            errorMessage = (await response.Content.ReadFromJsonAsync<ExeptionDto>()).Message;

            Assert.Multiple(() =>
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("User with this username already exists", errorMessage);
            });
        }
    }
}
