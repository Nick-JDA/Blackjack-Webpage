var startBtn = $('#startBtn');
var tutorialBtn = $('#tutorialBtn');
var staterHeader = $('#staterHeader');
var starterSection = $('#starterSection');
var game = $('#Gaming');
var dealerEmptyDiv = $('#dealerEmptyDiv');
var playerEmptyDiv = $('#playerEmptyDiv');
var startingDiv = $('#startingDiv');
var playerCountText = $('#playerCountText');
var dealerCountText = $('#dealerCountText');
var totalMoneyText = $('#totalMoneyText');
var thisModal = $('#Modal');

var hitBtn = $('#hitBtn');
var stayBtn = $('#stayBtn');
var endBtn = $('#endBtn');

var shuffleDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
var drawCard = 'https://deckofcardsapi.com/api/deck/0jh99bawmg5e/draw/?count=';
var reshuffle = 'https://deckofcardsapi.com/api/deck/0jh99bawmg5e/shuffle/?remaining=true';
var returnDrawnCards = 'https://deckofcardsapi.com/api/deck/0jh99bawmg5e/return/';
var retrunToPile = 'https://deckofcardsapi.com/api/deck/0jh99bawmg5e/pile/<<pile_name>>/return/';

var redirectedUrl = './Tutorial.html';

var playerCount = 0;
var dealerCount = 0;

var dealerImage1;
var hiddencard;

var betBtn = $('#betBtn');
var inputForm = $('#inputForm');
var userInputBet = $('#userInputBet');

var totalMoney = 100;
totalMoneyText.text(totalMoney);
var bet;

var highscore;
var highscoreBox = $('#highscoreBox');

var highscoreForm = $('<form class="d-flex flex-column justify-content-center align-item-center gap-2 hide"></form>');
var highscoreInput = $('<input placeholder="Enter Name" class="hide"></input>');
var highscoreBtn = $('<button type="submit" class="btn-lg btnHover hide">Save Score</button>');
    
startingDiv.append(highscoreForm);
highscoreForm.append(highscoreInput);
highscoreForm.append(highscoreBtn);

var highscorelocalStroage = JSON.parse(localStorage.getItem("prevScore")) || [];




