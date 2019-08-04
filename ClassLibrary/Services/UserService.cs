using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClassLibrary.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using DistLearnContext = ClassLibrary.Context.DistLearnContext;

namespace ClassLibrary.Services
{
    public interface IUserService
    {
        User AddNewUser(User model);
        User AuthUser(User model);
        User GetUser(User model);
        User GetUserByLogin(string model);
    }

    public class UserService: IUserService
    {
        private DistLearnContext db = new DistLearnContext();

        

        public User AddNewUser (User model)
        {
            var checkRegUser = db.Users.FirstOrDefault(s => s.Login == model.Login);
            if (checkRegUser == null)
            {
                db.Users.Add(new User() { Login = model.Login, Password = model.Password, Mail = model.Mail });
                db.SaveChanges();
                return db.Users.Where(s => s.Login == model.Login).FirstOrDefault();
            }
            else
                return null;
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

        public User GetUserByLogin(string model)
        {
            return db.Users.Where(s => s.Login == model).Select(p => new User
            {
                Login = p.Login,
                Mail = p.Mail

            }).FirstOrDefault();

        }




    }
}
