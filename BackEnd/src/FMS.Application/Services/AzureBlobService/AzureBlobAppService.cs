using Microsoft.Extensions.Configuration;
using Azure.Storage;
using Azure.Storage.Blobs;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using FMS.Services.AzureBlobService.Dto;
using Microsoft.AspNetCore.Http;
using System.IO;
using Abp.UI;
using Azure;
using System.Reflection.Metadata;

namespace FMS.Services.AzureBlobService
{
    /// <summary>
    /// 
    /// </summary>
    public class AzureBlobAppService
    {
        private readonly IConfiguration _config;
        private readonly BlobServiceClient _blobServiceClient;
        private readonly BlobContainerClient _filesContainer;
        private readonly string accessKey = "";
        string storageAccount = "";

        /// <summary>
        /// 
        /// </summary>
        public AzureBlobAppService() {
            var credential = new StorageSharedKeyCredential(storageAccount, accessKey);
            var blobUri = $"https://{storageAccount}.blob.core.windows.net";
            _blobServiceClient = new BlobServiceClient(new Uri(blobUri), credential);
            _filesContainer = _blobServiceClient.GetBlobContainerClient("files");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// 
        public async Task<List<BlobDto>> ListAsync()
        {
            List<BlobDto> files = new List<BlobDto>();

            await foreach (var file in _filesContainer.GetBlobsAsync()) {
                string uri = _filesContainer.Uri.ToString();
                var name = file.Name;
                var fullUri = $"{uri}/{name}";

                files.Add(new BlobDto
                {
                    Uri = fullUri,
                    Name = name,
                    ContentType = file.Properties.ContentType
                    
                });
            }

            return files;
        }

        /// <summary>
        /// 
        /// </summary> 
        /// <param name="blob"></param>
        /// <returns></returns>
        public async Task<BlobResponseDto> UploadAsync(IFormFile blob)
        {
            BlobResponseDto response = new();
            if (blob != null)
            {
                long fileSizeBytes =  blob.Length; // file size in bytes
                BlobClient client = _filesContainer.GetBlobClient(blob.FileName);

                await using (Stream? data = blob.OpenReadStream())
                {

                    await client.UploadAsync(data);
                }

                response.Status = $"File {blob.FileName} Uploaded Successfully";
                response.Error = false;
                response.Blob.Uri = client.Uri.AbsoluteUri;
                response.Blob.Name = blob.FileName;
                response.Blob.size = fileSizeBytes;
                return response;
            }
            else {
                throw new UserFriendlyException($"No file provided");
            }
        }

        public async Task<BlobResponseDto> RenameAsync(string oldFileName, string newFileName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(oldFileName) || string.IsNullOrWhiteSpace(newFileName))
                {
                    throw new ArgumentNullException("Both oldFileName and newFileName must be provided.");
                }

                BlobClient oldFile = _filesContainer.GetBlobClient(oldFileName);
                BlobClient newFile = _filesContainer.GetBlobClient(newFileName);

                if (await oldFile.ExistsAsync())
                {
                    await newFile.StartCopyFromUriAsync(oldFile.Uri);
                    await oldFile.DeleteAsync();

                    BlobResponseDto response = new();
                    response.Status = $"File name changed Successfully";
                    response.Error = false;
                    response.Blob.Uri = newFile.Uri.AbsoluteUri;
                    response.Blob.Name = newFileName;
                    return response;
                }
                else
                {
                    throw new FileNotFoundException($"File '{oldFileName}' does not exist.");
                }
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException($"Error occurred while renaming file: {ex.Message}");
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="blobFileName"></param>
        /// <returns></returns>
        public async Task<BlobDto> DownloadAsync(string blobFileName) {

            BlobClient file = _filesContainer.GetBlobClient(blobFileName);

                if(await file.ExistsAsync()) {

                    var data = await file.OpenReadAsync();
                    Stream blobContent = data;

                    var content = await file.DownloadContentAsync();

                    string name = blobFileName;
                    string contentType = content.Value.Details.ContentType;

                    return new BlobDto { Content = blobContent, Name = name, ContentType = contentType };
            }
                return null;
        
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="blobFilename"></param>
        /// <returns></returns>
        public async Task<BlobResponseDto> DeleteAsync(string blobFilename) {
            try {
                if (blobFilename != null)
                {
                    BlobClient file = _filesContainer.GetBlobClient(blobFilename);
                    await file.DeleteAsync();
                    return new BlobResponseDto { Error = false, Status = $"File: {blobFilename} has been successfully deleted" };
                }
                else {
                    throw new Exception("Wrong file name");
                }

            } catch (Exception ex)
            {
                throw new UserFriendlyException($"File could not be deleted:  {ex.Message}");

            }
        }
    }
}
