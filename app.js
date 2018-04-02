const competitions = [
	{"name":"BL1", "id":"01VM7AT5SK000001VS54898EVSV90M3P-G"},
	{"name":"BL2", "id":"01VV7REICS00000DVS54898DVTPALDN0-G"},
  {"name":"BL3", "id":"01VM7AUE1K000000VS54898EVSV90M3P-G"},
	{"name":"RLB", "id":"0200TN5NS0000007VS54898DVUL01S6C-G"},
	{"name":"LLSO", "id":"020223LG98000000VS54898DVUL01S6C-G"}
];

var matchday = 0;
var selMatchday;
var competitionId = competitions[0].id;

const url = "http://bfv.de/rest/competitioncontroller";

const matchdayContainer = document.getElementById('matchdayContainer');
const resultsTableBody = document.getElementById( 'resultsTableBody');
const minusButton = document.getElementById('minusButton');
const plusButton = document. getElementById('plusButton');
const navButtons = document.getElementsByClassName('navButtons')

for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function(){
    	competitionId = competitions[this.value].id;
    	matchday = 0;
    	getMatchData(competitionId, matchday);

    });
}

minusButton.addEventListener('click', function(){
  selMatchday--;
  getMatchData(competitionId, selMatchday);
  
});

plusButton.addEventListener('click', function(){
  console.log(matchday);
  selMatchday++;
  getMatchData(competitionId, selMatchday);
  

});


//-------------------------------------------------------------
function getMatchData(competitionId , matchday){
    var route = url + "/competition/id/" + competitionId + "/matchday/" + matchday;
    fetch(route)
    .then(function(response) {
    if (response.ok)
    	return response.json();
    else
      throw new Error('Fehler beim laden');
   })	
    .then(function(json) {
    var actualMatchDay = json.data.actualMatchDay;
    var staffelname = json.data.staffelname;
    if(matchday == 0) selMatchday = actualMatchDay;
    console.log(staffelname + "ST: " + selMatchday);
    matchdayContainer.innerHTML = staffelname + " , " + selMatchday + ". ST";
    resultsTableBody.innerHTML = json.data.matches.map(createOutput).join('\n');

    //console.log(json);
  
})
.catch(function(err) {
   // Hier Fehlerbehandlung
});
};
//----------------------------------------------------------------

function createOutput(match){
  return `<tr>
    <td>${match.kickoffDate.substring(0,5)}<br>
      ${match.kickoffTime}</td>
      <td>${match.homeTeamName.substring(0,24)}<br>
      ${match.guestTeamName.substring(0,24)}</td>
      <td>${match.result}</td>
    </tr>`;
}



//console.log(md);