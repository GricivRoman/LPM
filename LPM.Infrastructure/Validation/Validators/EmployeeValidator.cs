using FluentValidation;
using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Validation.Validators
{
    public class EmployeeValidator : AbstractValidator<EmployeeDto>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithName("ФИО")
                .WithMessage("{PropertyName} обязательно");

            RuleFor(x => x.BirthDate)
                .NotEmpty()
                .WithName("Дата рождения")
                .WithMessage("{PropertyName} обязательна");

            RuleFor(x => x.Sex)
                .NotEmpty()
                .WithName("Пол")
                .WithMessage("{PropertyName} обязателен");
        }
    }
}
