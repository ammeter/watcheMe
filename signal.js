$(document).ready(function () {

  var link = "http://158.108.165.223/data/groupZeedUpSignal";

  setInterval(function () {
      $.ajax({
        url: link
      }).done(function (data) {
          if (data === 1) {
            console.log("Signal is Shake");
            $('#signalField').val( "Shake" );
          } else {
            console.log("Signals are Shake and Sound");
             $('#signalField').val( "Shake and Sound" );
          }
        }).fail(function (data) {
        console.log("Failed please try again...");
      })
  }, 1000 * 1);

});
