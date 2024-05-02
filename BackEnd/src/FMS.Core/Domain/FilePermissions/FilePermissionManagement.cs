using Abp.Domain.Entities;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using System;
using System.Collections.Generic;

namespace FMS.Domain.FilePermissions
{
    public class FilePermissionManagement: Entity<Guid>
    {
        public enum FilePermission
        {
            CanView,
            CanEdit,
            CanDelete,
            CanDownload,
            AsOwner
        }
        public virtual List<FilePermission> Permission { get; set; }

        // foreign key
        public virtual long UserId { get; set;}
        // navigation Property
        public virtual User User { get; set;}

        // Foreign key
        public virtual Guid FileId {  get; set;}
        // Navigation Property
        public virtual FileMeta File { get; set;}
    }
}