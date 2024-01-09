// Selecting Element //
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const scoreA = document.querySelector("#score--0");
const scoreB = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentscoreA = document.querySelector("#current--0");
const currentScoreB = document.querySelector("#current--1");

let scores, currentScore, activeplayer, palying;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  palying = true;

  scoreA.textContent = 0;
  scoreB.textContent = 0;
  currentscoreA.textContent = 0;
  currentScoreB.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  // console.log("clicked");
  // Generatning a random dice roll
  if (palying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check or rolled if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
      // currentscoreA.textContent = currentScore;
      // scoreA.textContent += Number(dice);
    } else {
      switchplayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  //Add current score to active player score
  if (palying) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    // check if player's score is >=100
    //finish the game
    if (scores[activeplayer] >= 100) {
      palying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      // switch ti the nect player
      switchplayer();
    }
  }
});

btnNew.addEventListener("click", init);
