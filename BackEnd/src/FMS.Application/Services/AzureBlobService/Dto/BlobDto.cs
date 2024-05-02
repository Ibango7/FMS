using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.AzureBlobService.Dto
{
    public class BlobDto
    {
        public string? Uri { get; set; }
        public string? Name { get; set; }
        public string? ContentType { get; set; }
        public double? size { get; set; }
        public Stream? Content { get; set; }    

    }
}
