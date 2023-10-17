namespace LPM.WebApi.Dto
{
    /// <summary>
    /// Модель ответа при авторизации
    /// </summary>
    public class CredentialsViewModel
    {
        /// <summary>
        /// Токен для обращения к методам, требующим авторизации
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// Время жизни токена
        /// </summary>
        public DateTime Expiration { get; set; }

        /// <summary>
        /// Id пользователя
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Имя пользователя
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Список ролей
        /// </summary>
        public ICollection<string> Roles { get; set; }
    }
}
