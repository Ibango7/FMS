using Abp.Authorization;
using FMS.Authorization.Roles;
using FMS.Authorization.Users;

namespace FMS.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
