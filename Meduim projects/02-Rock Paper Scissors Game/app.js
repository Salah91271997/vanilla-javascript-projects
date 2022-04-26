const game = () => {
  let pScore = 0;
  let cScore = 0;

  // start the game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadout");
      match.classList.add("fadin");
    });
  };

  // play match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    // computer options
    const computerOptions = ["rock", "paper", "scissors"];
    options.forEach((option) => {
      option.addEventListener("click", function () {
        // computer choice
        const computerNumber = Math.floor(
          Math.random() * computerOptions.length
        );
        const computerChoice = computerOptions[computerNumber];
        const playerChoice = this.textContent;
        playerHand.src = "./assets/rock.png";
        computerHand.src = "./assets/rock.png";

        setTimeout(() => {
          compareHands(playerChoice, computerChoice);
          //update Image

          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        // Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };
  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    // check for tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";

      return;
    }
    //check for rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Compter Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //check for papper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Compter Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
    // check for scissor
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Compter Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();
