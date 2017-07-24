$(document).ready(function () {

    var linkStatus = "http://158.108.165.223/data/groupZeedUpStatus";
    // อัพเดตสเตตัส อุณหภูมิ

    var linkTemperature = "http://158.108.165.223/data/groupZeedUpTemperature";;

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
    var countTime = function () {
        if (t0 !== -1) {
            setInterval(function () {
                $.ajax({
                    url: linkStatus
                }).done(function (data) {
                    console.log("success");
                    if (count === 0) {
                        number = data;
                        count = 1;
                    }
                    if (t0 > 5000) {
                        t0 = -1;
                        count = 0;
                        $('#show3').text("You are in danger!");
                        clearInterval();
                    } else if (t0 < 5000 && (t0 != -1)) {
                        t0 = performance.now();
                    }
                    $('#show2').text(t0);
                    $('#show').text(number);
                    console.log(t0);
                }).fail(function (data) {
                    console.log("failed");
                });
            }, 1000 * 1);
        }
    }

    setInterval(function () {
        $.ajax({
            url: linkStatus
        }).done(function (data) {
            if (number !== data) {
                number = 0;
                count = 0;
                $('#show3').text("");
                countTime();
                console.log(555555);
            }
        }).fail(function (data) {
            console.log("fail");
        });
    }, 1000 * 1);

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