using FluentValidation;
using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Validation.Validators
{
    public class OrganizationValidator : AbstractValidator<OrganizationDto>
    {
        public OrganizationValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithName("Наименование организации")
                .WithMessage("{PropertyName} обязательно");
        }
    }
}
