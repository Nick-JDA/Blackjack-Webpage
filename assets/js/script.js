var startBtn = $('#startBtn');
var tutorialBtn = $('#tutorialBtn');
var staterHeader = $('#staterHeader');
var starterSection = $('#starterSection');
var game = $('#Gaming');
var dealerEmptyDiv = $('#dealerEmptyDiv');
var playerEmptyDiv = $('#playerEmptyDiv');

var hitBtn = $('#hitBtn');
var stayBtn = $('#stayBtn');
var endBtn = $('#endBtn');

var shuffleDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
var drawCard = 'https://deckofcardsapi.com/api/deck/9p9wht4mwpnt/draw/?count=';
var reshuffle = 'https://deckofcardsapi.com/api/deck/9p9wht4mwpnt/shuffle/?remaining=true';
var returnDrawnCards = 'https://deckofcardsapi.com/api/deck/9p9wht4mwpnt/return/';
var retrunToPile = 'https://deckofcardsapi.com/api/deck/9p9wht4mwpnt/pile/<<pile_name>>/return/';

var redirectedUrl = './Tutorial.html';

var playerCount = 0;
var dealerCount = 0;



async function displayGame(){
    staterHeader.addClass('hide');
    starterSection.addClass('hide');
    game.removeClass('hide');
    
    hitBtn.off('click');
    stayBtn.off('click');

    everyoneDraw()
}
function tutorialPage(){
    location.replace(redirectedUrl);
}
async function shuffle(){

    var responseFour = await fetch(returnDrawnCards);
    var dataFour = await responseFour.json();
    console.log(dataFour);

    var responseThree = await fetch(reshuffle);
    var dataThree = await responseThree.json();
    console.log(dataThree);


}
async function everyoneDraw(){
    
    var responseOne = await fetch(shuffleDeck);
    var dataOne = await responseOne.json();
    console.log(dataOne);

    var responseTwo = await fetch(drawCard + '4');
    var dataTwo = await responseTwo.json();
    console.log(dataTwo);
    for(i = 0; i<dataTwo.cards.length; i++){

            if(i == 0){
                var playerImage = $('<img class="fixImages">').attr('src', dataTwo.cards[i].image);
                playerEmptyDiv.append(playerImage);
                playerCount += cardValuesPlayer(dataTwo.cards[i].value);
            }else if(i == 1){
                var dealerImage = $('<img class="fixImages">').attr('src', dataTwo.cards[i].image);
                dealerEmptyDiv.append(dealerImage);
                dealerCount += cardValuesDealer(dataTwo.cards[i].value);
            }else if(i == 2){
                var playerImage = $('<img class="fixImages">').attr('src', dataTwo.cards[i].image);
                playerEmptyDiv.append(playerImage);
                playerCount += cardValuesPlayer(dataTwo.cards[i].value);
            }else{
                var dealerImage = $('<img class="fixImages">').attr('src', './assets/images/backOfCard.png');
                dealerEmptyDiv.append(dealerImage);
                dealerCount += cardValuesDealer(dataTwo.cards[i].value);
                var hiddencard = $('<img class="fixImages hide">').attr('src', dataTwo.cards[i].image);
            }
    }
  
    console.log(dealerCount);
    console.log(playerCount);
    
    if (playerCount < 21) {
        hitBtn.on('click', playerDraw);
        stayBtn.on('click', dealerDraw);
    } else if (playerCount > 21) {
        winOrLose();
    } else if (playerCount === 21) {
        hitBtn.off('click');
        stayBtn.off('click');
        dealerDraw();
    }
   

}
function cardValuesPlayer(card){

    if(isNaN(card)){
        if(card == 'ACE'){
            if(playerCount + 11 > 21){
                return 1;
            }else{
                return 11;
            }
        }
        return 10;
       }
       return parseInt(card);


}
function cardValuesDealer(card){
    
   if(isNaN(card)){
    if(card == 'ACE'){
        return 11;
    }
    return 10;
   }
   return parseInt(card);
}
async function playerDraw(){

    var responseTwo = await fetch(drawCard + '1');
    var dataTwo = await responseTwo.json();
    console.log(dataTwo);

    var playImageOnHit = $('<img class="fixImages">').attr('src', dataTwo.cards[0].image);
    playerEmptyDiv.append(playImageOnHit);
    playerCount += cardValuesPlayer(dataTwo.cards[0].value);
    
    if(playerCount > 21){
        hitBtn.off('click');
        winOrLose()
    }
    console.log(playerCount);
    return playerCount;
}
async function dealerDraw(){
    
    while(dealerCount <= 17){
    var responseTwo = await fetch(drawCard + '1');
    var dataRepeat = await responseTwo.json();
    console.log(dataRepeat);
    var dealerHitImage = $('<img class="fixImages">').attr('src', dataRepeat.cards[0].image);
    dealerEmptyDiv.append(dealerHitImage);
    dealerCount += cardValuesDealer(dataRepeat.cards[0].value);
    }

    winOrLose();
}
function winOrLose() {
        if (playerCount > 21) {
            alert('You Lose');
        } else if (dealerCount > 21) {
            alert('You Win');
        } else if (playerCount > dealerCount) {
            alert('You Win');
        } else if (playerCount === dealerCount) {
            alert('It\'s a Tie');
        } else {
            alert('You Lose');
        }
    }
function end(){

}
function saveHighscore(){

}



































endBtn.on('click', end)
startBtn.on('click', displayGame)
tutorialBtn.on('click', tutorialPage)