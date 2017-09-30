  var config = {
    apiKey: "AIzaSyAab0B0Ra8cQelJVG5RwHhvPNTZ-el0zvM",
    authDomain: "trainhw-cad24.firebaseapp.com",
    databaseURL: "https://trainhw-cad24.firebaseio.com",
    projectId: "trainhw-cad24",
    storageBucket: "trainhw-cad24.appspot.com",
    messagingSenderId: "134634576101"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(){

		// Set form values to variables
		var trainName = $("#train-name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequency = $("#frequency-input").val().trim();

		// Set form variable to trainInfo in order to push to Firebase
		var trainInfo = {
			name:  trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency
		};

		// pushing trainInfo to Firebase
		database.ref().push(trainInfo);

	alert("train added")

		// clear text-boxes
		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#first-train-input").val("");
		$("#frequency-input").val("");

		// stop refresh

		return false;
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var fireName = childSnapshot.val().name;
		var fireDestination = childSnapshot.val().destination;
		var fireFrequency = childSnapshot.val().frequency;
		var fireFirstTrain = childSnapshot.val().firstTrain;

		
		var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
		var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
		var minutes = fireFrequency - remainder;

		var arrival = moment().add(minutes, "m").format("hh:mm A"); 


		// Append train data to table 
		$("#train-table > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

	});