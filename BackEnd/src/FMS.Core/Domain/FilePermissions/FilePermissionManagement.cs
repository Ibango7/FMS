using Abp.Domain.Entities;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using System;
using System.Collections.Generic;

namespace FMS.Domain.FilePermissions
{
    public class FilePermissionManagement: Entity<Guid>
    {
        public virtual bool? CanView { get; set; } = true;
        public virtual bool? CanEdit { get; set; } = true;
        public virtual bool? CanDelete { get; set; } = true;
        public virtual bool? CanDownload { get; set; } = true;
        public virtual bool? AsOwner { get; set; } = true;
        public virtual bool? CanShare { get; set; } = true;

        public virtual long FileOwnerId { get; set; }
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