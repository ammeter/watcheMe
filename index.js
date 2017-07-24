$(document).ready(function () {

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
            if(t0 < 5000) {
                t0 = performance.now();
            }
            if(t0 > 5000 && number === data) {
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
