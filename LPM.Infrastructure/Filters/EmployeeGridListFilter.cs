using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Filters
{
    /// <summary>
    /// Расширенный фильтр списка сотрудников для фильтрации грида
    /// </summary>
    public class EmployeeGridListFilter: BaseEmployeeQueryFilter
    {
        /// <summary>
        /// Департаменты
        /// </summary>
        public IReadOnlyList<SelectItemDto<Guid>> DepartmentList { get; set; }

        /// <summary>
        /// Возраст сотрудника от
        /// </summary>
        public double? AgeDiapazoneStart { get; set; }

        /// <summary>
        /// Возраст сотрудника до
        /// </summary>
        public double? AgeDiapazoneEnd { get; set; }

        /// <summary>
        /// Пол сотрудника
        /// </summary>
        public SelectItemDto<int> Sex { get; set; }

        /// <summary>
        /// Сотрудник имеет ДМС
        /// </summary>
        public SelectItemDto<bool> HasVMI { get; set; }

        /// <summary>
        /// Должность
        /// </summary>
        public IReadOnlyList<SelectItemDto<Guid>> Position { get; set; }

        /// <summary>
        /// Тип сотрудника
        /// </summary>
        public IReadOnlyList<SelectItemDto<int>> PositionType { get; set; }

        /// <summary>
        /// Дата начала работы от
        /// </summary>
        public DateTime? DateStartPeriodStart { get; set; }

        /// <summary>
        /// Дата начала работы по
        /// </summary>
        public DateTime? DateStartPeriodEnd { get; set; }

        /// <summary>
        /// Сотрудник находится на испытательном сроке
        /// </summary>
        public SelectItemDto<bool> OnProbationPeriod { get; set; }

        /// <summary>
        /// Стаж от
        /// </summary>
        public double? WorkLengthDiapazoneStart { get; set; }

        /// <summary>
        /// Стаж до
        /// </summary>
        public double? WorkLengthDiapazoneEnd { get; set; }
    }
}
