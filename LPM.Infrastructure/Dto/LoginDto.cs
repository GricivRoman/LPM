namespace LPM.WebApi.Dto
{
    /// <summary>
    /// Модель авторизации
    /// </summary>
    public class LoginDto
    {
        /// <summary>
        /// Имя или почтовый адресс для авторизации
        /// </summary>
        public string UserNameOrEmail { get; set; }

        /// <summary>
        /// Пароль
        /// </summary>
        public string Password { get; set; }
    }
}
