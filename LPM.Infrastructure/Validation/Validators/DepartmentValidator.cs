using FluentValidation;
using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Validation.Validators
{
    public class DepartmentValidator : AbstractValidator<DepartmentDto>
    {
        public DepartmentValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithName("Наименование департамента")
                .WithMessage("{PropertyName} обязательно");

            RuleFor(x => x.Organization)
                .NotEmpty()
                .WithName("Организация")
                .WithMessage("{PropertyName} обязательна");
        }
    }
}
