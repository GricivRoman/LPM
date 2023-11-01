using FluentValidation;
using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Validation.Validators
{
    public class OrderAppointmentValidator : AbstractValidator<OrderAppointmentDto>
    {
        public OrderAppointmentValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithName("Id сотрудника")
                .WithMessage("{PropertyName} обязательно");

            RuleFor(x => x.Department)
                .NotEmpty()
                .WithName("Отдел")
                .WithMessage("{PropertyName} обязателен");

            RuleFor(x => x.Position)
                .NotEmpty()
                .WithName("Должность")
                .WithMessage("{PropertyName} обязателена");

            RuleFor(x => x.EmployeeType)
                .NotEmpty()
                .WithName("Тип сотрудника")
                .WithMessage("{PropertyName} обязателен");

            RuleFor(x => x.DateStart)
                .NotEmpty()
                .WithName("Дата начала")
                .WithMessage("{PropertyName} обязателена");
        }
    }
}
