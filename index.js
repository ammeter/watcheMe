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

    // อัพเดตเวลา

    var linkStatus = "http://158.108.165.223/data/groupZeedUpLight/Status/";

    var checkFamIsOn = false;
    checkFunction = function () {
        $.ajax({
            url: link
        }).done(function (data) {
            if (checkFamIsOn === true) {

            } else {

            }
        }).fail(function (data) {
            console.log("fail");
        });
    }

    $('#famcheck').click(function (data) {

        if (data === 3) {
            checkFunction();
        }
    });

    var t0 = 0;
    var number;
    var count = 0;
    var countTime = setInterval(function () {
        $.ajax({
            url: linkStatus
        }).done(function (data) {
            console.log("success");
            if (count === 0) {
                number = data;
                count = 1;
            }
            if (t0 < 5000) {
                t0 = performance.now();
            }
            if (t0 > 5000 && number === data) {
                t0 = 0;
                count = 0;
                $('#show3').append("You are in danger!");
                clearInterval(countTime);
            }
            $('#show2').text(t0);
            $('#show').text(number);
        }).fail(function (data) {
            console.log("failed");
        });
    }, 1000 * 1);

    // อัพเดตสเตตัสว่า สั่น เพราะอะไร

    var linkStatusNow = "http://158.108.165.223/data/groupZeedUpLight/Status";

    setInterval(function () {
        $.ajax({
            url: linkStatusNow
        }).done(function (data) {
            if (data === "1321" || data === "1421") {
                console.log("Falling down");
                $('#statussField').val("Falling down");
            } else if (data === "1322" || data === "1422") {
                console.log("Criminal");
                $('#statussField').val("Criminal Faced");
            } else if (data === "1323" || data === "1423") {
                console.log("Conflagration (Fire)");
                $('#statussField').val("Stand in Conflagration (Fire)");
            } else {
                console.log("Safe...");
                $('#statussField').val("Safe...");
            }
        }).fail(function (data) {
            console.log("Cannot set the status of the user.");
        });

    }, 1000 * 1);

     // ล็อค สถานที่

        $('#saveButton').click(function() {
            var focusedPlace = $('#riskyInputField').val();
            console.log(focusedPlace);
            $.ajax({
                url: linkAreaRisky
            }).done(function(data) {
                if( data.search(focusedPlace) != "-1" ) {
                    // Do nothing
                    console.log("AreaRisky already have " + focusedPlace);
                }
                else {
                    var tempPlace = data;
                    $.ajax({
                        url: linkAreaRisky + "/set/" + focusedPlace + " " + tempPlace
                    }).done(function() {
                        console.log("AreaRisky just added " + focusedPlace + " into it.");
                    }).fail(function() {
                        console.log("AreaRisky cannot added.");
                    });
                }
            }).fail(function(data) {
                console.log("AreaRisky cannot checked .");
            });
        });

});

function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = '' + days[day] + ' ' + months[month] + ' ' + d + ' ' + year + ' ' + h + ':' + m + ':' + s;
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("' + id + '");', '1000');
    return true;

}
