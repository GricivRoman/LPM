namespace LPM.Infrastructure.Dto
{
    public class FillerFileStructureDto
    {
        public string OrganizationName { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
        public string Position { get; set; }
        public string WorkPlace { get; set; }
        public DateTime BirthDate { get; set; }
        public bool HasVHI { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime? OficialDateStart { get; set; }
        public DateTime? ProbationEndDate { get; set; }
        public string EmployeeType { get; set; }
        public string Sex { get; set; }
    }
}
