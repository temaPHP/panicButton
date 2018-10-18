$(function() {
    console.log( "ready!" );
    resetApp();
    $( "#panicButton" ).click(function() {
        secondPage();
    });
    $( "#inkButton" ).click(function() {
        outOfInk();
    });
    $( "#paperButton" ).click(function() {
        outOfPaper();
    });
    $( "#otherButton" ).click(function() {
        otherError();
    });
    $( ".resetButton" ).click(function() {
        resetApp();
    });
});

function outOfInk(){
    sendRequest('OUT OF INK');
    loadingPagep();
}

function outOfPaper(){
    sendRequest('OUT OF PAPER');
    loadingPagep();
}

function otherError(){
    sendRequest('OTHER: UNSPECIFIED ERROR');
    loadingPagep();
}

function sendRequest(error){
    url = "http://v70pjs01t/devs/kraisor/printerpanicbutton/snowticket/?error=" + error;
    $.ajax({
        url: url,
    })
    .done(function( data ) {
        parsedData = jQuery.parseJSON( data );
        console.log(parsedData);
        console.log(parsedData.number);
        console.log(parsedData.error);
        $( "#errorReturned" ).text(parsedData.error);
        $( "#ticketReturned" ).text(parsedData.number);
        finalPage();
    });
}

function resetApp() {
    $( "#MainPage" ).show();
    $( "#SecondPage" ).hide();
    $( "#LoadingPage" ).hide();
    $( "#FinalPage" ).hide();
}
function secondPage() {
    $( "#MainPage" ).hide();
    $( "#SecondPage" ).show();
    $( "#LoadingPage" ).hide();
    $( "#FinalPage" ).hide();
}
function loadingPagep() {
    $( "#MainPage" ).hide();
    $( "#SecondPage" ).hide();
    $( "#LoadingPage" ).show();
    $( "#FinalPage" ).hide();
}
function finalPage() {
    $( "#MainPage" ).hide();
    $( "#SecondPage" ).hide();
    $( "#LoadingPage" ).hide();
    $( "#FinalPage" ).show();
}