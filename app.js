const competitions = [
	{"name":"BL1", "id":"01VM7AT5SK000001VS54898EVSV90M3P-G"},
	{"name":"BL2", "id":"01VV7REICS00000DVS54898DVTPALDN0-G"},
    {"name":"BL3", "id":"01VM7AUE1K000000VS54898EVSV90M3P-G"},
	{"name":"RLB", "id":"0200TN5NS0000007VS54898DVUL01S6C-G"},
	{"name":"LLSO", "id":"020223LG98000000VS54898DVUL01S6C-G"}
];
const url = "http://bfv.de/rest/competitioncontroller";

const header = document.getElementById('header');
const result = document.getElementById('result');
const nav = document.getElementById('nav');
const navButtons = document.getElementsByClassName('navButtons')

var actualMatchDay = "0";
var matchday = "0";

for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function(){
    	var competitionId = competitions[this.value].id;
    	console.log(competitionId);
    	getMatchData(competitionId, matchday);

    });
}





//-------------------------------------------------------------
function getMatchData(competitionId, matchday){
    var route = url + "/competition/id/" + competitionId + "/matchday/" + matchday;
    
    console.log("Spieltag: " + matchday);
    fetch(route)
    .then(function(response) {
    if (response.ok)
    	return response.json();
    else
      throw new Error('Fehler beim laden');
   })	
    .then(function(json) {
    actualMatchDay = json.data.actualMatchDay;
    var staffelname = json.data.staffelname;
    matchday = json.data.selSpieltag;
    //matchday = json.data.spieltage['selSpieltag'];
    header.innerHTML = "Spieltag: " + actualMatchDay;

    console.log(actualMatchDay + staffelname + matchday);
    for(var i = 0 ; i<json.data.matches.length; i++){
   	    var guestTeam = json.data.matches[i].guestTeamName;
   	    var homeTeam = json.data.matches[i].homeTeamName;
   	    var kickoffDate = json.data.matches[i].kickoffDate;
   	    var kickoffTime = json.data.matches[i].kickoffTime;
   	    var result = json.data.matches[i].result;
   	
   	    console.log(kickoffDate + ", "+kickoffTime + " --" +homeTeam+ ":" +guestTeam + "->" + result);
	}
	console.log(json);
})
.catch(function(err) {
   // Hier Fehlerbehandlung
});
};
//----------------------------------------------------------------



//console.log(md);