async function displayGame(){
    staterHeader.addClass('hide');
    starterSection.addClass('hide');
    game.removeClass('hide');
    
    hitBtn.off('click');
    stayBtn.off('click');    
}
function handleForm(event){
    event.preventDefault();
    bet = parseInt(userInputBet.val());
    console.log(bet);
     if(bet > totalMoney){
        console.log(bet);
        $("#myInput").modal('show');
        return;
     }
    everyoneDraw();
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
async function everyoneDraw(){                    //--------------------------------------------everyone draw
    
    betBtn.off('submit');

    totalMoney = totalMoney - bet;

    var responseOne = await fetch(shuffleDeck);
    var dataOne = await responseOne.json();
    console.log(dataOne);

    var responseTwo = await fetch(drawCard + '4');
    var dataTwo = await responseTwo.json();
    console.log(dataTwo);

    
    var i = 0;
   
    
    playerEmptyDiv.empty();
    dealerEmptyDiv.empty();
    playerCount = 0;
    dealerCount = 0;
    playerCountText.text(playerCount);
    dealerCountText.text(dealerCount);  
    totalMoneyText.text(totalMoney);

    var drawInterval = setInterval(function() {

        

        if(i < dataTwo.cards.length){
            if(i == 0){
                var playerImage = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', dataTwo.cards[i].image);
                playerEmptyDiv.append(playerImage);
                playerCount += cardValuesPlayer(dataTwo.cards[i].value);
            }else if(i == 1){
                var dealerImage = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', dataTwo.cards[i].image);
                dealerEmptyDiv.append(dealerImage);
                dealerCount += cardValuesDealer(dataTwo.cards[i].value);
            }else if(i == 2){
                var playerImage = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', dataTwo.cards[i].image);
                playerEmptyDiv.append(playerImage);
                playerCount += cardValuesPlayer(dataTwo.cards[i].value);
            }else{
                dealerImage1 = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', './assets/images/backOfCard.png');
                dealerEmptyDiv.append(dealerImage1);
                dealerCount += cardValuesDealer(dataTwo.cards[i].value);
                hiddencard = $('<img class="fixImages hide">').attr('src', dataTwo.cards[i].image);
                dealerEmptyDiv.append(hiddencard);
            }

            i++;
            playerCountText.text(playerCount);

        }else{

            clearInterval(drawInterval);

            console.log(dealerCount);
            console.log(playerCount);
    
            if (playerCount < 21) {
                playerCountText.text(playerCount);
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
},1000)

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
async function playerDraw(){                     //-----------------------------------------playerdraw

    
    playerCountText.text(playerCount);
    

    var responseTwo = await fetch(drawCard + '1');
    var dataTwo = await responseTwo.json();
    console.log(dataTwo);

    var playImageOnHit = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', dataTwo.cards[0].image);
    playerEmptyDiv.append(playImageOnHit);
    playerCount += cardValuesPlayer(dataTwo.cards[0].value);

    playerCountText.text(playerCount);
    
    if(playerCount > 21){
        hitBtn.off('click');
        winOrLose()
    }else if(playerCount<21) {
        hitBtn.on('click', playerDraw)
    }
    
}
async function dealerDraw(){                  //-------------------------------------dealer draw
    

        dealerCountText.text(dealerCount); 
        dealerImage1.addClass('hide');
        hiddencard.removeClass('hide');

    
    while(dealerCount < 17 && dealerCount <=18){
        var responseTwo = await fetch(drawCard + '1');
        var dataRepeat = await responseTwo.json();
        console.log(dataRepeat);
        var dealerHitImage = $('<img class="fixImages animate__animated animate__slideInDown">').attr('src', dataRepeat.cards[0].image);
        dealerEmptyDiv.append(dealerHitImage);
        dealerCount += cardValuesDealer(dataRepeat.cards[0].value);
        dealerCountText.text(dealerCount); 
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    winOrLose();
}
function winOrLose() {

            playerCountText.text(playerCount);
            dealerCountText.text(dealerCount);


        if (playerCount > 21) {
            totalMoney = totalMoney;
            totalMoneyText.text(totalMoney);
            return totalMoney;
        } else if (dealerCount > 21 || playerCount > dealerCount) {
            totalMoney = totalMoney + bet*2;
            totalMoneyText.text(totalMoney);
            return totalMoney;
        } else if (playerCount === dealerCount) {
            totalMoney = totalMoney + bet;
            totalMoneyText.text(totalMoney);
            return totalMoney;
        } else {
            totalMoney = totalMoney;
            totalMoneyText.text(totalMoney);
            if(totalMoney<25){
                end();
            }
            return totalMoney;
        }
    }
function end(){
    starterSection.removeClass('hide');
    game.addClass('hide');
    startBtn.addClass('hide');
    tutorialBtn.addClass('hide');
   
    highscoreForm.removeClass('hide');
    highscoreInput.removeClass('hide');
    highscoreBtn.removeClass('hide');
    
    highscore = totalMoney;
}
function saveHighscore(event){
    event.preventDefault();
    
    var userName = highscoreInput.val();
    if(userName === ""){
        return null;
    }
    
    var highscoreObject ={
        userName,
        highscore,
    };
    highscorelocalStroage.push(highscoreObject);
    localStorage.setItem("prevScore", JSON.stringify(highscorelocalStroage));

    highscoreInput.val('');

    displayHighscore();    
    location.reload();
}
function displayHighscore(){


    highscoreBox.empty();
    var unorderHighscoreList = $('<ul></ul>');

    highscorelocalStroage.forEach(function(score) {
        var listHighscore = $('<li></li>').text(`${score.userName}: ${score.highscore}`);
        unorderHighscoreList.append(listHighscore);
    });
    highscoreBox.append(unorderHighscoreList);
}



displayHighscore();

inputForm.on('submit', handleForm)
endBtn.on('click', end)
startBtn.on('click', displayGame)
tutorialBtn.on('click', tutorialPage)
highscoreForm.on('submit', saveHighscore);