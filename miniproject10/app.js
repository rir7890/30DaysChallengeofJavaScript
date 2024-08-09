const players = [];
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const country = document.getElementById("country");
const player_score = document.getElementById("player_score");
const add_player = document.getElementById("add-player");
const result = document.getElementById("result");
const err_msg = document.getElementById("err");

function NewPlayer(firstname, lastname, country, score) {
  const div = document.createElement("div");
  const d = new Date().toDateString();
  div.innerHTML = `
  <div id="Player_div">
        <div id="div_1">
          <span>${firstname + " " + lastname}</span>
          <span>${d}</span>
        </div>
        <div id="div_2">${country}</div>
        <div id="div_3">${score}</div>
        <div id="div_4">
          <button id="delete" >
            <i class="fa fa-trash-o" style="color: red"></i>
          </button>
          <button id="score-inc">+5</button>
          <button id="score-dec" >-5</button>
        </div>
      </div>

  `;

  // Add event listeners after the element is created
  div
    .querySelector("#delete")
    .addEventListener("click", () => delete_player(firstname));
  div
    .querySelector("#score-inc")
    .addEventListener("click", () => score_inc(firstname));
  div
    .querySelector("#score-dec")
    .addEventListener("click", () => score_dec(firstname));

  result.appendChild(div);
}

function add_players(players) {
  result.innerHTML = ``;
  players.forEach(function (player) {
    NewPlayer(
      player.player_firstname,
      player.player_lastname,
      player.player_country,
      player.player_score
    );
  });
}

add_players(players);

add_player.addEventListener("click", function (e) {
  const player_firstname = firstname.value;
  const player_lastname = lastname.value;
  const player_country = country.value;
  const playerscore = player_score.value;

  if (isNaN(playerscore)) {
    err_msg.innerHTML = "Score Value should be a number";
    err_msg.style.backgroundColor = "red";
    err_msg.style.fontSize = "15px";
    return;
  }
  if (
    [player_firstname, player_lastname, player_country, playerscore].some(
      (val) => val?.trim() === ""
    )
  ) {
    err_msg.innerHTML = "Please provide all the information";
    err_msg.style.backgroundColor = "red";
    err_msg.style.fontSize = "15px";
    return;
  }
  players.push({
    player_firstname: player_firstname,
    player_lastname: player_lastname,
    player_country: player_country,
    player_score: playerscore,
  });

  add_players(players);
});

function delete_player(firstname) {
  const updatedPlayers = players.filter(
    (player) =>
      player.player_firstname.toLowerCase() !== firstname.toLowerCase()
  );
  players.length = 0;
  players.push(...updatedPlayers);
  add_players(players);
}

function score_inc(firstname) {
  players.forEach((player) => {
    if (player.player_firstname.toLowerCase() === firstname.toLowerCase()) {
      player.player_score = parseInt(player.player_score) + 5;
    }
  });
  add_players(players);
}

function score_dec(firstname) {
  players.forEach((player) => {
    if (player.player_firstname.toLowerCase() === firstname.toLowerCase()) {
      player.player_score = parseInt(player.player_score) - 5;
    }
  });
  add_players(players);
}
