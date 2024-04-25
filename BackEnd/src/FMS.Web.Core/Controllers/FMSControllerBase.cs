using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace FMS.Controllers
{
    public abstract class FMSControllerBase: AbpController
    {
        protected FMSControllerBase()
        {
            LocalizationSourceName = FMSConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
