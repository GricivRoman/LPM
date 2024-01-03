using LPM.Database;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace LPM.WebApi
{
    public class Program
    {
        static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            ApplyMigrations(host);
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var config = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: false)
                        .Build();

                    Log.Logger = new LoggerConfiguration()
                        .ReadFrom.Configuration(config).CreateLogger();

                    webBuilder.UseSerilog(Log.Logger);

                    webBuilder.UseStartup<Startup>();
                });
        }

        private static void ApplyMigrations(IHost host)
        {
            using var scope = host.Services.CreateScope();
            using var contest = scope.ServiceProvider.GetRequiredService<DataContext>();
            contest.Database.Migrate();
        }
    }
}
