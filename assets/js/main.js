$(document).ready(function () {

	var linkStatus = "http://158.108.165.223/data/groupZeedUpStatus";
	// อัพเดตสเตตัส อุณหภูมิ

	var linkTemperature = "http://158.108.165.223/data/groupZeedUp/Temperature";


	$('#menuToggle, .menu-close').on('click', function () {
		$('#menuToggle').toggleClass('active');
		$('body').toggleClass('body-push-toleft');
		$('#theMenu').toggleClass('menu-open');
	});

	setInterval(function () {
		$.ajax({
			url: linkTemperature
		}).done(function (data) {
			console.log("Temperature is " + data + " Celsius.");
			$('#temperatureField').text(data);
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
					$('#areaRiskyField').text('Safe...');
				} else {
					console.log("This area is unsafe.");
					$('#areaRiskyField').text('Danger!!!');
				}
			}).fail(function (dataRisk) {
				console.log("Fail to find the risky area...");
			});
		}).fail(function (dataNow) {
			console.log("Fail to find the current area...");
		});
	}, 1000 * 2);

	// อัพเดตสเตตัสว่า สั่น เพราะอะไร

	var linkStatusNow = "http://158.108.165.223/data/groupZeedUpLight/Status";

	setInterval(function () {
		$.ajax({
			url: linkStatusNow
		}).done(function (data) {
			if (data === "1321" || data === "1421") {
				console.log("Falling down");
				$('#statussField').text("Falling down");
			} else if (data === "1322" || data === "1422") {
				console.log("Criminal");
				$('#statussField').text("Criminal Faced");
			} else if (data === "1323" || data === "1423") {
				console.log("Conflagration (Fire)");
				$('#statussField').text("Stand in Conflagration (Fire)");
			} else {
				console.log("Safe from accident ...");
				$('#statussField').text("Safe...");
			}
		}).fail(function (data) {
			console.log("Cannot set the status of the user.");
		});

	}, 1000 * 1);

	// ล็อค สถานที่

	$('#saveButton').click(function () {
		var focusedPlace = $('#riskyInputField').val();
		console.log(focusedPlace);
		$.ajax({
			url: linkAreaRisky
		}).done(function (data) {
			if (data.search(focusedPlace) != "-1") {
				// Do nothing
				console.log("AreaRisky already have " + focusedPlace);
			} else {
				var tempPlace = data;
				$.ajax({
					url: linkAreaRisky + "/set/" + focusedPlace + " " + tempPlace
				}).done(function () {
					console.log("AreaRisky just added " + focusedPlace + " into it.");
				}).fail(function () {
					console.log("AreaRisky cannot added.");
				});
			}
		}).fail(function (data) {
			console.log("AreaRisky cannot checked .");
		});
	});


	// var t0 = 0;
	// var number;
	// var count = 0;
	// var countTime = function () {
	// 	if (t0 !== -1) {
	// 		setInterval(function () {
	// 			$.ajax({
	// 				url: linkStatus
	// 			}).done(function (data) {
	// 				console.log("success");
	// 				if (count === 0) {
	// 					number = data;
	// 					count = 1;
	// 				}
	// 				if (t0 > 5000) {
	// 					t0 = -1;
	// 					count = 0;
	// 					$('#show3').text("You are in danger!");
	// 					clearInterval();
	// 				} else if (t0 < 5000 && t0 != -1) {
	// 					t0 = performance.now();
	// 				}
	// 				$('#show2').text(t0);
	// 				$('#show').text(number);
	// 			}).fail(function (data) {
	// 				console.log("failed");
	// 			});
	// 		}, 1000 * 1);
	// 	}
	// }

	// setInterval(function () {
	// 	$.ajax({
	// 		url: linkStatus
	// 	}).done(function (data) {
	// 		if (number !== data) {
	// 			number = 0;
	// 			count = 0;
	// 			$('#show3').text("");
	// 			countTime();
	// 		}
	// 	}).fail(function (data) {
	// 		console.log("fail");
	// 	});
	// }, 1000 * 1);

	// ----------------------------------------LOG_IN----------------------------------------------

	var linkLogin = "http://158.108.165.223/data/groupZeedUpIsLogin";
	var currentUser = 'admin';

	$('#loginbtn').click(function (data) {
		var message1 = $('#Usernamebnk').val();
		var message2 = $('#Passbnk').val();
		console.log(message1);
		console.log(message2);

		if (message1 === 'admin') {
			if (message2 === 'password') {
				console.log("success")
				currentUser = 'admin';
				location.href = "./index.html"
			} else {
				alert("Wrong password!")
				$('#Usernamebnk').val("");
				$('#Passbnk').val("");
			}
		} else if (message1 === 'dad') {
			if (message2 === 'password') {
				console.log("success");
				currentUser = 'dad';
				location.href = "./index.html"
				console.log("dad now logging in");
			} else {
				alert("Wrong password!")
				$('#Usernamebnk').val("");
				$('#Passbnk').val("");
			}
		} else if (message1 === 'mom') {
			if (message2 === 'password') {
				console.log("success");
				currentUser = 'mom';
				location.href = "./index.html"
			} else {
				alert("Wrong password!")
				$('#Usernamebnk').val("");
				$('#Passbnk').val("");
			}
		} else {
			alert("No user!")
		}

		if (currentUser === 'admin') {
			$('#curuser2').text("Admin");
		} else if (currentUser === 'dad') {
			$('#curuser2').text("Dad");
		} else if(currentUser === 'mom'){
			$('#curuser2').text("Mom");
		}

		$.ajax({
			url: linkLogin + "/set/" + currentUser
		}).done(function() {
			console.log(currentUser + " login success.");
		}).fail(function() {
			console.log(currentUser + " login fail.");
		});

	})

	console.log("--------------------------");
	console.log(currentUser);

	// if (currentUser === 'admin') {
	// 	$('#curuser2').text("Admin");
	// } else if (currentUser === 'dad') {
	// 	$('#curuser2').text("Dad");
	// } else {
	// 	$('#curuser2').text("Mom");
	// }

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