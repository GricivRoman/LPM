﻿namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Отдел-департамент
    /// </summary>
    public class DepartmentDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// Наименование отдела
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public string ShortName { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public Guid OrganizationId { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public OrganizationDto Organizadion { get; set; }

        /// <summary>
        /// Приказы о назначении в отдел
        /// </summary>
        public ICollection<OrderAppointmentDto> OrderAppointments { get; set; }
    }
}