fetch(url+route)
.then(function(response) {
   if (response.ok)
      return response.json();
   else
      throw new Error('fehler beim laden');
})
.then(function(json) {
    var actualMatchDay = json.data.actualMatchDay;
    var staffelname = json.data.staffelname;
    var selSpieltag = json.data.selSpieltag;
    var spieltagName = json.data.spieltage['selSpieltag'];

    console.log(actualMatchDay + staffelname + spieltagName);
    for(var i = 0 ; i<json.data.matches.length; i++){
   	    var guestTeam = json.data.matches[i].guestTeamName;
   	    var homeTeam = json.data.matches[i].homeTeamName;
   	    var kickoffDate = json.data.matches[i].kickoffDate;
   	    var kickoffTime = json.data.matches[i].kickoffTime;
   	
   	    console.log(kickoffDate + ", "+kickoffTime + " --" +homeTeam+ ":" +guestTeam);
	}
	console.log(json);
})
.catch(function(err) {
   // Hier Fehlerbehandlung
});


