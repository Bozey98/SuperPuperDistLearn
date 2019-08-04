using System;
using System.Collections.Generic;

namespace ClassLibrary.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }
        public List<TestResult> TestResults { get; set; }
    }

}
