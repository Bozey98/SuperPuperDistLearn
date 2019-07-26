using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClassLibrary.Services;
using ClassLibrary.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;

namespace BackDistLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PostController : ControllerBase
    {


        private ITestService testService;

        public PostController(ITestService testService)
        {
            this.testService = testService;
        }


        [HttpPost("GetOne")]
        public Test PostGet(Test model)
        {
            Debug.WriteLine(model.Id);
            var result = testService.GetOneTest(model.Id);
            return result;
        }

        [HttpPost("AddTest")]
        public Test PostAdd(Test model)
        {
            var result = testService.AddNewTest(model);
            return result;
        }

        [HttpPost("DelTest")]
        public IEnumerable<Test> PostDel(Test model)
        {
            var result = testService.DeleteTest(model.Id);
            return result;
        }

        [HttpPost("EditTest")]
        public Test PostEdit(Test model)
        {
            var result = testService.EditName(model);
            return result;
        }

        [HttpPost("AddQues")]
        public Test PostAddQues(Question model)
        {
            var result = testService.AddQues(model);
            return result;
        }

        [HttpPost("GetQues")]
        public Question PostGetQue(Question model)
        {
            var result = testService.GetQuestion(model);
            return result;
        }

        [HttpPost("EditQuesAns")]
        public Question PostEditQues(Question model)
        {
            var result = testService.EditQuestion(model);
            return result;
        }

    } 
}