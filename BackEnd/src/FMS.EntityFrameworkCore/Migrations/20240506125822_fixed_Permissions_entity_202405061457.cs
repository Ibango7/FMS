using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FMS.Migrations
{
    /// <inheritdoc />
    public partial class fixed_Permissions_entity_202405061457 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permission",
                table: "FilePermissionManagement");

            migrationBuilder.AddColumn<bool>(
                name: "AsOwner",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CanDelete",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CanDownload",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CanEdit",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CanSign",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "CanView",
                table: "FilePermissionManagement",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AsOwner",
                table: "FilePermissionManagement");

            migrationBuilder.DropColumn(
                name: "CanDelete",
                table: "FilePermissionManagement");

            migrationBuilder.DropColumn(
                name: "CanDownload",
                table: "FilePermissionManagement");

            migrationBuilder.DropColumn(
                name: "CanEdit",
                table: "FilePermissionManagement");

            migrationBuilder.DropColumn(
                name: "CanSign",
                table: "FilePermissionManagement");

            migrationBuilder.DropColumn(
                name: "CanView",
                table: "FilePermissionManagement");

            migrationBuilder.AddColumn<string>(
                name: "Permission",
                table: "FilePermissionManagement",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
