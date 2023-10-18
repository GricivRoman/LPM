using FluentValidation;
using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Validation.Validators
{
    public class CheckInValidator : AbstractValidator<CheckInDto>
    {
        public CheckInValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithName("User name")
                .WithMessage("{PropertyName} is required")
                .MinimumLength(3)
                .WithName("User name")
                .WithMessage("Required min length for {PropertyName} is 3");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithName("Password")
                .WithMessage("{PropertyName} is required")
                .MinimumLength(7)
                .WithName("Password")
                .WithMessage("Required min length for {PropertyName} is 7");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithName("E-mail")
                .WithMessage("{PropertyName} is required")
                .EmailAddress()
                .WithName("E-mail")
                .WithMessage("{PropertyName} must be an e-male type string");
        }
    }
}
