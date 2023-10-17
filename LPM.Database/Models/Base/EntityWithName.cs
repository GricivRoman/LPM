namespace LPM.Database.Models.Base
{
    public class EntityWithName<Tkey> : BaseEntity<Tkey>
    {
        public string Name { get; set; }
    }
}
