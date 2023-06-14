const season = 2022;
const twentyFourHours = 86400000;
// League View
const $leagueView = document.querySelector('#league-view');
const $mainTable = document.querySelector('#main-table');
const $navBarLogo = document.querySelector('#nav-logo');
const $navBarTitle = document.querySelector('#nav-bar-title');
const $navBarCaret = document.querySelector('#nav-bar-caret');
const $navBarLeaders = document.querySelector('#nav-bar-leaders');
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
// console.log('Wins: ', $tvWins.textContent);

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

// function callXHR(requestString) {
//   const xhr = new XMLHttpRequest();
//   let responseData;
//   xhr.addEventListener('load', event => {
//     responseData = xhr.response;
//   });
//   const targetUrl = encodeURIComponent(requestString);
//   xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
//   xhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
//   xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');
//   xhr.send();
// }
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
  }
  generateBody(leagueData, leagueIndex);
  $navBarLogo.setAttribute('src', leagueData.response[0].league.logo);
});

function generateBody(leagueData, leagueIndex) {
  leagueIndex = 0;
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
  // response = data.singleTeam.response;
  const xhr = new XMLHttpRequest();
  const request = `https://v3.football.api-sports.io/coachs?team=${response.team.id}`;
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

  $tvDraws.textContent = response.fixtures.loses.total;
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
  addHidden($leagueView);
  removeHidden($teamView);
}

$navBarLogo.addEventListener('click', event => {
  restoreNavBar();
  addHidden(data.currPage);
  removeHidden($leagueView);
});

function alterNavBar(replacement) {
  $navBarCaret.classList.add('hidden');
  $navBarLeaders.classList.add('hidden');
  $navBarTitle.textContent = replacement;
}

function restoreNavBar() {
  $navBarTitle.textContent = titleArray[data.view];
  $navBarCaret.classList.remove('hidden');
  $navBarLeaders.classList.remove('hidden');
}

function addHidden(element) {
  element.classList.add('hidden');
}

function removeHidden(element) {
  data.currPage = element;
  element.classList.remove('hidden');
}
