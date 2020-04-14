// if you happen to have the answers and questions already from the internet or a homie
// then here is a script where you can include them 
// so here is the format of whhcih you need to include the question answer pairs ... you can just copy this out of local storage 
// or write your own script to bring them into this format

(function () {
  var cheater = {
    answers: [
      {
        question:
          "Thisisanexamplequestion?",
        answer: "thecorrectanswer",
      },
      {
        question: "Whatisthisexamplequestion?",
        answer: "youwillpass.",
      },
    ],
  };
  function setCorrectAnswers() {
    var results = cheater.answers;
    $(".que").each(function () {
      var question = $(".qtext", this).text().replace(/(\s+)/gm, "");
      var answers = null;
      results.forEach(function (value, key) {
        console.log(key, value, "questions");
        if (value.question === question) {
          answers = value.answer;
        }
      });
      if (answers === null) {
        alert("Question not found!");
        return;
      }
      var answered = false;
      $("label.ml-1").each(function () {
        var num = $(".answernumber", this).text().replace(/(\s+)/gm, "");
        var text = $(this).text().replace(/(\s+)/gm, "");
        if (num) {
          text = text.replace(num, "").trim();
        }
        var id = $(this).attr("for");
        var correct = false;
        if (typeof answers === "string") {
          if (text === answers.replace(/(\s+)/gm, "")) {
            correct = true;
          }
        } else {
          answers.forEach(function (value, key) {
            if (text === value.replace(/(\s+)/gm, "")) {
              correct = true;
            }
          });
        }
        if (correct) {
          document.getElementById(id).checked = true;
          answered = true;
        }
      });
      if (!answered) {
        alert("Answer wasnt found!");
      }
    });
    $(".mod_quiz-next-nav").trigger("click");
  }
  setCorrectAnswers();
})();
