var startBtn = $('#startBtn');
var tutorialBtn = $('#tutorialBtn');
var staterHeader = $('#staterHeader');
var starterSection = $('#starterSection');
var game = $('#Gaming');

var shuffleDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
var drawCard = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2';
var reshuffle = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/?remaining=true';
var returnDrawnCards = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/return/';
var retrunToPile = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/return/';

var redirectedUrl = './Tutorial.html'



function displayGame(){
    staterHeader.addClass('hide');
    starterSection.addClass('hide');
    game.removeClass('hide');

}
function tutorialPage(){
    location.replace(redirectedUrl);
}
function shuffle(){

}
function everyoneDraw(){

}
function playerDraw(){

}
function dealerDraw(){

}
function winOrLose(){

}
function end(){

}
function saveHighscore(){

}
function checkSum(){
    
}









































startBtn.on('click', displayGame)
tutorialBtn.on('click', tutorialPage)