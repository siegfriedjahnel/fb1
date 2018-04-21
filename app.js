const ligaCompetitions = [
	{"name":"BL1", "id":"01VM7AT5SK000001VS54898EVSV90M3P-G"},
	{"name":"BL2", "id":"01VV7REICS00000DVS54898DVTPALDN0-G"},
  {"name":"BL3", "id":"01VM7AUE1K000000VS54898EVSV90M3P-G"},
	{"name":"RLB", "id":"0200TN5NS0000007VS54898DVUL01S6C-G"},
	{"name":"LLSO", "id":"020223LG98000000VS54898DVUL01S6C-G"},
  {"name":"KLIS", "id":"0202NGC3OG000003VS54898EVSIMIKOR-G"}
];

const cupCompetitions = [
  {"name":"CL", "id":"cl1718", "season":"2017"},
  {"name":"EL", "id":"el1718", "season":"2017"},
  {"name":"DFB", "id":"dfb2017", "season":"2017"},
  {"name":"EL", "id":"wm2018ru", "season":"2018"}
];
var season = "2017";
var matchday = 0;
var selMatchday;
var competitionId = ligaCompetitions[0].id;
var type = "";//liga or cup
const ligaUrl = "https://bfv.de/rest/competitioncontroller";
const cupUrl = "https://www.openligadb.de/api/getmatchdata";

const matchdayContainer = document.getElementById('matchdayContainer');
const resultsTableBody = document.getElementById( 'resultsTableBody');
const tableTableBody = document.getElementById( 'tableTableBody');
const minusButton = document.getElementById('minusButton');
const plusButton = document. getElementById('plusButton');
const ligaButtons = document.getElementsByClassName('ligaButtons');
const cupButtons = document.getElementsByClassName('cupButtons');

for (var i = 0; i < ligaButtons.length; i++) {
    ligaButtons[i].addEventListener('click', function(){
    	competitionId = ligaCompetitions[this.value].id;
    	matchday = 0;
        type = "liga";
    	getMatchData(competitionId, matchday, type);

    });
}

for (var i = 0; i < cupButtons.length; i++) {
    cupButtons[i].addEventListener('click', function(){
      competitionId = cupCompetitions[this.value].id;
      season = cupCompetitions[this.value].season;
      matchday = 0;
      type = "cup";
      getMatchData(competitionId, matchday, type);

    });
}
minusButton.addEventListener('click', function(){
  selMatchday--;
  getMatchData(competitionId, selMatchday, type);
  
});

plusButton.addEventListener('click', function(){
  selMatchday++;
  getMatchData(competitionId, selMatchday, type);
  

});

//----------------------------------------------------------
if ('serviceWorker' in navigator) { 
  window.addEventListener('load', () => 
    navigator.serviceWorker.register('sw.js') 
      .catch(err => 'SW registration failed')); 
 } 

//----------------------------------------------------------

//-------------------------------------------------------------
function getMatchData(competitionId , matchday, type){
    if(type == "liga") var route = ligaUrl + "/competition/id/" + competitionId + "/matchday/" + matchday;

    if(type == "cup"){
      if(matchday == 0){
      	var route = cupUrl + "/" + competitionId; 
        }else{
      	var route = cupUrl + "/" + competitionId + "/" + season + "/" +matchday; 
        }
      }
    
    fetch(route)
    .then(function(response) {
    if (response.ok)
    	return response.json();
    else
      throw new Error('Fehler beim laden');
   })	
    .then(function(json) {
    if(type == "liga"){
    	var actualMatchDay = json.data.actualMatchDay;
    	var staffelname = json.data.staffelname;
    	var matchDayName = json.data.selSpieltag + ". ST";

    	resultsTableBody.innerHTML = json.data.matches.map(drawLigaResults).join('\n');
    	tableTableHead.innerHTML = `<th>&nbsp;</th><th>Verein</th><th>Sp</th><th>Pu</th><th>TV</th>` ;
    	tableTableBody.innerHTML = json.data.tabelle.map(drawLigaTable).join('\n');

    } 
    if(type == "cup"){
    	var actualMatchDay = json[0].Group.GroupOrderID;
    	var groupName = json[0].Group.GroupName;
    	var staffelname = json[0].LeagueName;
    	var matchDayName = json[0].Group.GroupName;

    	resultsTableBody.innerHTML = json.map(drawCupResults).join('\n');
    	tableTableHead.innerHTML = "";
    	tableTableBody.innerHTML = "";
    } 
    
    if(matchday == 0) selMatchday = actualMatchDay;
    matchdayContainer.innerHTML = staffelname + " , " + matchDayName;
    //console.log(json);
  
})
.catch(function(err) {
   // Hier Fehlerbehandlung
});
};
//----------------------------------------------------------------

function drawLigaResults(match){
  return `<tr>
    <td>${match.kickoffDate.substring(0,5)}<br>
      ${match.kickoffTime}</td>
      <td>${match.homeTeamName.substring(0,24)}<br>
          ${match.guestTeamName.substring(0,24)}</td>
      <td>${match.result}</td>
    </tr>`;
}

function drawLigaTable(match){
  return `<tr>
    <td>${match.rang}</td>
    <td>${match.teamname.substring(0,24)}</td>
    <td>${match.anzspiele}</td>
    <td>${match.punkte}</td>
    <td>${match.tordiff}</td>
    </tr>`;
}

function drawCupResults(match){
	if(match.MatchResults.length == 0){
		var res = "";
	}else{
		var res = match.MatchResults[0].PointsTeam1 + ":" + match.MatchResults[0].PointsTeam2;
	}
	var date = new Date(match.MatchDateTime);
	var day = ("0"+date.getDate()).slice(-2);
	var month = ("0"+(date.getMonth()+1)).slice(-2);
	var hour = ("0"+date.getHours()).slice(-2);
	var minute = ("0"+date.getMinutes()).slice(-2);
	var matchDate = day + "." + month;
	var matchTime = hour + ":" + minute;
	
    return `<tr>
      <td>${matchDate}<br>
    	  ${matchTime}</td>
      <td>${match.Team1.TeamName.substring(0,24)}<br>
          ${match.Team2.TeamName.substring(0,24)}</td>
      <td>${res}</td>
    </tr>`;
}
