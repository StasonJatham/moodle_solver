# Get an A on your Moodle courses

I **STRONGLY** recommend saving these to a bookmarkle: https://mrcoles.com/bookmarklet/ <br>
You can find out everything about bookmarklets at the link above.

## How To
On a lot of moodle quizzes you have 2 or more trials. On the first try just do random answers, i actrually have a js script for that too, but decided not to upload it here. <br>
Then you get to a review page4 to see how bad you did and thats where you wanna run the ```get_answers.js``` now this is a german script so you will have to modify it for your language (you may have to anyways because moodle html may change in the future)

This saves all the correct questiona nd answeer pairs to localStorage. Once that is done go back an re-do the quiz. You can now run the ```set_answers.js``` , to save clicks and times , just use a bookmarlet and click it. ```get_answers.js``` will fill out the correct answer and submit it.

At the end of your quiz eeither submit or use the ```autosubmit.js``` which will generate a random timer and sbmit the quiz... your teacher is not gonna believe that you finished a quiz in 4 seconds...

If you have the question and answers through google or a friend you can use ```falllback_total.js``` you will have to format your questiona nd answers pairs accordingly, liek so: 
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
Just switch out the your snipped with mine in the file , create your bookmarklet and score an A.
