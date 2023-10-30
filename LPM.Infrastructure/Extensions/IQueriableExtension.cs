using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Extensions
{
    public static class IQueriableExtension
    {
        public static IQueryable<T> PagedBy<T>(this IQueryable<T> input, PagedQueryObject paging) where T : class
        {
            var pagedResult = paging.TakeAll ? input : input.Skip((paging.Page - 1) * paging.PageSize).Take(paging.PageSize);

            return pagedResult;
        }
    }
}
