const season = 2022;
const twentyFourHours = 86400000;
// League View
const $leagueView = document.querySelector('#league-view');
const $mainTable = document.querySelector('#main-table');
const $navBarLogo = document.querySelector('#nav-logo');
const $navBarTitle = document.querySelector('#nav-bar-title');
const $navBarDropdownWrap = document.querySelector('#league-dropdown-wrapper');
const $selectDropdown = document.querySelector('#league-dropdown');
const $navBarLeaders = document.querySelector('#nav-bar-leaders');
const $option0 = document.querySelector('[value="0"]');
const $option1 = document.querySelector('[value="1"]');
const $option2 = document.querySelector('[value="2"]');
const $option3 = document.querySelector('[value="3"]');
const $option4 = document.querySelector('[value="4"]');
const optionArray = [$option0, $option1, $option2, $option3, $option4];

const $englandHead = document.querySelector('#england');
const $italyHead = document.querySelector('#italy');
const $germanyHead = document.querySelector('#germany');
const $spainHead = document.querySelector('#spain');
const $franceHead = document.querySelector('#france');
const headArray = [$englandHead, $italyHead, $germanyHead, $spainHead, $franceHead];
const idArray = [39, 135, 78, 140, 61];
const titleArray = ['Premier League', 'Serie A', 'Bundesliga', 'La Liga', 'Ligue 1'];

// TEAM VIEW
const $teamView = document.querySelector('#team-view');
const $tvBadge = document.querySelector('#team-view-badge');
const $tvName = document.querySelector('#team-view-name');

// TV Left Column
const $tvForm = document.querySelector('#team-view-recent-form');
const $tvWins = document.querySelector('#tv-row-form-wins > .team-view-table-2nd-col');
const $tvWinsDesc = document.querySelector('#tv-row-form-wins > .team-view-table-3rd-col');

const $tvLoses = document.querySelector('#tv-row-form-loses > .team-view-table-2nd-col');
const $tvLosesDesc = document.querySelector('#tv-row-form-loses > .team-view-table-3rd-col');

const $tvDraws = document.querySelector('#tv-row-form-draws > .team-view-table-2nd-col');
const $tvDrawsDesc = document.querySelector('#tv-row-form-draws > .team-view-table-3rd-col');

// Scored
const $tvScoredHome = document.querySelector('#tv-row-scored-home > .team-view-table-2nd-col');
const $tvScoredHomeDesc = document.querySelector('#tv-row-scored-home > .team-view-table-3rd-col');

const $tvScoredAway = document.querySelector('#tv-row-scored-away > .team-view-table-2nd-col');
const $tvScoredAwayDesc = document.querySelector('#tv-row-scored-away > .team-view-table-3rd-col');

// Conceded
const $tvConcededHome = document.querySelector('#tv-row-conceded-home > .team-view-table-2nd-col');
const $tvConcededHomeDesc = document.querySelector('#tv-row-conceded-home > .team-view-table-3rd-col');

const $tvConcededAway = document.querySelector('#tv-row-conceded-away > .team-view-table-2nd-col');
const $tvConcededAwayDesc = document.querySelector('#tv-row-conceded-away > .team-view-table-3rd-col');

// TV Right Column

const $tvManagerImg = document.querySelector('#coach-img');
const $tvManagerName = document.querySelector('#manager-name');

const $formation1 = document.querySelector('#formations-1');
const $formation2 = document.querySelector('#formations-2');
const $formation3 = document.querySelector('#formations-3');
const $squadButton = document.querySelector('#view-squad-button');

// Squad View
const $squadView = document.querySelector('#squad-view');
const $goalkeepers = document.querySelector('#sv-goalkeepers');
const $defenders = document.querySelector('#sv-defenders');
const $midfielders = document.querySelector('#sv-midfielders');
const $attackers = document.querySelector('#sv-attackers');
const positionStringArray = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
const positionArray = [$goalkeepers, $defenders, $midfielders, $attackers];

// Leader View
const $leaderView = document.querySelector('#leader-view');
const $topScorers = document.querySelector('#lv-scorers');
const $topAssisters = document.querySelector('#lv-assisters');

