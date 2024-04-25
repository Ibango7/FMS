using System.Threading.Tasks;
using FMS.Configuration.Dto;

namespace FMS.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
