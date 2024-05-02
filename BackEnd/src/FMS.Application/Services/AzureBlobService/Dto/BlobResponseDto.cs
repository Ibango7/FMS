using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.AzureBlobService.Dto
{
    public class BlobResponseDto
    {
        public BlobResponseDto() { 
            Blob = new BlobDto();
        }

        public string? Status { get; set; }
        public double? size { get; set; }
        public bool Error { get; set; }

        public BlobDto Blob { get; set; }
    }
}