// League Functions
window.addEventListener('load', event => {
  data.currPage = $leagueView;
  let leagueData;
  const leagueIndex = data.view;
  if (data.leaguesArray[leagueIndex] === null || (Date.now() - data.timeAtUpdate[leagueIndex] > twentyFourHours)) {
    const standingsXhr = new XMLHttpRequest();
    standingsXhr.addEventListener('load', event => {
      data.leaguesArray[leagueIndex] = standingsXhr.response;
      leagueData = standingsXhr.response;
      data.timeAtUpdate[leagueIndex] = Date.now();
      generateBody(leagueData, leagueIndex);
      headArray[leagueIndex].dataset.generated = 'true';
      $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
    });
    const standingsString = `https://v3.football.api-sports.io/standings?league=${idArray[leagueIndex]}&season=${season}`;
    const targetUrl = encodeURIComponent(standingsString);
    standingsXhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
    standingsXhr.responseType = 'json';
    standingsXhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
    standingsXhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
    standingsXhr.send();
  } else {
    leagueData = data.leaguesArray[leagueIndex];
    generateBody(leagueData, leagueIndex);
    headArray[leagueIndex].dataset.generated = 'true';
    $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
  }
  headArray[leagueIndex].dataset.generated = 'true';
  headArray[leagueIndex].classList.remove('hidden');
  swapDropdownDefault(leagueIndex);
});

function swapDropdownDefault(value) {
  for (let i = 0; i < optionArray.length; i++) {

    if (i === value) {
      optionArray[i].selected = true;
    } else {
      optionArray[i].selected = false;
    }
  }
}

function generateBody(leagueData, leagueIndex) {
  const $tableHead = headArray[leagueIndex]; // change this to be any one of the heads for feature 5
  const leagueStandings = leagueData.response[0].league.standings[0];
  for (let i = 0; i < leagueStandings.length; i++) {
    const $newRow = generateRow(leagueStandings[i]);
    $tableHead.appendChild($newRow);
  }
}

function generateRow(leagueObject) {
  const $row = document.createElement('tr');
  $row.setAttribute('data-pos', leagueObject.rank);
  const $position = document.createElement('td');
  $position.classList.add('position');
  if (leagueObject.description !== null) {
    if (leagueObject.description.slice(12, 28) === 'Champions League') {
      $row.classList.add('uefa');
    } else if (leagueObject.description.slice(0, 10) === 'Relegation') {
      $row.classList.add('relegation');
    } else {
      $row.classList.add('border');
    }
  } else {
    $row.classList.add('border');
  }
  $row.appendChild($position);

  const $span = document.createElement('span');
  $span.classList.add('number');
  $span.innerText = leagueObject.rank;
  $position.appendChild($span);

  const $logoTd = document.createElement('td');
  const $logoWrap = document.createElement('div');
  $logoWrap.classList.add('logo-wrapper');
  const $logo = document.createElement('img');
  $logo.setAttribute('src', leagueObject.team.logo);
  $logo.classList.add('club-logo');
  $logo.setAttribute('alt', 'team badge');
  $logoTd.appendChild($logoWrap);
  $row.appendChild($logoTd);
  $logoWrap.appendChild($logo);

  const $clubName = document.createElement('td');
  $clubName.classList.add('club');
  $clubName.innerText = leagueObject.team.name;
  $row.appendChild($clubName);

  const $pts = document.createElement('td');
  $pts.classList.add('bolded');
  $pts.innerText = leagueObject.points;
  $row.appendChild($pts);

  const $wins = document.createElement('td');
  $wins.classList.add('results');
  $wins.innerText = leagueObject.all.win;
  $row.appendChild($wins);

  const $draws = document.createElement('td');
  $draws.classList.add('results');
  $draws.innerText = leagueObject.all.draw;
  $row.appendChild($draws);

  const $loses = document.createElement('td');
  $loses.classList.add('results');
  $loses.innerText = leagueObject.all.lose;
  $row.appendChild($loses);

  const $mp = document.createElement('td');
  $mp.classList.add('results');
  $mp.innerText = leagueObject.all.played;
  $row.appendChild($mp);

  const $gf = document.createElement('td');
  $gf.classList.add('results');
  $gf.innerText = leagueObject.all.goals.for;
  $row.appendChild($gf);

  const $ga = document.createElement('td');
  $ga.classList.add('results');
  $ga.innerText = leagueObject.all.goals.against;
  $row.appendChild($ga);

  const $gd = document.createElement('td');
  $gd.classList.add('results');
  $gd.innerText = leagueObject.goalsDiff;
  $row.appendChild($gd);

  return $row;
}

