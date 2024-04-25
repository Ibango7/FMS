using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FMS.Authorization;

namespace FMS
{
    [DependsOn(
        typeof(FMSCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class FMSApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<FMSAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(FMSApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
