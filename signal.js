$(document).ready(function(){
  var link ="http://158.108.165.223/data/groupZeedUpSignal";
  setInterval(function(){
    $.ajax({
      url : link +"set/"+message
    }).done(function(data){
if (data===1) {
  console.log("Shake");

} else {
  console.log("Shake and Sound");
}
      }
    }).fail(
      function(data){
        console.log(""Failed please try again..."");
      }
    )
  },1000*1);

});
