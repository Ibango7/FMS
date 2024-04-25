using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace FMS.EntityFrameworkCore
{
    public static class FMSDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<FMSDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<FMSDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
