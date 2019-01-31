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

  $('#button').on('click', function() {
    var trainName = $('#train_name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first_train').val().trim();
    var frequency = $('#frequency').val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().set({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });

    var currentTime = moment().format('HH:mm:ss a');
console.log(currentTime);

var startTrain = moment(firstTrain, 'HH:mm');
startTrain.add(frequency, 'm');
var timeAfterTrip = startTrain.format('HH:mm');
console.log(timeAfterTrip);

















    $('.table').append('<tr><td>'+ trainName+'</td><td>'+ destination +'</td><td>'+ frequency +'</td><td>'+ 'tbd' +'</td><td>'+ 'tbd' +'</td></tr>')
  

});
});

// moment.js code for current time



// use inputs first train time and frequency of return

// in a for loop, the frequency(minutes) is repeatedly added to the first_train time

// once the time in the for loop is later than the current time, that time is displayed in the "next arrival" column

// current time is subtracted from next arrival time and the difference in minutes is displayed in the "minutes away" column


