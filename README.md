# Disclaimer
This tool is intended for testing purposes only, and should not be used for any other purposes. The tool is designed to test whether a specific exam or version of Moodle is susceptible to automation and is not intended for cheating or any other unauthorized use. The author of this tool is not responsible for any misuse or illegal activities done with this tool. It is the responsibility of the user to ensure that this tool is used in a lawful and ethical manner.

I **STRONGLY** recommend saving these to a bookmarklet using https://bookmarklets.org/maker/ <br/>
You can find out everything about bookmarklets at the link above.

## How To
On a lot of moodle quizzes you have 2 or more trials.<br/>
First do an attempt with no/random answers. Then you get to the review page to see how bad you did and that's where you wanna run the ```get_answers.js```. Now this is a German script, so you'll have to modify it for your language (you may have to anyways because Moodle HTML may change in the future - this is tested on v3.9).
This script saves all the correct question-answer pairs to localStorage. Once that is done, go back an re-do the quiz. You can now run the ```set_answers.js``` for automatically selecting the correct answers. To save clicks and time, just use a bookmarklet and click it. ```set_answers.js``` will fill out the correct answers and submit it.

At the end of your quiz, either submit or use the ```autosubmit.js``` which will generate a random timer and submit the quiz after the time has elapsed. This is useful, as your teacher is not gonna believe that you finished a quiz in 4 seconds.

If you retrieved the question and answers through Google or a friend you can use ```falllback_total.js```. You will have to format your question-answer pairs accordingly: 
```
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
      {
        question: "Justlikethis?",
        answer: "yes,dude.",
      },
      .......
    ],
  };
```
