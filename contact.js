$(document).ready(function () {

    var linkStatus = "http://158.108.165.223/data/groupZeedUpLight/Status";
    var linkPolice = "http://158.108.165.223/data/groupZeedUpContactPolice";
    var linkHospital = "http://158.108.165.223/data/groupZeedUpContactHospital";
    var linkFire = "http://158.108.165.223/data/groupZeedUpContactFire";

    var setStatusTo1200 = function () {
        setTimeout(function () {
            $.ajax({
                url: linkStatus + "/set/" + 1200
            }).done(function () {
                console.log("Set status to 1200 success.");
            }).fail(function () {
                console.log("Set status to 1200 is error.");
            });
        }, 0000 );
    }

    var policeFunction = function () {
        $.ajax({
            url: linkPolice
        }).done(function (oldData) {
            console.log("Read old data from police success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkPolice + "/set/" + newMessage
            }).done(function () {
                console.log("Add old/new data to police success.");
            }).fail(function () {
                console.log("Add old/new data to police fail.");
            });
        }).fail(function (oldData) {
            console.log("Read old data from police fail.");
        });
    }

    var hospitalFunction = function () {
        $.ajax({
            url: linkHospital
        }).done(function (oldData) {
            console.log("Read old data from hospital success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkHospital + "/set/" + newMessage
            }).done(function () {
                console.log("Add old/new data to hospital success.");
            }).fail(function () {
                console.log("Add old/new data to hospital fail.");
            });
        }).fail(function (oldData) {
            console.log("Read old data from hospital fail.");
        });
    }

    var fireStationFunction = function () {
        $.ajax({
            url: linkFire
        }).done(function (oldData) {
            console.log("Read old data from fire station success.");
            var newMessage = $('#riskyInputField').val() + "  " + "USER1" + "<br>" + oldData;
            $.ajax({
                url: linkFire + "/set/" + newMessage
            }).done(function () {
                console.log("Add old/new data to fire station success.");
            }).fail(function () {
                console.log("Add old/new data to fire station fail.");
            });
        }).fail(function (oldData) {
            console.log("Read old data from fire station fail.");
        });
    }

    setInterval(function () {
        $.ajax({
            url: linkStatus
        }).done(function (data) {
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
        }).fail(function (data) {
            console.log("Failed please try again...");
        })
    }, 1000 * 1);

});
