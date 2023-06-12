/* exported data */
window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
});

let data = {
  // premierTable: null,
  // singleTeam: null,
  // squad: null,
  // top5scorers: null,
  // top5assisters: null,
  // bundesligaTable: null,
  // coach: null
  tableArray: [null, null, null, null, null],
  view: null
};

const previousDataJSON = localStorage.getItem('data-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
