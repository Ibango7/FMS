using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using FMS.Domain.FilePermissions;
using FMS.Services.FileService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.FilePermissionService.Dto
{
    [AutoMap(typeof(FilePermissionManagement))]
    public class FilePermissionDto:EntityDto<Guid>
    {
        public virtual bool CanView { get; set; }
        public virtual bool CanEdit { get; set; }
        public virtual bool CanDelete { get; set; }
        public virtual bool CanDownload { get; set; }
        public virtual bool AsOwner { get; set; }
        public virtual bool CanShare { get; set; }

        public virtual List<long> RequestedUsers { get; set; }
        public virtual long FileOwnerId { get; set; }

        //public virtual FileMetaDataDto? File_meta_data { get; set; }

        // Foreign key
        public virtual Guid FileId { get; set; }
        public virtual FileMeta File { get; set; }
    /*    public virtual long UserId { get; set; }
        public virtual User User { get; set; }
*/
    }
}