// Team View Functions
$mainTable.addEventListener('click', event => {
  if (event.target.classList.contains('club') && !event.target.classList.contains('bolded')) {
    const positionInArray = Number(event.target.closest('tr').dataset.pos) - 1;
    const teamID = data.leaguesArray[data.view].response[0].league.standings[0][positionInArray].team.id;
    const request = `https://v3.football.api-sports.io/teams/statistics?league=${idArray[data.view]}&season=${season}&team=${teamID}`;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', event => {
      generateTeamView(xhr.response);
      addHidden($leagueView);
      removeHidden($teamView);
    });
    const targetUrl = encodeURIComponent(request);
    xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
    xhr.responseType = 'json';
    xhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
    xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
    xhr.send();
  }

});

function generateTeamView(response) {
  response = response.response;
  const xhr = new XMLHttpRequest();
  const request = `https://v3.football.api-sports.io/coachs?team=${response.team.id}`;
  $tvName.dataset.id = response.team.id;
  const targetUrl = encodeURIComponent(request);
  xhr.addEventListener('load', event => {
    $tvManagerImg.setAttribute('src', xhr.response.response[0].photo);
    const name = `${xhr.response.response[0].name}`;
    $tvManagerName.textContent = name;
  });
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
  xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
  xhr.send();
  $tvBadge.setAttribute('src', response.team.logo);
  $tvName.textContent = response.team.name;
  $tvForm.innerText = 'Recent Form: ';
  const finalForm = response.form.slice(-5);
  for (let i = 0; i < finalForm.length; i++) {
    const newSpan = document.createElement('span');
    if (finalForm[i] === 'W') {
      newSpan.classList.add('win');
    } else if (finalForm[i] === 'L') {
      newSpan.classList.add('loss');
    } else {
      newSpan.classList.add('draw');
    }
    newSpan.textContent = finalForm[i] + ' ';
    $tvForm.appendChild(newSpan);
  }
  $tvWins.textContent = response.fixtures.wins.total;
  $tvWinsDesc.textContent = `(${response.fixtures.wins.home} home, ${response.fixtures.wins.away} away)`;

  $tvLoses.textContent = response.fixtures.loses.total;
  $tvLosesDesc.textContent = `(${response.fixtures.loses.home} home, ${response.fixtures.loses.away} away)`;

  $tvDraws.textContent = response.fixtures.draws.total;
  $tvDrawsDesc.textContent = `(${response.fixtures.draws.home} home, ${response.fixtures.draws.away} away)`;

  $tvScoredHome.textContent = response.goals.for.total.home;
  $tvScoredAway.textContent = response.goals.for.total.away;

  $tvScoredHomeDesc.textContent = `(avg. ${response.goals.for.average.home} per game)`;
  $tvScoredAwayDesc.textContent = `(avg. ${response.goals.for.average.away} per game)`;

  $tvConcededHome.textContent = response.goals.against.total.home;
  $tvConcededAway.textContent = response.goals.against.total.away;

  $tvConcededHomeDesc.textContent = `(avg. ${response.goals.against.average.home} per game)`;
  $tvConcededAwayDesc.textContent = `(avg. ${response.goals.against.average.away} per game)`;

  const formationArray = [$formation1, $formation2, $formation3];
  for (let i = 0; i < response.lineups.length && i < 3; i++) {
    formationArray[i].textContent = response.lineups[i].formation.replaceAll('-', ' - ');
  }
  alterNavBar(response.team.name);
}

$navBarLogo.addEventListener('click', event => {
  restoreNavBar();
  if (data.currPage === $squadView) {
    deleteSquadView();
  } else if (data.currPage === $leaderView) {
    deleteLeadersView();
  }
  addHidden(data.currPage); // hide the current page
  removeHidden($leagueView); // show the league view
});

function alterNavBar(replacement) { // used for transferring from league view to team view
  $navBarLeaders.classList.add('hidden');
  $navBarDropdownWrap.classList.add('hidden');
  $navBarTitle.classList.remove('hidden');
  $navBarTitle.textContent = replacement;
}

function restoreNavBar() {
  $navBarTitle.textContent = titleArray[data.view]; // Premier League, Bundesliga, etc.
  $navBarTitle.classList.add('hidden');
  $navBarLeaders.classList.remove('hidden');
  $navBarDropdownWrap.classList.remove('hidden');
}

function addHidden(element) {
  element.classList.add('hidden');
}

function removeHidden(element) {
  data.currPage = element; // $squadView, $leagueView, etc.
  element.classList.remove('hidden');
}

