using System.ComponentModel.DataAnnotations;

namespace FMS.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}