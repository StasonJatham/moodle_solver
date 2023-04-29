// uses the question answer pairs from get_answers.js from localstorage
// fills right answer and submits to next question
// supported question types:
// - multiple-choice, single answer, regular
// - multiple-choice, single answer, true/false
// - multiple-choice, multiple answers
// - multiple selects (no auto-fill, only output of answers)

(function () {
  function setCorrectAnswers() {
    var results = JSON.parse(localStorage.getItem("answers"));
    var questionElement = document.querySelector(".qtext");
    if (questionElement) {
      var question = questionElement.textContent.replace(/(\s+)/gm, "");
      var answers = null;
      results.forEach(function (value, key) {
        if (value.question === question) {
          answers = value.answer;
        }
      });
      console.log("Question: '" + question + "'");
      console.log("Answers: ");
      console.log(answers);
      if (answers === null) {
        alert("Question not found!");
        return;
      }
      var answerTable = document.querySelector('table.answer');
      var answerLabels = document.querySelectorAll('[data-region="answer-label"]');
      var answerRadioInput = document.querySelector('input[type=radio]');
      if (answerTable !== null) {
        // multiple select
        alert("Automatic solving of multi-selects isn't supported yet, but the answers were printed to the console :)");
      } else if (answerLabels.length > 0) {
        // multiple choice
        answerLabels.forEach(function (label) {
          var num = label.querySelector(".answernumber").textContent.replace(/(\s+)/gm, "");
          var text = label.textContent.replace(/(\s+)/gm, "");
          if (num) {
            text = text.replace(num, "").trim();
          }
          var id = label.id.replace("_label", "");
          var correct = false;
          if (typeof answers === "string") {
            // single answer
            if (text === answers.replace(/(\s+)/gm, "")) {
              correct = true;
            }
          } else if (Array.isArray(answers)) {
            // multiple answers
            answers.forEach(function (value, key) {
              if (text === value.replace(/(\s+)/gm, "")) {
                correct = true;
                const index = answers.indexOf(value.replace(/(\s+)/gm));
                if (index > -1) {
                  answers.splice(index, 1);
                }
              }
            });
          }
          var inputElement = document.getElementById(id);
          if (inputElement) {
            inputElement.checked = correct;
          }
        });
        if (Array.isArray(answers) && answers.length !== 0) {
          alert("There are some answers that weren't found: " + answers);
        } else {
          $(".mod_quiz-next-nav").trigger("click");
        }
      } else if (answerRadioInput !== null) {
        // multiple choice - single answer - true/false
        var answerId = answerRadioInput.name;
        if (answers.replace(/(\s+)/gm, "") === "Wahr") {
          document.getElementById(answerId + "true").checked = true
          $(".mod_quiz-next-nav").trigger("click");
        } else if (answers.replace(/(\s+)/gm, "") === "Falsch") {
          document.getElementById(answerId + "false").checked = true;
          $(".mod_quiz-next-nav").trigger("click");
        } else {
          alert("Expected the answer to be 'Wahr' or 'Falsch', but is: " + answers);
        }
      } else {
        alert("Unknown question type!");
      }
    } else {
      alert("Question element not found!");
    }
  }

  setCorrectAnswers();
})();
