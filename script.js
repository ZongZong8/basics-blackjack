// Blackjack Base Game Walkthrough
//1. Playable game with minimum fucntions: creating deck, shuffling cards, dealing cards, and evaluating winner.
//2. Ability for the player to hit or stand.
//3. Ability for the dealer to hit or stand.
//4. variable value of ACE - either '1' or '11'.

//============= Pseudocode for Version 1===========

//1. Define player and dealer
//2. Create and suffle a game deck
//3. Draw 2 cards for player and dealer respectively
//4. Win conditions: black jack and/or higher valuehand
//5. display hands of both player and dealer and declare winner

//Declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var HIT_OR_STAND_PLAYER = "hit or stand for player";
var HIT_OR_STAND_DEALER = "hit or stand for dealer";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_RESET = "game reset";
var currentGameMode = GAME_START;

//Declare variables to store player and dealer hands
//We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

//Declare variable to hold deck of cards
var gameDeck = "empty at the start";

// Initialise an empty deck array
var cardDeck = [];

//Counterto be used whenPlayer and Dealer are drawing additional cards
var counter1 = 1;
var counter2 = 1;

//player anddealer handvalue
playerTotalHandValue = "";
dealerTotalHandValue = "";

//function that creates a deck of cards
var createDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//Function that creates andshuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Function that checks a hand for blackjack
var checkForBlackjack = function (handArray) {
  //check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  //if there s blackjack, return true
  //Possible scenarios:
  //1st card ace, 2nd card 10 or picture card
  //1st card 10 or picture cards, 2ns card is an ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  // else return false
  return isBlackjack;
};

//Modifying value of ace
//if total hand value, including an aces is less than 21, aces is 11
//when totalhand value, including and ace is more than 21, ace value is reduced to 1

//Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  //loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    //for jack, queen, king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

