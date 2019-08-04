using System;
using System.Collections.Generic;
using System.Text;

namespace ClassLibrary.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Question> Questions { get; set; }

    }

    public class Question
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TestID { get; set; }
        public List<Answer> Answers { get; set; }

    }

    public class Answer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionID { get; set; }
        public bool IsCorrect { get; set; }

    }

    public class CheckTest
    {
        public int Id { get; set; }
        public string StudentLogin { get; set; }
        public int TestID { get; set; }
        public List<int> SelectAnswers { get; set; }
    }

    public class TestResult
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int TestID { get; set; }
        public int CorrectAnswers { get; set; }
    }



}
