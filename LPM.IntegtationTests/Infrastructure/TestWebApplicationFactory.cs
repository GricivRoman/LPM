using LPM.Database;
using LPM.WebApi;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LPM.IntegtationTests.Infrastructure
{
    public class TestWebApplicationFactory : WebApplicationFactory<Program>
    {
        protected HttpClient _httpClient;
        protected string rootUrl;

        public TestWebApplicationFactory()
        {
            _httpClient = CreateClient();
        }

        protected override IHost CreateHost(IHostBuilder builder)
        {
            builder.UseEnvironment("Testing");

            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<DataContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                var provider = services
                    .AddEntityFrameworkInMemoryDatabase()
                    .BuildServiceProvider();

                services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseInMemoryDatabase($"Forc_test_");
                    opt.UseInternalServiceProvider(provider);
                });
            });

            return base.CreateHost(builder);
        }
    }
}
