using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClassLibrary.Services;
using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace BackDistLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ValuesController : ControllerBase
    {
        private ITestService testService;
        public ValuesController(ITestService testService)
        {
            this.testService = testService;
        }
        // GET api/values
        [HttpGet]
        [Authorize]
        public IEnumerable<Test> Get()
        {
            var result = testService.GetTests();
            return result;
        }

        [HttpPost]
        public Test Post(Test value)
        {
            var result = testService.changeName(value.Name);
            return result;
        }


    }
}
