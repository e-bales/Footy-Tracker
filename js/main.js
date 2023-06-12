
const idArray = [39, 135, 78, 140, 61];
const xhr = new XMLHttpRequest();

// const premierLeague2022String =
//   'https://v3.football.api-sports.io/standings?league=39&season=2022';
// const manCityStatsString =
//   'https://v3.football.api-sports.io/teams/statistics?league=39&season=2022&team=50';
// const manCitySquadString =
//   'https://v3.football.api-sports.io/players/squads?team=50';
// const premierLeagueTopScorersString =
//   'https://v3.football.api-sports.io/players/topscorers?league=39&season=2022';
// const manCityCoach = 'https://v3.football.api-sports.io/coachs?team=50';
// const premierLeagueTopPlaymakersString =
//   'https://v3.football.api-sports.io/players/topassists?league=39&season=2022';
// const targetUrl = encodeURIComponent(
//   manCityCoach
// );

xhr.responseType = 'json';
xhr.addEventListener('load', () => {
  // console.log('xhr is: ', xhr);
  // console.log('xhr.response is: ', xhr.response);
  data.coach = xhr.response;
  if (xhr.response.get === 'standings') {
    // console.log('Getting standings.');
    const leagueID = xhr.response.response[0].league.id;
    data.leaguesArray[idArray.indexOf(leagueID)] = xhr.response;
  }
});

// xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);

xhr.setRequestHeader('x-rapidapi-key', 'f879ddeaf6bd32942b418d19c8763311');
xhr.setRequestHeader('x-rapidapi-host', 'v3.football.api-sports.io');

// xhr.send();
