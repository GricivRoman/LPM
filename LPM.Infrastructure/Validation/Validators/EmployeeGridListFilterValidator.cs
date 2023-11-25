using FluentValidation;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Validation.Validators
{
    public class EmployeeGridListFilterValidator : AbstractValidator<EmployeeGridListFilter>
    {
        public EmployeeGridListFilterValidator()
        {
            RuleFor(x => x.WorkLengthDiapazoneEnd)
            .GreaterThan(x => x.WorkLengthDiapazoneStart)
            .WithName("Конец диапазона стажа")
            .WithMessage("{PropertyName} должен быть больше начала");

            RuleFor(x => x.AgeDiapazoneEnd)
            .GreaterThan(x => x.AgeDiapazoneStart)
            .WithName("Конец диапазона возраста")
            .WithMessage("{PropertyName} должен быть больше начала");

            RuleFor(x => x.DateStartPeriodEnd)
            .GreaterThan(x => x.DateStartPeriodStart)
            .WithName("Конец диапазона возраста")
            .WithMessage("{PropertyName} должен быть больше начала");
        }
    }
}
