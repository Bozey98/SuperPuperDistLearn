using System;
using System.ComponentModel.DataAnnotations;

namespace ClassLibrary.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage ="Не указан Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указан Login")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Пароль введен неверно")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
