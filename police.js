$(document).ready(function () {

    var linkUser = "http://158.108.165.223/data/groupZeedUpUser";

    setInterval(function () {
        $.ajax({
            url: linkUser
        }).done(function (data) {
            $('#user').text(data);
            console.log("success");
        }).fail(function (data) {
            console.log("fail");
        });
    }, 1000 * 1);

});
