const season = 2022;
const twentyFourHours = 86400000;
const $navBarLogo = document.querySelector('#nav-logo');
const $englandHead = document.querySelector('#england');
const $italyHead = document.querySelector('#italy');
const $germanyHead = document.querySelector('#germany');
const $spainHead = document.querySelector('#spain');
const $franceHead = document.querySelector('#france');
const headArray = [$englandHead, $italyHead, $germanyHead, $spainHead, $franceHead];
const idArray = [39, 135, 78, 140, 61];

window.addEventListener('load', event => {
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
