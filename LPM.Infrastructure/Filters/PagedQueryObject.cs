namespace LPM.Infrastructure.Filters
{
    public class PagedQueryObject
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public bool TakeAll { get; set; }

        public ICollection<SortingItem> SortingCollection { get; set; }
    }
}
