using System.Threading.Tasks;
using Abp.Application.Services;
using FMS.Authorization.Accounts.Dto;

namespace FMS.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
