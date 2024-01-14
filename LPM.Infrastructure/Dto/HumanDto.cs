namespace LPM.Infrastructure.Dto
{
    public class HumanDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// Имя сотрудника
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Дата рождения
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Пол
        /// </summary>
        public SelectItemDto<int> Sex { get; set; }
    }
}
