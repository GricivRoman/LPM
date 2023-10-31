using FluentValidation.AspNetCore;
using LPM.Database;
using LPM.Database.Models;
using LPM.WebApi.Interfaces;
using LPM.WebApi.Middlewares;
using LPM.WebApi.Services;
using LPM.Infrastructure.Validation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;
using System.Reflection;
using LPM.Infrastructure.Interfaces;

namespace LPM.WebApi
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(_config.GetConnectionString("ForcDB"));
            });

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            services.AddIdentity<User, IdentityRole<Guid>>(cfg =>
            {
                cfg.User.RequireUniqueEmail = true;
                cfg.Password.RequireDigit = false;
                cfg.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience= true,
                    ValidateLifetime= true,
                    ValidateIssuerSigningKey= true
                };
            });
            services.AddAuthorization();

            services.AddCors(options =>
            {
                options.AddPolicy("allowedOrigins", policy =>
                {
                    policy.WithOrigins(_config["WebApplicationURL"]).AllowAnyMethod().AllowAnyHeader();
                });
            });

            
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddControllers().AddFluentValidation(fv =>
            {
                fv.ImplicitlyValidateChildProperties = true;
                fv.ImplicitlyValidateRootCollectionElements = true;
                fv.RegisterValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
            }).AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddScoped<ValidationFilterAttribute>();
            services.AddScoped<IAccountService, AuthService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IOrderAppointmentService, OrderAppointmentService>();
            services.AddScoped<IFillerService, FillerService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseRouting();

            app.UseCors("allowedOrigins");

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(cfg =>
            {
                cfg.MapControllerRoute("Default",
                    "/{controller}/{action}/{id?}");
            });
        }
    }
}
