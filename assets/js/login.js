$(document).ready(function () {

    var linkLogin = "http://158.108.165.223/data/groupZeedUpIsLogin";

    setInterval( function() {
        $.ajax({
            url: linkLogin
        }).done(function( data ) {
            if( data === "admin" ) {
                $('#curuser2').text("Hello! admin");
            }
            else if( data === "mom" ) {
                $('#curuser2').text("Hello! mom");
            }
            else if( data === "dad" ) {
                $('#curuser2').text("Hello! dad");
            }
            else {
                $('#curuser2').text("");
            }
        }).fail(function( data ) {
            console.log( "Fail to login in user." );
        });
    } , 1000 * 1);

});
