$(document).ready(function() {
    var link = "http://158.108.165.223/data/groupZeedUpLight/Status";
    var linkPoilce = "http://158.108.165.223/data/groupZeedUpContactPolice";
    var linkHospital = "http://158.108.165.223/data/groupZeedUpContactHospital";
    var linkFire = "http://158.108.165.223/data/groupZeedUpContactFire";
    var countPolice = 0;

    var policeFunction = function() {
        var eventPolice = [];
        var placePolice = [];
        var timePolice = [];

    }
    var hospitalFunction = function() {

    }
    var fireFunction = function() {

    }
    setInterval(function() {
        $.ajax({
            url: link
        }).done(function(data) {
            if (data === "1422") {
                console.log("Police");
                $.ajax({
                    url: linkPolice
                }).done(function(data) {
                    var tempPolice = data;
                    var currentdate = new Date();
                    var datetime = "Last Sync: " + currentdate.getDate() + "/" +
                        (currentdate.getMonth() + 1) + "/" +
                        currentdate.getFullYear() + " @ " +
                        currentdate.getHours() + ":" +
                        currentdate.getMinutes() + ":" +
                        currentdate.getSeconds();
                    var message = datetime+" "+$('#riskyInputField').val()+" "+"User1"+"<br>";
                        $.ajax({
                            url: linkPolice + "/set/" +message+tempPolice
                        }).done(function(data) {
console.log("Success");
                        }).fail(function() {
console.log("Please try again");
                        });
                }).fail(function(data) {

                });
            } else if (data === "1421") {
                console.log("Hospital");
            } else if (data === "1423") {
                console.log("Fire station");
            } else {
                console.log("Wrong number");
            }

        }).fail(function(data) {
            console.log("Failed please try again...");
        })
    }, 1000 * 1);
});
