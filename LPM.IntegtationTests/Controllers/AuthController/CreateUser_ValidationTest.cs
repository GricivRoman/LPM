using LPM.IntegtationTests.Infrastructure;
using LPM.WebApi.Dto;
using System.Net.Http.Json;

namespace LPM.IntegtationTests.Controllers.AuthController
{
    public class CreateUser_ValidationTest : TestWebApplicationFactory
    {
        public CreateUser_ValidationTest()
        {
            rootUrl = "/account";
        }

        [Fact]
        public async Task CreateUser_EmptyForm_ReturnValidatioErrors()
        {
            var model = new CheckInViewModel
            {
                UserName = "",
                Email = "",
                Password = ""
            };
            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            var failsCollection = await response.Content.ReadFromJsonAsync<IDictionary<string, string[]>>();

            Assert.Collection(failsCollection,
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("Email", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("E-mail is required", err),
                        err => Assert.Equal("E-mail must be an e-male type string", err));
                }),
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("Password", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("Password is required", err),
                        err => Assert.Equal("Required min length for Password is 7", err));
                }),
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("UserName", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("User name is required", err),
                        err => Assert.Equal("Required min length for User name is 3", err));
                }));
        }

        [Fact]
        public async Task CreateUser_InvalidForm_ReturnValidatioErrors()
        {
            var model = new CheckInViewModel
            {
                UserName = "RR",
                Email = "JJJJJJJJJJ_TTTTT@@",
                Password = "666666"
            };
            var response = await _httpClient.PostAsJsonAsync($"{rootUrl}/checkin", model);
            var failsCollection = await response.Content.ReadFromJsonAsync<IDictionary<string, string[]>>();

            Assert.Collection(failsCollection,
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("Email", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("E-mail must be an e-male type string", err));
                }),
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("Password", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("Required min length for Password is 7", err));
                }),
                item => Assert.Multiple(() =>
                {
                    Assert.Equal("UserName", item.Key);
                    Assert.Collection(item.Value,
                        err => Assert.Equal("Required min length for User name is 3", err));
                }));
        }
    }
}
