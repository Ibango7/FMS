FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/FMS.Web.Host/FMS.Web.Host.csproj", "src/FMS.Web.Host/"]
COPY ["src/FMS.Web.Core/FMS.Web.Core.csproj", "src/FMS.Web.Core/"]
COPY ["src/FMS.Application/FMS.Application.csproj", "src/FMS.Application/"]
COPY ["src/FMS.Core/FMS.Core.csproj", "src/FMS.Core/"]
COPY ["src/FMS.EntityFrameworkCore/FMS.EntityFrameworkCore.csproj", "src/FMS.EntityFrameworkCore/"]
WORKDIR "/src/src/FMS.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/FMS.Web.Host", "src/FMS.Web.Host"]
COPY ["src/FMS.Web.Core", "src/FMS.Web.Core"]
COPY ["src/FMS.Application", "src/FMS.Application"]
COPY ["src/FMS.Core", "src/FMS.Core"]
COPY ["src/FMS.EntityFrameworkCore", "src/FMS.EntityFrameworkCore"]
WORKDIR "/src/src/FMS.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "FMS.Web.Host.dll"]
