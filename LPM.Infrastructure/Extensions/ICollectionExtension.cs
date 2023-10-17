namespace LPM.WebApi.Extensions
{
    public static class ICollectionExtension
    {
        public static ICollection<T> Map<T, U>(this ICollection<T> collection, Func<T, U> f)
        {
            foreach (var item in collection)
            {
                f(item);
            }

            return collection;
        }
    }
}
