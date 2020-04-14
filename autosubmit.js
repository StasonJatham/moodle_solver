// do this at the end so it automatically submits your test at a random time
// this is just for fun and so you dont finish within 3 seconds
// timer will be set on dom

(function () {
  function autoSubmit() {
    var time = $("#quiz-time-left").text().split(":");
    var sec = parseInt(time[time.length - 1]);
    var min = parseInt(time[time.length - 2]);
    var randomMin = Math.floor(Math.random() * (11 - 7 + 1)) + 7;
    var randomSec = Math.floor(Math.random() * (50 - 11 + 1)) + 11;
    var random = randomMin * 60 + randomSec;
    var time = min * 60 + sec;
    if (random >= time + 120) {
      random = 1;
    }
    var remaining = random;
    setInterval(function () {
      var t = $("#qs-timer-ui");
      if (t.length === 0) {
        $("#quiz-timer").append('<span id="qs-timer-ui"></span>');
        t = $("#qs-timer-ui");
      }
      t.html("<br><br>" + remaining + " seconds remaining till auto-submit...");
      remaining--;
    }, 1000);
    setTimeout(function () {
      $('button[type="submit"]').each(function () {
        if ($(this).text() === "Abgabe") {
          $(this).click();
          return false;
        }
      });
      setTimeout(function () {
        $('input[value="Abgabe"]').click();
      }, 1000);
    }, random * 1000);
  }
  autoSubmit();
})();
