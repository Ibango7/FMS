using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using System;

namespace FMS.Services.FileService.Dto
{
    /// <summary>
    /// 
    /// </summary>
    [AutoMap(typeof(FileMeta))]
    public class FileMetaDataDto: EntityDto<Guid>
    {
        /// <summary>
        /// 
        /// </summary>
        public virtual string Title { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual string FileRef { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual int? FileSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual DateTime CreatedDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual long UserId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual User User { get; set; }

    }
}
