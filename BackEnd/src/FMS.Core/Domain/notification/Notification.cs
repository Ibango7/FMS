using Abp.Domain.Entities;
using FMS.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.notification
{
    public class Notification:Entity<Guid>
    {
        public virtual DateTime TimeStamp { get; set; }
        public virtual string Type { get; set; }
        public virtual string Description { get; set; }
        public virtual bool Seen { get; set; }

        // foreign key
        public virtual long SenderId { get; set; }
        // Navigation property
        public virtual User Sender { get; set; }

        // foreign key
        public virtual long ReceiverId {  get; set; }
        // Navigation property
        public virtual User Receiver { get; set; }
    }
}
