using FluentValidation;
using LPM.WebApi.Dto;

namespace LPM.WebApi.Validation.Validators
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.UserNameOrEmail)
                .NotEmpty()
                .WithName("User name or E-mail")
                .WithMessage("{PropertyName} is required");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithName("Password")
                .WithMessage("{PropertyName} is required");
        }
    }
}