var main = function (input) {
  var outputMessage = "";

  //First Click
  if (currentGameMode == GAME_START) {
    //Create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==>");
    console.log(playerHand);

    //progress the gameMode
    currentGameMode = GAME_CARDS_DRAWN;
    //write and return the appropriate output message
    outputMessage =
      "Player and Dealer has been dealt 2 cards each. Press the 'Submit' button for the next steps!";

    return outputMessage;
  }

  // Second Click
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        return (outputMessage =
          "Player has " +
          playerHand[0].name +
          "(" +
          playerHand[0].suit +
          ") and " +
          playerHand[1].name +
          "(" +
          playerHand[1].suit +
          ")<br><br>while dealer has " +
          dealerHand[0].name +
          "(" +
          dealerHand[0].suit +
          ") and " +
          dealerHand[1].name +
          "(" +
          dealerHand[1].suit +
          ").<br><br>Both Player and Dealer have Blackjack! It is a tie!");
      }
      //only player has blackjack -> Player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        return (outputMessage =
          "Player has " +
          playerHand[0].name +
          "(" +
          playerHand[0].suit +
          ") and " +
          playerHand[1].name +
          "(" +
          playerHand[1].suit +
          ")<br><br>while dealer has " +
          dealerHand[0].name +
          "(" +
          dealerHand[0].suit +
          ") and " +
          dealerHand[1].name +
          "(" +
          dealerHand[1].suit +
          ").<br><br>Player has Blackjack! Player wins!");
      }
      //only dealer has blackjack -> dealer wins
    } else if (playerHasBlackjack == false && dealerHasBlackjack == true) {
      return (outputMessage =
        "Player has " +
        playerHand[0].name +
        "(" +
        playerHand[0].suit +
        ") and " +
        playerHand[1].name +
        "(" +
        playerHand[1].suit +
        ")<br><br>while dealer has " +
        dealerHand[0].name +
        "(" +
        dealerHand[0].suit +
        ") and " +
        dealerHand[1].name +
        "(" +
        dealerHand[1].suit +
        ").<br><br>Dealer has Blackjack! Dealer wins!");
    } else {
      // No blackjack -> game continues
      currentGameMode = HIT_OR_STAND_PLAYER;
      return (outputMessage =
        "Player has " +
        playerHand[0].name +
        "(" +
        playerHand[0].suit +
        ") and " +
        playerHand[1].name +
        "(" +
        playerHand[1].suit +
        ")<br><br>while dealer has " +
        dealerHand[0].name +
        "(" +
        dealerHand[0].suit +
        ") and another covered card.<br><br>It is the Player's turn, please type in 'hit' or 'stand'.");
    }
  }

  //Third Click
  //Does Player want to draw more cards?
  if (currentGameMode == HIT_OR_STAND_PLAYER) {
    //calculate total hand value of both player and dealer
    playerTotalHandValue = calculateTotalHandValue(playerHand);

    console.log("Player total HandValue ==>", playerTotalHandValue);
    if (
      input != "hit" &&
      input != "Hit" &&
      input != "stand" &&
      input != "Stand"
    ) {
      return (outputMessage =
        "Please type in 'hit' or 'stand'. Player has a total value of " +
        playerTotalHandValue +
        " so far.");
    } else {
      if ((input == "hit" || input == "Hit") && playerTotalHandValue <= 21) {
        playerHand.push(gameDeck.pop());
        counter1 = counter1 + 1;
        console.log("this is additionalPlayerCard ==>", playerHand[counter1]);
        playerTotalHandValue = calculateTotalHandValue(playerHand);
        return (outputMessage =
          "Player drew " +
          playerHand[counter1].name +
          "(" +
          playerHand[counter1].suit +
          "), getting a total value of " +
          playerTotalHandValue +
          ". Type in 'hit' or 'stand' next.");
      } else if (
        (input == "hit" || input == "Hit") &&
        playerTotalHandValue >= 21
      ) {
        return (outputMessage =
          "Player's hand value is " +
          playerTotalHandValue +
          ", more than 21, and cannot draw any more cards! Please type in 'stand'.");
      } else if (input == "stand" || input == "Stand") {
        currentGameMode = HIT_OR_STAND_DEALER;
        return (outputMessage =
          "Player has chosen to stand with a hand value of " +
          playerTotalHandValue +
          ".<br><br>It is now the Dealer's turn and the Dealer revealed his/her covered card to be " +
          dealerHand[1].name +
          "(" +
          dealerHand[1].suit +
          ").<br><br>The dealer has " +
          dealerHand[0].name +
          "(" +
          dealerHand[0].suit +
          ") and " +
          dealerHand[1].name +
          "(" +
          dealerHand[1].suit +
          "). Press 'Submit' to proceed.");
      }
    }
  }

  if (currentGameMode == HIT_OR_STAND_DEALER) {
    dealerTotalHandValue = calculateTotalHandValue(dealerHand);
    console.log("Dealer total hand value ==>", dealerTotalHandValue);

    if (dealerTotalHandValue < 17) {
      dealerHand.push(gameDeck.pop());
      counter2 = counter2 + 1;
      console.log("this is additionaldealerCard ==>", dealerHand[counter2]);
      dealerTotalHandValue = calculateTotalHandValue(dealerHand);
      return (outputMessage =
        "Dealer drew " +
        dealerHand[counter2].name +
        "(" +
        dealerHand[counter2].suit +
        "), getting a total value of " +
        dealerTotalHandValue +
        ". Click 'Submit' to move on.");
    } else if (dealerTotalHandValue >= 17) {
      currentGameMode = GAME_RESULTS_SHOWN;
      return (outputMessage =
        "Dealer has value of " +
        dealerTotalHandValue +
        " and will stand. Click 'Submit' to move on.");
    }
  }

  //compare total hand value
  if (currentGameMode == GAME_RESULTS_SHOWN) {
    //same value -> tie
    if (
      playerTotalHandValue == dealerTotalHandValue &&
      playerTotalHandValue <= 21 &&
      dealerTotalHandValue <= 21
    ) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>It is a tie! <br><br> Press 'Submit to reset the game!");
    } else if (playerTotalHandValue > 21 && dealerTotalHandValue > 21) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>As Player's total value and Dealer's total values have both exceeded 21, it is a tie! <br><br> Press 'Submit to reset the game!");
    }
    //player higher value ->player wins
    else if (
      playerTotalHandValue > dealerTotalHandValue &&
      playerTotalHandValue <= 21 &&
      dealerTotalHandValue <= 21
    ) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>Player wins!<br><br> Press 'Submit to reset the game!");
    }
    //dealer higher value -> dealer wins
    else if (
      playerTotalHandValue < dealerTotalHandValue &&
      playerTotalHandValue <= 21 &&
      dealerTotalHandValue <= 21
    ) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>Dealer wins!<br><br> Press 'Submit to reset the game!");
    } else if (playerTotalHandValue <= 21 && dealerTotalHandValue > 21) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>Dealer's total value exceeds 21 and Player wins!<br><br>Press 'Submit to reset the game!");
    } else if (playerTotalHandValue > 21 && dealerTotalHandValue <= 21) {
      currentGameMode = GAME_RESET;
      return (outputMessage =
        "Player has a value of " +
        +playerTotalHandValue +
        " while dealer has " +
        dealerTotalHandValue +
        ".<br><br>Player's total value exceeds 21 and Dealer wins!<br><br> Press 'Submit to reset the game!");
    }
  }
  if ((currentGameMode = GAME_RESET)) {
    playerTotalHandValue = "";
    dealerTotalHandValue = "";
    playerHand = [];
    dealerHand = [];
    gameDeck = "empty at the start";
    cardDeck = [];
    counter1 = 1;
    counter2 = 1;
    currentGameMode = GAME_START;
    return (outputMessage =
      "Game has been reset. Press 'Submit' to play again!");
  }
};
