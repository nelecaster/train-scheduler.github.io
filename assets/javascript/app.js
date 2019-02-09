// info from input boxes needs to go to firebase
var config = {
  apiKey: "AIzaSyC0eRybEuZunWSJlwAKp99OKb8c52ta_Jw",
  authDomain: "train-scheduler-2bb71.firebaseapp.com",
  databaseURL: "https://train-scheduler-2bb71.firebaseio.com",
  projectId: "train-scheduler-2bb71",
  storageBucket: "train-scheduler-2bb71.appspot.com",
  messagingSenderId: "858545560299"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

  

    

  $('#button').on('click', function () {
    console.log("hello");

    var trainName = $('#train_name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = $('#first_train').val().trim();
    var tFrequency = $('#frequency').val().trim();
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    nextTrainPush = moment(nextTrain).format("hh:mm");
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(tFrequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      tFrequency: tFrequency,
      nextTrainPush: nextTrainPush,
      tMinutesTillTrain: tMinutesTillTrain
    });



    

    

  });
  
  database.ref().on("child_added", function (snapshot) {
    console.log('snapshot.val()', snapshot.val().trainName);
    $('.table > tbody').append('<tr><td>' + snapshot.val().trainName + '</td><td>' + snapshot.val().destination + '</td><td>' + snapshot.val().tFrequency + '</td><td>' + snapshot.val().nextTrainPush + '</td><td>' + snapshot.val().tMinutesTillTrain + '</td></tr>')

});


});
























// moment.js code for current time



// use inputs first train time and frequency of return

// in a for loop, the frequency(minutes) is repeatedly added to the first_train time

// once the time in the for loop is later than the current time, that time is displayed in the "next arrival" column

// current time is subtracted from next arrival time and the difference in minutes is displayed in the "minutes away" column


