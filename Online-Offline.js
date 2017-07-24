$(document).ready(function() {

            var link = "http://158.108.165.223/data/groupZeedUpOnOff";

            var setStatusOnline=function() {
                  $.ajax({
                      url: link+"set/"+1
                  }).done(function(status) {
                          console.log("Set to Online");
                  }).fail(function(data) {
                      console.log("Failed please try again...");
                    });
            }

            var setStatusOffline=function(){
                  $.ajax({
                      url: link+"set/"+0
                  }).done(function(status) {
                          console.log("Set to Offline");
                  }).fail(function(data) {
                      console.log("Failed please try again...");
                    });
            }

            $('#SWOnline').click(function(data) {
                $.ajax({
                    url: link
                }).done(function(status) {
                    if (status === 1) {
                      setStatusOnline();
                    } else {
                      setStatusOffline();
                    }
                }).fail(function(data) {
                    console.log("Failed please try again...");
                });
                
            });