$squadButton.addEventListener('click', event => {
  const xhr = new XMLHttpRequest();
  const teamID = Number($tvName.dataset.id);
  const request = `https://v3.football.api-sports.io/players/squads?team=${teamID}`;
  const targetUrl = encodeURIComponent(request);
  xhr.addEventListener('load', event => {
    generateSquad(xhr.response);
    addHidden($teamView);
    alterNavBar($navBarTitle.textContent + ' Squad');
    removeHidden($squadView);
  });
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
  xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
  xhr.send();
});

// Squad View Functions

function generatePlayer(playerObject) {
  const $playerBox = document.createElement('div');
  $playerBox.classList.add('sv-player-box');

  const $imgWrap = document.createElement('div');
  $imgWrap.classList.add('player-img-wrapper');
  $playerBox.appendChild($imgWrap);

  const $playerImg = document.createElement('img');
  $playerImg.classList.add('sv-player-img');
  $playerImg.setAttribute('alt', 'Player Image');
  $playerImg.setAttribute('src', playerObject.photo);
  $imgWrap.appendChild($playerImg);

  const $infoWrap = document.createElement('div');
  $infoWrap.classList.add('player-info-wrapper');
  $playerBox.appendChild($infoWrap);

  const $numberWrap = document.createElement('div');
  $numberWrap.classList.add('sv-number-wrapper');
  $infoWrap.appendChild($numberWrap);

  const $playerNumber = document.createElement('h3');
  $playerNumber.classList.add('sv-player-number');
  $playerNumber.textContent = playerObject.number;

  $numberWrap.appendChild($playerNumber);

  const $nameWrap = document.createElement('div');
  $nameWrap.classList.add('sv-name-wrapper');
  $infoWrap.appendChild($nameWrap);

  const $playerName = document.createElement('h3');
  $playerName.classList.add('sv-player-name');
  $playerName.textContent = playerObject.name;
  $nameWrap.appendChild($playerName);

  return $playerBox;
}

function generateSquad(response) {
  const squadArray = response.response[0].players;

  for (let i = 0; i < squadArray.length; i++) {
    const playerObj = squadArray[i];
    if (playerObj.number === null) {
      continue;
    }
    const position = playerObj.position;
    const playerElement = generatePlayer(playerObj);
    positionArray[positionStringArray.indexOf(position)].appendChild(playerElement);
  }
}

function deleteSquadView() { // called in NavBar event listener
  const playerBoxes = document.querySelectorAll('.sv-player-box');
  for (let i = 0; i < playerBoxes.length; i++) {
    playerBoxes[i].remove();
  }
}

// Leader View Functions
function generateLeagueLeaders(scorerResponse, assisterResponse) {
  const numGenerated = 6;
  for (let i = 0; i < numGenerated; i++) {
    const $playerObj = generateLeader(scorerResponse.response[i], true);
    $topScorers.appendChild($playerObj);
  }
  for (let i = 0; i < numGenerated; i++) {
    const $playerObj = generateLeader(assisterResponse.response[i], false);
    $topAssisters.appendChild($playerObj);
  }
}

function generateLeader(playerObj, playerType) {
  const $playerBox = document.createElement('div');
  $playerBox.classList.add('lv-player-box');

  const $imgWrap = document.createElement('div');
  $imgWrap.classList.add('player-img-wrapper', 'lv-img');
  $playerBox.appendChild($imgWrap);

  const $playerImg = document.createElement('img');
  $playerImg.setAttribute('src', playerObj.player.photo);
  $playerImg.classList.add('lv-player-img');
  $playerImg.setAttribute('alt', 'Player Image');
  $imgWrap.appendChild($playerImg);

  const $infoWrap = document.createElement('div');
  $infoWrap.classList.add('lv-player-info-wrapper');
  $playerBox.appendChild($infoWrap);

  const $logoWrap = document.createElement('div');
  $logoWrap.classList.add('lv-logo-wrapper');
  $infoWrap.appendChild($logoWrap);
  const $logo = document.createElement('img');
  $logo.setAttribute('src', playerObj.statistics[0].team.logo);
  $logo.setAttribute('alt', 'Team Logo');
  $logo.classList.add('lv-logo');
  $logoWrap.appendChild($logo);

  const $nameWrap = document.createElement('div');
  $nameWrap.classList.add('lv-name-wrapper');
  $infoWrap.appendChild($nameWrap);
  const $playerName = document.createElement('h3');
  $playerName.classList.add('lv-player-name');
  $playerName.textContent = playerObj.player.name;
  $nameWrap.appendChild($playerName);

  const $statsWrap = document.createElement('div');
  $statsWrap.classList.add('lv-player-info-wrapper-stats');
  $playerBox.appendChild($statsWrap);

  const $smallStats = document.createElement('div');
  $smallStats.classList.add('lv-stats-wrapper');
  $statsWrap.appendChild($smallStats);

  const $goals = document.createElement('h4');
  $goals.textContent = 'Goals: ';
  const $span1 = document.createElement('span');
  $span1.classList.add('bolded');
  $span1.textContent = playerObj.statistics[0].goals.total;
  $goals.appendChild($span1);
  $smallStats.appendChild($goals);

  const $assists = document.createElement('h4');
  $assists.textContent = 'Assists: ';
  const $span2 = document.createElement('span');
  $span2.textContent = playerObj.statistics[0].goals.assists;
  $span2.classList.add('bolded');
  $assists.appendChild($span2);
  $smallStats.appendChild($assists);

  const $extraInfoWrap = document.createElement('div');
  $extraInfoWrap.classList.add('lv-stats-wrapper', 'lv-contribution-wrapper');
  $statsWrap.appendChild($extraInfoWrap);
  const $extraInfo = document.createElement('h4');
  const $span3 = document.createElement('span');
  $span3.classList.add('bolded');
  if (playerType) {
    $extraInfo.textContent = 'Goals per 90: ';
    $span3.textContent = Math.round((playerObj.statistics[0].goals.total * 90 / playerObj.statistics[0].games.minutes) * 100) / 100;
  } else {
    $extraInfo.textContent = 'Key Passes: ';
    $span3.textContent = playerObj.statistics[0].passes.key;
  }
  $extraInfoWrap.appendChild($extraInfo);
  $extraInfo.appendChild($span3);

  return $playerBox;
}

