// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe_k-YhOHxT6Hjckds07PFlcSYMlTi_Fw",
    authDomain: "train-scheduler-edff0.firebaseapp.com",
    databaseURL: "https://train-scheduler-edff0.firebaseio.com",
    projectId: "train-scheduler-edff0",
    storageBucket: "train-scheduler-edff0.appspot.com",
    messagingSenderId: "1089930358379"
};
firebase.initializeApp(config);
var database = firebase.database();

//event handler for submitting trains
$("#add-train-btn").on("click", function () {
    event.preventDefault();

    //user input variables
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var firstArrival = moment($("#arrival-input").val().trim(), "kk:mm").format("X");

    //object to push to database
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstArrival: firstArrival
    };
    
    //push object to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstArrival);

    alert("Successfully added Train")

    //reset form fields
    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#frequency-input").val("")
    $("#arrival-input").val("")
});

//on child added function
database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot);

    //database value variables
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = moment().add(frequency, "m").format("kk:mm");
    var arrival = childSnapshot.val().firstArrival;
    var arrivalPretty = moment.unix(arrival).format("kk:mm");

    //creates new row with information from database
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrivalPretty),
        $("<td>").text(nextArrival)
    );

    //appends new row to table
    $("#train-table").append(newRow);
});