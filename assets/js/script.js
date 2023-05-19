/**
 * These are all variables declared from the index.html page from id
 */
var startBtn = $("#startBtn");
var tutorialBtn = $("#tutorialBtn");
var staterHeader = $("#staterHeader");
var starterSection = $("#starterSection");
var game = $("#Gaming");
var dealerEmptyDiv = $("#dealerEmptyDiv");
var playerEmptyDiv = $("#playerEmptyDiv");
var startingDiv = $("#startingDiv");
var playerCountText = $("#playerCountText");
var dealerCountText = $("#dealerCountText");
var totalMoneyText = $("#totalMoneyText");
var thisModal = $("#Modal");
var hitBtn = $("#hitBtn");
var stayBtn = $("#stayBtn");
var endBtn = $("#endBtn");
var betBtn = $("#betBtn");
var inputForm = $("#inputForm");
var userInputBet = $("#userInputBet");

var hasAce = false;
var dealerAce = false;

/**
 * This variable is being declared and set equal to a button
 */
var clearBtn = $(
  '<button type="button" class="btn btn-outline-light gameBtns hide"></button>'
);
/**
 * Declares 4 variables and sets them equal to a set of apis
 */
var shuffleDeck =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=20";
var drawCard = "https://deckofcardsapi.com/api/deck/b5j4e641iyil/draw/?count=";
var reshuffle =
  "https://deckofcardsapi.com/api/deck/b5j4e641iyil/shuffle/?remaining=true";
var returnDrawnCards =
  "https://deckofcardsapi.com/api/deck/b5j4e641iyil/return/?cards=";

var redirectedUrl = "./Tutorial.html"; //variable for another html
/**
 * declare to variables set them both equal to 0
 */
var playerCount = 0;
var dealerCount = 0;
/**
 * declaring 2 vaiables
 */
var dealerImage1;
var hiddencard;

/**
 * declare 3 variables set one equal to 100 another equal to the text and one jsut declared
 */
var totalMoney = 100;
totalMoneyText.text(totalMoney);
var bet;
/**
 * declare 2 variables one set ot and id one just declared
 */
var highscore;
var highscoreBox = $("#highscoreBox");
/**
 * declared 4 variables and each create an element
 */
var highscoreTitle = $("<h2></h2>");
var highscoreForm = $(
  '<form class="d-flex flex-column justify-content-center align-item-center gap-2 hide"></form>'
);
var highscoreInput = $('<input placeholder="Enter Name" class="hide"></input>');
var highscoreBtn = $(
  '<button type="submit" class="btn-lg btnHover hide">Save Score</button>'
);

/**
 * appened a bunch of values
 */
startingDiv.append(highscoreTitle, highscoreForm);
highscoreForm.append(highscoreInput);
highscoreForm.append(highscoreBtn);

/**
 * adding text and a class
 */
highscoreTitle.text("Save");
highscoreTitle.addClass("hide");
/**used foor saving to localstorage */
var highscorelocalStroage = JSON.parse(localStorage.getItem("prevScore")) || [];

/**
 * function for displaying the game page hide the starter page reveal the main page
 */
function displayGame() {
  staterHeader.addClass("hide");
  starterSection.addClass("hide");
  game.removeClass("hide");
  clearBtn.removeClass("hide");

  hitBtn.off("click");
  stayBtn.off("click");
}
/**
 * function for handling the form, used to grab the user input and make sure they place a proper input
 */
function handleForm(event) {
  event.preventDefault();

  bet = parseInt(userInputBet.val());
  console.log(bet);
  if (bet > totalMoney) {
    $("#myInput").modal("show");
    return;
  } else if (isNaN(bet) || bet === "") {
    $("#myInput").modal("show");
    return;
  }
  everyoneDraw();
}
/**
 * used to send user to other html
 */
function tutorialPage() {
  location.replace(redirectedUrl);
}
/**
 * used to return cards from the api and reshuffle them
 */
async function shuffle() {
  var responseThree = await fetch(reshuffle);
  var dataThree = await responseThree.json();
  console.log(dataThree);

  var responseFour = await fetch(returnDrawnCards);
  var dataFour = await responseFour.json();
  console.log(dataFour);
}
/**
 * A function for drawing cards distrubts cards to the dealer and the user one is initally hidden
 * and then u are left with the option to either hit(draw a card) or stay(stay with your cards)
 */
