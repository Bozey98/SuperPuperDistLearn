using System.Linq;
using ClassLibrary.Context;
using ClassLibrary.Models;

namespace ClassLibrary.Services
{
    public interface IUserService
    {
        User AddNewUser(User model);
    }

    public class UserService: IUserService
    {
        private AppContext db = new AppContext();

        public User AddNewUser (User model)
        {
            db.Users.Add(new User() { Login = model.Login, Password = model.Password, Mail = model.Mail });
            db.SaveChanges();
            return db.Users.Where(s => s.Login == model.Login).FirstOrDefault();
        }


    }
}
