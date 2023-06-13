/* exported data */
window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
});

let data = {
  singleTeam: null,
  squad: null,
  top5scorers: null,
  top5assisters: null,
  coach: null,
  leaguesArray: [null, null, null, null, null],
  view: 0,
  timeAtUpdate: [0, 0, 0, 0, 0]
};

const previousDataJSON = localStorage.getItem('data-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
  for (let i = 0; i < data.leaguesArray.length; i++) {
    if (data.leaguesArray[i !== null]) {
      data.leaguesArray[i] = JSON.parse(data.leaguesArray[i]);
    }
  }
}