async function everyoneDraw() {
  hasAce = false;
  dealerAce = false;
  betBtn.addClass("hide");
  betBtn.off("click");

  totalMoney = totalMoney - bet;

  var responseTwo = await fetch(drawCard + "4");
  var dataTwo = await responseTwo.json();

  var i = 0;

  playerEmptyDiv.empty();
  dealerEmptyDiv.empty();
  playerCount = 0;
  dealerCount = 0;
  playerCountText.text(playerCount);
  dealerCountText.text(dealerCount);
  totalMoneyText.text(totalMoney);

  var drawInterval = setInterval(function () {
    if (i < dataTwo.cards.length) {
      if (i == 0) {
        var playerImage = $(
          '<img class="fixImages animate__animated animate__slideInDown">'
        ).attr("src", dataTwo.cards[i].image);
        playerEmptyDiv.append(playerImage);
        playerCount += playerCardValues(dataTwo.cards[i].value);
      } else if (i == 1) {
        var dealerImage = $(
          '<img class="fixImages animate__animated animate__slideInDown">'
        ).attr("src", dataTwo.cards[i].image);
        dealerEmptyDiv.append(dealerImage);
        dealerCount += dealerCardValues(dataTwo.cards[i].value);
        dealerCountText.text(dealerCount);
      } else if (i == 2) {
        var playerImage = $(
          '<img class="fixImages animate__animated animate__slideInDown">'
        ).attr("src", dataTwo.cards[i].image);
        playerEmptyDiv.append(playerImage);
        playerCount += playerCardValues(dataTwo.cards[i].value);
      } else {
        dealerImage1 = $(
          '<img class="fixImages animate__animated animate__slideInDown">'
        ).attr("src", "./assets/images/backOfCard.png");
        dealerEmptyDiv.append(dealerImage1);
        dealerCount += dealerCardValues(dataTwo.cards[i].value);
        hiddencard = $('<img class="fixImages hide">').attr(
          "src",
          dataTwo.cards[i].image
        );
        dealerEmptyDiv.append(hiddencard);
        console.log(dataTwo);
      }
      i++;
      playerCountText.text(playerCount);
    } else {
      clearInterval(drawInterval);

      if (playerCount < 21) {
        playerCountText.text(playerCount);
        hitBtn.on("click", playerDraw);
        stayBtn.on("click", dealerDraw);
      } else if (playerCount > 21) {
        hiddencard.removeClass("hide");
        winOrLose();
      } else if (playerCount === 21) {
        hiddencard.removeClass("hide");
        hitBtn.off("click");
        stayBtn.off("click");
        dealerDraw();
      }
    }
  }, 1000);
}
/**
 * function to grab the value of the card due to the fact the card values are all strings they need to be paserInt
 * then fixed later
 */
function playerCardValues(card) {
  if (isNaN(card)) {
    if (card == "ACE") {
      hasAce = true;
      if (playerCount + 11 > 21) {
        return 1;
      } else {
        return 11;
      }
    }
    return 10;
  }
  return parseInt(card);
}
function dealerCardValues(card) {
  if (isNaN(card)) {
    if (card == "ACE") {
      dealerAce = true;
      if (dealerCount + 11 > 21) {
        return 1;
      } else {
        return 11;
      }
    }
    return 10;
  }
  return parseInt(card);
}

/**
 * using an async function to fetch and setting up for the player to draw
 */
async function playerDraw() {
  var responseTwo = await fetch(drawCard + "1");
  var dataTwo = await responseTwo.json();
  console.log(dataTwo);

  var playImageOnHit = $(
    '<img class="fixImages animate__animated animate__slideInDown">'
  ).attr("src", dataTwo.cards[0].image);
  playerEmptyDiv.append(playImageOnHit);
  playerCount += playerCardValues(dataTwo.cards[0].value);
  if (hasAce && playerCount > 21) {
    playerCount -= 10;
    hasAce = false;
    return;
  }
  playerCountText.text(playerCount);
  console.log(playerCount);
  if (playerCount > 21) {
    hitBtn.off("click");
    winOrLose();
  } else if (playerCount < 21) {
    return;
  }
}
/**
 * function for when the dealer draws must be 17 or higher cannot go over 21
 */
