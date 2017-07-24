$(document).ready(function(){

  $('#loginbtn').click(function(data){
    var message1=$('#Usernamebnk').val();
    var message2=$('#Passbnk').val();
    console.log(message1);
    console.log(message2);

    if(message1 === 'admin'){
      if(message2 === 'password'){
        console.log("success")
        location.href = "./logout.html"
      } else {
        alert("Wrong password!")
      }
    } else {
      alert("No user!")
    }
  })
});
