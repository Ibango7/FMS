using Abp.Application.Services;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.UI;
using FMS.Authorization.Users;
using FMS.Domain.FileMetadata;
using FMS.Domain.FilePermissions;
using FMS.Services.FilePermissionService.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;


namespace FMS.Services.FilePermissionService
{
    /// <summary>
    /// 
    /// </summary>
    public class FilePermissionAppService: ApplicationService
    {
        private readonly IRepository<FilePermissionManagement, Guid> _filePermissionRepository;
        private readonly IRepository<User, long> _userRepository;
        /*private readonly UserAppService _userAppService;*/
        private readonly IRepository<FileMeta, Guid> _fileMataDataRepository;

        public FilePermissionAppService(IRepository<FilePermissionManagement, Guid> filePermissionRepository, IRepository<User, long> userRepository, /*UserAppService userService,*/ IRepository<FileMeta, Guid> fileMataData) { 
            _filePermissionRepository = filePermissionRepository;
            _userRepository = userRepository;
            //_userAppService = userService;
            _fileMataDataRepository = fileMataData;
        }

        [HttpGet]
        public async Task<List<FilePermissionDto>> GetPermittedFiles(long userId) {
            var files = _filePermissionRepository.GetAllIncluding(b => b.File).Where(x => x.UserId == userId);

            if(files == null) {
                throw new UserFriendlyException(" no file permission for this user");
            }
            return ObjectMapper.Map<List<FilePermissionDto>>(files);
        }



        [HttpGet]
        public async Task<List<FilePermissionDto>> GetUsersWithPermissions(long ownerId) {
            var result = _filePermissionRepository.GetAllIncluding(x => x.User).Where(x => x.FileOwnerId == ownerId);

            if (result == null) { 
                throw new UserFriendlyException(" There are no permissions added");
            }

            return ObjectMapper.Map<List<FilePermissionDto>>(result);
        }

        [HttpPost]
        public async Task<string> AddPermission(FilePermissionDto FileDto) {
            var file = await _fileMataDataRepository.FirstOrDefaultAsync(b => b.Id == FileDto.FileId);
            if (file == null)
            {
                throw new UserFriendlyException("No  file exists");
            }

            foreach (var user_id in FileDto.RequestedUsers)
            {
                var newUser = await _userRepository.GetAsync(user_id);
                var newPermission = ObjectMapper.Map<FilePermissionManagement>(FileDto);
                newPermission.User = newUser;
                await _filePermissionRepository.InsertAsync(newPermission);
            }

            return "Permission added successfully"; 
        }
    }

   
}
