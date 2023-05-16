var startBtn = $('#startBtn');
var tutorialBtn = $('#tutorialBtn');
var staterHeader = $('#staterHeader');
var starterSection = $('#starterSection');
var game = $('#Gaming');

var redirectedUrl = './Tutorial.html'



function displayGame(){
    console.log('hi');
    staterHeader.addClass('hide');
    starterSection.addClass('hide');
    game.removeClass('hide');

}
function tutorialPage(){
    location.replace(redirectedUrl);
}















































startBtn.on('click', displayGame)
tutorialBtn.on('click', tutorialPage)