using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FMS.Authorization.Roles;
using FMS.Authorization.Users;
using FMS.MultiTenancy;

namespace FMS.EntityFrameworkCore
{
    public class FMSDbContext : AbpZeroDbContext<Tenant, Role, User, FMSDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public FMSDbContext(DbContextOptions<FMSDbContext> options)
            : base(options)
        {
        }
    }
}
