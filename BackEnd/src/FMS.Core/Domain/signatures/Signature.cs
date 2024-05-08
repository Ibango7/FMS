using Abp.Domain.Entities;
using FMS.Authorization.Users;
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
       /* public virtual long UserId { get; set; }
        // navigation property
        public virtual User User { get; set; }*/

    }
}
