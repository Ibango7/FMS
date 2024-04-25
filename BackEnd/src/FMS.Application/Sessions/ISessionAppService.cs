using System.Threading.Tasks;
using Abp.Application.Services;
using FMS.Sessions.Dto;

namespace FMS.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
