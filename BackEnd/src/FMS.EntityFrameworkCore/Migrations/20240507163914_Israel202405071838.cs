using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FMS.Migrations
{
    /// <inheritdoc />
    public partial class Israel202405071838 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta");

            migrationBuilder.AlterColumn<Guid>(
                name: "SignatureId",
                table: "FileMeta",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta",
                column: "SignatureId",
                principalTable: "Signatures",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta");

            migrationBuilder.AlterColumn<Guid>(
                name: "SignatureId",
                table: "FileMeta",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta",
                column: "SignatureId",
                principalTable: "Signatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
