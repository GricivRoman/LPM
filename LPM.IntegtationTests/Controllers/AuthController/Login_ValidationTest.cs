using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net.Http.Json;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class Login_ValidationTest : TestWebApplicationFactory
    {
        public Login_ValidationTest()
        {
            rootUrl = "/account";
        }

        [Fact]
        public async Task Login_InvalidModel_ReturnValidationErrors()
        {
            var model = new LoginDto
            {
                Password = "",
                UserNameOrEmail = ""
            };

            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/login", model);
            var failsCollection = await response.Content.ReadFromJsonAsync<IDictionary<string, string[]>>();

            Assert.Collection(failsCollection,
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("Password", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("Password is required", err));
                }),
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("UserNameOrEmail", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("User name or E-mail is required", err));
                }));
        }
    }
}
