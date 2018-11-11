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

$("#add-train-btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = moment($("#frequency-input").val().trim(), "mm").format("X");
    //var trainFrequency = $("#frequency-input").val().trim();
    var firstArrival = moment($("#arrival-input").val().trim(), "kk:mm").format("X");

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstArrival: firstArrival
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstArrival);

    alert("Successfully added Train")

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#frequency-input").val("")
    $("#arrival-input").val("")
});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot);

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var frequencyPretty = moment.unix(frequency).format("mm")
    var arrival = childSnapshot.val().firstArrival;
    var arrivalPretty = moment.unix(arrival).format("kk:mm");
    console.log(arrivalPretty);
    // var nextArrival = moment($("#frequency-input").val().trim(), "mm").diff(moment(), "minutes")
    //var nextArrival = moment().diff(moment($("#frequency-input").val().trim(), "mm"), "minutes")
    //console.log(nextArrival);
    // var mosWorked = moment().diff(moment(start, "X"), "months");
    // var billed = mosWorked * rate;
    //console.log(billed, mosWorked)

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequencyPretty),
        $("<td>").text(arrivalPretty),
        // $("<td>").text("$" + rate),
        // $("<td>").text("$" + billed)
    );

    $("#train-table").append(newRow);
});