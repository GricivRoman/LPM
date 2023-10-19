using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.WebApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LPM.WebApi.Services
{
    public class AuthService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration config,
            DataContext context
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
        }
        public async Task CreateUserAsync(CheckInDto userModel)
        {
            var userlist = _context.Set<User>().Where(x => x.Email == userModel.Email).ToList();
            var user = await _userManager.FindByEmailAsync(userModel.Email);
            if (user != null)
            {
                throw new InvalidOperationException("User with this E-mail already exists");
            }

            user = await _userManager.FindByNameAsync(userModel.UserName);
            if (user != null)
            {
                throw new InvalidOperationException("User with this username already exists");
            }

            user = new User
            {
                UserName = userModel.UserName,
                Email = userModel.Email
            };
            var result = await _userManager.CreateAsync(user, userModel.Password);

            if (result != IdentityResult.Success)
            {
                throw new InvalidOperationException(result.Errors.First().Description);
            }
        }

        public async Task<CredentialsDto> CreateTokenAsync(LoginDto model)
        {
            var userByUserName = await _userManager.FindByNameAsync(model.UserNameOrEmail);
            var userByEmail = await _userManager.FindByEmailAsync(model.UserNameOrEmail);
            var user = userByUserName ?? userByEmail;

            if (user == null)
            {
                throw new InvalidOperationException("Invalid user name or e-mail");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Invalid password");
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            var userRoles =  await _userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                signingCredentials: creds,
                expires: DateTime.UtcNow.AddMinutes(120));

            var userCredentials = new CredentialsDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
                UserId = user.Id,
                UserName = user.UserName,
                Roles = userRoles
            };

            return userCredentials;
        }
    }
}
