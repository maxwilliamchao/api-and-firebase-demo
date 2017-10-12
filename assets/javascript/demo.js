//Need to hardCode math for minutes away properly

//firebase
var config = {
    apiKey: "AIzaSyDiue8s8vCPb4HR7mvzF0O5GtV-xTtPbF0",
    authDomain: "makeitup-dbc03.firebaseapp.com",
    databaseURL: "https://makeitup-dbc03.firebaseio.com",
    projectId: "makeitup-dbc03",
    storageBucket: "makeitup-dbc03.appspot.com",
    messagingSenderId: "1051972553099"
  };

//initialization
firebase.initializeApp(config);

//Access database storage
var database = firebase.database();

//on click runs function that adds the input information
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  var trainName = $('#train-name-input').val().trim();
  var trainDestination = $('#destination-input').val().trim();
  var trainFirst = moment($('#first-train-time-input').val().trim(), 'HH/mm').format('X');
  var trainFrequency = $('#frequency-input').val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  };

//pushes input infor into the database
  database.ref().push(newTrain);

  alert('Train added!');

//clears input fields for next input
  $('#train-name-input').val('');
  $('#destination-input').val('');
  $('#first-train-time-input').val('');
  $('#frequency-input').val('');
});

database.ref().on('child_added', function(childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  var trainStartNice = moment.unix(trainFirst).format('HH:mm');

  //Calculates MinutesAway with difference between Next Arrival (first + frequency*X) and Current Time
  var MinutesAway = moment().diff(moment.unix(trainFirst, 'X'), 'MinutesAway');

  //This is supposed to calculate the current time based off of the time since 01/01 right?
  var currentTime = moment().unix();

  //This would work if i fixed currentTime
  var totalMinutesAway = currentTime - MinutesAway;

//appends info to the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStartNice + "</td><td>" + MinutesAway + "</td><td>" + trainFrequency + "</td><td>" + totalMinutesAway + "</td></tr>");
});































