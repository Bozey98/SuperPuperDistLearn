using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClassLibrary.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using AppContext = ClassLibrary.Context.AppContext;

namespace ClassLibrary.Services
{
    public interface IUserService
    {
        User AddNewUser(User model);
        User AuthUser(User model);
        User GetUser(User model);
    }

    public class UserService: IUserService
    {
        private AppContext db;

        public UserService(AppContext context)
        {
            db = context;
        }

        public User AddNewUser (User model)
        {
            db.Users.Add(new User() { Login = model.Login, Password = model.Password, Mail = model.Mail });
            db.SaveChanges();
            return db.Users.Where(s => s.Login == model.Login).FirstOrDefault();
        }

        public User AuthUser (User model)
        {
            var findUser = db.Users.Where(s => s.Login == model.Login && s.Password == model.Password).FirstOrDefault();
            return findUser;

        }

        public User GetUser(User model)
        {
            return db.Users.Where(s => s.Login == model.Login && s.Password == model.Password).FirstOrDefault();

    


            
        }




    }
}
