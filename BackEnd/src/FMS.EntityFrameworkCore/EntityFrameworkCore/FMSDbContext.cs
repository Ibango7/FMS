using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FMS.Authorization.Roles;
using FMS.Authorization.Users;
using FMS.MultiTenancy;
using FMS.Domain.FileMetadata;
using FMS.Domain.FilePermissions;
using FMS.Domain.notification;
using FMS.Domain.signatures;

namespace FMS.EntityFrameworkCore
{
    public class FMSDbContext : AbpZeroDbContext<Tenant, Role, User, FMSDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<FileMeta> FileMeta { get; set; }
        public DbSet<FilePermissionManagement> FilePermissionManagement { get; set; }
        public DbSet<Notification> Notification  { get; set; }
        public DbSet<Signature> Signatures { get; set; }

        
        public FMSDbContext(DbContextOptions<FMSDbContext> options)
            : base(options)
        {
        }
    }
}
