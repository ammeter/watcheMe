$(document).ready(function() {

    var linkStatus = "http://158.108.165.223/data/groupZeedUpLight/Status";
    var linkPolice = "http://158.108.165.223/data/groupZeedUpContactPolice";
    var linkHospital = "http://158.108.165.223/data/groupZeedUpContactHospital";
    var linkFire = "http://158.108.165.223/data/groupZeedUpContactFire";

    var mylistPolice = new Map();
    var mylistHospital = new Map();
    var mylistFire=new Map();
    var concentratePolice = function(input) {
        var inputPolice = input.spilt("<br>");
        for (var i = 0; i < inputPolice.length; i++) {
            if (mylistPolice.indexOf(inputPolice[i]) != -1) {
                mylistPolice.set(inputPolice[i], mylistPolice.get(inputPolice[i]) + 1);
                console.log("add amout");
            } else {
                mylistPolice.set(inputPolice[i], 1);
                console.log("add new map");
            }
        };
        var concentrateHospital = function(input) {
          var inputHospital=input.spilt("<br>");
          for (var i = 0; i < inputHospital.length; i++) {
            if (mylistHospital.indexOf(inputHospital)!=-1) {
              mylistHospital.set(inputHospital[i],mylistHospital.get(inputHospital[i])+1);
                console.log("add amout");
            } else {
              mylistHospital.set(inputHospital[i],1);
              console.log("add new map");
            }
          }
        };
        var concentrateFire = function(input) {  var inputFire=input.spilt("<br>");
          for (var i = 0; i < inputFire.length; i++) {
            if (mylistFire.indexOf(inputFire)!=-1) {
              mylistFire.set(inputFire[i],mylistFire.get(inputFire[i])+1);
                console.log("add amout");
            } else {
              mylistFire.set(inputFire[i],1);
              console.log("add new map");
            }};
    }

    var setStatusTo1200 = function() {
        setTimeout(function() {
            $.ajax({
                url: linkStatus + "/set/" + 1200
            }).done(function() {
                console.log("Set status to 1200 success.");
            }).fail(function() {
                console.log("Set status to 1200 is error.");
            });
        }, 0000);
    }

    var policeFunction = function() {
        $.ajax({
            url: linkPolice
        }).done(function(oldData) {
            console.log("Read old data from police success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkPolice + "/set/" + newMessage
            }).done(function() {
                console.log("Add old/new data to police success.");
                concentratePolice(newMessage);
            }).fail(function() {
                console.log("Add old/new data to police fail.");
            });
        }).fail(function(oldData) {
            console.log("Read old data from police fail.");
        });
    }

    var hospitalFunction = function() {
        $.ajax({
            url: linkHospital
        }).done(function(oldData) {
            console.log("Read old data from hospital success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkHospital + "/set/" + newMessage
            }).done(function() {
                console.log("Add old/new data to hospital success.");
                concentrateHospital(newMessage);
            }).fail(function() {
                console.log("Add old/new data to hospital fail.");
            });
        }).fail(function(oldData) {
            console.log("Read old data from hospital fail.");
        });
    }

    var fireStationFunction = function() {
        $.ajax({
            url: linkFire
        }).done(function(oldData) {
            console.log("Read old data from fire station success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkFire + "/set/" + newMessage
            }).done(function() {
                console.log("Add old/new data to fire station success.");
                concentrateFire(newMessage);
            }).fail(function() {
                console.log("Add old/new data to fire station fail.");
            });
        }).fail(function(oldData) {
            console.log("Read old data from fire station fail.");
        });
    }

    setInterval(function() {
        $.ajax({
            url: linkStatus
        }).done(function(data) {
            if (data === "1421") {
                console.log("Send to Hospital");
                hospitalFunction();
                setStatusTo1200();
            } else if (data === "1422") {
                console.log("Send to Police Station");
                policeFunction();
                setStatusTo1200();
            } else if (data === "1423") {
                console.log("Send to Fire Station");
                fireStationFunction();
                setStatusTo1200();
            } else {
                console.log("Wrong number cannot sent to any contact.");
            }
        }).fail(function(data) {
            console.log("Failed please try again...");
        })
    }, 1000 * 1);

});
