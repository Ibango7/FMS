using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using FMS.Configuration.Dto;

namespace FMS.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : FMSAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
