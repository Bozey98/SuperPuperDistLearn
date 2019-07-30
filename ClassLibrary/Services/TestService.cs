using ClassLibrary.Models;
using System.Collections.Generic;
using System.Text;
using ClassLibrary.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace ClassLibrary.Services
{

    public interface ITestService
    {
        IEnumerable<Test> GetTests();

        Test changeName(string val);

        Test GetOneTest(int postID);

        Test AddNewTest(Test model);

        IEnumerable<Test> DeleteTest(int deleteId);

        Test EditName(Test model);

        Test AddQues(Question model);

        Question GetQuestion(Question model);

        Question EditQuestion(Question model);

        List<Answer> CheckUserTest(CheckTest model);
    }
    public class TestService : ITestService
    {
        private AppContext db;

        public TestService(AppContext context)
        {
            db = context;
        }

        public List<Test> TestData = new List<Test>() {
            new Test() {Id = 1, Name = "English"},
            new Test() {Id = 2, Name = "Math"},
            new Test() {Id = 3, Name = "Physics"},
            new Test() {Id = 4, Name = "Chemestry"},
            new Test() {Id = 5, Name = "Biology"}

        };

        public IEnumerable<Test> GetTests()
        {
            return db.Tests.ToList();
        }

        public Test changeName(string val)
        {
            TestData[2].Name = val;
            return TestData[2];
        }

        public Test GetOneTest(int postID)
        {
            return db.Tests.Where(s => s.Id == postID).Include(s => s.Questions).ThenInclude(p => p.Answers).FirstOrDefault();
        }

        public Test AddNewTest(Test model)
        {
            db.Tests.Add(new Test() { Name = model.Name });
            db.SaveChanges();
            return db.Tests.Where(s => s.Name == model.Name).Last();
        }

        public IEnumerable<Test> DeleteTest(int deleteId)
        {
            
            var delTest = db.Tests.Where(s => s.Id == deleteId).FirstOrDefault();
            db.Tests.Remove(delTest);
            db.SaveChanges();
            return db.Tests.ToList();
        }

        public Test EditName(Test model)
        {
            var editModel = db.Tests.Where(s => s.Id == model.Id).FirstOrDefault();
            editModel.Name = model.Name;
            db.SaveChanges();
            return db.Tests.Where(s => s.Id == model.Id).Include(s => s.Questions).FirstOrDefault();
        }

        public Test AddQues(Question model)
        {
            var newQue = db.Tests.Where(s => s.Id == model.Id).FirstOrDefault();
            //newQue.Questions = model.Questions;
            //db.Questions.Add(newQue.Questions.Last());
            db.Questions.Add(new Question() { Name = model.Name, Answers = model.Answers, TestID = model.TestID});
            db.SaveChanges();
            return db.Tests.Where(s => s.Id == model.TestID).Include(s => s.Questions).FirstOrDefault();
        }

        public Question GetQuestion(Question model)
        {
            var getQues = db.Questions.Where(s => s.Id == model.Id).Include(s => s.Answers).FirstOrDefault();
            return getQues;
        }

        public Question EditQuestion(Question model)
        {
            var editQues = db.Questions.Where(s => s.Id == model.Id).Include(s => s.Answers).FirstOrDefault();
            editQues.Name = model.Name;
            for (int i = 0; i < editQues.Answers.Capacity; i++)
            {
                editQues.Answers[i].Name = model.Answers[i].Name;
                editQues.Answers[i].IsCorrect = model.Answers[i].IsCorrect;
            }
            db.SaveChanges();
            return editQues;
        }

        public List<Answer> CheckUserTest(CheckTest model)
        {
            List<Answer> corAns = new List<Answer>();
            var checkedTest = db.Tests
                .Where(s => s.Id == model.TestID)
                .Include(s => s.Questions)
                .ThenInclude(p => p.Answers)
                .SelectMany(x => x.Questions.SelectMany(a => a.Answers))
                .Where(s => s.IsCorrect == true)
                .ToList();

            foreach (var ans in model.SelectAnswers)
            {
                corAns.AddRange(checkedTest.Where(s => s.Id == ans));
            }

            
            return corAns;

        }
    


    }

}
