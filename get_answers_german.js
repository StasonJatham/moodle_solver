// -> moodle tests have 2 tries, on the first try just random answer everything
// -> go to review test once done / or just wait till you re on the review page, this saves it to localstorage
// -> on the review page run this script, for portabillity transform this into a bookmarklet.
// -> ONLY WORKS ON GERMAN MOODLE CHANGE LINES: 13 and 22

(function () {
  function parseCorrectAnswers() {
    var results = [];
    $(".que").each(function () {
      var text = $(".qtext", this).text().replace(/(\s+)/gm, "");
      var answer = $(".rightanswer", this).text();
      if (answer.startsWith("Die richtige Antwort lautet: ")) {
        answer = answer.replace("Die richtige Antwort lautet: ", "");
        answer = answer.replace(/(\s+)/gm, "");
      } else {
        if ($("span", $(".rightanswer", this)).length > 1) {
          answer = [];
          $("span", $(".rightanswer", this)).each(function () {
            answer.push($(this).text().replace(/(\s+)/gm, ""));
          });
        } else {
          answer = answer.replace("Die richtigen Antworten sind: ", "");
          answer = answer.split(", ");
          for (var x = 0; x < answer.length; x++) {
            answer[x] = answer[x].replace(/(\s+)/gm, "");
          }
        }
      }
      results.push({ question: text, answer: answer });
    });
    localStorage.setItem("answers", JSON.stringify(results));
    alert("Parsing complete!");
  }
  parseCorrectAnswers();
})();
