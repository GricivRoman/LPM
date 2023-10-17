namespace LPM.WebApi.Dto
{
    /// <summary>
    /// Модель авторизации
    /// </summary>
    public class LoginViewModel
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
