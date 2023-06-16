/* exported data */
window.addEventListener('beforeunload', event => {
  data.currPage = null;
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
});

let data = {
  leaguesArray: [null, null, null, null, null],
  view: 0,
  timeAtUpdate: [0, 0, 0, 0, 0],
  currPage: null
};

const previousDataJSON = localStorage.getItem('data-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
  for (let i = 0; i < data.leaguesArray.length; i++) {
    if (data.leaguesArray[i] !== null && typeof data.leaguesArray[i] === 'string') {
      data.leaguesArray[i] = JSON.parse(data.leaguesArray[i]);
    }
  }
}
