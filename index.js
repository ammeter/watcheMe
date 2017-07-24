$(document).ready(function () {

    // อัพเดตสเตตัส อุณหภูมิ

    var linkTemperature = "http://158.108.165.223/data/groupZeedUpTemperature";

    setInterval(function () {
        $.ajax({
            url: linkTemperature
        }).done(function (data) {
            console.log("Temperature is " + data + " Celsius.");
            $('#temperatureField').val(data);
        }).fail(function (data) {
            console.log("Fail to set the temp...");
        });
    }, 1000 * 2);

    //อัพสเตตัส ความเสี่ยงของพื้นที่

    var linkAreaNow = "http://158.108.165.223/data/groupZeedUpAreaNow";
    var linkAreaRisky = "http://158.108.165.223/data/groupZeedUpAreaRisky";

    setInterval(function () {
        $.ajax({
            url: linkAreaNow
        }).done(function (dataNow) {
            $.ajax({
                url: linkAreaRisky
            }).done(function (dataRisk) {
                if (dataRisk.search(dataNow)) {
                    console.log("This area is safe.");
                    $('#areaRiskyField').val('Safe...');
                } else {
                    console.log("This area is unsafe.");
                    $('#areaRiskyField').val('Danger!!!');
                }
            }).fail(function (dataRisk) {
                console.log("Fail to find the risky area...");
            });
        }).fail(function (dataNow) {
            console.log("Fail to find the current area...");
        });
    }, 1000 * 2);



});