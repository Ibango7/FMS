using System.Threading.Tasks;
using FMS.Models.TokenAuth;
using FMS.Web.Controllers;
using Shouldly;
using Xunit;

namespace FMS.Web.Tests.Controllers
{
    public class HomeController_Tests: FMSWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}