function deleteLeadersView() { // called in NavBar event listener
  const playerBoxes = document.querySelectorAll('.lv-player-box');
  for (let i = 0; i < playerBoxes.length; i++) {
    playerBoxes[i].remove();
  }
}

$navBarLeaders.addEventListener('click', event => {
  const xhr1 = new XMLHttpRequest();
  const request = `https://v3.football.api-sports.io/players/topscorers?league=${idArray[data.view]}&season=${season}`;
  const targetUrl = encodeURIComponent(request);
  xhr1.addEventListener('load', event => {
    const xhr2 = new XMLHttpRequest();
    const request2 = `https://v3.football.api-sports.io/players/topassists?league=${idArray[data.view]}&season=${season}`;
    const targetUrl2 = encodeURIComponent(request2);
    xhr2.addEventListener('load', event => {
      generateLeagueLeaders(xhr1.response, xhr2.response);
      addHidden(data.currPage);
      alterNavBar('League Leaders');
      removeHidden($leaderView);
    });
    xhr2.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl2);
    xhr2.responseType = 'json';
    xhr2.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
    xhr2.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
    xhr2.send();
  });
  xhr1.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr1.responseType = 'json';
  xhr1.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
  xhr1.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
  xhr1.send();
});

$selectDropdown.addEventListener('change', event => {
  if (Number(event.target.value) !== data.view) {
    const newView = Number(event.target.value);
    const previousView = data.view;
    data.view = newView;
    let leagueData;
    const leagueIndex = data.view;
    if (data.leaguesArray[leagueIndex] === null || (Date.now() - data.timeAtUpdate[leagueIndex] > twentyFourHours)) {
      const standingsXhr = new XMLHttpRequest();
      standingsXhr.addEventListener('load', event => {
        data.leaguesArray[leagueIndex] = standingsXhr.response;
        leagueData = standingsXhr.response;
        data.timeAtUpdate[leagueIndex] = Date.now();
        if (!headArray[leagueIndex].dataset.generated) {
          generateBody(leagueData, leagueIndex);
        }
        $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
        headArray[previousView].classList.add('hidden');
        headArray[leagueIndex].dataset.generated = 'true';
        headArray[leagueIndex].classList.remove('hidden');
        $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
      });
      const standingsString = `https://v3.football.api-sports.io/standings?league=${idArray[leagueIndex]}&season=${season}`;
      const targetUrl = encodeURIComponent(standingsString);
      standingsXhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
      standingsXhr.responseType = 'json';
      standingsXhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
      standingsXhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
      standingsXhr.send();
    } else {
      leagueData = data.leaguesArray[leagueIndex];
      if (headArray[leagueIndex].dataset.generated === 'false') {
        generateBody(leagueData, leagueIndex);
      }
      headArray[previousView].classList.add('hidden');
      headArray[leagueIndex].dataset.generated = 'true';
      headArray[leagueIndex].classList.remove('hidden');
      $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
    }

  }
});
