using Serilog;

namespace LPM.WebApi
{
    public class Program
    {
        static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
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
    }
}