function dealerDraw() {
  dealerCountText.text(dealerCount);
  dealerImage1.addClass("hide");
  hiddencard.removeClass("hide");
  hiddencard.addClass("animate__animated animate__flipInY");
  

    var dealerDrawingInterval = setInterval(dealerDrawing, 1000);



async function dealerDrawing() {
    console.log(dealerCount);
    // if (dealerCount >= 17 && !dealerAce) {
    //   console.log("hi");
    //   clearInterval(dealerDrawingInterval);
    //   winOrLose();
    //   return;
    // }
    if (dealerCount < 17) {
      console.log("hello");
      hiddencard.removeClass("hide");
      var responseTwo = await fetch(drawCard + "1");
      var dataRepeat = await responseTwo.json();
      var dealerHitImage = $(
        '<img class="fixImages animate__animated animate__slideInDown">'
      ).attr("src", dataRepeat.cards[0].image);
      dealerEmptyDiv.append(dealerHitImage);
      dealerCount += dealerCardValues(dataRepeat.cards[0].value);
      if (dealerAce && dealerCount > 21) {
        dealerCount -= 10;
        dealerAce = false;
        return;
      }
      dealerCountText.text(dealerCount);
    } else {
      console.log("hey");
      clearInterval(dealerDrawingInterval);
      winOrLose();
    }
  };
  return;
}
/**
 * detects if hand was either a win or lose agaisnt the dealer
 */
function winOrLose() {
  betBtn.removeClass("hide");

  hiddencard.removeClass("hide");
  dealerImage1.addClass("hide");
  hiddencard.addClass("animate__animated animate__flipInY");

  hitBtn.off("click");
  stayBtn.off("click");
  playerCountText.text(playerCount);
  dealerCountText.text(dealerCount);

  if (playerCount > 21) {
    $("#myBust").modal("show");
    totalMoneyText.text(totalMoney);
    return totalMoney;
  } else if (dealerCount > 21 || playerCount > dealerCount) {
    $("#myWin").modal("show");
    totalMoney += bet * 2;
    totalMoneyText.text(totalMoney);
    return totalMoney;
  } else if (playerCount === dealerCount) {
    $("#myTie").modal("show");
    totalMoney += bet;
    totalMoneyText.text(totalMoney);
    return totalMoney;
  } else {
    $("#myEnding").modal("show");
    totalMoneyText.text(totalMoney);
    if (totalMoney < 25) {
      end();
    }
    return totalMoney;
  }
}
/**
 * for when you hit the end button to end game
 */
function end() {
  starterSection.removeClass("hide");
  game.addClass("hide");
  startBtn.addClass("hide");
  tutorialBtn.addClass("hide");

  highscoreTitle.removeClass("hide");
  highscoreForm.removeClass("hide");
  highscoreInput.removeClass("hide");
  highscoreBtn.removeClass("hide");

  highscore = totalMoney;
}
/**
 * used to save your highscore into localstorage
 */
function saveHighscore(event) {
  event.preventDefault();

  var userName = highscoreInput.val();
  if (userName === "") {
    return null;
  }

  var highscoreObject = {
    userName,
    highscore,
  };
  highscorelocalStroage.push(highscoreObject);
  localStorage.setItem("prevScore", JSON.stringify(highscorelocalStroage));

  highscoreInput.val("");

  displayHighscore();
  location.reload();
}
/**
 * used to display your highscore
 */
function displayHighscore() {
  highscoreBox.empty();
  var highscorelistTitle = $("<h2></h2>");
  var unorderHighscoreList = $("<ul></ul>");

  highscorelocalStroage.forEach(function (score) {
    var listHighscore = $("<li></li>").text(
      `${score.userName}: ${score.highscore}`
    );
    unorderHighscoreList.append(listHighscore);
  });
  highscoreBox.append(highscorelistTitle, unorderHighscoreList, clearBtn);
  highscorelistTitle.text("Highscore");
  clearBtn.text("Clear");
}

displayHighscore(); //calls to function display highscore

/**
 * a bunch of event listeners on is tied to a function to clear the local storage
 */
inputForm.on("submit", handleForm);
endBtn.on("click", end);
startBtn.on("click", displayGame);
tutorialBtn.on("click", tutorialPage);
highscoreForm.on("submit", saveHighscore);
clearBtn.on("click", () => {
  highscoreBox.empty();
  localStorage.clear();
});
