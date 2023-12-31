﻿namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Модель регистрации нового пользователя
    /// </summary>
    public class CheckInDto
    {
        /// <summary>
        /// Ник пользователя
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Почтовый адресс
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Пароль
        /// </summary>
        public string Password { get; set; }
    }
}
