$(document).ready(function () {

    setInterval(function () {

        var linkPolice = "http://158.108.165.223/data/groupZeedUpContactPolice";

        var input = "";

        $.ajax({
            url: linkPolice
        }).done(function( data ) {
            input = data;
        }).fail(function(){

        });

        var concentratePolice = function (input) {

            first = [];
            second = [];

            var inputPolice = input.split('<br>');
            for (var i = 0; i < inputPolice.length; i++) {
                if (mylistPolice.has(inputPolice[i])) {
                    mylistPolice.set(inputPolice[i], mylistPolice.get(inputPolice[i]) + 1);
                    console.log("Add amount of " + inputPolice[i]);
                } else {
                    mylistPolice.set(inputPolice[i], 1);
                    console.log("Add new key " + inputPolice[i]);
                }
            };

            var result = Array.from(mylistPolice.keys());
            console.log(result + "jjjjjj");

            for (var i = 0; i < result.length; i++) {
                var tempArray = result[i].split("  ");
                first[i] = tempArray[0];
                second[i] = tempArray[1];
            };

            policeArray = result;

            for (var i = 0; i < policeArray.length; i++) {
                $('#myTablePolice').append("<tr><td>" + first[i] + "</td><td>" + second[i] + "</td></tr>");
            }

        }
    }, 1000 * 1);

});