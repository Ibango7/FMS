using Abp;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using FMS.Services.AzureBlobService;
using FMS.Services.AzureBlobService.Dto;
using FMS.Services.FileService.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FMS.Services.FileService
{
    /// <summary>
    /// 
    /// </summary>
    public class FileAppService:ApplicationService 
    {
        private readonly AzureBlobAppService _azureFileService;
        private readonly IRepository<FileMeta, Guid> _fileRepository;
        private readonly IRepository<User, long> _userRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileRepository"></param>
        /// <param name="userRepository"></param>
        public FileAppService(IRepository<FileMeta, Guid> fileRepository, IRepository<User, long> userRepository) {
            _azureFileService = new AzureBlobAppService();
            _fileRepository = fileRepository;
            _userRepository = userRepository;


        }
        // List all files
        [HttpGet]
        public async Task<List<FileMetaDataDto>> ListAllBlobs(long userId) {
            try {
                // only show blobs by this user

                var userFiles = await _fileRepository.GetAllListAsync(b => b.UserId == userId);
     
                /*var result = await _azureFileService.ListAsync();
                return result*/;
                return ObjectMapper.Map<List<FileMetaDataDto>>(userFiles);
         
            } catch (Exception ex)
            {
                throw new UserFriendlyException($"Failure showing all files: {ex.Message}");
            }  
        }

        [HttpPut]
        public async Task<string> RenameFile(string oldFileName, string newFileName, long userId) {
            var fileMeta = await _fileRepository.FirstOrDefaultAsync(x => x.UserId == userId && x.Title == oldFileName);
            if (fileMeta == null) { throw new UserFriendlyException($"This file/user does not exist"); }

            string extension = Path.GetExtension(oldFileName);
            string  newFileNameWithExtension = $"{newFileName}{extension}";

            var azureFile = await  _azureFileService.RenameAsync(oldFileName, newFileNameWithExtension);
            fileMeta.Title = newFileNameWithExtension;
            fileMeta.FileRef = azureFile.Blob.Uri;
            await _fileRepository.UpdateAsync(fileMeta);
            return $"Successfully renamed file from {oldFileName} to {newFileNameWithExtension}";
        }

        // upload file
        [HttpPost]
        public async Task<BlobResponseDto> UpLoad(IFormFile file, long userId) {

            // Store the file
            try {

                var user = await _userRepository.FirstOrDefaultAsync(x => x.Id == userId);
                if (user == null)
                {
                    throw new UserFriendlyException($"This user does not exist can\'t upload file");
                }

                var result = await _azureFileService.UploadAsync(file);

                if (result == null)
                {
                    throw new UserFriendlyException($"No file provided");
                }

                var newFile = new FileMeta
                {
                    Title = result.Blob.Name,
                    FileRef = result.Blob.Uri,
                    CreatedDate = DateTime.Now,
                    FileSize = result.Blob.size,
                    UserId = userId
                };

                // add file Meta data to sql table that keeps that data
                await _fileRepository.InsertAsync(newFile);
                return result;
            } catch (Exception ex)
            {
                throw new UserFriendlyException($"Failure uploading file {ex.Message}");
            }
          
        }

        // Download file
        [HttpGet]
        public async Task<FileStreamResult> Download(string filename) {
            if (filename == null) { 
                throw new UserFriendlyException(" no file specified"); 
            }
            try {
                var result = await _azureFileService.DownloadAsync(filename);
                var fileStream = result.Content; // stream representing the file content
                var contentType = result.ContentType; // Content type of the file
                var fileName = result.Name; // Name of the file

                return new FileStreamResult(fileStream, contentType)
                {
                    FileDownloadName = fileName
                };

            } catch (Exception ex)
            {
                throw new UserFriendlyException($"Could not download file: {ex.Message}");
            }
          
        }


        // Delete file
        [HttpDelete]
        public async Task<BlobResponseDto> Delete(string filename, long userId)
        {
            try {
                // check file exists
                var fileMeta = await _fileRepository.FirstOrDefaultAsync(x => x.UserId == userId && x.Title == filename);
                if (fileMeta == null) { throw new UserFriendlyException($"This file/user does not exist can\'t delete file"); }

                var result = await _azureFileService?.DeleteAsync(filename);
                // delete file record also from the File metaData sql table
                await _fileRepository.DeleteAsync(fileMeta);
                return result;
            } catch (Exception ex){

                throw new UserFriendlyException(ex.Message);
            }
        }
    }
}
