$(document).ready(function () {

    var linkOnlineOffline = "http://158.108.165.223/data/groupZeedUpIsOnOff";

    $.ajax({
        url: linkOnlineOffline + "/set/" + 1200
    }).done(function () {
        console.log("Online...");
    }).fail(function () {
        console.log("Fail to set initial status to Online");
    });

    var setStatusOnline = function () {
        $.ajax({
            url: linkOnlineOffline + "/set/" + 1200
        }).done(function () {
            console.log("Set to Online");
            console.log("Now change status on/off to 1200");
        }).fail(function () {
            console.log("Failed to set online please try again...");
        });
    }

    var setStatusOffline = function () {
        $.ajax({
            url: linkOnlineOffline + "/set/" + 1000
        }).done(function () {
            console.log("Set to Offline");
            console.log("Now change status on/off to 1000");
        }).fail(function () {
            console.log("Failed to set offline please try again...");
        });
    }

    $('#checkOnlineOffline').click(function () {
        $.ajax({
            url: linkOnlineOffline
        }).done(function (status) {
            if (status === "1200") {
                setStatusOffline();
                $('#onOffWord').text("Offline");
            } else if (status === "1000") {
                setStatusOnline();
                $('#onOffWord').text("Online");
            }
        }).fail(function (status) {
            console.log("Failed please try again...");
        });
    });
});