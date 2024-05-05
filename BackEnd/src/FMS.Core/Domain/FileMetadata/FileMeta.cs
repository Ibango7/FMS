using Abp.Domain.Entities;
using FMS.Authorization.Users;
using System;

namespace FMS.Domain.FileMetadata
{
    public class FileMeta: Entity<Guid>
    {
        public virtual string Title { get; set; }
        public virtual string FileRef { get; set; }
        public virtual double? FileSize { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual bool isArchived { get; set; } = false;

        // Foreign Key
        public virtual long UserId { get; set; }
        // Navigation Property
        public virtual User User { get; set; }
    }
}
