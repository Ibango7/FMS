using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FMS.Migrations
{
    /// <inheritdoc />
    public partial class Israel202405071805 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Signatures_FileMeta_FileId",
                table: "Signatures");

            migrationBuilder.DropIndex(
                name: "IX_Signatures_FileId",
                table: "Signatures");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Signatures");

            migrationBuilder.RenameColumn(
                name: "CanSign",
                table: "FilePermissionManagement",
                newName: "CanShare");

            migrationBuilder.AddColumn<Guid>(
                name: "SignatureId",
                table: "FileMeta",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_FileMeta_SignatureId",
                table: "FileMeta",
                column: "SignatureId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta",
                column: "SignatureId",
                principalTable: "Signatures",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileMeta_Signatures_SignatureId",
                table: "FileMeta");

            migrationBuilder.DropIndex(
                name: "IX_FileMeta_SignatureId",
                table: "FileMeta");

            migrationBuilder.DropColumn(
                name: "SignatureId",
                table: "FileMeta");

            migrationBuilder.RenameColumn(
                name: "CanShare",
                table: "FilePermissionManagement",
                newName: "CanSign");

            migrationBuilder.AddColumn<Guid>(
                name: "FileId",
                table: "Signatures",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Signatures_FileId",
                table: "Signatures",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Signatures_FileMeta_FileId",
                table: "Signatures",
                column: "FileId",
                principalTable: "FileMeta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
