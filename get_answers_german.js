// -> moodle tests have 2 tries, on the first try just random answer everything
// -> go to review test once done / or just wait till you re on the review page, this saves it to localstorage
// -> on the review page run this script, for portabillity transform this into a bookmarklet.
// -> ONLY WORKS ON GERMAN MOODLE, but which is easily adaptable
// supported question types:
// - multiple-choice, single answer, regular
// - multiple-choice, single answer, true/false
// - multiple-choice, multiple answers
// - multiple selects

(function () {
  function parseCorrectAnswers() {
    const results = [];
    $(".que").each(function () {
      const text = $(".qtext", this).text().replace(/(\s+)/gm, "");
      const answer = $(".rightanswer", this).text();
      var parsedAnswer;

      if (
        (answer.startsWith("Die richtige Antwort ist: ") && !answer.includes(" → ")) ||
        (answer.startsWith("Die richtige Antwort ist '") && answer.endsWith("'."))
      ) {
        // multiple-choice single answer
        parsedAnswer = answer
          .replace("Die richtige Antwort ist: ", "")
          .replace("Die richtige Antwort ist '", "")
          .replace("'.", "")
          .replace(/(\s+)/gm, "");
      } else if (answer.startsWith("Die richtigen Antworten sind: ")) {
        // multiple-choice multiple answers
        parsedAnswer = [];
        var simpleSplit = answer.replace("Die richtigen Antworten sind: ", "").split(", ");
        // handle spans
        if ($(".rightanswer span", this).length > 0) {
          var answersHtml = $(".rightanswer", this).html().replace("Die richtigen Antworten sind: ", "").replace(/<\/span[^>]*><span[^>]*>/g, "").replace(/\r?\n|\r/g, " ");
          const regex = /<span[^>]*>.*?<\/span[^>]*>/g
          var match;
          while ((match = regex.exec(answersHtml)) !== null) {
            // add parsed textual content as answer
            parsedAnswer.push(new DOMParser().parseFromString(match[0], 'text/html').querySelector('span').textContent.replace(/(\s+)/gm, ''));
          }

          // remove span html stuff to only keep elements simply delimited by comma
          answersHtml = answersHtml.replace(/(<\/span[^>]*>)\s*,\s*(<span[^>]*>)/g, "$1$2").replace(regex, '');
          simpleSplit = new DOMParser().parseFromString(answersHtml, 'text/html').querySelector('body').textContent.split(", ");
        }
        for (var x = 0; x < simpleSplit.length; x++) {
          const curItem = simpleSplit[x].replace(/(\s+)/gm, '');
          if(curItem.length > 0) {
            parsedAnswer.push(curItem);
          }
        }
      } else if (answer.startsWith("Die richtige Antwort ist: ") && answer.includes(" → ")) {
        // multiple selects
        parsedAnswer = answer.replace("Die richtige Antwort ist: ", "");
      } else {
        alert("Unable to retrieve question-answer pair for question: " + text);
        throw new Error("Unable to retrieve question-answer pair for question: " + text);
        return;
      }

      results.push({question: text, answer: parsedAnswer});
    });

    localStorage.setItem("answers", JSON.stringify(results));
    console.log(results);
    alert("Parsing complete!");
  }

  parseCorrectAnswers();
})();