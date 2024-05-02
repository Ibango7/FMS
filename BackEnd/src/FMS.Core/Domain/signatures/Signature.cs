using Abp.Domain.Entities;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using System;

namespace FMS.Domain.signatures
{
    public class Signature:Entity<Guid>
    {
        public virtual DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public enum Status { 
            Valid,
            Invalid,
            Pending 
        }

        public virtual Status? SignatureStatus { get; set; }
        // foreign key
        public virtual long UserId { get; set; }
        // navigation property
        public virtual User User { get; set; }

        //Foreign Key
        public virtual Guid FileId { get; set; }    
        public virtual FileMeta File {  get; set; } 
    }
}
