using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClassLibrary.Models;
using ClassLibrary.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackDistLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private IUserService userService;

        public AuthController(IUserService userService)
        {
            this.userService = userService;
        }

       
        [HttpPost("NewUser")]
        public User PostNewUser(User model)
        {
            var result = userService.AddNewUser(model);
            return result;
        }

        [HttpPost("Login")]
        public User Login(User model)
        {
            var result = userService.AuthUser(model);
            return result;
        }

        [HttpPost("TestLogin")]
        
        public async Task Signin(User model)
        {
            var curUser = userService.GetUser(model);
            if (curUser != null)
            {
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, curUser.Login)
            };
                // создаем объект ClaimsIdentity
                ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                // установка аутентификационных куки
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
            }
            
        }


        [HttpGet("LogOut")]

        public async Task Logout()
        {
            await HttpContext.SignOutAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme);
        }


        [HttpGet("GetInfo")]

        public User GetInfo()
        {

            var model = HttpContext.User.Identity.Name;
            var result = userService.GetUserByLogin(model);

            return result;
        }

        
    }
}
