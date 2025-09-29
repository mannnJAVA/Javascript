const resetBtn = document.querySelector(".reset-btn");
      const popup = document.getElementById("popUp");
      const yesBtn = document.getElementById("yesBtn");
      const noBtn = document.getElementById("noBtn");

      resetBtn.addEventListener("click", () => {
        popup.classList.add("show");
      });

      yesBtn.addEventListener("click", () => {
        score.win = 0;
        score.losses = 0;
        score.ties = 0;

        localStorage.removeItem("score");
        updateScore();
        closePopup();
      });

      noBtn.addEventListener("click", () => {
        closePopup();
      });

      function closePopup(){
        popup.classList.remove("show");
            }

      document.querySelector(".rock-button").addEventListener("click", () => {
        playGame("rock");
      });

      document.querySelector(".paper-button").addEventListener("click", () => {
        playGame("paper");
      });

      document
        .querySelector(".scissor-button")
        .addEventListener("click", () => {
          playGame("scissor");
        });

      const score = JSON.parse(localStorage.getItem("score")) || {
        win: 0,
        losses: 0,
        ties: 0,
      };

      let pmove = "";
      updateScore();

      function playGame(playerMove) {
        const compResult = computerPick();

        let result = "";

        if (playerMove === "scissors") {
          if (compResult === "rock") result = "lose";
          else if (compResult === "paper") result = "win";
          else result = "tie";
        } else if (playerMove === "paper") {
          if (compResult === "rock") result = "win";
          else if (compResult === "paper") result = "tie";
          else result = "lose";
        } else if (playerMove === "rock") {
          if (compResult === playerMove) result = "tie";
          else if (compResult === "paper") result = "lose";
          else result = "win";
        }

        if (result === "win") score.win++;
        else if (result === "lose") score.losses++;
        else score.ties++;

        localStorage.setItem("score", JSON.stringify(score));
        updateScore();

        document.querySelector(".js-result").innerHTML = ` ${res(result)}`;

        document.querySelector(".moves").innerHTML = `You ${emoji(
          playerMove
        )} - ${emoji(compResult)} Computer`;
      }

      function updateScore() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `🏆 Wins : ${score.win} | ❌ Losses : ${score.losses} | 🤝 Ties : ${score.ties}`;
      }

      function computerPick() {
        const randomNo = Math.random();
        if (randomNo < 1 / 3) return "rock";
        else if (randomNo < 2 / 3) return "paper";
        else return "scissors";
      }

      function emoji(move) {
        if (move === "rock") return "🪨";
        if (move === "paper") return "📄";
        else return "✂️";
      }
      function res(results) {
        if (results === "win") return "YOU WIN ✅ ";
        if (results === "lose") return "YOU LOSE ❌ ";
        else return "TIES 🤝";
      }

      let autoPlay;
      document
        .querySelector(".auto-play")
        .addEventListener("click", function () {
          if (!autoPlay) {
            autoPlay = setInterval(
              function () {
                playGame(computerPick());
              },

              1000
            );
          }
        });
      document
        .querySelector(".stop-auto-play")
        .addEventListener("click", function () {
          clearInterval(autoPlay);
          autoPlay = null;
        });