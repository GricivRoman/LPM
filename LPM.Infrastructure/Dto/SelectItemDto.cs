namespace LPM.Infrastructure.Dto
{
    public class SelectItemDto<Tkey>
    {
        public Tkey Id { get; set; }
        public string Value { get; set; }
    }
}
