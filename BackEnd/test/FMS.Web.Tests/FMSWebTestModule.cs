using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FMS.EntityFrameworkCore;
using FMS.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace FMS.Web.Tests
{
    [DependsOn(
        typeof(FMSWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class FMSWebTestModule : AbpModule
    {
        public FMSWebTestModule(FMSEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FMSWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(FMSWebMvcModule).Assembly);
        }
    }
}