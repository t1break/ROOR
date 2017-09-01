if(habDebug==undefined) if(location.href.indexOf("habDebug=true")>0) var habDebug = true; else var habDebug = false;

	var redZoneImage = "http://i.imgur.com/F5wpIRH.png";
	var hasBallImage = "http://i.imgur.com/jPAofM3.png";
	var newScoreImage = "http://i.imgur.com/eec9KIx.png";
	var recentUpdateImage = "http://i.imgur.com/eRHQVty.png";
	var recentNegativeUpdateImage = "http://i.imgur.com/EVDTGnf.png";
	var nflIconImage = "http://www.dagrafixdesigns.com/SB16/img/nfl_logo.png";
	var nflIconImage2 = "http://www.dagrafixdesigns.com/SB16/img/nfl_spin.gif";
	var mflIconImage = "http://www.dagrafixdesigns.com/SB16/img/mfl_logo.png";
	var mflIconImage2 = "http://www.dagrafixdesigns.com/SB16/img/mfl_spin.gif";		
	var nflIconBase = "http://www.dagrafixdesigns.com/SB16/nfl_icons/";  // png images for nfl icons arizona ==> arizona_cardinals.png
	var nflIconSprite = "http://www.dagrafixdesigns.com/SB16/img/nfl24x24.png";
	var nflLogoSprite = "http://www.dagrafixdesigns.com/SB16/img/nfl104x104.png";
	//var nflLogoSprite = "http://i.imgur.com/giCuL5i.png"

var versionNumber = "V3.03";

var liveScoringEmpty = false;

if(maxLoops==undefined) var maxLoops=150;
if(refreshSeconds==undefined) var refreshSeconds=15;
if(franchise_id==undefined) var franchise_id;

try { 
	var myPlatform = navigator.platform; 
} catch(er) { 
	var myPlatform = "unknown";
}
if(myPlatform=="iPad"||myPlatform=="iPhone") {
	var myAdjWidthOuter = " style='width:100%; max-width:1024px;'"; 
	var myAdjWidthHomeLink = " style='width:100%; max-width:1024px;'"; 
} else { 
	var myAdjWidthOuter = "";
	var myAdjWidthHomeLink = ""; 
}

var jQueryLoaded = false;
try { if (window.jQuery) jQueryLoaded = true; } catch(er) {}

if(matchupsPerRow==undefined) var matchupsPerRow=6;
if(includeWeeklyNavigation==undefined) var includeWeeklyNavigation=true;
if(includeProjections==undefined) var includeProjections=true;
if(includeSOS==undefined) var includeSOS=true;
if(includePlayerUpdates==undefined) var includePlayerUpdates=false;
if(includeStarterTotals==undefined) var includeStarterTotals=true;
if(includeBenchTotals==undefined) var includeBenchTotals=true;
if(includeCustomPlayers==undefined) var includeCustomPlayers=false;
if(useNFLIcons==undefined) var useNFLIcons=false;
if(allPlaySetup==undefined) var allPlaySetup=false;
if(numberImageMinimumDigits==undefined) var numberImageMinimumDigits = 7;
if(hideTiebreakingPlayer==undefined) var hideTiebreakingPlayer = false;
if(removeUserStyleSheet==undefined) var removeUserStyleSheet=false;
if(cbsNFLLineupIncludeFA==undefined) var cbsNFLLineupIncludeFA = true;
if(cbsNFLLineupIncludeNotUsedPositions==undefined) var cbsNFLLineupIncludeNotUsedPositions = false;
if(cbsEndWeek==undefined) var cbsEndWeek=17;

if(scoreboardUseIcon==undefined) var scoreboardUseIcon = true;
if(scoreboardUseLogo==undefined) var scoreboardUseLogo = false;
if(scoreboardUseAbbrev==undefined) var scoreboardUseAbbrev = false;
if(scoreboardIconBase==undefined) var scoreboardIconBase = "";
if(scoreboardIconExt==undefined) var scoreboardIconExt = "";
if(scoreboardRoadImageFlip==undefined) var scoreboardRoadImageFlip = false;
if(scoreboardHomeImageFlip==undefined) var scoreboardHomeImageFlip = false;

if(miniScoreboardUseIcon==undefined) var miniScoreboardUseIcon=false;
if(miniScoreboardUseLogo==undefined) var miniScoreboardUseLogo=false;
if(miniScoreboardUseAbbrev==undefined) var miniScoreboardUseAbbrev=false;
if(miniScoreboardIconBase==undefined) var miniScoreboardIconBase = "";
if(miniScoreboardIconExt==undefined) var miniScoreboardIconExt = "";

		document.write("<div id='boxscoreHframe' style='position: absolute; top: 2px; left: 2px;'></div>");
		var forceJSONUpdateCount = 0;
		function forceJSONUpdate() {  
			try {
				document.getElementById("boxscoreHframe").innerHTML = "<ifr" + "ame src='" + habBaseURL + "/" + year + "/live_scoring_summary?L=" + league_id +  "&App=bs' style='width: 0; height: 0; border: 0px;'></ifr" + "ame>";
				document.getElementById("boxscoreHframe").innerHTML = "";
			} catch(er) {
				// try again in 60 seconds
			}
			forceJSONUpdateTimer();  //restart the timer
		}
		function forceJSONUpdateTimer() {
			if(forceJSONUpdateCount<60) {  // Reload after 60 seconds
				forceJSONUpdateCount++; 
				setTimeout("forceJSONUpdateTimer()",1000);
			} else {
				forceJSONUpdateCount=0; 
				forceJSONUpdate();  //force the update
			}
		}
		forceJSONUpdate(); //initiate the first call to update

		if (unescape(location.href).indexOf("http://football")!=-1||unescape(location.href).indexOf("http://6")!=-1)  { 
			var habBaseURL = baseURLDynamic; 
			// update MFL's xmlBaseURL to match the current server
			var xmlBaseURL = baseURLDynamic + '/fflnetdynamic' + year + '/';
		} else {
			var habBaseURL = baseURLStatic;
		}	
	var horizontal_offset="9px" //horizontal offset of hint box from anchor link
	var vertical_offset="0" //horizontal offset of hint box from anchor link. No need to change.
	var ie=document.all
	var ns6=document.getElementById&&!document.all

	function getposOffset(what, offsettype){
		var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
		var parentEl=what.offsetParent;
		while (parentEl!=null){
			totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
			parentEl=parentEl.offsetParent;
		}
		return totaloffset;
	}

	function iecompattest(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	}

	function clearbrowseredge(obj, whichedge){
		var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
		var forceToUp = true;
		var forceToLeft = true;
		if (whichedge=="rightedge") {
			if(forceToLeft) {
				var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-30 : window.pageXOffset+window.innerWidth-40
				dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
				edgeoffset=dropmenuobj.contentmeasure+obj.offsetWidth+parseInt(horizontal_offset)
			}
		} else {
			if(forceToUp) {
				var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
				dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
				edgeoffset=dropmenuobj.contentmeasure-obj.offsetHeight
			}
		}
		return edgeoffset
	}
	function setuphint(thisPid,thisFid,thisWeek, obj, e, tipwidth) {
		var myURL = habBaseURL+"/"+year+"/live_scoring?L="+league_id+"&W="+thisWeek+"&FRANCHISES="+thisFid;
		var myReturn = "";
		var dataStr="";
		$.ajax({ type: 'GET', url: myURL, async:false, data: { 'USER_ID': userCookieValue } }).done(function (data) {
			var starterTable = $(data).find('.report').filter(function(index){if(index==0){return true;} });
			var benchTable = $(data).find('.report').filter(function(index){if(index==1){return true;} });
			for(var n=0;n<$(starterTable).find("tr").length;n++) { 
				$(starterTable).find('tr:eq('+n+') a[class^="position_"]').each(function() { 
					var href=$(this).attr('href');
					var playerID = href.substring(href.indexOf('P=') + 2, href.length);
					if(playerID==thisPid) { //FOUND THE PLAYER
						var dataTable = $(starterTable).html(); // GET ENTIRE HTML OF STARTER TABLE
						var startRow = $(starterTable).find('tr:eq('+n+')').html(); // GET THE HTML FROM THE ROW FROM WHERE WE FOUND PLAYER IN THE TABLE
						dataStr = dataTable.substring(dataTable.indexOf(startRow),dataTable.length); //LEFT TRIM THE HTML FROM THE PLAYER ROW TO THE END OF THE DOCUMENT
						dataStr = dataStr.substring(0,dataStr.indexOf("<b>Subtotal</b></td></tr>")+20);  //RIGHT TRIM THE HTML AT THE FIRST OCCURENCE OF "<b>Subtotal</b></td></tr>" +20
					}	
				})
			}
			for(var n=0;n<$(benchTable).find("tr").length;n++) { 
				$(benchTable).find('tr:eq('+n+') a[class^="position_"]').each(function() { 
					var href=$(this).attr('href');
					var playerID = href.substring(href.indexOf('P=') + 2, href.length);
					if(playerID==thisPid) { //FOUND THE PLAYER 
						var dataTable = $(benchTable).html(); // GET ENTIRE HTML OF BENCH TABLE
						var startRow = $(benchTable).find('tr:eq('+n+')').html(); // GET THE HTML FROM THE ROW FROM WHERE WE FOUND PLAYER IN THE TABLE
						dataStr = dataTable.substring(dataTable.indexOf(startRow),dataTable.length);  //LEFT TRIM THE HTML FROM THE PLAYER ROW TO THE END OF THE DOCUMENT
						dataStr = dataStr.substring(0,dataStr.indexOf("<b>Subtotal</b></td></tr>")+20);  //RIGHT TRIM THE HTML AT THE FIRST OCCURENCE OF "<b>Subtotal</b></td></tr>" +20
					}	
				})
			}
			dataStr = dataStr.replace(/oddtablerow/g,"rowYTP");
			dataStr = dataStr.replace(/eventablerow/g,"rowYTP");
			dataStr = dataStr.replace('class="','class="cbsPlayerName ');
			dataStr = dataStr.replace(/<a /g,"<c ");
			dataStr = dataStr.replace(/<\/a>/g,"</c>");
			dataStr = '<div onclick="hidetip()"><table class="cbsPlayerStatsPopup" style="width:428px"><tbody><caption><span>Points Breakdown</span></caption><tr>'+dataStr+'</tr></tbody></table></div>';  // WRAP THE HTML IN A TABLE AND DIV
			showhint(dataStr,obj,e,tipwidth);
		});
	}
	
	function showhint(menucontents, obj, e, tipwidth) {
		if ((ie||ns6) && document.getElementById("hintbox")) {
			dropmenuobj=document.getElementById("hintbox")
			dropmenuobj.innerHTML=menucontents
			if (tipwidth!="") {
				dropmenuobj.widthobj=dropmenuobj.style
				dropmenuobj.widthobj.width=tipwidth
			} else {
				dropmenuobj.widthobj=dropmenuobj.style
				dropmenuobj.widthobj.width='430px'
			}
			dropmenuobj.x=getposOffset(obj, "left")
			dropmenuobj.y=getposOffset(obj, "top")
			dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+obj.offsetWidth+"px"
			dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+"px"
		
			dropmenuobj.style.visibility="visible"
			obj.onmouseout=hidetip
		}
	}

	function hidetip(e) {
		dropmenuobj.style.visibility="hidden"
		dropmenuobj.style.left="-500px"
	}

	function createhintbox() {
		var divblock=document.createElement("div")
		divblock.setAttribute("id", "hintbox")
		document.body.appendChild(divblock)
	}

	if (window.addEventListener)
		window.addEventListener("load", createhintbox, false)
	else if (window.attachEvent)
			window.attachEvent("onload", createhintbox)
		else if (document.getElementById)
				window.onload=createhintbox
				
	function getThisHintTable(thisPid,thisFid,thisWeek) {
		var myURL = habBaseURL+"/"+year+"/live_scoring?L="+league_id+"&W="+thisWeek+"&FRANCHISES="+thisFid;
		var myReturn = "";
		var dataStr="";
		$.ajax({ type: 'GET', url: myURL, async:false, data: { 'USER_ID': userCookieValue } }).done(function (data) {
			var starterTable = $(data).find('.report').filter(function(index){if(index==0){return true;} });
			var benchTable = $(data).find('.report').filter(function(index){if(index==1){return true;} });
			for(var n=0;n<$(starterTable).find("tr").length;n++) { 
				$(starterTable).find('tr:eq('+n+') a[class^="position_"]').each(function() { 
					var href=$(this).attr('href');
					var playerID = href.substring(href.indexOf('P=') + 2, href.length);
					if(playerID==thisPid) { //FOUND THE PLAYER
						var dataTable = $(starterTable).html(); // GET ENTIRE HTML OF STARTER TABLE
						var startRow = $(starterTable).find('tr:eq('+n+')').html(); // GET THE HTML FROM THE ROW FROM WHERE WE FOUND PLAYER IN THE TABLE
						dataStr = dataTable.substring(dataTable.indexOf(startRow),dataTable.length); //LEFT TRIM THE HTML FROM THE PLAYER ROW TO THE END OF THE DOCUMENT
						dataStr = dataStr.substring(0,dataStr.indexOf("<b>Subtotal</b></td></tr>")+20);  //RIGHT TRIM THE HTML AT THE FIRST OCCURENCE OF "<b>Subtotal</b></td></tr>" +20
					}	
				})
			}
			for(var n=0;n<$(benchTable).find("tr").length;n++) { 
				$(benchTable).find('tr:eq('+n+') a[class^="position_"]').each(function() { 
					var href=$(this).attr('href');
					var playerID = href.substring(href.indexOf('P=') + 2, href.length);
					if(playerID==thisPid) { //FOUND THE PLAYER 
						var dataTable = $(benchTable).html(); // GET ENTIRE HTML OF BENCH TABLE
						var startRow = $(benchTable).find('tr:eq('+n+')').html(); // GET THE HTML FROM THE ROW FROM WHERE WE FOUND PLAYER IN THE TABLE
						dataStr = dataTable.substring(dataTable.indexOf(startRow),dataTable.length);  //LEFT TRIM THE HTML FROM THE PLAYER ROW TO THE END OF THE DOCUMENT
						dataStr = dataStr.substring(0,dataStr.indexOf("<b>Subtotal</b></td></tr>")+20);  //RIGHT TRIM THE HTML AT THE FIRST OCCURENCE OF "<b>Subtotal</b></td></tr>" +20
					}	
				})
			}
		});
		dataStr = dataStr.replace(/oddtablerow/g,"rowYTP");
		dataStr = dataStr.replace(/eventablerow/g,"rowYTP");
		dataStr = dataStr.replace('class="','class="cbsPlayerName ');
		dataStr = dataStr.replace(/<a /g,"<c ");
		dataStr = dataStr.replace(/<\/a>/g,"</c>");
		dataStr = '<table class="cbsPlayerStatsPopup" style="width:428px"><tbody><caption><span>Points Breakdown</span></caption><tr>'+dataStr+'</tr></tbody></table>';  // WRAP THE HTML IN A TABLE 
		return dataStr;
	}

	//====================================================================================
	// FUNCTIONS THAT PARSE JSON DOCUMENTS
	//====================================================================================
		function getCBSLiveScoringData(thisArray) {
			//INITIAL CALL TO LIVE SCORING GRABS INFORMATION FOR WEEKLY MATCHUPS
			//THIS IS ONLY CALLED ON INITIAL SETUP OR FLIPPING FROM ONE WEEK TO ANOTHER
			//RETURNS A SINGLE ARRAY OF WEEKLY MATCHUPS
			var returnArray = new Array();
			//check if matchups fail
			if(thisArray.liveScoring.matchup==undefined) tempAllPlayCheck=true; else tempAllPlayCheck=false; 
			if(allPlaySetup||tempAllPlayCheck) { // pick one team and set all the other teams to play against it
				var franchises = new Array();
				//POPULATE MY franchises ARRAY; FIRST CHECK MULTIPLE MATCHUPS/SINGLE MATCHUP THEN MULTIPLE BYE FRANCHISES/SINGLE BYE FRANCHISE
				try {if(thisArray.liveScoring.matchup.length!=undefined) { //multiple matchups passed
						for(var i=0; i<thisArray.liveScoring.matchup.length; i++) {
							franchises[franchises.length] = thisArray.liveScoring.matchup[i].franchise[0];
							franchises[franchises.length] = thisArray.liveScoring.matchup[i].franchise[1];
						}
					} else if(thisArray.liveScoring.matchup!=undefined) { //single matchup passed
						franchises[franchises.length] = thisArray.liveScoring.matchup.franchise[0];
						franchises[franchises.length] = thisArray.liveScoring.matchup.franchise[1];
					}
				} catch(er) {}
				try {
					if(thisArray.liveScoring.franchise.length!=undefined) { //multiple teams on bye
						for(var i=0; i<thisArray.liveScoring.franchise.length; i++) {
							franchises[franchises.length] = thisArray.liveScoring.franchise[i];
						}
					} else if(thisArray.liveScoring.franchise!=undefined) { //single team on bye
						franchises[franchises.length] = thisArray.liveScoring.franchise;
					}
				} catch(er) {}
				for(var i=0; i<franchises.length; i++) { // find my initial franchise and set it as the road team
					if(franchises[i].id==currentAllPlayTeam) {
						var roadTeam = new Array(franchises[i].id,franchises[i].score,franchises[i].gameSecondsRemaining,franchises[i].playersYetToPlay,franchises[i].playersCurrentlyPlaying);
						if(roadTeam[2] == "") roadTeam[2] = "0";
						if(parseInt(roadTeam[3],10)==0&&parseInt(roadTeam[4],10)==0) roadTeam[2] = "0";  // Sometimes there are stray seconds
					}
					//var roadPlayerArray = new Array();
					//for(var j=0; j<franchises[i].players.length;j++) {
					//	roadPlayerArray[j] = new Array(franchises[i].players[j].id,franchises[i].players[j].score);
					//}
				}
				var matchupCount=0;
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].id!=currentAllPlayTeam) { // start setting up matches
						var homeTeam = new Array(franchises[i].id,franchises[i].score,franchises[i].gameSecondsRemaining,franchises[i].playersYetToPlay,franchises[i].playersCurrentlyPlaying);
						if(homeTeam[2] == "") homeTeam[2] = "0";
						if(parseInt(homeTeam[3],10)==0&&parseInt(homeTeam[4],10)==0) homeTeam[2] = "0";  // without anyone left to play
						//var homePlayerArray = new Array();
						//for(var j=0; j<franchises[i].players.length;j++) {
						//	homePlayerArray[j] = new Array(franchises[i].players[j].id,franchises[i].players[j].score);
						//}
						returnArray[matchupCount] = new Array();
						returnArray[matchupCount]['road'] = roadTeam;
						returnArray[matchupCount]['home'] = homeTeam;
						//returnArray[matchupCount]['roadPlayers'] = roadPlayerArray;
						//returnArray[matchupCount]['homePlayers'] = homePlayerArray;
						returnArray[matchupCount]['gameSecondsRemaining'] = parseInt(roadTeam[2],10) + parseInt(homeTeam[2],10);
						
						matchupCount++;
					}
				}
				//bubble sort to sort from highest scoring home team to lowest scoring home team
				for(var i=0;i<returnArray.length;i++) {
					for(var j=0;j<(returnArray.length - i - 1);j++) {
						if(validateAsNumber(returnArray[j]['home'][1])<validateAsNumber(returnArray[j+1]['home'][1])) {
							var tempArray = returnArray[j];
							returnArray[j] = returnArray[j+1];
							returnArray[j+1] = tempArray;
						}
					}
				}
			} else { // do regular head to head
				//POPULATE MY franchises ARRAY; FIRST CHECK MULTIPLE MATCHUPS/SINGLE MATCHUP THEN MULTIPLE BYE FRANCHISES/SINGLE BYE FRANCHISE
				var matchups = new Array();
				if(thisArray.liveScoring.matchup.length!=undefined) { //multiple matchups passed
					var matchups = thisArray.liveScoring.matchup;
				} else if(thisArray.liveScoring.matchup!=undefined) { //single matchup passed
					matchups[0] = thisArray.liveScoring.matchup;
				}

				for(var i=0; i<matchups.length; i++) {
					var roadTeam = new Array(matchups[i].franchise[0].id,matchups[i].franchise[0].score,matchups[i].franchise[0].gameSecondsRemaining,matchups[i].franchise[0].playersYetToPlay,matchups[i].franchise[0].playersCurrentlyPlaying);
					var homeTeam = new Array(matchups[i].franchise[1].id,matchups[i].franchise[1].score,matchups[i].franchise[1].gameSecondsRemaining,matchups[i].franchise[1].playersYetToPlay,matchups[i].franchise[1].playersCurrentlyPlaying);
					if(roadTeam[0]==myUpdateTeam) myOppUpdateTeam = homeTeam[0];  // used in player update filter
					if(homeTeam[0]==myUpdateTeam) myOppUpdateTeam = roadTeam[0];  // used in player update filter
					if(roadTeam[2] == "") roadTeam[2] = "0";
					if(homeTeam[2] == "") homeTeam[2] = "0";
					if(parseInt(roadTeam[3],10)==0&&parseInt(roadTeam[4],10)==0) roadTeam[2] = "0";  // Sometimes there are stray seconds
					if(parseInt(homeTeam[3],10)==0&&parseInt(homeTeam[4],10)==0) homeTeam[2] = "0";  // without anyone left to play
					//var roadPlayerArray = new Array();
					//for(var j=0; j<matchups[i].franchise[0].players.length;j++) {
					//	roadPlayerArray[j] = new Array(matchups[i].franchise[0].players[j].id,matchups[i].franchise[0].players[j].score);
					//}
					//var homePlayerArray = new Array();
					//for(var j=0; j<matchups[i].franchise[1].players.length;j++) {
					//	homePlayerArray[j] = new Array(matchups[i].franchise[1].players[j].id,matchups[i].franchise[1].players[j].score);
					//}
					returnArray[i] = new Array();
					returnArray[i]['road'] = roadTeam;
					returnArray[i]['home'] = homeTeam;
					//returnArray[i]['roadPlayers'] = roadPlayerArray;
					//returnArray[i]['homePlayers'] = homePlayerArray;
					returnArray[i]['gameSecondsRemaining'] = parseInt(roadTeam[2],10) + parseInt(homeTeam[2],10);
				}
			}
			if(returnArray.length==0) liveScoringEmpty = true;
			return returnArray;
		}
		function getCBSLiveScoringResultsData(thisArray,which) { //SYNCHRONOUSLY CALLED
			//THIS LIVE SCORING CALL (which==1) IS UPDATED EVERY MINUTE; THE WEEKLY RESULTS CALL (which==2) IS UPDATED ONLY ONCE
			//RETURNS A MULTI-DIMENSIONAL ARRAY WITH WEEKLY MATCHUPS AND PLAYER SCORING
			//GET TEAM INFO FROM LIVE SCORING (which==1) INCLUDING TEAM SCORE, SECONDS REMAINING, YTP, CURRENTLY PLAYING OR WEEKLY RESULTS (which==2) INCLUDING TEAM SCORE BUT SECONDSREMAINING, YTP AND CURRENTLY PLAYING ARE ALL ZERO
			var teamInfo = new Array();
			var playerInfo = new Array();
			var gameInfo = new Array();
			var allPlayGameInfo = new Array();
			var paceInfo = new Array();
			var franchiseGameID = new Array()
			var franchiseCount=0;
			for (var key in franchiseDatabase) {
				if(franchiseCount>=1&&franchiseCount<=leagueAttributes['Franchises']) {
					franchiseGameID[franchiseDatabase[key].id]=0;
				}
				franchiseCount++;
			}
			//check if matchups fail
			if(which==1) if(thisArray.liveScoring.matchup==undefined) tempAllPlayCheck=true; else tempAllPlayCheck=false; else if(thisArray.weeklyResults.matchup==undefined) tempAllPlayCheck=true; else tempAllPlayCheck=false;
			if(allPlaySetup||tempAllPlayCheck) { // pick one team and set all the other teams to play against it
				// GET TEAM INFO FROM LIVE SCORING (which==1) INCLUDING TEAM SCORE, SECONDS REMAINING, YTP, CURRENTLY PLAYING OR WEEKLY RESULTS (which==2)
				// WITH JSON DOCUMENTS WEEKLY SCORING FOR MATCHUPS IS AN ARRAY FOR MULTIPLE GAMES AND ON OBJECT FOR SINGLE GAME
				var franchises = new Array();
				var tempArray = new Array();
				if(which==1) tempArray = thisArray.liveScoring; else tempArray = thisArray.weeklyResults;
				//POPULATE MY franchises ARRAY; FIRST CHECK MULTIPLE MATCHUPS/SINGLE MATCHUP THEN MULTIPLE BYE FRANCHISES/SINGLE BYE FRANCHISE
				try { if(tempArray.matchup.length!=undefined) { //multiple matchups passed
						for(var i=0; i<tempArray.matchup.length; i++) {
							franchises[franchises.length] = tempArray.matchup[i].franchise[0];
							franchises[franchises.length] = tempArray.matchup[i].franchise[1];
						}
					} else if(tempArray.matchup!=undefined) { //single matchup passed
						franchises[franchises.length] = tempArray.matchup.franchise[0];
						franchises[franchises.length] = tempArray.matchup.franchise[1];
					}
				} catch(er) {}
				try {
					if(tempArray.franchise.length!=undefined) { //multiple teams on bye
						for(var i=0; i<tempArray.franchise.length; i++) {
							franchises[franchises.length] = tempArray.franchise[i];
						}
					} else if(tempArray.franchise!=undefined) { //single team on bye
						franchises[franchises.length] = tempArray.franchise;
					}
				} catch(er) {}

				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].id==currentAllPlayTeam) {
						if(which==1)
							var roadTeam = new Array(franchises[i].score,franchises[i].gameSecondsRemaining,franchises[i].playersYetToPlay,franchises[i].playersCurrentlyPlaying);
						else 
							var roadTeam = new Array(franchises[i].score,"0","0","0");
						if(roadTeam[1] == "") roadTeam[1] = "0";
						if(parseInt(roadTeam[2],10)==0&&parseInt(roadTeam[3],10)==0) roadTeam[1] = "0";  // Sometimes there are stray seconds
						teamInfo[franchises[i].id] = new Array();
						teamInfo[franchises[i].id] = roadTeam;
						if (which==1) {
							allPlayGameInfo[0] = parseInt(validateAsNumber(franchises[i].gameSecondsRemaining));
							paceInfo[franchises[i].id] = 0;
							try {
								for(var j=0; j<franchises[i].players.player.length; j++) {
									playerInfo[franchises[i].players.player[j].id] = validateAsNumber(franchises[i].players.player[j].score);
									if(franchises[i].players.player[j].status=="starter") paceInfo[franchises[i].id] += validateAsNumber(franchises[i].players.player[j].score) + validateAsNumber(franchises[i].players.player[j].gameSecondsRemaining) / 3600 * validateAsNumber(fsProjections[franchises[i].players.player[j].id]);
								}
								if(parseInt(validateAsNumber(franchises[i].gameSecondsRemaining))==0) paceInfo[franchises[i].id] = "";
							} catch(er) { cbsNoData=true; }
						} else {
							allPlayGameInfo[0] = 0;
							for(var j=0; j<franchises[i].player.length; j++) playerInfo[franchises[i].player[j].id] = validateAsNumber(franchises[i].player[j].score);
						}
						allPlayGameInfo[3] = franchises[i].id;
						allPlayGameInfo[5] = franchises[i].score;
					}
				}
				for(var i=0; i<franchises.length; i++) {
					if(franchises[i].id!=currentAllPlayTeam) {
						var currentGame = gameInfo.length;
						gameInfo[currentGame] = new Array();
						if(which==1)
							var homeTeam = new Array(franchises[i].score,franchises[i].gameSecondsRemaining,franchises[i].playersYetToPlay,franchises[i].playersCurrentlyPlaying);
						else
							var homeTeam = new Array(franchises[i].score,"0","0","0");
						if(homeTeam[1] == "") homeTeam[1] = "0";
						if(parseInt(homeTeam[2],10)==0&&parseInt(homeTeam[3],10)==0) homeTeam[1] = "0";  // without anyone left to play
						teamInfo[franchises[i].id] = new Array();
						teamInfo[franchises[i].id] = homeTeam;
						
						gameInfo[currentGame][0] = allPlayGameInfo[0] + parseInt(validateAsNumber(franchises[i].gameSecondsRemaining));
						franchiseGameID[allPlayGameInfo[3]]++; // increase the all play road team each time
						franchiseGameID[franchises[i].id]++;
						gameInfo[currentGame][1] = franchiseGameID[allPlayGameInfo[3]];
						gameInfo[currentGame][2] = franchiseGameID[franchises[i].id];
						gameInfo[currentGame][3] = allPlayGameInfo[3];
						gameInfo[currentGame][4] = franchises[i].id;
						gameInfo[currentGame][5] = allPlayGameInfo[5];
						gameInfo[currentGame][6] = franchises[i].score;
						gameInfo[currentGame][7] = "";
						gameInfo[currentGame][8] = "";
						
						// GET INDIVIDUAL PLAYER SCORES FROM LIVE SCORING IF PLAYERS EXISTS
						if(which==1) {
							paceInfo[franchises[i].id] = 0;
							try {
								for(var j=0; j<franchises[i].players.player.length; j++) {
									playerInfo[franchises[i].players.player[j].id] = validateAsNumber(franchises[i].players.player[j].score);
									if(franchises[i].players.player[j].status=="starter") paceInfo[franchises[i].id] += validateAsNumber(franchises[i].players.player[j].score) + validateAsNumber(franchises[i].players.player[j].gameSecondsRemaining) / 3600 * validateAsNumber(fsProjections[franchises[i].players.player[j].id]);
								}
								if(parseInt(validateAsNumber(franchises[i].gameSecondsRemaining))==0) paceInfo[franchises[i].id] = "";
							} catch(er) { cbsNoData=true; }
						} else {
							for(var j=0; j<franchises[i].player.length; j++) playerInfo[franchises[i].player[j].id] = validateAsNumber(franchises[i].player[j].score);
						}
					}
				}
				//bubble sort to sort from highest scoring home team to lowest scoring home team for game info to match previous bubble sort routine for all play matchups
				for(var i=0;i<gameInfo.length;i++) {
					for(var j=0;j<(gameInfo.length - i - 1);j++) {
						if(validateAsNumber(gameInfo[j][6])<validateAsNumber(gameInfo[j+1][6])) {
							var tempArray = gameInfo[j];
							gameInfo[j] = gameInfo[j+1];
							gameInfo[j+1] = tempArray;
						}
					}
				}
			} else { // do regular head to head
				//WITH JSON THERE IS A DIFFERENCE IN MATCHUP FOR MULTIPLE MATCHUPS VERSUS SINGLE MATCHUP; IN WEEKLYRESULTS A SINGLE MATCHUP IS AN OBJECT AND MULTIPLE MATCHUPS IS AN ARRAY
				var matchups = new Array();
				if(which==1) var tempArray = thisArray.liveScoring; else var tempArray = thisArray.weeklyResults;
				if(tempArray.matchup.length!=undefined) {
					matchups = tempArray.matchup;
				} else matchups[0] = tempArray.matchup;

				for(var i=0; i<matchups.length; i++) {
					gameInfo[i] = new Array();
					if(which==1) {
						var roadTeam = new Array(matchups[i].franchise[0].score,matchups[i].franchise[0].gameSecondsRemaining,matchups[i].franchise[0].playersYetToPlay,matchups[i].franchise[0].playersCurrentlyPlaying);
						var homeTeam = new Array(matchups[i].franchise[1].score,matchups[i].franchise[1].gameSecondsRemaining,matchups[i].franchise[1].playersYetToPlay,matchups[i].franchise[1].playersCurrentlyPlaying);
						gameInfo[i][0] = parseInt(validateAsNumber(matchups[i].franchise[0].gameSecondsRemaining)) + parseInt(validateAsNumber(matchups[i].franchise[1].gameSecondsRemaining));
						franchiseGameID[matchups[i].franchise[0].id]++;
						franchiseGameID[matchups[i].franchise[1].id]++;
						gameInfo[i][1] = franchiseGameID[matchups[i].franchise[0].id];
						gameInfo[i][2] = franchiseGameID[matchups[i].franchise[1].id];
						gameInfo[i][3] = matchups[i].franchise[0].id;
						gameInfo[i][4] = matchups[i].franchise[1].id;
						gameInfo[i][5] = matchups[i].franchise[0].score;
						gameInfo[i][6] = matchups[i].franchise[1].score;
						gameInfo[i][7] = "";
						gameInfo[i][8] = "";
					} else {
						var roadTeam = new Array(matchups[i].franchise[0].score,"0","0","0");
						var homeTeam = new Array(matchups[i].franchise[1].score,"0","0","0");
						gameInfo[i][0] = 0;
						franchiseGameID[matchups[i].franchise[0].id]++;
						franchiseGameID[matchups[i].franchise[1].id]++;
						gameInfo[i][1] = franchiseGameID[matchups[i].franchise[0].id];
						gameInfo[i][2] = franchiseGameID[matchups[i].franchise[1].id];
						gameInfo[i][3] = matchups[i].franchise[0].id;
						gameInfo[i][4] = matchups[i].franchise[1].id;
						gameInfo[i][5] = matchups[i].franchise[0].score;
						gameInfo[i][6] = matchups[i].franchise[1].score;
						gameInfo[i][7] = matchups[i].franchise[0].result;
						gameInfo[i][8] = matchups[i].franchise[1].result;
					}
					if(roadTeam[1] == "") roadTeam[1] = "0";
					if(homeTeam[1] == "") homeTeam[1] = "0";
					if(parseInt(roadTeam[2],10)==0&&parseInt(roadTeam[3],10)==0) roadTeam[1] = "0";  // Sometimes there are stray seconds
					if(parseInt(homeTeam[2],10)==0&&parseInt(homeTeam[3],10)==0) homeTeam[1] = "0";  // without anyone left to play
					teamInfo[matchups[i].franchise[0].id] = new Array();
					teamInfo[matchups[i].franchise[1].id] = new Array();
					teamInfo[matchups[i].franchise[0].id] = roadTeam;
					teamInfo[matchups[i].franchise[1].id] = homeTeam;
					// GET INDIVIDUAL PLAYER SCORES FROM LIVE SCORING OR WEEKLY RESULTS IF PLAYERS EXISTS
					if(which==1) {
						paceInfo[matchups[i].franchise[0].id] = 0;
						try {
							for(var j=0; j<matchups[i].franchise[0].players.player.length; j++) {
								playerInfo[matchups[i].franchise[0].players.player[j].id] = validateAsNumber(matchups[i].franchise[0].players.player[j].score);
								if(matchups[i].franchise[0].players.player[j].status=="starter") paceInfo[matchups[i].franchise[0].id] += validateAsNumber(matchups[i].franchise[0].players.player[j].score) + validateAsNumber(matchups[i].franchise[0].players.player[j].gameSecondsRemaining) / 3600 * validateAsNumber(fsProjections[matchups[i].franchise[0].players.player[j].id]);
							}
							if(parseInt(validateAsNumber(matchups[i].franchise[0].gameSecondsRemaining))==0) paceInfo[matchups[i].franchise[0].id] = "";
						 } catch(er) { cbsNoData=true; }
						paceInfo[matchups[i].franchise[1].id] = 0;
						try { 
							for(var j=0; j<matchups[i].franchise[1].players.player.length; j++) {
								playerInfo[matchups[i].franchise[1].players.player[j].id] = validateAsNumber(matchups[i].franchise[1].players.player[j].score);
								if(matchups[i].franchise[1].players.player[j].status=="starter") paceInfo[matchups[i].franchise[1].id] += validateAsNumber(matchups[i].franchise[1].players.player[j].score) + validateAsNumber(matchups[i].franchise[1].players.player[j].gameSecondsRemaining) / 3600 * validateAsNumber(fsProjections[matchups[i].franchise[1].players.player[j].id]);
							}
							if(parseInt(validateAsNumber(matchups[i].franchise[1].gameSecondsRemaining))==0) paceInfo[matchups[i].franchise[1].id] = "";
						} catch(er) { cbsNoData=true; }
					} else {
						try { for(var j=0; j<matchups[i].franchise[0].player.length; j++) playerInfo[matchups[i].franchise[0].player[j].id] = validateAsNumber(matchups[i].franchise[0].player[j].score); } catch(er) { cbsNoData=true; }
						try { for(var j=0; j<matchups[i].franchise[1].player.length; j++) playerInfo[matchups[i].franchise[1].player[j].id] = validateAsNumber(matchups[i].franchise[1].player[j].score); } catch(er) { cbsNoData=true; }
					}
				}
			}
			var returnArray = new Array(teamInfo, playerInfo, gameInfo, paceInfo);
			return returnArray;
		}
		function getCBSRosterDataFromWeeklyResults(thisArray) { //SYNCHRONOUSLY CALLED
			var returnArray = new Array();
			//check if matchups fail
			if(thisArray.weeklyResults.matchup==undefined) tempAllPlayCheck=true; else tempAllPlayCheck=false;
			if(allPlaySetup||tempAllPlayCheck) { // pick one team and set all the other teams to play against it
				var franchiseArray = new Array();
				try {
					if(thisArray.weeklyResults.matchup.length!=undefined) { //multiple matchups passed
						for(var i=0; i<thisArray.weeklyResults.matchup.length; i++) {
							franchiseArray[franchiseArray.length] = thisArray.weeklyResults.matchup[i].franchise[0];
							franchiseArray[franchiseArray.length] = thisArray.weeklyResults.matchup[i].franchise[1];
						}
					} else if(thisArray.weeklyResults.matchup!=undefined) { //single matchup passed
						franchiseArray[franchiseArray.length] = thisArray.weeklyResults.matchup.franchise[0];
						franchiseArray[franchiseArray.length] = thisArray.weeklyResults.matchup.franchise[1];
					}
				} catch(er) {}
				try {
					if(thisArray.weeklyResults.franchise.length!=undefined) { //multiple teams on bye
						for(var i=0; i<thisArray.weeklyResults.franchise.length; i++) {
							franchiseArray[franchiseArray.length] = thisArray.weeklyResults.franchise[i];
						}
					} else if(thisArray.weeklyResults.franchise!=undefined) { //single team on bye
						franchiseArray[franchiseArray.length] = thisArray.weeklyResults.franchise;
					}
				} catch(er) {}
				
				for(var i=0; i<franchiseArray.length; i++) {
					if(franchiseArray[i].id==currentAllPlayTeam) {
						try {
							var roadTeam = new Array(franchiseArray[i].nonstarters,franchiseArray[i].starters,franchiseArray[i].tiebreaker);
						} catch(er) {
							var roadTeam = new Array(franchiseArray[i].nonstarters,franchiseArray[i].starters);
						}
						returnArray[franchiseArray[i].id] = new Array();
						returnArray[franchiseArray[i].id] = roadTeam;
						if(futureLineup[franchiseArray[i].id]==undefined) {
							futureLineup[franchiseArray[i].id] = new Array();
							futureLineup[franchiseArray[i].id] = roadTeam;
						}
					}
				}
				for(var i=0; i<franchiseArray.length; i++) {
					if(franchiseArray[i].id!=currentAllPlayTeam) {
						try {
							var homeTeam = new Array(franchiseArray[i].nonstarters,franchiseArray[i].starters,franchiseArray[i].tiebreaker);
						} catch(er) {
							var homeTeam = new Array(franchiseArray[i].nonstarters,franchiseArray[i].starters);
						}
						returnArray[franchiseArray[i].id] = new Array();
						returnArray[franchiseArray[i].id] = homeTeam;						
						if(futureLineup[franchiseArray[i].id]==undefined) {
							futureLineup[franchiseArray[i].id] = new Array();
							futureLineup[franchiseArray[i].id] = homeTeam;
						}
					}
				}
			} else { // do regular head to head 
				var matchups = new Array();
				if(thisArray.weeklyResults.matchup.length!=undefined) {
					matchups = thisArray.weeklyResults.matchup;
				} else matchups[0] = thisArray.weeklyResults.matchup;					
					
				for(var i=0; i<matchups.length; i++) {
					var teamData = matchups[i].franchise;
					try {
						var roadTeam = new Array(teamData[0].nonstarters,teamData[0].starters,teamData[0].tiebreaker);
						var homeTeam = new Array(teamData[1].nonstarters,teamData[1].starters,teamData[1].tiebreaker);
						if(hideTiebreakingPlayer||roadTeam[2].length>6||homeTeam[2].length>6) { roadTeam[2]=""; homeTeam[2]=""; }  
					} catch(er) {
						var roadTeam = new Array(teamData[0].nonstarters,teamData[0].starters);
						var homeTeam = new Array(teamData[1].nonstarters,teamData[1].starters);
					}
					returnArray[teamData[0].id] = new Array();
					returnArray[teamData[1].id] = new Array();
					returnArray[teamData[0].id] = roadTeam;
					returnArray[teamData[1].id] = homeTeam;
					if(futureLineup[teamData[0].id]==undefined) {
						futureLineup[teamData[0].id] = new Array();
						futureLineup[teamData[0].id] = roadTeam;
					}
					if(futureLineup[teamData[1].id]==undefined) {
						futureLineup[teamData[1].id] = new Array();
						futureLineup[teamData[1].id] = homeTeam;
					}
				}
			}
			//need to parse the weekly results to update player playing status for the week and also set up future unsubmitted lineups
			//var maxTeams = matchups.length * 2;
			var maxTeams = leagueAttributes['Franchises'];
			var teamCount = 0;
			for(var fid in returnArray) {
				if(teamCount<maxTeams) {
					teamCount++;
					var playerList=returnArray[fid][1];
					//STARTERS
					try {
						while (playerList.indexOf(",")>0) {
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(parseFloat(playerID)>0) {
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Starter",fid,"Roster"); 
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==fid) {
											cbsRosterInfo[playerID][x][2]="Starter";
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Starter",fid,"Roster"); 
									}
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					//BENCH
					var playerList=returnArray[fid][0];
					try {
						while (playerList.indexOf(",")>0)	{
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(parseFloat(playerID)>0) {
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Bench",fid,"Roster"); 
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==fid) {
											cbsRosterInfo[playerID][x][2]="Bench";
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Bench",fid,"Roster"); 
									}
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					//TIEBREAKERS
					var playerID=returnArray[fid][2];
					try {
						if(parseFloat(playerID)>0) {
							if(cbsRosterInfo[playerID]==undefined) {
								cbsRosterInfo[player] = new Array();
								cbsRosterInfo[playerID][0] = new Array(fid,"Roster","Tiebreaker",fid,"Roster"); 
							} else {  //since player may be on more than one roster we need to find which one
								var playerFound = false;
								for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
									if(cbsRosterInfo[playerID][x][0]==fid) {
										cbsRosterInfo[playerID][x][2]="Tiebreaker";
										playerFound = true;
									}
								}
								if(playerFound==false) { // add player
									cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(fid,"Roster","Tiebreaker",fid,"Roster"); 
								}
							}
						}
					} catch(er) {
						// do nothing
					}
				}
			}
			return returnArray;
		}
		
		function doCBSNFLMatchup(roadID,homeID,weekNum) {
			var gameLink = baseURLDynamic+"/"+year+"/pro_matchup?L="+league_id+"&W="+weekNum+"&MATCHUP="+roadID+","+homeID;
			window.open(gameLink,"nflMatchups");
		}

		function getCBSNFLSchedule(thisArray) { //SYNCHRONOUSLY CALLED
			//THIS FUNCTION UPDATES NFL GAME INFO TO BE USED IN THE FANTASY LINEUPS TABLES.  UPDATE INCLUDES NFL OPPONENT, NFL OPPONENT RANK, GAME SECONDS REMAINING, HAS POSSESSION AND IN RED ZONE
			var matchups = thisArray.nflSchedule.matchup;
			var returnArray = new Array();
			for(var i=0; i<matchups.length; i++) {
				//START INITIAL SETUP OF nflTeamUpdate.  THIS ARRAY IS USED TO AVOID ACCESSING OLD DATA WHICH MAKES THE SCOREBOARD ACT AS IF IT IS GOING BACKWARDS IN TIME
				//ONLY SET THIS UP ON THE FIRST ITERATION
				if(nflTeamUpdate[cbsCurrentWeek]==undefined) nflTeamUpdate[cbsCurrentWeek] = new Array(); 
				//SET UP EACH INDIVIDUAL GAME nflTeamUpdate.
				if(nflTeamUpdate[cbsCurrentWeek][i]==undefined) {
					nflTeamUpdate[cbsCurrentWeek][i] = new Array();
					nflTeamUpdate[cbsCurrentWeek][i].kickoff = parseInt(matchups[i].kickoff);
					nflTeamUpdate[cbsCurrentWeek][i].gameSecondsRemaining = parseInt(matchups[i].gameSecondsRemaining);
					nflTeamUpdate[cbsCurrentWeek][i].roadHasPossession = matchups[i].team[0].hasPossession;
					nflTeamUpdate[cbsCurrentWeek][i].homeHasPossession = matchups[i].team[1].hasPossession;
					nflTeamUpdate[cbsCurrentWeek][i].roadInRedZone = matchups[i].team[0].inRedZone;
					nflTeamUpdate[cbsCurrentWeek][i].homeInRedZone = matchups[i].team[1].inRedZone;
					nflTeamUpdate[cbsCurrentWeek][i].roadScore = parseInt(validateAsNumber(matchups[i].team[0].score));
					nflTeamUpdate[cbsCurrentWeek][i].homeScore = parseInt(validateAsNumber(matchups[i].team[1].score));
					nflTeamUpdate[cbsCurrentWeek][i].roadID = matchups[i].team[0].id;
					nflTeamUpdate[cbsCurrentWeek][i].homeID = matchups[i].team[1].id;
					nflTeamUpdate[cbsCurrentWeek][i].roadOldScore = parseInt(matchups[i].team[0].score);
					nflTeamUpdate[cbsCurrentWeek][i].homeOldScore = parseInt(matchups[i].team[1].score);
					nflTeamUpdate[cbsCurrentWeek][i].roadNewScoreGameSecondsRemaining = 3601;
					nflTeamUpdate[cbsCurrentWeek][i].homeNewScoreGameSecondsRemaining = 3601;
					nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore = false;
					nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore = false;
				}
				//END SETUP OF nflTeamUpdate.
				//IF GAME SECONDS REMAINING = 0 AND ROADSCORE = 0 AND HOMESCORE = 0 THEN RESET GAME SECONDS REMAINING TO 3600 (BAD DATA)
				if(parseInt(matchups[i].gameSecondsRemaining)==0&&parseInt(matchups[i].team[0].score)==0&&parseInt(matchups[i].team[1].score)==0) {
					var secondsRemaining = 3600;
					nflTeamUpdate[cbsCurrentWeek][i].gameSecondsRemaining = 3600;
					nflTeamUpdate[cbsCurrentWeek][i].newScoreGameSecondsRemaining = 3600;
				} else {
					var secondsRemaining = parseInt(matchups[i].gameSecondsRemaining);
				}
				var kickoffTime=parseInt(nflTeamUpdate[cbsCurrentWeek][i].kickoff);

				if(currentServerTime>kickoffTime || secondsRemaining<3600) { // game has kicked off including previous weeks games
					var roadPossession = "";
					var homePossession = "";
					var roadTitleAppend = "";
					var homeTitleAppend = "";
					// if actual seconds remaining is less than previous seconds remaining
					if (secondsRemaining < nflTeamUpdate[cbsCurrentWeek][i].gameSecondsRemaining) { //UPDATE ARRAY WITH NEWER INFORMATION
						nflTeamUpdate[cbsCurrentWeek][i].kickoff = parseInt(matchups[i].kickoff);
						nflTeamUpdate[cbsCurrentWeek][i].gameSecondsRemaining = secondsRemaining;
						nflTeamUpdate[cbsCurrentWeek][i].roadHasPossession = matchups[i].team[0].hasPossession;
						nflTeamUpdate[cbsCurrentWeek][i].homeHasPossession = matchups[i].team[1].hasPossession;
						nflTeamUpdate[cbsCurrentWeek][i].roadInRedZone = matchups[i].team[0].inRedZone;
						nflTeamUpdate[cbsCurrentWeek][i].homeInRedZone = matchups[i].team[1].inRedZone;
						nflTeamUpdate[cbsCurrentWeek][i].roadScore = parseInt(validateAsNumber(matchups[i].team[0].score));
						nflTeamUpdate[cbsCurrentWeek][i].homeScore = parseInt(validateAsNumber(matchups[i].team[1].score));
						nflTeamUpdate[cbsCurrentWeek][i].roadID = matchups[i].team[0].id;
						nflTeamUpdate[cbsCurrentWeek][i].homeID = matchups[i].team[1].id;
						nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore = false;
						nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore = false;
					} 
					secondsRemaining = nflTeamUpdate[cbsCurrentWeek][i].gameSecondsRemaining;
					// road new score seconds remaining == seconds remaining OR new road score > old road score
					if( nflTeamUpdate[cbsCurrentWeek][i].roadNewScoreGameSecondsRemaining == secondsRemaining || nflTeamUpdate[cbsCurrentWeek][i].roadScore > nflTeamUpdate[cbsCurrentWeek][i].roadOldScore ) {
							nflTeamUpdate[cbsCurrentWeek][i].roadNewScoreGameSecondsRemaining = secondsRemaining;
							nflTeamUpdate[cbsCurrentWeek][i].roadOldScore = nflTeamUpdate[cbsCurrentWeek][i].roadScore;
							nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore = true;
							nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore = false;
					} else
						// home new score seconds remaining == seconds remaining OR new home score > old home score
						if( nflTeamUpdate[cbsCurrentWeek][i].homeNewScoreGameSecondsRemaining == secondsRemaining || nflTeamUpdate[cbsCurrentWeek][i].homeScore > nflTeamUpdate[cbsCurrentWeek][i].homeOldScore ) {
							nflTeamUpdate[cbsCurrentWeek][i].homeNewScoreGameSecondsRemaining = secondsRemaining;
							nflTeamUpdate[cbsCurrentWeek][i].homeOldScore = nflTeamUpdate[cbsCurrentWeek][i].homeScore;
							nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore = true;
							nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore = false;
					} else {
						nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore = false;
						nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore = false;
					}
					//MAKE SURE RECENT SCORE IS CLEARED IF OPPOSING TEAM HAS THE BALL
					if(nflTeamUpdate[cbsCurrentWeek][i].roadHasPossession==1||nflTeamUpdate[cbsCurrentWeek][i].roadInRedZone==1) nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore=false;
					if(nflTeamUpdate[cbsCurrentWeek][i].homeHasPossession==1||nflTeamUpdate[cbsCurrentWeek][i].homeInRedZone==1) nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore=false;
					if(secondsRemaining==0) { nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore=false; nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore=false; }
					//clock
					var kickoffTime=parseInt(nflTeamUpdate[cbsCurrentWeek][i].kickoff);
				}
				var roadTeamID = nflTeamUpdate[cbsCurrentWeek][i].roadID;
				var homeTeamID = nflTeamUpdate[cbsCurrentWeek][i].homeID;
				var roadScore = nflTeamUpdate[cbsCurrentWeek][i].roadScore;
				var homeScore = nflTeamUpdate[cbsCurrentWeek][i].homeScore;
				//problem at kickoff where secondsRemaining = 0; will correct by checking game score
				var roadPossession = nflTeamUpdate[cbsCurrentWeek][i].roadHasPossession;
				var homePossession = nflTeamUpdate[cbsCurrentWeek][i].homeHasPossession;
				var roadRedzone = nflTeamUpdate[cbsCurrentWeek][i].roadInRedZone;
				var homeRedzone = nflTeamUpdate[cbsCurrentWeek][i].homeInRedzone;
				var roadNewScore = nflTeamUpdate[cbsCurrentWeek][i].roadRecentScore;
				var homeNewScore = nflTeamUpdate[cbsCurrentWeek][i].homeRecentScore;
				//need to marry home to road and vice versa
				var roadPassOffRank = matchups[i].team[1].passOffenseRank;
				var homePassOffRank = matchups[i].team[0].passOffenseRank;
				var roadRushOffRank = matchups[i].team[1].rushOffenseRank;
				var homeRushOffRank = matchups[i].team[0].rushOffenseRank;			
				var roadPassDefRank = matchups[i].team[1].passDefenseRank;
				var homePassDefRank = matchups[i].team[0].passDefenseRank;
				var roadRushDefRank = matchups[i].team[1].rushDefenseRank;
				var homeRushDefRank = matchups[i].team[0].rushDefenseRank;
				var roadAvgOffRank = parseInt((parseInt(roadPassOffRank)+parseInt(roadRushOffRank))/2);
				var homeAvgOffRank = parseInt((parseInt(homePassOffRank)+parseInt(homeRushOffRank))/2);
				var roadAvgDefRank = parseInt((parseInt(roadPassDefRank)+parseInt(roadRushDefRank))/2);
				var homeAvgDefRank = parseInt((parseInt(homePassDefRank)+parseInt(homeRushDefRank))/2);
				var roadImage = "";
				var homeImage = "";
				if(roadRedzone==1) roadImage="<img src='"+redZoneImage+"' alt='"+roadTeamID+" is in the Redzone' title='"+roadTeamID+" is in the Redzone' />";
				if(homeRedzone==1) homeImage="<img src='"+redZoneImage+"' alt='"+homeTeamID+" is in the Redzone' title='"+homeTeamID+" is in the Redzone' />";
				if(roadImage==""&&roadPossession==1) roadImage="<img src='"+hasBallImage+"' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has possession' />";
				if(homeImage==""&&homePossession==1) homeImage="<img src='"+hasBallImage+"' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has possession' />";
				if(roadNewScore) { roadImage="<img src='"+newScoreImage+"' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has recent score' />"; homeImage = ""; }
				if(homeNewScore) { homeImage="<img src='"+newScoreImage+"' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has recent score' />"; roadImage = ""; }
				var scoreClock = "";
				if (parseInt(secondsRemaining)==0) scoreClock = "Final";
				if (parseInt(secondsRemaining)==3600) {
					if(cbsCurrentWeek==liveScoringWeek) scoreClock = formatHabDate(new Date(kickoffTime*1000),"ddd h:mm"); else scoreClock = formatHabDate(new Date(kickoffTime*1000),"MM/d h:mm");
					roadScore = "";
					homeScore = "";
				}
				if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
				if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4Q&nbsp;" + formatHabDate(new Date(parseInt(secondsRemaining)*1000),"mm:ss");
				if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3Q&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-900)*1000),"mm:ss");
				if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2Q&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-1800)*1000),"mm:ss");
				if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1Q&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-2700)*1000),"mm:ss");
				if (useNFLIcons) {
					var roadNFLIcon = getNFLBoxscoreIcon(roadTeamID,20);
					var homeNFLIcon = getNFLBoxscoreIcon(homeTeamID,20);
					var roadStatus = "<td>" + roadScore + "</td><td>@&nbsp;</td><td>" + homeScore + "</td><td><div style='width:"+homeNFLIcon[2]+"px; overflow:hidden;'><img src='"+nflIconSprite+"' style='height:"+homeNFLIcon[2]+"px; position:relative; left:"+homeNFLIcon[1]+"px;' title='"+homeNFLIcon[0]+"' /></div></td></tr></table>";
					var homeStatus = "<td>" + homeScore + "</td><td>vs&nbsp;</td><td>"+ roadScore + "</td><td><div style='width:"+roadNFLIcon[2]+"px; overflow:hidden;'><img src='"+nflIconSprite+"' style='height:"+homeNFLIcon[2]+"px; position:relative; left:"+roadNFLIcon[1]+"px;' title='"+roadNFLIcon[0]+"' /></div></td></tr></table>";
				} else {
					var roadStatus = " " + roadScore + "&nbsp;@&nbsp;" + homeTeamID + "&nbsp;" + homeScore;
					var homeStatus = " " + homeScore + "&nbsp;v&nbsp;" + roadTeamID + "&nbsp;" + roadScore;
				}
				returnArray[roadTeamID] = new Array(roadStatus, secondsRemaining, kickoffTime, scoreClock, roadImage, roadPassOffRank, roadRushOffRank, roadAvgOffRank, roadPassDefRank, roadRushDefRank, roadAvgDefRank, roadScore, homeTeamID, homeScore);
				returnArray[homeTeamID] = new Array(homeStatus, secondsRemaining, kickoffTime, scoreClock, homeImage, homePassOffRank, homeRushOffRank, homeAvgOffRank, homePassDefRank, homeRushDefRank, homeAvgDefRank, homeScore, roadTeamID, roadScore);
			}
			return returnArray;
		}
		function getCBSNFLBoxSchedule(thisArray) { //SYNCHRONOUSLY CALLED
			//THIS FUNCTION UPDATES MY NFL BOXSCORE SCHEDULE
			var matchups = thisArray.nflSchedule.matchup;
			var returnArray = new Array();
			for(var i=0; i<matchups.length; i++) {
				var secondsRemaining = matchups[i].gameSecondsRemaining;
				var kickoffTime = parseInt(validateAsNumber(matchups[i].kickoff));
				var roadTeamID = matchups[i].team[0].id;
				var homeTeamID = matchups[i].team[1].id;
				var roadScore = matchups[i].team[0].score;
				var homeScore = matchups[i].team[1].score;
				//problem at kickoff where secondsRemaining = 0; will correct by checking game score
				if((parseInt(roadScore)==0||roadScore=="")&&(parseInt(homeScore)==0||homeScore=="")&&(parseInt(secondsRemaining)==0||secondsRemaining=="")) secondsRemaining=3600;
				var roadPossession = matchups[i].team[0].hasPossession;
				var homePossession = matchups[i].team[1].hasPossession;
				var roadRedzone = matchups[i].team[0].inRedZone;
				var homeRedzone = matchups[i].team[1].inRedZone;
				var roadInfo = getNFLBoxscoreIcon(roadTeamID,24);
				var homeInfo = getNFLBoxscoreIcon(homeTeamID,24);
				var roadImage = "";
				var homeImage = "";
				if(roadRedzone==1) roadImage="<img src='"+redZoneImage+"' alt='"+roadTeamID+" is in the Redzone' title='"+roadTeamID+" is in the Redzone' />";
				if(homeRedzone==1) homeImage="<img src='"+redZoneImage+"' alt='"+homeTeamID+" is in the Redzone' title='"+homeTeamID+" is in the Redzone' />";
				if(roadImage==""&&roadPossession==1) roadImage="<img src='"+hasBallImage+"' alt='"+roadTeamID+" has possession' title='"+roadTeamID+" has possession' />";
				if(homeImage==""&&homePossession==1) homeImage="<img src='"+hasBallImage+"' alt='"+homeTeamID+" has possession' title='"+homeTeamID+" has possession' />";
				var scoreClock = "";
				if (parseInt(secondsRemaining)==0) scoreClock = "Final";
				if (parseInt(secondsRemaining)==3600) {
					if (cbsCurrentWeek==liveScoringWeek) scoreClock = formatHabDate(new Date(kickoffTime*1000),"ddd  h:mm"); else scoreClock = formatHabDate(new Date(kickoffTime*1000),"ddd  MM/d  h:mm");
				}
				if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
				if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4th&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining))*1000),"m:ss");
				if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3rd&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-900)*1000),"m:ss");
				if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2nd&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-1800)*1000),"m:ss");
				if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1st&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-2700)*1000),"m:ss");
				returnArray[i] = new Array();
				returnArray[i]['road'] = new Array(roadTeamID, roadScore, secondsRemaining, kickoffTime, scoreClock, roadImage, roadInfo[0], roadInfo[1], roadInfo[2]);
				returnArray[i]['home'] = new Array(homeTeamID, homeScore, secondsRemaining, kickoffTime, scoreClock, homeImage, homeInfo[0], homeInfo[1], homeInfo[2]);
			}
			fullyLoaded=true;
			return returnArray;
		}

	//====================================================================================
	//FUNCTIONS THAT CREATE HTML SCRIPT
	//====================================================================================
		//creating the individual scoreboards for the matchups in a given week (each call creates one scoreboard)
		function createWeeklyNavigation() {
			var htmlCode = "";
			htmlCode = htmlCode + "       <table class='cbsWeeklyNavigation'>\n";
			htmlCode = htmlCode + "        <tr>\n";
			htmlCode = htmlCode + "         <td><span style='float:left; width:150px; text-align:center' id='cbsScoreboardMessage'><span id='cbsScoreboardMessageResetTimer' onclick='checkCBSMatchup()'>&nbsp;Click To Restart&nbsp;</span></span>Week:&nbsp;&nbsp;\n";
			for (var i=parseInt(cbsLeagueInfo[3]);i<=cbsEndWeek; i++) { // now using cbsEndWeek as opposed to parseInt(cbsLeagueInfo[4])
				if(i>parseInt(cbsLeagueInfo[5])) var playoffIdentifier="P"; else var playoffIdentifier = "";
				if(i==cbsCurrentWeek) {
					htmlCode = htmlCode + "<span class='navWeekCurr' title='current week'>&nbsp;" + playoffIdentifier + i + "&nbsp;</span>";
				} else {
					if(i>parseInt(cbsLeagueInfo[5])&&i>liveScoringWeek&&!((i-1)==liveScoringWeek&&cbsNextWeeksPlayoffMatchupSet)) { // if week > lastRegularSeasonWeek and week > liveScoringWeek then create inactive link to playoff game
						htmlCode = htmlCode + "<span class='navWeekInactive' title='games not yet scheduled'>&nbsp;" + playoffIdentifier + i + "&nbsp;</span>";
					} else {
						htmlCode = htmlCode + "<span class='navWeekLink' title='view week "+playoffIdentifier+i+"'><a href='#' onclick=\"updateCurrentWeekSetup('"+i+"')\">&nbsp;" + playoffIdentifier + i + "&nbsp;</a></span>";
					}
				}
				if(i!=cbsEndWeek) htmlCode = htmlCode + "<span class='navdash'>|</span>";
			}
			htmlCode = htmlCode + "         <span style='font-weight:400;float:right;width:150px;text-align:right'>"+versionNumber+"&nbsp;</span></td>\n";			
			htmlCode = htmlCode + "        </tr>\n";
			htmlCode = htmlCode + "       </table>\n";
			return htmlCode;
		}
		//creating the individual scoreboards for the fantasy matchups in a given week (each call creates one scoreboard)
		function createCBSMatchupTable(matchupInfo,which) {
			try {
				doubleHeader[matchupInfo[which]['road'][0]]++;
				doubleHeader[matchupInfo[which]['home'][0]]++;
			} catch(er) {
				// must be an empty boxscore
			}
			var htmlCode = "";
			if(which<matchupInfo.length) {
				//the following code will attempt to set the intial game to hilight to the current active users game
				if(matchupInfo[which]['road'][0]==franchise_id||matchupInfo[which]['road'][0]==commishfranchise_id||matchupInfo[which]['home'][0]==franchise_id||matchupInfo[which]['home'][0]==commishfranchise_id) currentGameHilighted=which;
				//if(useNicknamesInScoreboard) {
				if(miniScoreboardUseAbbrev) {
					if(matchupInfo[which]['road'][0]=="BYE") {
						var roadName = "BYE&nbsp;";
						var roadTitle = " title='BYE WEEK TEAM'";
					} else {
						if(matchupInfo[which]['road'][0]=="AVG") {
							var roadName = "AVG&nbsp;";
							var roadTitle = " title='LEAGUE AVG TEAM'";
						} else {
							var roadName = franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].abbrev+"&nbsp;";
							var roadTitle = " title='"+formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name)+"'";
						}
					}
					if(matchupInfo[which]['home'][0]=="BYE") {
						var homeName = "BYE&nbsp;";
						var homeTitle = " title='BYE WEEK TEAM'";
					} else {
						if(matchupInfo[which]['home'][0]=="AVG") {
							var homeName = "AVG&nbsp;";
							var homeTitle = " title='LEAGUE AVG TEAM'";
						} else {
							var homeName = franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].abbrev+"&nbsp;";
							var homeTitle = " title='"+formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name)+"'";
						}
					}
				} else {
					if(matchupInfo[which]['road'][0]=="BYE") {
						var roadName = "BYE";
					} else {
						if(matchupInfo[which]['road'][0]=="AVG") {
							var roadName = "AVG";
						} else {
							var roadName = formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].name);
						}
					}
					if(matchupInfo[which]['home'][0]=="BYE") {
						var homeName = "BYE";
					} else {
						if(matchupInfo[which]['home'][0]=="AVG") {
							var homeName = "AVG";
						} else {
							var homeName = formatEscapeCharacter(franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].name);
						}
					}
					var roadTitle="";
					var homeTitle="";
				}
				var roadTeamLink = roadName;
				var homeTeamLink = homeName;
				if(miniScoreboardUseIcon||miniScoreboardUseLogo) {
					if(miniScoreboardIconBase!=""&&miniScoreboardIconExt!="") {
						if(roadName!="BYE"&&roadName!="AVG") roadTeamLink = "<img src='"+miniScoreboardIconBase+matchupInfo[which]['road'][0]+"."+miniScoreboardIconBaseExt+"' />";
						if(homeName!="BYE"&&homeName!="AVG") homeTeamLink = "<img src='"+miniScoreboardIconBase+matchupInfo[which]['home'][0]+"."+miniScoreboardIconBaseExt+"' />";
					} else if(miniScoreboardUseIcon) {
						if(roadName!="BYE"&&roadName!="AVG") roadTeamLink = "<img src='"+franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].icon+"' />";
						if(homeName!="BYE"&&homeName!="AVG") homeTeamLink = "<img src='"+franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].icon+"' />";
					} else {
						if(roadName!="BYE"&&roadName!="AVG") roadTeamLink = "<img src='"+franchiseDatabase['fid_' + matchupInfo[which]['road'][0]].logo+"' />";
						if(homeName!="BYE"&&homeName!="AVG") homeTeamLink = "<img src='"+franchiseDatabase['fid_' + matchupInfo[which]['home'][0]].logo+"' />";
					}
				}
				htmlCode = htmlCode + "       <table class='cbsGameTable'>\n";
				htmlCode = htmlCode + "        <tr colspan='4' class='matchupLolite' title='View "+roadName+" @ "+homeName+" Game Details' id='matchup_" + which + "' onclick='setCBSMatchup(" + which + ")'></tr>\n";
				htmlCode = htmlCode + "        <tr><td class='cbsLiveTeam'>" + roadTeamLink + "</td><td class='cbsPaceScore' id='fidPace_" + matchupInfo[which]['road'][0] + doubleHeader[matchupInfo[which]['road'][0]]+"'></td><td class='cbsLiveScore' id='fid_" + matchupInfo[which]['road'][0] + doubleHeader[matchupInfo[which]['road'][0]]+"'"+roadTitle+"></td><td class='cbsWinMarker' id='fidWin_" + matchupInfo[which]['road'][0] + doubleHeader[matchupInfo[which]['road'][0]]+"'></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td class='cbsLiveTeam'>" + homeTeamLink + "</td><td class='cbsPaceScore' id='fidPace_" + matchupInfo[which]['home'][0] + doubleHeader[matchupInfo[which]['home'][0]]+"'></td><td class='cbsLiveScore' id='fid_" + matchupInfo[which]['home'][0] + doubleHeader[matchupInfo[which]['home'][0]]+"'"+homeTitle+"></td><td class='cbsWinMarker' id='fidWin_" + matchupInfo[which]['home'][0] + doubleHeader[matchupInfo[which]['home'][0]]+"'></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='4' class='cbsLiveClock' id='cid_" + which + "'></td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			} else {
				htmlCode = htmlCode + "       <table class='cbsGameTableInactive'>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='4'>&nbsp</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			}
			return htmlCode;
		}
		//creating the individual scoreboards for the NFL matchups in a given week (each call creates one scoreboard)
		function createNFLCBSMatchupTable(matchupInfo,which) {
			var htmlCode = "";
			if(which<matchupInfo.length) {
				htmlCode = htmlCode + "       <table class='cbsNFLGameTable'>\n";
				//htmlCode = htmlCode + "        <tr colspan='4' class='matchupLolite' title='View "+matchupInfo[which]['road'][6]+" @ "+matchupInfo[which]['home'][6]+" Game Details' id='matchupNFL_" + which + "' onclick='doCBSNFLMatchup(\""+matchupInfo[which]['road'][0]+"\",\""+matchupInfo[which]['home'][0]+"\","+cbsCurrentWeek+")'></tr>\n";
				htmlCode = htmlCode + "        <tr colspan='4' class='matchupLolite' title='View "+matchupInfo[which]['road'][6]+" @ "+matchupInfo[which]['home'][6]+" Game Details' id='matchupNFL_" + which + "' onclick='setCBSNFLMatchup(\""+which+"\")'></tr>\n";
				htmlCode = htmlCode + "        <tr><td class='cbsNFLLiveTeam'><div style='width:"+matchupInfo[which]['road'][8]+"px; overflow:hidden;'><img src='" + nflIconSprite + "' style='height:"+matchupInfo[which]['road'][8]+"px; position:relative; left:"+matchupInfo[which]['road'][7]+"px;' /></div></td><td class='cbsNFLBall' id='ballfid_" + matchupInfo[which]['road'][0] +"'></td><td class='cbsNFLLiveScore' id='fid_" + matchupInfo[which]['road'][0] +"'></td><td class='cbsNFLWinMarker' id='fidWin_" + matchupInfo[which]['road'][0] +"'></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td class='cbsNFLLiveTeam'><div style='width:"+matchupInfo[which]['home'][8]+"px; overflow:hidden;'><img src='" + nflIconSprite + "' style='height:"+matchupInfo[which]['home'][8]+"px; position:relative; left:"+matchupInfo[which]['home'][7]+"px;' /></div></td><td class='cbsNFLBall' id='ballfid_" + matchupInfo[which]['home'][0] +"'></td><td class='cbsNFLLiveScore' id='fid_" + matchupInfo[which]['home'][0] +"'></td><td class='cbsNFLWinMarker' id='fidWin_" + matchupInfo[which]['home'][0] +"'></td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='4' class='cbsNFLLiveClock' id='nfl_"+matchupInfo[which]['home'][0]+"'></td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			} else {
				htmlCode = htmlCode + "       <table class='cbsNFLGameTableInactive'>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "        <tr><td colspan='4'>&nbsp;</td></tr>\n";
				htmlCode = htmlCode + "       </table>\n";
			}
			return htmlCode;
		}
		//creating the boxscore tables main container
		function createBoxScoreTables() {
			//Set/Reset double header array
			setupDoubleHeaderArray();
			//cbsLiveScoringMatchups has been defined as a global var
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&DETAILS=1&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, liveScoringData: {'USER_ID': userCookieValue}}).done(function (liveScoringData) {
				cbsLiveScoringMatchups = getCBSLiveScoringData(liveScoringData);
				liveScoringData=null;
			});
			
			var boxHTML = "   <table class='cbsGameLinks'>\n";
			if(liveScoringEmpty) { //MFL must have cleared out the JSON document
				boxHTML = boxHTML + "    <tr>\n";
				boxHTML = boxHTML + "     <td style='font-size:15px'>\n";
				boxHTML = boxHTML + "     <span class='cbsSuspendedMessage'><br /><br />MFL LiveScoring is temporarily suspended as all server resources are being used to accept late lineup submissions.<br /><br />The scoreboard is not broken as this is typical before early kickoff times.<br /><br />Please refresh this page closer to kickoff to view the scoreboard in its entirety.<br /><br /></span>\n";
				boxHTML = boxHTML + "     </td>\n";
				boxHTML = boxHTML + "    </tr>\n";
				boxHTML = boxHTML + "   </table>\n";
			} else {
				if(matchupsPerRow>cbsLiveScoringMatchups.length) var tempMatchupsPerRow=cbsLiveScoringMatchups.length; else var tempMatchupsPerRow = matchupsPerRow;
				var tableRows = parseInt((cbsLiveScoringMatchups.length+(tempMatchupsPerRow-0.5))/tempMatchupsPerRow);  //calculate the number of table rows required for this league
				for(var x=0; x<tableRows;x++) {
					boxHTML = boxHTML + "    <tr>\n";
					for(var y=0; y<tempMatchupsPerRow;y++) {
						boxHTML = boxHTML + "     <td>\n";
						var currentMatchup = parseInt(x*tempMatchupsPerRow+y);
						var matchupTable = createCBSMatchupTable(cbsLiveScoringMatchups,currentMatchup);
						boxHTML = boxHTML + matchupTable;
						boxHTML = boxHTML + "     </td>\n";
					}
					boxHTML = boxHTML + "    </tr>\n";
				}
				boxHTML = boxHTML + "   </table>\n";
			}
			return boxHTML;
		}
		function createNFLBoxScoreTables() {
			var boxHTML = "   <table class='cbsGameLinks'>\n";
			//cbsNFLLiveScoringMatchups has been defined as a global var
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=nflSchedule&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, nflBoxScheduleData: {'USER_ID': userCookieValue}}).done(function (nflBoxScheduleData) {
				cbsNFLLiveScoringMatchups = getCBSNFLBoxSchedule(nflBoxScheduleData);
				nflBoxScheduleData=null;
			});
			boxHTML = boxHTML + "    <tr>\n";
			for(var x=0; x<cbsNFLLiveScoringMatchups.length;x++) {
				boxHTML = boxHTML + "     <td>\n";
				var matchupTable = createNFLCBSMatchupTable(cbsNFLLiveScoringMatchups,x);
				boxHTML = boxHTML + matchupTable;
				boxHTML = boxHTML + "     </td>\n";
			}
			boxHTML = boxHTML + "    </tr>\n";
			boxHTML = boxHTML + "   </table>\n";
			return boxHTML;
		}		
		//creating main scoreboard table
		function createMainScoreboardTable() {
			var scoreboardHTML = "   <table class='cbsMainScoreboard'>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadTeamName'></td>";
			scoreboardHTML = scoreboardHTML + "     <td colspan='7' rowspan='2' id='cbsCenterTop'></td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeTeamName'></td>";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='5' style='display:none'></td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadTeamRecord'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeTeamRecord'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='2' id='cbsRoadScore' style='white-space:nowrap'>&nbsp;</td>"; 
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='2' id='cbsBlank' onclick='setMatchupsToDisplay(true);' style='cursor:pointer; text-align:center;' title='Flip Matchups'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Player Minutes Remaining'>PMR</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Yet to Play'>YTP</td>";
			scoreboardHTML = scoreboardHTML + "     <td class='cbsScoreboardTitle' title='Players Currently Playing'>P</td>";
			scoreboardHTML = scoreboardHTML + "     <td rowspan='2' id='cbsHomeScore' style='white-space:nowrap'>&nbsp;</td>"; 	
			scoreboardHTML = scoreboardHTML + "    </tr>\n";	
			scoreboardHTML = scoreboardHTML + "    <tr>\n";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsRoadPMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePMR' title='Player Minutes Remaining'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomeYTP' title='Players Yet to Play'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "     <td id='cbsHomePlayers' title='Players Currently Playing'>&nbsp;</td>";
			scoreboardHTML = scoreboardHTML + "    </tr>\n";
	
			scoreboardHTML = scoreboardHTML + "   </table>\n";
			return scoreboardHTML;
		}
		//creating the table where the players for each team appear
		function cbsPopulateLineupTable(liveScoring,which,nflSchedule) {
			var tiebreakingPlayer = "";
			myTable = "<table class='cbsTeamLineup' id='cbsTeamLineup'>\n";
				for(var i=0;i<3;i++) {
					switch(i) {
						case 0 :
								var playerList=rosterData[which][1];  // starter
								var headerTitle="Starters";
								//if (playerList==""||playerList==null) alert(playerList + " " + cbsCurrentWeek + " " + liveScoringWeek);
								if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][1];
									headerTitle="* Starters";
								}
								var playingStatus="Starter";
								var doTotals = includeStarterTotals;
								break;
						case 1 :
								var playerList=rosterData[which][2]; // tiebreaker
								var headerTitle="Tiebreaker";
								if(playerList!="") playerList = playerList + ","; 
								if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][2];
									if(playerList!="") playerList = playerList + ",";
									headerTitle="* Tiebreaker";
								}
								var playingStatus="Tiebreaker";
								var doTotals = false;
								break;
						case 2 :
								var playerList=rosterData[which][0];  // bench
								var headerTitle="Bench";
								if((playerList==""||playerList==null)&&cbsCurrentWeek>liveScoringWeek) { 
									playerList = futureLineup[which][0];
									headerTitle="* Bench";
								}
								var playingStatus="Bench";
								var doTotals = includeBenchTotals;
								break;
						default: break;
					}
					var tableRows = new Array();
					var rowCount = 0;
					var tableTotals = 0;
					var tableProjTotals = 0;
					var tablePaceTotals = 0;
					try {
						while (playerList.indexOf(",")>0)	{
							var playerID = playerList.substring(0,playerList.indexOf(","));
							if(i==1) tiebreakingPlayer=playerID;
							if(i!=2||(i==2&&playerID!=tiebreakingPlayer)) { // tiebreaking player also in bench list
								if(cbsRosterInfo[playerID]==undefined) {
									cbsRosterInfo[playerID] = new Array();
									cbsRosterInfo[playerID][0] = new Array(which,"Roster",playingStatus,which,"Roster");
								} else { //since player may be on more than one roster we need to find which one
									var playerFound = false;
									for(var x=0;x<cbsRosterInfo[playerID].length;x++) {
										if(cbsRosterInfo[playerID][x][0]==which) {
											cbsRosterInfo[playerID][x][2]=playingStatus;
											playerFound = true;
										}
									}
									if(playerFound==false) { // add player
										cbsRosterInfo[playerID][cbsRosterInfo[playerID].length] = new Array(which,"Roster",playingStatus,fid,"Roster"); 
									}
								}
								try {  // if player is not on the injury report then playerID fails
									var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
								} catch(er) {
									var injury = "";
								}
								try {  // if player is a free agent then NFL ID fails
									var nflGameDetail = nflSchedule[cbsPlayerInfo[playerID][1]][0];
									var	nflHasBall = nflSchedule[cbsPlayerInfo[playerID][1]][4];
									var nflGameStatus = nflSchedule[cbsPlayerInfo[playerID][1]][3];
									//var nflSecondsRemaining = nflSchedule[cbsPlayerInfo[playerID][1]][1];
									if (nflGameStatus.startsWith('0'))
							             nflGameStatus = nflGameStatus.substr(1);
									var nflSecondsRemaining = nflSchedule[cbsPlayerInfo[playerID][1]][1];
									if (cbsPlayerInfo[playerID][2].toString().toUpperCase() == 'DEF') {
											if (nflHasBall.length == 0 && parseFloat(nflSecondsRemaining)>0&&parseFloat(nflSecondsRemaining)<3600)
											nflHasBall = "<img src='" + hasBallImage + "' alt='" + cbsPlayerInfo[playerID][1] + " has possession' title='" + cbsPlayerInfo[playerID][1] + " has possession' />";
									else
										nflHasBall = '';
									}
									var nflPassOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][5];
									var nflRushOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][6];
									var nflAvgOffRank = nflSchedule[cbsPlayerInfo[playerID][1]][7];
									var nflPassDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][8];
									var nflRushDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][9];
									var nflAvgDefRank = nflSchedule[cbsPlayerInfo[playerID][1]][10];
								} catch(er) {
									var nflGameDetail = "";
									var nflHasBall = "";
									var nflGameStatus = "";
									var nflSecondsRemaining = 0;
									var nflPassOffRank = 0;
									var nflRushOffRank = 0;
									var nflAvgOffRank = 0;
									var nflPassDefRank = 0;	
									var nflRushDefRank = 0;
									var nflAvgDefRank = 0;
								}
								if (liveScoring[1][playerID]!=undefined) var pointsEarned = parseFloat(liveScoring[1][playerID]).toFixed(precision); else var pointsEarned = 0;
								tableTotals = tableTotals + parseFloat(pointsEarned);
								if (includeProjections) {
									if(cbsLiveMode) { // then we need to calculate Pt Pace
										if (fsProjections[playerID]==undefined) fsProjections[playerID] = 0;
										try {var playerSecondsRemaining = parseInt(nflSchedule[cbsPlayerInfo[playerID][1]][1]);} catch(er) {var playerSecondsRemaining = 0;}
										var remainingProjectedPoints = playerSecondsRemaining/3600 * parseFloat(fsProjections[playerID]);
										var onPacePoints = remainingProjectedPoints + parseFloat(pointsEarned);
										//create hint popup
										var thisPopupHint = '<div onclick=hidetip()><table class=cbsPlayerStatsPopup style=width:428px><tbody><caption><span>On Pace Points Breakdown</span></caption>';
										thisPopupHint+= '<tr><td colspan=2 style=text-align:left;><b>'+cbsPlayerInfo[playerID][0] + '&nbsp;' + cbsPlayerInfo[playerID][1] + '&nbsp;' + cbsPlayerInfo[playerID][2]+'</b></td></tr>';
										thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Seconds Remaining as %:&nbsp;</td><td style=text-align:right>'+parseFloat(100*playerSecondsRemaining/3600).toFixed(1)+'%</td></tr>';
										thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Original Projection:&nbsp;</td><td style=text-align:right>'+parseFloat(fsProjections[playerID]).toFixed(precision)+'</td></tr>';
										thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Remaining Projected Points:&nbsp;</td><td style=text-align:right>'+parseFloat(remainingProjectedPoints).toFixed(precision)+'</td></tr>';
										thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Actual Points Scored:&nbsp;</td><td style=text-align:right>'+parseFloat(pointsEarned).toFixed(precision)+'</td></tr>';
										thisPopupHint+= '<tr><td style=text-align:left;><b>On Pace Points:&nbsp;</b></td><td style=text-align:right;><b>'+parseFloat(onPacePoints).toFixed(precision)+'</b></td></tr>';
										if(parseFloat(onPacePoints)>parseFloat(fsProjections[playerID])) var differenceSign="<span style=font-size:18px>+&nbsp;</span>"; else if(parseFloat(onPacePoints)<parseFloat(fsProjections[playerID])) var differenceSign="<span style=font-size:18px>-&nbsp;</span>"; else var differenceSign="";
										thisPopupHint+= '<tr><td style=text-align:left;><b>Difference:&nbsp;</b></td><td style=text-align:right;><b>'+differenceSign+(Math.abs(parseFloat(onPacePoints)-parseFloat(fsProjections[playerID]))).toFixed(precision)+'</b></td></tr>';
										thisPopupHint+='</tbody></table></div>';
										var projections = "<td class='cbsPlayerProjections' style='cursor:help' onmouseover=\"showhint('"+thisPopupHint+"', this, event, '430px')\">"+parseFloat(onPacePoints).toFixed(precision)+"&nbsp;</td>"; 
										tableProjTotals = tableProjTotals + parseFloat(fsProjections[playerID]); 
										tablePaceTotals = tablePaceTotals + onPacePoints; 
									} else {
											if (fsProjections[playerID]==undefined) var projections = "<td class='cbsPlayerProjections'>"+parseFloat(0).toFixed(precision)+"&nbsp;</td>"; else { var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>"; tableProjTotals = tableProjTotals + parseFloat(fsProjections[playerID]); }
									}
								} else var projections="";
								if (includeSOS) {
									var rankNumber = 0;
									var rankDescription = "";
									var SOS = "<td class='oppRankNA'>&nbsp;</td>";
							
									if(playerPosType(playerID)=="OffPass") { rankNumber = nflPassDefRank; rankDescription = "Opponent Rank Against the Pass"; }
									if(playerPosType(playerID)=="OffRush") { rankNumber = nflRushDefRank; rankDescription = "Opponent Rank Against the Run"; }
									if(playerPosType(playerID)=="OffAvg")  { rankNumber = nflAvgDefRank;  rankDescription = "Opponent Defense Rank"; }
									if(playerPosType(playerID)=="DefPass") { rankNumber = nflPassOffRank; rankDescription = "Opponent Rank Passing"; }
									if(playerPosType(playerID)=="DefRush") { rankNumber = nflRushOffRank; rankDescription = "Opponent Rank Rushing"; }
									if(playerPosType(playerID)=="DefAvg")  { rankNumber = nflAvgOffRank;  rankDescription = "Opponent Offense Rank"; }
							
									if(rankNumber==0) SOS = "<td class='oppRankNA'>&nbsp;</td>";
									if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FF0000;color:black!important' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FF8000;color:black!important' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FFFF00;color:black!important' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#01DF01;color:black!important' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
									if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#04B404;color:black!important' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								} else var SOS = "";
								if (parseFloat(playerUpdates[0][playerID]) != parseFloat(playerUpdates[1][playerID])) {
									if (parseFloat(playerUpdates[0][playerID]) > parseFloat(playerUpdates[1][playerID])) {
										if (isNaN(playerUpdates[0][playerID]) || isNaN(playerUpdates[1][playerID]))
											var thisPlayerUpdate = "";
										else
											var thisPlayerUpdate = "<img src='" + recentUpdateImage + "' alt='player has a recent point gain'  title='player has a recent point gain' /><span class='green_text'>" + parseFloat(parseFloat(playerUpdates[0][playerID]) - parseFloat(playerUpdates[1][playerID])).toFixed(precision) + '</span>';
									} else {
										if (isNaN(playerUpdates[0][playerID]) || isNaN(playerUpdates[1][playerID]))
											var thisPlayerUpdate = "";
										else
											var thisPlayerUpdate = "<img src='" + recentNegativeUpdateImage + "' alt='player has a recent point loss'  title='player has a recent point loss' /><span class='red_text'>" + parseFloat(parseFloat(playerUpdates[1][playerID]) - parseFloat(playerUpdates[0][playerID])).toFixed(precision) + '</span>';
									}
								} else var thisPlayerUpdate = "";
								if(cbsNoData) thisPlayerUpdate = "";
								var rowStyle=" class='rowCurrentlyPlaying'";
								if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
								if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
								try {
									if(useNFLIcons) {
										var NFLIcon = getNFLBoxscoreIcon(cbsPlayerInfo[playerID][1],20);
										var nflTeamDisplay = "<table class='cbsPlayerGameTable'><tr><td><div style='width:"+NFLIcon[2]+"px; overflow:hidden;'><img src='" + nflIconSprite + "' style='height:"+NFLIcon[2]+"px; position:relative; left:"+NFLIcon[1]+"px' title='"+NFLIcon[0]+"' /></div></td>";
									} else {
										var nflTeamDisplay = cbsPlayerInfo[playerID][1];
									}
						            //tableRows[rowCount] = new Array(getPositionSortNumber(cbsPlayerInfo[playerID][2]),"<tr" + rowStyle + "><td class='cbsPlayerName' style='border-right:0px; white-space:nowrap;'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage' class='position_"+cbsPlayerInfo[playerID][2].toLowerCase()+"'>" + cbsPlayerInfo[playerID][0] + "&nbsp;" + cbsPlayerInfo[playerID][2] + "</a>" + injury + "</td><td class='cbsPlayerGame' style='border-right:0px; white-space:nowrap; vertical-align:middle;'>&nbsp;" + nflTeamDisplay + nflGameDetail + "</td>"+SOS+"<td class='cbsGameClock' style='border-left:0px; white-space:nowrap;'>&nbsp;" + nflGameStatus + "</td>"+projections+"<td class='cbsPlayerPoints' style='cursor:help' onmouseover=\"setuphint('"+playerID+"','"+which+"',"+cbsCurrentWeek+", this, event, '430px')\">" + pointsEarned + "&nbsp;</td></tr>\n");
									tableRows[rowCount] = new Array(getPositionSortNumber(cbsPlayerInfo[playerID][2]), "<tr" + rowStyle + "><td class='cbsPlayerName'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage' class='position_" + cbsPlayerInfo[playerID][2].toLowerCase() + "'>" + cbsPlayerInfo[playerID][0] + "&nbsp;" + cbsPlayerInfo[playerID][2] + "</a>" + injury + "</td><td class='hasball'>" + thisPlayerUpdate + (thisPlayerUpdate.length == 0 ? nflHasBall : '') + "</td><td class='cbsPlayerGame'>" + nflTeamDisplay + nflGameDetail + "</td>" + SOS + "<td class='cbsGameClock'>&nbsp;" + nflGameStatus + "</td>" + projections + "<td class='cbsPlayerPoints' onmouseover=\"setuphint('" + playerID + "','" + which + "'," + cbsCurrentWeek + ", this, event, '430px')\" onmouseout=\"hidetip()\">" + pointsEarned + "&nbsp;</td></tr>\n");
									rowCount++;

								} catch(er) {
									// do not update this starter row
								}
							}
							playerList = playerList.substring(playerList.indexOf(",")+1,playerList.length);
						}
					} catch(er) {
						// do nothing
					}
					
					if (tableRows.length>0) {
						tableRows.sort(sortby(0));
						if(includeProjections) {
							if(cbsLiveMode) var projTitle="Pace"; else var projTitle="Proj";
							if(includeSOS) {
								var headerRow = "<tr class='lineupHeaderRow'><th class='lineupHeaderPlayer'>"+headerTitle+"</th><th class='lineupHeaderGames'>Games</th><th class='sos'>S.O.S</th><th class='gamestime'>Time</th><th class='lineupHeaderProj'>"+projTitle+"</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							} else {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderProj'>"+projTitle+"</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							}
						} else {
							if(includeSOS) {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='3' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							} else {
								var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>"+headerTitle+"</th><th colspan='2' class='lineupHeaderGames'>Games</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
							}
						}
						myTable = myTable + headerRow;
						for(var j=0;j<tableRows.length;j++) {
							myTable = myTable + tableRows[j][1];
						}
						if (doTotals) {
							if(includeProjections) {
								if(cbsLiveMode) {
									//create hint popup
									var thisPopupHint = '<div onclick=hidetip()><table class=cbsPlayerStatsPopup style=width:428px><tbody><caption><span>On Pace vs Original Projection</span></caption>';
									thisPopupHint+= '<tr><td style=text-align:left;>Original Projection:&nbsp;</td><td style=text-align:right>'+tableProjTotals.toFixed(precision)+'</td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;>On Pace Projection:&nbsp;</td><td style=text-align:right>'+tablePaceTotals.toFixed(precision)+'</td></tr>';
									if(tablePaceTotals>tableProjTotals) var differenceSign="<span style=font-size:18px>+&nbsp;</span>"; else if(tablePaceTotals<tableProjTotals) var differenceSign="<span style=font-size:18px>-&nbsp;</span>"; else var differenceSign="";
									thisPopupHint+= '<tr><td style=text-align:left;><b>Difference:&nbsp;</b></td><td style=text-align:right;><b>'+differenceSign+(Math.abs(tablePaceTotals-tableProjTotals)).toFixed(precision)+'</b></td></tr>';
									thisPopupHint+='</tbody></table></div>';
									var projections = "<th class='pointTotalProj' style='cursor:help' onmouseover=\"showhint('"+thisPopupHint+"', this, event, '430px')\">"+parseFloat(tablePaceTotals).toFixed(precision)+"&nbsp;</th>"; 
								} else {
									var projections = "<th class='pointTotalProj'>"+tableProjTotals.toFixed(precision)+"&nbsp;</th>"; 
								}
								if(includeSOS) {

									myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;"+headerTitle+" Totals</th>"+projections+"<th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								} else {

									myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;"+headerTitle+" Totals</th>"+projections+"<th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								}
							} else {
								if(includeSOS) {

									myTable = myTable + "<tr class='pointTotalRow'><th colspan='5' class='pointTotalTitle'>&nbsp;"+headerTitle+" Total</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								} else {

									myTable = myTable + "<tr class='pointTotalRow'><th colspan='4' class='pointTotalTitle'>&nbsp;"+headerTitle+" Total</th><th class='pointTotalActual'>"+tableTotals.toFixed(precision)+"&nbsp;</th></tr>\n";
								}
							}
						}
					}
				}
			myTable = myTable + "</table>\n";
			return myTable;
		}
		function cbsPopulateNFLLineupTable(thisID,nflSchedule) {
			var myURL = baseURLDynamic+"/"+year+"/pro_matchup?L="+league_id+"&W="+cbsCurrentWeek+"&MATCHUP="+thisID;
			var myReturn = "";
			var dataStr="";
			var nflSecondsRemaining = nflSchedule[thisID][1];
			var	nflHasBall = nflSchedule[thisID][4];
			var nflGameStatus = nflSchedule[thisID][3];
			var rowStyle=" class='rowCurrentlyPlaying'";
			if (parseInt(nflSecondsRemaining)==0) rowStyle=" class='rowGameOver'";
			if (parseInt(nflSecondsRemaining)==3600) rowStyle=" class='rowYTP'";
			var tableRows = new Array();
			var myTable = "<table class='cbsTeamLineup' id='cbsTeamLineup'>\n";
			if(includeProjections) {
				if(cbsLiveMode) var projTitle="Pace"; else var projTitle="Proj";
				if(includeSOS) {
					var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Player</th><th class='lineupHeaderGames'>Fantasy Team</th><th class='sos'>S.O.S</th><th class='gamestime'>Time</th><th class='lineupHeaderProj'>"+projTitle+"</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
				} else {
					var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Player</th><th colspan='2' class='lineupHeaderGames'>Fantasy Team</th><th class='lineupHeaderProj'>"+projTitle+"</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
				}
			} else {
				if(includeSOS) {
					var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Player</th><th colspan='3' class='lineupHeaderGames'>Fantasy Team</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
				} else {
					var headerRow = "<tr class='lineupHeaderRow'><th colspan='2' class='lineupHeaderPlayer'>Player</th><th colspan='2' class='lineupHeaderGames'>Fantasy Team</th><th class='lineupHeaderActual'>Actual</th></tr>\n";
				}
			}
			myTable = myTable + headerRow;
			var thisPlayerArray = new Array();
			var thisPlayerStatsArray = new Array();
			$.ajax({ type: 'GET', url: myURL, async:false, data: { 'USER_ID': userCookieValue } }).done(function (data) {
				$(data).find('.report .nocaption').each(function(){
					var thisPlayerStatsHeader = new Array();
					var thisPlayerStatCount = 0;
					var mainCategory = $(this).find('tr:eq(0) th:eq(0)').text();
					$(this).find('tr:eq(1) th').each(function() {
						thisPlayerStatCount++;
						if(thisPlayerStatCount>1) thisPlayerStatsHeader[thisPlayerStatsHeader.length] = $(this).text();
					});
					for(var n=0;n<$(this).find("tr").length;n++) { 
						var thisTable = $(this);
						$(this).find('tr:eq('+n+') a[class^="position_"]').each(function() { 
							var href=$(this).attr('href');
							var playerID = href.substring(href.indexOf('P=') + 2, href.length);
							if(thisPlayerArray[playerID]==undefined) { var thisTableRow=tableRows.length; thisPlayerArray[playerID]=thisTableRow; thisPlayerStatsArray[playerID] = ""; } else var thisTableRow = thisPlayerArray[playerID];
							var thisFullRow = $(thisTable).find('tr:eq('+n+')');
							if(isNaN(parseFloat($(thisFullRow).find('td:eq(1)').text())))
								var pointsEarned = "-";
							else
								var pointsEarned = parseFloat($(thisFullRow).find('td:eq(1)').text()).toFixed(precision);
							if (includeProjections) {
								if (fsProjections[playerID]==undefined) fsProjections[playerID] = 0;
								if(cbsLiveMode) { // then we need to calculate Pt Pace
									try {var playerSecondsRemaining = parseInt(nflSchedule[cbsPlayerInfo[playerID][1]][1]);} catch(er) {var playerSecondsRemaining = 0;}
									var remainingProjectedPoints = playerSecondsRemaining/3600 * parseFloat(fsProjections[playerID]);
									var onPacePoints = remainingProjectedPoints + parseFloat(pointsEarned);
									//create hint popup
									var thisPopupHint = '<div onclick=hidetip()><table class=cbsPlayerStatsPopup style=width:428px><tbody><caption><span>On Pace Points Breakdown</span></caption>';
									thisPopupHint+= '<tr><td colspan=2 style=text-align:left;><b>'+cbsPlayerInfo[playerID][0] + '&nbsp;' + cbsPlayerInfo[playerID][1] + '&nbsp;' + cbsPlayerInfo[playerID][2]+'</b></td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Seconds Remaining as %:&nbsp;</td><td style=text-align:right>'+parseFloat(100*playerSecondsRemaining/3600).toFixed(1)+'%</td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Original Projection:&nbsp;</td><td style=text-align:right>'+parseFloat(fsProjections[playerID]).toFixed(precision)+'</td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Remaining Projected Points:&nbsp;</td><td style=text-align:right>'+parseFloat(remainingProjectedPoints).toFixed(precision)+'</td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;>&nbsp;&nbsp;Actual Points Scored:&nbsp;</td><td style=text-align:right>'+validateAsNumber(pointsEarned).toFixed(precision)+'</td></tr>';
									thisPopupHint+= '<tr><td style=text-align:left;><b>On Pace Points:&nbsp;</b></td><td style=text-align:right;><b>'+validateAsNumber(onPacePoints).toFixed(precision)+'</b></td></tr>';
									if(validateAsNumber(onPacePoints)>validateAsNumber(fsProjections[playerID])) var differenceSign="<span style=font-size:18px>+&nbsp;</span>"; else if(validateAsNumber(onPacePoints)<validateAsNumber(fsProjections[playerID])) var differenceSign="<span style=font-size:18px>-&nbsp;</span>"; else var differenceSign="";
									thisPopupHint+= '<tr><td style=text-align:left;><b>Difference:&nbsp;</b></td><td style=text-align:right;><b>'+differenceSign+(Math.abs(validateAsNumber(onPacePoints)-validateAsNumber(fsProjections[playerID]))).toFixed(precision)+'</b></td></tr>';
									thisPopupHint+='</tbody></table></div>';
									var projections = "<td class='cbsPlayerProjections' style='cursor:help' onmouseover=\"showhint('"+thisPopupHint+"', this, event, '430px')\">"+validateAsNumber(onPacePoints).toFixed(precision)+"&nbsp;</td>"; 
								} else {
									if (fsProjections[playerID]==undefined) var projections = "<td class='cbsPlayerProjections'>"+parseFloat(0).toFixed(precision)+"&nbsp;</td>"; else { var projections = "<td class='cbsPlayerProjections'>"+parseFloat(fsProjections[playerID]).toFixed(precision)+"&nbsp;</td>"; }
								}
							} else var projections="";
							if (includeSOS) {
								var rankNumber = 0;
								var rankDescription = "";
								var SOS = "<td class='oppRankNA'>&nbsp;</td>";
								if(playerPosType(playerID)=="OffPass") { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][8];  rankDescription = "Opponent Rank Against the Pass"; }
								if(playerPosType(playerID)=="OffRush") { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][9];  rankDescription = "Opponent Rank Against the Run"; }
								if(playerPosType(playerID)=="OffAvg")  { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][10]; rankDescription = "Opponent Defense Rank"; }
								if(playerPosType(playerID)=="DefPass") { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][5];  rankDescription = "Opponent Rank Passing"; }
								if(playerPosType(playerID)=="DefRush") { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][6];  rankDescription = "Opponent Rank Rushing"; }
								if(playerPosType(playerID)=="DefAvg")  { rankNumber = nflSchedule[cbsPlayerInfo[playerID][1]][7];  rankDescription = "Opponent Offense Rank"; }
							
								if(rankNumber==0) SOS = "<td class='oppRankNA'>&nbsp;</td>";
								if(rankNumber>=1&&rankNumber<=6) SOS = "<td class='oppRankBadMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FF0000;color:black!important' title='"+rankDescription+" - BAD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=7&&rankNumber<=12) SOS = "<td class='oppRankPoorMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FF8000;color:black!important' title='"+rankDescription+" - POOR Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=13&&rankNumber<=20) SOS = "<td class='oppRankAvgMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#FFFF00;color:black!important' title='"+rankDescription+" - NEUTRAL Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=21&&rankNumber<=26) SOS = "<td class='oppRankGoodMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#01DF01;color:black!important' title='"+rankDescription+" - GOOD Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
								if(rankNumber>=27&&rankNumber<=32) SOS = "<td class='oppRankGreatMatchup' style='border-left:0px; border-right:0px; white-space:nowrap;background:#04B404;color:black!important' title='"+rankDescription+" - GREAT Matchup'>&nbsp;"+rankNumber+"&nbsp;</td>";
							} else var SOS = "";							
							
							try {  // if player is not on the injury report then playerID fails
								var injury="&nbsp;(<span class='injuredPlayer' title='" + cbsInjuryInfo[playerID][1] + ": " + cbsInjuryInfo[playerID][2] + "'>" + cbsInjuryInfo[playerID][0] + "</span>)";
							} catch(er) {
								var injury = "";
							}
							if ((parseFloat(playerUpdates[0][playerID]) != parseFloat(playerUpdates[1][playerID])) && (playerUpdates[0][playerID] != undefined)) {
								if (parseFloat(playerUpdates[0][playerID]) > parseFloat(playerUpdates[1][playerID])) {
									var thisPlayerUpdate = "<img src='" + recentUpdateImage + "' alt='player has a recent point gain'  title='player has a recent point gain' /><span class='green_text'>" + parseFloat(parseFloat(playerUpdates[0][playerID]) - parseFloat(playerUpdates[1][playerID])).toFixed(precision) + '</span>';
								
								} else {
									var thisPlayerUpdate = "<img src='" + recentNegativeUpdateImage + "' alt='player has a recent point loss'  title='player has a recent point loss' /><span class='red_text'>" + parseFloat(parseFloat(playerUpdates[1][playerID]) - parseFloat(playerUpdates[0][playerID])).toFixed(precision) + '</span>';
								}
							} else var thisPlayerUpdate = "";
							if(cbsNoData) thisPlayerUpdate = "";								
							tableRows[thisTableRow] = new Array();
							tableRows[thisTableRow][0] = getPositionSortNumber(cbsPlayerInfo[playerID][2]);
							tableRows[thisTableRow][1] = "<tr" + rowStyle + "><td class='cbsPlayerName'>&nbsp;<a href='" + baseURLDynamic + "/" + year + "/player?L=" + league_id + "&P=" + playerID + "' target='mflpage' class='position_"+cbsPlayerInfo[playerID][2].toLowerCase()+"'>" + cbsPlayerInfo[playerID][0] + "&nbsp;" + cbsPlayerInfo[playerID][2] + "</a>" + injury + "</td>";
							//tableRows[thisTableRow][1]+="<td class='hasball'>"+thisPlayerUpdate+nflHasBall+"&nbsp;</td>";
							tableRows[thisTableRow][1] += "<td class='hasball'>" + thisPlayerUpdate + (thisPlayerUpdate.length == 0 ? nflHasBall : '') + "</td>";
							//tableRows[thisTableRow][1]+="<td class='hasball'></td>";
							try { tableRows[thisTableRow][1]+= "<td class='cbsPlayerFantasyTeam'>"+ franchiseDatabase['fid_'+cbsRosterInfo[playerID][0][0]].name.substring(0,15) +"</td>"; tableRows[thisTableRow][2]=true; } catch(er) { tableRows[thisTableRow][1]+= "<td class='cbsPlayerFantasyTeam'>FA</td>";  tableRows[thisTableRow][2]=false; }
							tableRows[thisTableRow][1]+=SOS;
							tableRows[thisTableRow][1]+="<td class='cbsGameClock'>&nbsp;" + nflGameStatus + "</td>";
							tableRows[thisTableRow][1]+=projections;
							thisPlayerStatsArray[playerID]+= '<table style=border-width:1px;margin-top:2px;border-color:black;border-style:solid;border-collapse:collapse;width:100%>';
							thisPlayerStatsArray[playerID]+= '<tr><td style=text-align:left;font-weight:bold>'+mainCategory+'</td>';
							for(var m=1;m<thisPlayerStatsHeader.length;m++) {
								thisPlayerStatsArray[playerID]+= '<td style=text-align:right;width:10%;white-space:nowrap>&nbsp;'+thisPlayerStatsHeader[m]+'&nbsp;</td>';
							}
							thisPlayerStatsArray[playerID]+= '</tr><tr><td>&nbsp;</td>';
							for(var m=2;m<=thisPlayerStatsHeader.length;m++) {
								if($(thisFullRow).find('td:eq('+m+')').text()=="") var thisStat="-"; else var thisStat = $(thisFullRow).find('td:eq('+m+')').text();
								thisPlayerStatsArray[playerID]+= '<td style=text-align:right;>'+thisStat+'&nbsp;</td>';
							}
							thisPlayerStatsArray[playerID]+= '</tr></table>';
							var thisPopupHint = '<div onclick=hidetip()><table class=cbsPlayerStatsPopup style=width:428px><tbody><caption><span>Weekly Stats Breakdown</span></caption>';
							thisPopupHint+= '<tr><td style=text-align:left;><b>'+cbsPlayerInfo[playerID][0] + '&nbsp;' + cbsPlayerInfo[playerID][1] + '&nbsp;' + cbsPlayerInfo[playerID][2]+'</b></td></tr>';
							thisPopupHint+='<tr><td>'+thisPlayerStatsArray[playerID]+'</td></tr>';
							thisPopupHint+='</tbody></table></div>';
							
							tableRows[thisTableRow][1]+="<td class='cbsPlayerPoints' onmouseover=\"showhint('"+thisPopupHint+"', this, event, '430px')\">"+pointsEarned+"&nbsp;</td>";
							//tableRows[thisTableRow][1]+="<td class='cbsPlayerPoints'>"+pointsEarned+"&nbsp;</td>";
							tableRows[thisTableRow][1]+= "</tr>\n";
							if(pointsEarned=="-") tableRows[thisTableRow][3] = false; else tableRows[thisTableRow][3] = true;
						});
					}
				});
			});
			tableRows.sort(sortby(0));
			for(var j=0;j<tableRows.length;j++) {
				//if((on a roster OR include free agents) && (is a legal position || include all positions)
				if((tableRows[j][2]||cbsNFLLineupIncludeFA)&&(tableRows[j][3]||cbsNFLLineupIncludeNotUsedPositions)) myTable = myTable + tableRows[j][1];
			}
			myTable = myTable + "</table>\n";
			return myTable;			
		}
		function updatePlayerUpdates() {
			var thisPlayerTeamUpdated = new Array();
			var tempHTML = "<table class='updateHistoryPlayer'><tbody>\n";
			tempHTML = tempHTML + "  <tr><th>&nbsp;Time&nbsp;</th><th>&nbsp;Player&nbsp;</th><th>&nbsp;Pos&nbsp;</th><th>&nbsp;NFL&nbsp;</th><th>&nbsp;Fantasy Team&nbsp;</th><th>&nbsp;Status&nbsp;</th><th>&nbsp;Update Pts&nbsp;</th><th>&nbsp;Previous Pts&nbsp;</th><th>&nbsp;Total Pts&nbsp;</th></tr>\n";
			for(var i=(playerUpdateHistory.length)-1;i>=0;i--) {
				//loop through each potential team player may be on
				for(var x=0;x<cbsRosterInfo[playerUpdateHistory[i][8]].length;x++) {
					var xFid = cbsRosterInfo[playerUpdateHistory[i][8]][x][0];
					var playerTeamId = playerUpdateHistory[i][8] + "_" + xFid;
					if(thisPlayerTeamUpdated[playerTeamId]==undefined) {
						thisPlayerTeamUpdated[playerTeamId]=1;
						if(radioButtonValue==-1 || ((radioButtonValue==1||radioButtonValue==3)&&xFid==myUpdateTeam) || ((radioButtonValue==2||radioButtonValue==3)&&playerUpdateHistory[i][9]==myOppUpdateTeam) ) {
							if(selectBoxValue==""||selectBoxValue=="All"||selectBoxValue==xFid) {
								if(radioButtonValue2==-1 || radioButtonValue2==1 || (radioButtonValue2==2&&cbsRosterInfo[playerUpdateHistory[i][8]][x][2]==radioButtonValue2Str) ) {
									if(selectBoxValue2==""||selectBoxValue2=="All"||selectBoxValue2==playerUpdateHistory[i][8]) {
										tempHTML = tempHTML + "  <tr>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryTime'>" + playerUpdateHistory[i][0] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryName'>" + playerUpdateHistory[i][1] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryPosition'>" + playerUpdateHistory[i][2] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryNFLTeam'>" + playerUpdateHistory[i][3] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryFantasyTeam'>" + franchiseDatabase['fid_'+xFid].name  + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryStatus'>" + cbsRosterInfo[playerUpdateHistory[i][8]][x][2] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryUpdatePts'>" + playerUpdateHistory[i][5] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryPreviousPts'>" + playerUpdateHistory[i][6] + "</td>\n";
										tempHTML = tempHTML + "   <td class='cbsUpdateHistoryTotalPts'><span title='View Player Stats' pts-scored='"+playerUpdateHistory[i][8]+","+playerUpdateHistory[i][9]+","+cbsCurrentWeek+"'>" + playerUpdateHistory[i][7] + "</span></td>\n";
										tempHTML = tempHTML + "  </tr>\n";
									}
								}
							}
						}
					}
				}
			}
			tempHTML = tempHTML + " </tbody>\n";
			tempHTML = tempHTML + "</table>\n";
			document.getElementById("playerUpdates").innerHTML = tempHTML;
			
			var myTeamChecked = "";
			var oppTeamChecked = "";
			var bothChecked = "";
			switch(radioButtonValue) {
				case -1: break; // do nothing
				case 1:	myTeamChecked=" checked='checked'"; break;
				case 2: oppTeamChecked=" checked='checked'"; break;
				case 3:	bothChecked=" checked='checked'"; break;
				default: break; // do nothing
			}
			var allPlayersChecked = "";
			var startersChecked = "";
			switch(radioButtonValue2) {
				case -1: break; // do nothing
				case 1:	allPlayersChecked=" checked='checked'"; break;
				case 2: startersChecked=" checked='checked'"; break;
				default: break; // do nothing
			}
			
			tempHTML = "<table class='updateHistoryHeader'>\n";
			tempHTML = tempHTML + " <tr>\n";
			tempHTML = tempHTML + "  <td class='cbsUpdateTopForm'>\n";
			tempHTML = tempHTML + "   <form name='teamform'>\n";

			tempHTML = tempHTML + "    <select id='fantasyteamselect' onchange='teamSelectFilter();'>\n";
			if(selectBoxValue=="") {
				tempHTML = tempHTML + "     <option value='' selected='selected'>Select Team</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value=''>Select Team</option>\n";
			}
			if(selectBoxValue=="All") {
				tempHTML = tempHTML + "     <option value='All' selected='selected'>All Teams</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value='All'>All Teams</option>\n";
			}
			for (var fid in franchiseDatabase) {
				if(franchiseDatabase[fid].id!="0000"&&franchiseDatabase[fid].id!=undefined) {
					try {
						if(selectBoxValue==franchiseDatabase[fid].id) var selected = " selected='selected'";  else var selected="";
						tempHTML = tempHTML + "<option value='"+franchiseDatabase[fid].id+"'"+selected+">"+franchiseDatabase[fid].name+"</option>\n";
					} catch(er) {
						// list nothing
					}
				}
			}
			tempHTML = tempHTML + "    </select>\n";			
			
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+myTeamChecked+" onclick='teamRadioFilter(1);'>My Team Only&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+oppTeamChecked+" onclick='teamRadioFilter(2);'>My Opp Only&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='teamFilter'"+bothChecked+" onclick='teamRadioFilter(3);'>My Team and Opp Only&nbsp;&nbsp;\n";
		
			tempHTML = tempHTML + "   </form>\n";
			tempHTML = tempHTML + "  </td>\n";
			tempHTML = tempHTML + " </tr>\n";
			
			tempHTML = tempHTML + " <tr>\n";
			tempHTML = tempHTML + "  <td class='cbsUpdateHistoryBottomForm'>\n";
			tempHTML = tempHTML + "   <form name='playerform'>\n";

			tempHTML = tempHTML + "    <select id='fantasyplayerselect' onchange='playerSelectFilter();'>\n";
			if(selectBoxValue2=="") {
				tempHTML = tempHTML + "     <option value='' selected='selected'>Select Player</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value=''>Select Player</option>\n";
			}
			if(selectBoxValue2=="All") {
				tempHTML = tempHTML + "     <option value='All' selected='selected'>All Players</option>\n";
			} else {
				tempHTML = tempHTML + "     <option value='All'>All Players</option>\n";
			}
			
			var tempArray = new Array();
			for(var i=0;i<playerUpdateHistory.length;i++) {
				var tempID = "'"+playerUpdateHistory[i][8]+"'";
				if(tempArray[tempID]==undefined) tempArray[tempID]= new Array(tempID,playerUpdateHistory[i][1]);
			}
			//bubble sort
			for(var pid in tempArray) {
				if(parseFloat(pid.substr(1,pid.length))>0) {
					for(var pid2 in tempArray) {
						if(parseFloat(pid2.substr(1,pid2.length))>0) {
							if(tempArray[pid][1]<tempArray[pid2][1]) {
								var tempValue = tempArray[pid][0];
								var tempValue1 = tempArray[pid][1];
								tempArray[pid][0] = tempArray[pid2][0];
								tempArray[pid][1] = tempArray[pid2][1];
								tempArray[pid2][0] = tempValue;
								tempArray[pid2][1] = tempValue1;
							}
						}
					}
				}
			}
     		for(var pid in tempArray) {
				if(parseFloat(pid.substr(1,pid.length))>0) {
					try {
						if(selectBoxValue2==parseFloat(tempArray[pid][0].substr(1,tempArray[pid][0].length-1))) var selected = " selected='selected'";  else var selected="";
						tempHTML = tempHTML + "<option value="+tempArray[pid][0]+selected+">"+tempArray[pid][1]+"</option>\n";
					} catch(er) {
						// list nothing
					}
				}
			}
			tempHTML = tempHTML + "    </select>\n";			
			
			tempHTML = tempHTML + "    <input type='radio' name='playerFilter'"+allPlayersChecked+" onclick='playerRadioFilter(1);'>All Players&nbsp;&nbsp;\n";
			tempHTML = tempHTML + "    <input type='radio' name='playerFilter'"+startersChecked+" onclick='playerRadioFilter(2);'>Starters Only&nbsp;&nbsp;\n";
		
			tempHTML = tempHTML + "   </form>\n";
			tempHTML = tempHTML + "  </td>\n";
			tempHTML = tempHTML + " </tr>\n";			
			
			tempHTML = tempHTML + "</table>\n";

			document.getElementById("playerFilter").innerHTML = tempHTML;
		}
		
	//====================================================================================
	// FUNCTIONS THAT CONTROL UPDATES/LOOPS
	//====================================================================================
		function checkCBSMatchup() {
			if(matchupsDisplayedIsFantasy)
				setCBSMatchup(currentGameHilighted)
			else
				setCBSNFLMatchup(currentNFLGameHilighted)
			//on first run we need to force hilight onto first NFL game without doing anything else
			if(currentNFLGameHilighted==-1) { currentNFLGameHilighted=0; document.getElementById("matchupNFL_" + currentNFLGameHilighted).parentNode.setAttribute("class", "matchupHilite"); }
		}
		function setCBSMatchup(whichGame) {
			if(whichGame>(cbsLiveScoringMatchups.length-1)) currentGameHilighted = 0; else currentGameHilighted = whichGame;
			//reset all my links game hilights to original colour
			for(var x=0;x<cbsLiveScoringMatchups.length;x++) document.getElementById("matchup_" + x).parentNode.setAttribute("class", "matchupLolite");
			document.getElementById("matchup_" + currentGameHilighted).parentNode.setAttribute("class", "matchupHilite");
			activeCBSRoadID = cbsLiveScoringMatchups[currentGameHilighted]['road'][0];
			activeCBSHomeID = cbsLiveScoringMatchups[currentGameHilighted]['home'][0];
			lastPlayerUpdate = 0;  // reset my last player update time 
			clearTimeout(myMainScoreboardTimer);  //clear the timer
			myLoopCount=0;    //reset loop count
			mySecondsCount=0; //
			updateCBSMainScoreboard();
		}
		function setCBSNFLMatchup(whichGame) {
			if(whichGame>(cbsNFLLiveScoringMatchups.length-1)) currentNFLGameHilighted = 0; else currentNFLGameHilighted = whichGame;
			//reset all my links game hilights to original colour
			for(var x=0;x<cbsNFLLiveScoringMatchups.length;x++) document.getElementById("matchupNFL_" + x).parentNode.setAttribute("class", "matchupLolite");
			document.getElementById("matchupNFL_" + currentNFLGameHilighted).parentNode.setAttribute("class", "matchupHilite");
			activeCBSNFLRoadID = cbsNFLLiveScoringMatchups[currentNFLGameHilighted]['road'][0];
			activeCBSNFLHomeID = cbsNFLLiveScoringMatchups[currentNFLGameHilighted]['home'][0];
			lastPlayerUpdate = 0;  // reset my last player update time 
			clearTimeout(myMainScoreboardTimer);  //clear the timer
			myLoopCount=0;    //reset loop count
			mySecondsCount=0; //
			updateCBSMainScoreboard();
		}
		function startTheTimer() {
			mySecondsCount++;
			if(maxLoops!=0&&myLoopCount>maxLoops) { //stop the refreshes to conserve JSON executions
				document.getElementById("cbsScoreboardMessage").innerHTML="<span id='cbsScoreboardMessageResetTimer' onclick='checkCBSMatchup()'>Click to Restart</span>";
			} else {
				if (mySecondsCount>refreshSeconds) {
					clearTimeout(myMainScoreboardTimer);  //clear the timer
					mySecondsCount=0;
					//document.getElementById("cbsScoreboardMessage").innerHTML="Updating . . . ";
					updateCBSMainScoreboard();
					myLoopCount++;
				} else {
					var myCountdownSeconds = refreshSeconds-mySecondsCount;
					if(myCountdownSeconds<10) myCountdownSeconds="00:0"+myCountdownSeconds; else myCountdownSeconds="00:"+myCountdownSeconds;
					if((refreshSeconds-mySecondsCount)==0) { 
						document.getElementById("cbsScoreboardMessage").innerHTML="Updating . . . ";
					} else {
						document.getElementById("cbsScoreboardMessage").innerHTML="Next Update: "+myCountdownSeconds;
					}
					myMainScoreboardTimer = setTimeout("startTheTimer()", 1000);  // set timer to refresh the main scoreboard
				}
			}
		}
		function updateCBSMainScoreboard () {
			if (document.getElementById) {

				// MY LIVE SCORING ARRAY IS A MULTI-DIMENSIONAL ARRAY
				// liveScoring[0] contains an array that has team info
				// liveScoring[1] contains an array that has player info
				
				// liveScoring[0][fid][0] ==> team score
				// liveScoring[0][fid][1] ==> gameSecondsRemaining
				// liveScoring[0][fid][2] ==> players yet to play
				// liveScoring[0][fid][3] ==> players currently playing
				// liveScoring[1][pid] ==> player score
				// liveScoring[2][0] ==> matchup[0] game seconds remaining
				var liveScoring = new Array();
				if(cbsCurrentWeek<=completedWeek) { //use weekly results file
					$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, liveScoringResultsData: {'USER_ID': userCookieValue}}).done(function (liveScoringResultsData) {
						liveScoring = getCBSLiveScoringResultsData(liveScoringResultsData,2);
						liveScoringResultsData=null;
					});
				} else { //use live scoring file
					$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=liveScoring&L="+league_id+"&W="+cbsCurrentWeek+"&DETAILS=1&JSON=1&rand=" + Math.random(), async: false, liveScoringResultsData: {'USER_ID': userCookieValue}}).done(function (liveScoringResultsData) {
						liveScoring = getCBSLiveScoringResultsData(liveScoringResultsData,1);
						liveScoringResultsData=null;
					});
				}
				var nflSchedule = new Array();
				$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, nflScheduleData: {'USER_ID': userCookieValue}}).done(function (nflScheduleData) {
					nflSchedule = getCBSNFLSchedule(nflScheduleData);
					nflScheduleData=null;
				});	

				if(lastPlayerUpdate==0) { //set both arrays to the current live scoring
					playerUpdates[0] = liveScoring[1];
					playerUpdates[1] = liveScoring[1];
					lastPlayerUpdate = myTimestamp();
//SOME TEST DATA					
//var tpid = '9064'; var tscore = 12.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10261'; var tscore = 9.7; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10273'; var tscore = 5.2; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '10302'; var tscore = 3.9; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '1600'; var tscore = 2.95; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8667'; var tscore = 3; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8252'; var tscore = 5.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '7260'; var tscore = 6; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
//var tpid = '8301'; var tscore = 9.5; addToPlayerUpdate(tpid, parseFloat(parseFloat(playerUpdates[1][tpid])).toFixed(precision), parseFloat(tscore-parseFloat(playerUpdates[1][tpid])).toFixed(precision),parseFloat(tscore).toFixed(precision));
				} else {
					if(parseFloat(myTimestamp()/60000)-parseFloat(lastPlayerUpdate/60000) > 0.5) { //it has been one minute since our last update so re-update
						playerUpdates[1] = playerUpdates[0];
						playerUpdates[0] = liveScoring[1];
						lastPlayerUpdate = myTimestamp();
						if(includePlayerUpdates) {
							var thisPlayerUpdated = new Array();
							for(var pid in liveScoring[1]) {
								if(parseInt(pid)>0) {
									try {
										if(thisPlayerUpdated[pid]==undefined) {
											if(parseFloat(playerUpdates[0][pid])!=parseFloat(playerUpdates[1][pid])) addToPlayerUpdate(pid, parseFloat(playerUpdates[1][pid]).toFixed(precision), parseFloat(parseFloat(playerUpdates[0][pid])-parseFloat(playerUpdates[1][pid])).toFixed(precision),parseFloat(playerUpdates[0][pid]).toFixed(precision));
											thisPlayerUpdated[pid]=1; // mark this player as being updated to avoid duplicate calls.
										}
									} catch(er) {
										// bad data
									}
								}
							}
						}
					}
				}				

				//UDPATE GAME MATCHUPS TEAM SCORES
				for (var i=1;i<=32;i++) { //need to loop more than one id for double header, triple header etc.
					for(var j=1;j<=cbsLeagueInfo[6];j++) {
						try {
							if(j<10) var fid = "000"+j; else var fid = "00"+j;
							var fidUnique = "fid_" + fid + i;
							document.getElementById(fidUnique).innerHTML = parseFloat(liveScoring[0][fid][0]).toFixed(precision);
							try {
								//UPDATE PACE SCORE IF APPLICABLE
								if(cbsLiveMode&&includeProjections&&liveScoring[3][fid]!=""){
									var fidPaceUnique = "fidPace_" + fid + i;
									document.getElementById(fidPaceUnique).innerHTML = parseFloat(liveScoring[3][fid]).toFixed(precision);
								}
							} catch(er) {
								// do nothing
							}
						} catch(er) {
							// do nothing
						}
					}
				}
				for (var i=1;i<=32;i++) { // update league avg
					try {
						var fid="AVG";
						var fidUnique = "fid_AVG" + i;
						document.getElementById(fidUnique).innerHTML = parseFloat(liveScoring[0][fid][0]).toFixed(precision);
					} catch(er) {
						// do nothing
					}
				}
				for (var i=0;i<liveScoring[2].length;i++) { // mark winners and losers for each matchup
					try {
						var gameSecondsRemaining = parseInt(liveScoring[2][i][0]);
						if(allPlaySetup||tempAllPlayCheck) var roadGameID = i + 1; else var roadGameID = liveScoring[2][i][1];
						var homeGameID = liveScoring[2][i][2];
						var roadID = liveScoring[2][i][3];
						var homeID = liveScoring[2][i][4];
						var roadScore = parseFloat(liveScoring[2][i][5]);
						var homeScore = parseFloat(liveScoring[2][i][6]);
						var roadResult = liveScoring[2][i][7];
						var homeResult = liveScoring[2][i][8];
						var fidWinUnique = "";
						if(roadResult=="W"&&fidWinUnique=="") fidWinUnique = "fidWin_" + roadID + roadGameID;
						if(homeResult=="W"&&fidWinUnique=="") fidWinUnique = "fidWin_" + homeID + homeGameID;
						if((roadScore>homeScore)&&gameSecondsRemaining==0&&fidWinUnique=="") fidWinUnique = "fidWin_" + roadID + roadGameID;
						if((homeScore>roadScore)&&gameSecondsRemaining==0&&fidWinUnique=="") fidWinUnique = "fidWin_" + homeID + homeGameID;
						if(fidWinUnique!="") document.getElementById(fidWinUnique).innerHTML = "<";
					} catch(er) {
						// do nothing
					}
				}
				for (var i=0;i<=liveScoring[2].length;i++) { // update fantasy game clock
					try {
						var cid="cid_"+i;
						var scoreClock = "";
						var gameSecondsRemaining = liveScoring[2][i][0];
						var maxTime = leagueAttributes['MaxStarters'] * 2 * 3600;
						var secondsRemaining = (gameSecondsRemaining/maxTime) * 3600;
						if (cbsCurrentWeek>liveScoringWeek) secondsRemaining = 3600;
						var kickoffTime = parseInt(nflTeamUpdate[cbsCurrentWeek][0].kickoff); // first kickoff  in week
						if (parseInt(secondsRemaining)==0) scoreClock = "Final";
						if (parseInt(secondsRemaining)==3600) {
							if(cbsCurrentWeek==liveScoringWeek) scoreClock = formatHabDate(new Date(kickoffTime*1000),"ddd  h:mm"); else scoreClock = formatHabDate(new Date(kickoffTime*1000),"ddd  MM/d  h:mm");
						}
						if (parseInt(secondsRemaining)==1800) scoreClock = "Half";
						if (parseInt(secondsRemaining)>0&&parseInt(secondsRemaining)<900) scoreClock = "4th&nbsp;-&nbsp;" + formatHabDate(new Date(parseInt(secondsRemaining)*1000),"m:ss");
						if (parseInt(secondsRemaining)>=900&&parseInt(secondsRemaining)<1800) scoreClock = "3rd&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-900)*1000),"m:ss");
						if (parseInt(secondsRemaining)>1800&&parseInt(secondsRemaining)<2700) scoreClock = "2nd&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-1800)*1000),"m:ss");
						if (parseInt(secondsRemaining)>=2700&&parseInt(secondsRemaining)<3600) scoreClock = "1st&nbsp;-&nbsp;" + formatHabDate(new Date((parseInt(secondsRemaining)-2700)*1000),"m:ss");
						document.getElementById(cid).innerHTML = scoreClock;
					} catch(er) {
						// do nothing
					}
				}				
				
				
				//UPDATE NFL MATCHUPS TEAM SCORE AND TIME REMAINING
				var nflIDArray = new Array('ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GBP','HOU','IND','JAC','KCC','MIA','MIN','NEP','NOS','NYG','NYJ','OAK','PHI','PIT','LAC','SEA','SFO','LAR','TBB','TEN','WAS');
				for(var i=0;i<nflIDArray.length;i++) {
					try { //update win marker if game seconds remaing is ZERO and if one of the soores is not ZERO and if this team's score > opponent team score
						if( validateAsNumber(nflSchedule[nflIDArray[i]][1])==0 && (validateAsNumber(nflSchedule[nflIDArray[i]][11])>0 || validateAsNumber(nflSchedule[nflIDArray[i]][13])>0) && (validateAsNumber(nflSchedule[nflIDArray[i]][11])>validateAsNumber(nflSchedule[nflIDArray[i]][13])) ) document.getElementById("fidWin_"+nflIDArray[i]).innerHTML = "<";
					} catch(er) { }
					try { //update score for this nfl team id if available
						if(nflSchedule[nflIDArray[i]][11]=="") document.getElementById("fid_"+nflIDArray[i]).innerHTML=""; else document.getElementById("fid_"+nflIDArray[i]).innerHTML=validateAsNumber(nflSchedule[nflIDArray[i]][11]);
					} catch(er) { }
					try { // update clock using home team id
						document.getElementById("nfl_"+nflIDArray[i]).innerHTML = nflSchedule[nflIDArray[i]][3];
					} catch(er) {} // error on road team
				}

				//UPDATE MAIN SCOREBOARD WITH FANTASY INFO
				document.getElementById("cbsCenterTop").innerHTML=cbsLeagueInfo[0];
				if(matchupsDisplayedIsFantasy) {
					if(activeCBSRoadID=="BYE")  var roadName="BYE";
					else if(activeCBSRoadID=="AVG") var roadName="AVG";
						else var roadName = franchiseDatabase['fid_' + activeCBSRoadID].name;
					if(activeCBSHomeID=="BYE") var homeName="BYE"; 
					else if(activeCBSHomeID=="AVG") var homeName="AVG"; 
						else var homeName = franchiseDatabase['fid_' + activeCBSHomeID].name;
					if(allPlaySetup||tempAllPlayCheck) var makeClickable = " onclick='swapAllPlayTeams();' style='cursor:pointer;' title='Swap Fantasy Teams'"; else var makeClickable="";
					if(scoreboardRoadImageFlip) var roadFlipCSS = " style='-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1);filter: FlipH;-ms-filter: \"FlipH\";'"; else var roadFlipCSS = "";
					if(scoreboardHomeImageFlip) var homeFlipCSS = " style='-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1);filter: FlipH;-ms-filter: \"FlipH\";'"; else var homeFlipCSS = "";
					if(scoreboardUseIcon||scoreboardUseLogo) {
						if(scoreboardIconBase!=""&&scoreboardIconExt!="") {
							var roadScoreboardTeam = "<img src='" + scoreboardIconBase + activeCBSRoadID + "." + scoreboardIconExt + "'"+roadFlipCSS+" alt='"+roadName+"' title='"+roadName+"'" +makeClickable+" />";
							var homeScoreboardTeam = "<img src='" + scoreboardIconBase + activeCBSHomeID + "." + scoreboardIconExt + "'"+homeFlipCSS+" alt='"+homeName+"' title='"+homeName+"'" +makeClickable+" />";
						} else if(scoreboardUseIcon) {
							var roadScoreboardTeam = "<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].icon + "'"+roadFlipCSS+" alt='"+roadName+"' title='"+roadName+"'"+makeClickable+" />";
							var homeScoreboardTeam = "<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].icon + "'"+homeFlipCSS+" alt='"+homeName+"' title='"+homeName+"'"+makeClickable+" />";
						} else {
							var roadScoreboardTeam = "<img src='" + franchiseDatabase['fid_' + activeCBSRoadID].logo + "'"+roadFlipCSS+" alt='"+roadName+"' title='"+roadName+"'"+makeClickable+" />";
							var homeScoreboardTeam = "<img src='" + franchiseDatabase['fid_' + activeCBSHomeID].logo + "'"+homeFlipCSS+" alt='"+homeName+"' title='"+homeName+"'"+makeClickable+" />";
						}
					} else if(scoreboardUseAbbrev) {
						var roadScoreboardTeam = "<div title='"+roadName+"'"+makeClickable+">"+franchiseDatabase['fid_' + activeCBSRoadID].abbrev+"</div>";
						var homeScoreboardTeam = "<div title='"+homeName+"'"+makeClickable+">"+franchiseDatabase['fid_' + activeCBSHomeID].abbrev+"</div>";
					} else {
						var roadScoreboardTeam = "<div"+makeClickable+">"+roadName+"</div>";
						var homeScoreboardTeam = "<div"+makeClickable+">"+homeName+"</div>";
					}
					if(activeCBSRoadID=="AVG") document.getElementById("cbsRoadTeamName").innerHTML="League Avg"; else document.getElementById("cbsRoadTeamName").innerHTML=roadScoreboardTeam;
					if(activeCBSHomeID=="AVG") document.getElementById("cbsHomeTeamName").innerHTML="League Avg"; else document.getElementById("cbsHomeTeamName").innerHTML=homeScoreboardTeam;
					
					if(numberImageDir!=""&&(numberImageExt=="gif"||numberImageExt=="GIF"||numberImageExt=="png"||numberImageExt=="PNG"||numberImageExt=="jpg"||numberImageExt=="JPG"||numberImageExt=="bmp"||numberImageExt=="bmp")) {
						var myRoadScore = convertToImage(parseFloat(liveScoring[0][activeCBSRoadID][0]).toFixed(precision));
						var myHomeScore = convertToImage(parseFloat(liveScoring[0][activeCBSHomeID][0]).toFixed(precision));
					} else {
						var myRoadScore = parseFloat(liveScoring[0][activeCBSRoadID][0]).toFixed(precision);
						var myHomeScore = parseFloat(liveScoring[0][activeCBSHomeID][0]).toFixed(precision);
					}
					document.getElementById("cbsRoadScore").innerHTML=myRoadScore;
					document.getElementById("cbsHomeScore").innerHTML=myHomeScore;
					document.getElementById("cbsRoadTeamRecord").innerHTML=cbsTeamWLT[activeCBSRoadID];
					document.getElementById("cbsHomeTeamRecord").innerHTML=cbsTeamWLT[activeCBSHomeID];
					document.getElementById("cbsRoadPlayers").innerHTML=liveScoring[0][activeCBSRoadID][3];
					document.getElementById("cbsHomePlayers").innerHTML=liveScoring[0][activeCBSHomeID][3];
					document.getElementById("cbsRoadPMR").innerHTML=parseInt(liveScoring[0][activeCBSRoadID][1]/60);
					document.getElementById("cbsHomePMR").innerHTML=parseInt(liveScoring[0][activeCBSHomeID][1]/60);
					document.getElementById("cbsRoadYTP").innerHTML=liveScoring[0][activeCBSRoadID][2];
					document.getElementById("cbsHomeYTP").innerHTML=liveScoring[0][activeCBSHomeID][2];
					
					document.getElementById("cbsRoadLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSRoadID,nflSchedule);
					document.getElementById("cbsHomeLineup").innerHTML = cbsPopulateLineupTable(liveScoring,activeCBSHomeID,nflSchedule);
				
				} else {

					var roadIconArray=getNFLBoxscoreIcon(activeCBSNFLRoadID,52);
					var homeIconArray=getNFLBoxscoreIcon(activeCBSNFLHomeID,52);
					var roadName = roadIconArray[0];
					var homeName = homeIconArray[0];
					if(scoreboardUseIcon||scoreboardUseLogo) {
						var roadScoreboardTeam = "<table style='text-align:center; display:inline-table; border-collapse:collapse'><tr><td><div style='width:"+roadIconArray[2]+"px; overflow:hidden;'><img src='" + nflLogoSprite + "' style='max-height:2000px; max-width:2000px; height:"+roadIconArray[2]+"px; position:relative; left:"+roadIconArray[1]+"px' title='"+roadIconArray[0]+"' /></div></td></tr></table>";
						var homeScoreboardTeam = "<table style='text-align:center; display:inline-table; border-collapse:collapse'><tr><td><div style='width:"+homeIconArray[2]+"px; overflow:hidden;'><img src='" + nflLogoSprite + "' style='max-height:2000px; max-width:2000px; height:"+homeIconArray[2]+"px; position:relative; left:"+homeIconArray[1]+"px' title='"+homeIconArray[0]+"' /></div></td></tr></table>";
					} else if(scoreboardUseAbbrev) {
						var roadScoreboardTeam = "<div title='"+roadName+"'>"+activeCBSNFLHomeID+"</div>";
						var homeScoreboardTeam = "<div title='"+homeName+"'>"+activeCBSNFLHomeID+"</div>";
					} else {
						var roadScoreboardTeam = "<div>"+roadName+"</div>";
						var homeScoreboardTeam = "<div>"+homeName+"</div>";
					}
					document.getElementById("cbsRoadTeamName").innerHTML=roadScoreboardTeam;
					document.getElementById("cbsHomeTeamName").innerHTML=homeScoreboardTeam;
					
					if(numberImageDir!=""&&(numberImageExt=="gif"||numberImageExt=="GIF"||numberImageExt=="png"||numberImageExt=="PNG"||numberImageExt=="jpg"||numberImageExt=="JPG"||numberImageExt=="bmp"||numberImageExt=="bmp")) {
						var myRoadScore = convertToImage(validateAsNumber(nflSchedule[activeCBSNFLRoadID][11]).toFixed(0));
						var myHomeScore = convertToImage(validateAsNumber(nflSchedule[activeCBSNFLHomeID][11]).toFixed(0));
					} else {
						var myRoadScore = validateAsNumber(nflSchedule[activeCBSNFLRoadID][11]).toFixed(0);
						var myHomeScore = validateAsNumber(nflSchedule[activeCBSNFLHomeID][11]).toFixed(0);
					}
					document.getElementById("cbsRoadScore").innerHTML=myRoadScore;
					document.getElementById("cbsHomeScore").innerHTML=myHomeScore;
					try { document.getElementById("cbsRoadTeamRecord").innerHTML="("+cbsNFLTeamWLT[activeCBSNFLRoadID][0]+"-"+cbsNFLTeamWLT[activeCBSNFLRoadID][1]+"-"+cbsNFLTeamWLT[activeCBSNFLRoadID][2]+")"; } catch(er) { document.getElementById("cbsRoadTeamRecord").innerHTML = "(0-0-0)"; } //cbsTeamWLT[activeCBSNFLRoadID];
					try { document.getElementById("cbsHomeTeamRecord").innerHTML="("+cbsNFLTeamWLT[activeCBSNFLHomeID][0]+"-"+cbsNFLTeamWLT[activeCBSNFLHomeID][1]+"-"+cbsNFLTeamWLT[activeCBSNFLHomeID][2]+")"; } catch(er) { document.getElementById("cbsHomeTeamRecord").innerHTML = "(0-0-0)"; }//cbsTeamWLT[activeCBSNFLHomeID];
					document.getElementById("cbsRoadPlayers").innerHTML="-";
					document.getElementById("cbsHomePlayers").innerHTML="-";
					document.getElementById("cbsRoadPMR").innerHTML="-";
					document.getElementById("cbsHomePMR").innerHTML="-";
					document.getElementById("cbsRoadYTP").innerHTML="-";
					document.getElementById("cbsHomeYTP").innerHTML="-";
					
					document.getElementById("cbsRoadLineup").innerHTML = cbsPopulateNFLLineupTable(activeCBSNFLRoadID,nflSchedule);
					document.getElementById("cbsHomeLineup").innerHTML = cbsPopulateNFLLineupTable(activeCBSNFLHomeID,nflSchedule);
				
				}
				
				setMatchupsToDisplay(false);  // hide/show fantasy matchups or NFL Matchups (false = do not flip)
			}
			if(cbsCurrentWeek<liveScoringWeek) 
				document.getElementById("cbsScoreboardMessage").innerHTML="Week #"+cbsCurrentWeek+" Results" ;
			else if (cbsCurrentWeek>liveScoringWeek) 
				document.getElementById("cbsScoreboardMessage").innerHTML="Week #"+cbsCurrentWeek+" Matchups" ;
			else startTheTimer();
			try { PlayerPopup.renderIcons(); } catch(er) {}
		}
		function updateCurrentWeekSetup(newWeek) {
			var prevWeek = cbsCurrentWeek;
			cbsCurrentWeek = parseInt(newWeek);
			if(matchupsDisplayedIsFantasy) 
				document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchupsUpdate' style='height:"+$("#myMiddleTableHolder").height()+"px'>Populating Week "+cbsCurrentWeek+" . . . Please Wait</div>";
			else
				document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsNFLMatchupsUpdate' style='height:"+$("#myMiddleTableHolder").height()+"px'>Populating Week "+cbsCurrentWeek+" . . . Please Wait</div>";
			if(cbsCurrentWeek!=liveScoringWeek||liveScoringWeek==completedWeek) cbsLiveMode = false; else cbsLiveMode = true;
			if(includePlayerUpdates) if(cbsLiveMode) document.getElementById("playerUpdateContainer").style.display="table"; else document.getElementById("playerUpdateContainer").style.display="none";
			setTimeout("updateCurrentWeek()",100);
		}
		function updateCurrentWeek() {
			//we need to reload projections (if used)
			if(includeProjections) {
				//including &rand=Math.random() in fantasy projections causes my week parameter to fail
				$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1", async: false, projectionsData: {'USER_ID': userCookieValue}}).done(function (projectionsData) {
					for(var i=0; i<projectionsData.projectedScores.playerScore.length; i++) {
						if(projectionsData.projectedScores.playerScore[i].score.length==0)
							fsProjections[projectionsData.projectedScores.playerScore[i].id] = 0;
						else
							fsProjections[projectionsData.projectedScores.playerScore[i].id] = projectionsData.projectedScores.playerScore[i].score;
					}
					projectionsData=null;
				});
			}
			//we need to update weekly fantasy matchups and nfl matchups
			var myBoxScoreTables = createBoxScoreTables();
			var myNFLBoxScoreTables = createNFLBoxScoreTables();
			if(matchupsDisplayedIsFantasy) {
				document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups' style='display:none'>" + myNFLBoxScoreTables + "</div>";
			} else {
				document.getElementById("myMiddleTableHolder").innerHTML = "<div id='cbsFantasyMatchups' style='display:none'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups'>" + myNFLBoxScoreTables + "</div>";
			}
			//we need to update navigation (if used but obviously it is being used)
			if (includeWeeklyNavigation) document.getElementById("myNavigationHolder").innerHTML = createWeeklyNavigation();
			//update our global rosterData
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, weeklyResultsData: {'USER_ID': userCookieValue}}).done(function (weeklyResultsData) {
				//rosterData[fid][ nonstarters, starters, (tiebreaker) ]
				rosterData = getCBSRosterDataFromWeeklyResults(weeklyResultsData);
				weeklyResultsData=null;
			});
			//update the scoreboard
			currentNFLGameHilighted = 0; //force hilighted game to be first nfl game for nfl schedule
			checkCBSMatchup();
		}
	//====================================================================================
	// OTHER FUNCTIONS
	//====================================================================================
		function formatName(name) {
			var tempname = name;
			var tempname = tempname.replace(/'/g,"&rsquo;");
			var commapos = tempname.search(",");
			var len  = tempname.length;
			tempname = tempname.substr(commapos+2,len)+ " " + tempname.substr(0,commapos);
			tempname = tempname.replace(/ /g,"&nbsp;");
			return tempname;
		}
		function formatEscapeCharacter(name) {
			var tempname = name;
			var tempname = tempname.replace(/'/g,"&rsquo;");
			return tempname;
		}
		function validateAsNumber(thisText) {
			var tempValue = parseFloat(thisText);
			if(isNaN(tempValue))
				return 0;
			else 
				return tempValue;
		}
		function formatHabDate(date, format, utc) {
			var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

			function ii(i, len) {
				var s = i + "";
				len = len || 2;
				while (s.length < len) s = "0" + s;
				return s;
			}

			var y = utc ? date.getUTCFullYear() : date.getFullYear();
			format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
			format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
			format = format.replace(/(^|[^\\])y/g, "$1" + y);

			var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
			format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
			format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
			format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
			format = format.replace(/(^|[^\\])M/g, "$1" + M);

			var d = utc ? date.getUTCDate() : date.getDate();
			format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
			format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
			format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
			format = format.replace(/(^|[^\\])d/g, "$1" + d);

			var H = utc ? date.getUTCHours() : date.getHours();
			format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
			format = format.replace(/(^|[^\\])H/g, "$1" + H);

			var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
			format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
			format = format.replace(/(^|[^\\])h/g, "$1" + h);

			var m = utc ? date.getUTCMinutes() : date.getMinutes();
			format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
			format = format.replace(/(^|[^\\])m/g, "$1" + m);

			var s = utc ? date.getUTCSeconds() : date.getSeconds();
			format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
			format = format.replace(/(^|[^\\])s/g, "$1" + s);

			var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
			format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
			f = Math.round(f / 10);
			format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
			f = Math.round(f / 10);
			format = format.replace(/(^|[^\\])f/g, "$1" + f);

			var T = H < 12 ? "AM" : "PM";
			format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
			format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

			var t = T.toLowerCase();
			format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
			format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

			var tz = -date.getTimezoneOffset();
			var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
			if (!utc) {
				tz = Math.abs(tz);
				var tzHrs = Math.floor(tz / 60);
				var tzMin = tz % 60;
				K += ii(tzHrs) + ":" + ii(tzMin);
			}
			format = format.replace(/(^|[^\\])K/g, "$1" + K);

			var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
			format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
			format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

			format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
			format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

			format = format.replace(/\\(.)/g, "$1");

			return format;
		}
		function reloadThisPage() {
			setTimeout("window.location.reload()",1000);
		}
		function checkIframeContents() {
			if(myIframeInnerHTML.indexOf("Lineup Not Accepted!")>0) alert("Uh Oh! Your submission appears to not have been valid.\n\nTry Again.\n\nIf you continue to have problems use the normal lineup submission form!");
		}
		function setMatchupsToDisplay(flip) {
			try {
				if(flip)matchupsDisplayedIsFantasy=!matchupsDisplayedIsFantasy;
				if(matchupsDisplayedIsFantasy) {
					document.getElementById("cbsFantasyMatchups").style.display = "inline";
					document.getElementById("cbsNFLMatchups").style.display = "none";
					document.getElementById("cbsBlank").innerHTML = "<div onmouseover=\"document.mfl_icon.src='"+mflIconImage2+"'\" onmouseout=\"document.mfl_icon.src='"+mflIconImage+"'\"><img src='"+mflIconImage+"' name='mfl_icon' /></div>";
				} else {
					document.getElementById("cbsFantasyMatchups").style.display = "none";
					document.getElementById("cbsNFLMatchups").style.display = "inline";
					document.getElementById("cbsBlank").innerHTML = "<div onmouseover=\"document.nfl_icon.src='"+nflIconImage2+"'\" onmouseout=\"document.nfl_icon.src='"+nflIconImage+"'\"><img src='"+nflIconImage+"' name='nfl_icon' /></div>";
				}
				if(flip)checkCBSMatchup();
			} catch(er) {
				//do nothing
			}
		}
		function getNFLBoxscoreIcon(id,baseWidth) {
			switch (id) {
				case 'ARI' : { var offsetLeft=1;  var imagetitle="Arizona Cardinals"; break; }
				case 'ATL' : { var offsetLeft=2;  var imagetitle="Atlanta Falcons"; break; }
				case 'BAL' : { var offsetLeft=3;  var imagetitle="Baltimore Ravens"; break; }
				case 'BUF' : { var offsetLeft=4;  var imagetitle="Buffalo Bills"; break; }
				case 'CAR' : { var offsetLeft=5;  var imagetitle="Carolina Panthers"; break; }
				case 'CHI' : { var offsetLeft=6;  var imagetitle="Chicago Bears"; break; }
				case 'CIN' : { var offsetLeft=7;  var imagetitle="Cincinnati Bengals"; break; }
				case 'CLE' : { var offsetLeft=8;  var imagetitle="Cleveland Browns"; break; }
				case 'DAL' : { var offsetLeft=9;  var imagetitle="Dallas Cowboys"; break; }
				case 'DEN' : { var offsetLeft=10; var imagetitle="Denver Broncos"; break; }
				case 'DET' : { var offsetLeft=11; var imagetitle="Detroit Lions"; break; }
				case 'GBP' : { var offsetLeft=12; var imagetitle="Green Bay Packers"; break; }
				case 'HOU' : { var offsetLeft=13; var imagetitle="Houston Texans"; break; }
				case 'IND' : { var offsetLeft=14; var imagetitle="Indianapolis Colts"; break; }
				case 'JAC' : { var offsetLeft=15; var imagetitle="Jacksonville Jaguars"; break; }
				case 'KCC' : { var offsetLeft=16; var imagetitle="Kansas City Chiefs"; break; }
				case 'MIA' : { var offsetLeft=17; var imagetitle="Miami Dolphins"; break; }
				case 'MIN' : { var offsetLeft=18; var imagetitle="Minnesota Vikings"; break; }
				case 'NEP' : { var offsetLeft=19; var imagetitle="New England Patriots"; break; }
				case 'NOS' : { var offsetLeft=20; var imagetitle="New Orleans Saints"; break; }
				case 'NYG' : { var offsetLeft=21; var imagetitle="New York Giants"; break; }
				case 'NYJ' : { var offsetLeft=22; var imagetitle="New York Jets"; break; }
				case 'OAK' : { var offsetLeft=23; var imagetitle="Oakland Raiders"; break; }
				case 'PHI' : { var offsetLeft=24; var imagetitle="Philadelphia Eagles"; break; }
				case 'PIT' : { var offsetLeft=25; var imagetitle="Pittsburgh Steelers"; break; }
				case 'LAC' : { var offsetLeft=26; var imagetitle="Los Angeles Chargers"; break; }
				case 'SEA' : { var offsetLeft=27; var imagetitle="Seattle Seahawks"; break; }
				case 'SFO' : { var offsetLeft=28; var imagetitle="San Francisco 49ers"; break; }
				case 'LAR' : { var offsetLeft=29; var imagetitle="Los Angeles Rams"; break; }
				case 'TBB' : { var offsetLeft=30; var imagetitle="Tampa Bay Buccaneers"; break; }
				case 'TEN' : { var offsetLeft=31; var imagetitle="Tennessee Titans"; break; }
				case 'WAS' : { var offsetLeft=32; var imagetitle="Washington Redskins"; break; }
				default    : { var offsetLeft=0;  var imagetitle = ''; break; }
			}
			offsetLeft = (offsetLeft-1)*(-baseWidth);
			var myNFLIconArray = new Array(imagetitle,offsetLeft,baseWidth);
			return myNFLIconArray;
		}
		function getNFLTeamIdFromNickname(nickname) {
			switch (nickname) {
				case 'Cardinals'  : { var teamID = "ARI"; break; }
				case 'Falcons'    : { var teamID = "ATL"; break; }
				case 'Ravens'     : { var teamID = "BAL"; break; }
				case 'Bills'      : { var teamID = "BUF"; break; }
				case 'Panthers'   : { var teamID = "CAR"; break; }
				case 'Bears'      : { var teamID = "CHI"; break; }
				case 'Bengals'    : { var teamID = "CIN"; break; }
				case 'Browns'     : { var teamID = "CLE"; break; }
				case 'Cowboys'    : { var teamID = "DAL"; break; }
				case 'Broncos'    : { var teamID = "DEN"; break; }
				case 'Lions'      : { var teamID = "DET"; break; }
				case 'Packers'    : { var teamID = "GBP"; break; }
				case 'Texans'     : { var teamID = "HOU"; break; }
				case 'Colts'      : { var teamID = "IND"; break; }
				case 'Jaguars'    : { var teamID = "JAC"; break; }
				case 'Chiefs'     : { var teamID = "KCC"; break; }
				case 'Dolphins'   : { var teamID = "MIA"; break; }
				case 'Vikings'    : { var teamID = "MIN"; break; }
				case 'Patriots'   : { var teamID = "NEP"; break; }
				case 'Saints'     : { var teamID = "NOS"; break; }
				case 'Giants'     : { var teamID = "NYG"; break; }
				case 'Jets'       : { var teamID = "NYJ"; break; }
				case 'Raiders'    : { var teamID = "OAK"; break; }
				case 'Eagles'     : { var teamID = "PHI"; break; }
				case 'Steelers'   : { var teamID = "PIT"; break; }
				case 'Chargers'   : { var teamID = "LAC"; break; }
				case 'Seahawks'   : { var teamID = "SEA"; break; }
				case '49ers'      : { var teamID = "SFO"; break; }
				case 'Rams'       : { var teamID = "LAR"; break; }
				case 'Buccaneers' : { var teamID = "TBB"; break; }
				case 'Titans'     : { var teamID = "TEN"; break; }
				case 'Redskins'   : { var teamID = "WAS"; break; }
				default           : { var teamID = nickname; break; }
			}
			return teamID;
		}
		function getPositionSortNumber(pos) {
			switch(pos) {
				case 'Coach': var sortNum=1; break;
				case 'QB'   : var sortNum=2; break;
				case 'TMQB' : var sortNum=3; break;
				case 'RB'   : var sortNum=4; break;
				case 'TMRB' : var sortNum=5; break;
				case 'FB'   : var sortNum=6; break;
				case 'WR'   : var sortNum=7; break;
				case 'TMWR' : var sortNum=8; break;
				case 'TE'   : var sortNum=9; break;
				case 'TMTE' : var sortNum=10; break;
				case 'KR'   : var sortNum=11; break;
				case 'PK'   : var sortNum=12; break;
				case 'TMPK' : var sortNum=13; break;
				case 'PN'   : var sortNum=14; break;
				case 'TMPN' : var sortNum=15; break;
				case 'DE'   : var sortNum=16; break;
				case 'DT'   : var sortNum=17; break;
				case 'TMDL' : var sortNum=18; break;
				case 'LB'   : var sortNum=19; break;
				case 'TMLB' : var sortNum=20; break;
				case 'CB'   : var sortNum=21; break;
				case 'S'    : var sortNum=22; break;
				case 'TMDB' : var sortNum=23; break;
				case 'Off'  : var sortNum=24; break;
				case 'Def'  : var sortNum=25; break;
				case 'ST'   : var sortNum=26; break;
				default     : var sortNum=99; break;
			}
			//if(sortNum==99) alert(pos);
			return sortNum;
		}
		function sortby(i) {
			return function (a, b) {
				a = parseFloat(a[i]);
				b = parseFloat(b[i]);
				if (typeof a == 'number') {
					return a - b;
				}
				else {
					return a == b ? 0 : (a < b ? -1 : 1);
				}
			}
		}

		function convertToImage(myScore) {
			//replace all letters to letter equivalents
			var str = myScore;
			while (str.indexOf("1")>=0||str.indexOf("2")>=0||str.indexOf("3")>=0||str.indexOf("4")>=0||str.indexOf("5")>=0||str.indexOf("6")>=0||str.indexOf("7")>=0||str.indexOf("8")>=0||str.indexOf("9")>=0||str.indexOf("0")>=0||str.indexOf(".")>=0) {
				str=str.replace("1","aaa");
				str=str.replace("2","bbb");
				str=str.replace("3","ccc");
				str=str.replace("4","ddd");
				str=str.replace("5","eee");
				str=str.replace("6","fff");
				str=str.replace("7","ggg");
				str=str.replace("8","hhh");
				str=str.replace("9","iii");
				str=str.replace("0","jjj");
				str=str.replace(".","kkk");
			}
			while (str.indexOf("aaa")>=0||str.indexOf("bbb")>=0||str.indexOf("ccc")>=0||str.indexOf("ddd")>=0||str.indexOf("eee")>=0||str.indexOf("fff")>=0||str.indexOf("ggg")>=0||str.indexOf("hhh")>=0||str.indexOf("iii")>=0||str.indexOf("jjj")>=0||str.indexOf("kkk")>=0) {
				str=str.replace("aaa","<img src='"+numberImageDir+"1."+numberImageExt+"' />");
				str=str.replace("bbb","<img src='"+numberImageDir+"2."+numberImageExt+"' />");
				str=str.replace("ccc","<img src='"+numberImageDir+"3."+numberImageExt+"' />");
				str=str.replace("ddd","<img src='"+numberImageDir+"4."+numberImageExt+"' />");
				str=str.replace("eee","<img src='"+numberImageDir+"5."+numberImageExt+"' />");
				str=str.replace("fff","<img src='"+numberImageDir+"6."+numberImageExt+"' />");
				str=str.replace("ggg","<img src='"+numberImageDir+"7."+numberImageExt+"' />");
				str=str.replace("hhh","<img src='"+numberImageDir+"8."+numberImageExt+"' />");
				str=str.replace("iii","<img src='"+numberImageDir+"9."+numberImageExt+"' />");
				str=str.replace("jjj","<img src='"+numberImageDir+"0."+numberImageExt+"' />");
				str=str.replace("kkk","<img src='"+numberImageDir+"dot."+numberImageExt+"' />");
			}
			for (var i=0;i<(parseInt(numberImageMinimumDigits)-myScore.length);i++) {
				str = "<img src='"+numberImageDir+"blank."+numberImageExt+"' />"+str;
			}
			return str;
		}
		function playerPosType(pid) {
			var posType = "na";
			try {
				if (cbsPlayerInfo[pid][2]=="QB"||cbsPlayerInfo[pid][2]=="WR"||cbsPlayerInfo[pid][2]=="TE"||cbsPlayerInfo[pid][2]=="TMQB"||cbsPlayerInfo[pid][2]=="TMTE") posType = "OffPass";
				if (cbsPlayerInfo[pid][2]=="RB") posType = "OffRush";
				if (cbsPlayerInfo[pid][2]=="PK"||cbsPlayerInfo[pid][2]=="PN"||cbsPlayerInfo[pid][2]=="TMPK"||cbsPlayerInfo[pid][2]=="TMPN"||cbsPlayerInfo[pid][2]=="Coach"||cbsPlayerInfo[pid][2]=="ST"||cbsPlayerInfo[pid][2]=="Off") posType = "OffAvg";
				if (cbsPlayerInfo[pid][2]=="DE"||cbsPlayerInfo[pid][2]=="DT"||cbsPlayerInfo[pid][2]=="TMDL"||cbsPlayerInfo[pid][2]=="LB"||cbsPlayerInfo[pid][2]=="TMLB"||cbsPlayerInfo[pid][2]=="CB"||cbsPlayerInfo[pid][2]=="S"||cbsPlayerInfo[pid][2]=="TMDB"||cbsPlayerInfo[pid][2]=="Def") posType = "DefAvg";
			} catch(er) {
				// player not in database
			}
			return posType;
		}
		function setupDoubleHeaderArray() {
			//need to count the number of games a fantasy team plays in a week so that we can
			//set up different id's to appear in the fantasy week scoreboard
			for(var i=1;i<=cbsLeagueInfo[6];i++) {
				if(i<10) var fid = "000"+i; else var fid = "00"+i;
				doubleHeader[fid]=0;
			}
			doubleHeader['AVG']=0;
		}
		function swapAllPlayTeams() {
			currentAllPlayTeam = activeCBSHomeID;
			activeCBSHomeID = activeCBSRoadID;
			activeCBSRoadID = currentAllPlayTeam;
			updateCurrentWeekSetup(cbsCurrentWeek);
		}
		function myTimestamp() {
			//time stamp is in milliseconds
			//there are 60,000 milliseconds in one minute
			var d = new Date();
			var x = d.getTime();
			return x;
		}
		function teamRadioFilter(which) {
			radioButtonValue=which;
			selectBoxValue="";
			updatePlayerUpdates();
		}
		function playerRadioFilter(which) {
			radioButtonValue2=which;
			selectBoxValue2="";
			switch(which) {
				case 1: radioButtonValue2Str = 'All'; selectBoxValue2='All'; break;
				case 2: radioButtonValue2Str = 'Starter'; break;
				default: radioButtonValue2Str = ''; break;
			}
			updatePlayerUpdates();
		}
		function teamSelectFilter() {
			var x=document.getElementById("fantasyteamselect").selectedIndex;
			selectBoxValue = document.teamform.getElementsByTagName("option")[x].value;
			radioButtonValue=-1;
			updatePlayerUpdates();
		}
		function playerSelectFilter() {
			var x=document.getElementById("fantasyplayerselect").selectedIndex;
			selectBoxValue2 = document.playerform.getElementsByTagName("option")[x].value;
			radioButtonValue2=-1;
			radioButtonVaule2Str = "";
			updatePlayerUpdates();
		}
		function addToPlayerUpdate(pid,ptOriginal,ptChange,ptCumulative) { // remove fid and fname
			var d = new Date();
			var hour = d.getHours();
			var minutes = d.getMinutes();
			var seconds = d.getSeconds();
			if (hour>12) hour=hour-12;
			if (hour==0) hour=12;
			if (minutes<10) minutes="0" + minutes;
			if (seconds<10) seconds="0" + seconds;
			for(var x=0;x<cbsRosterInfo[pid].length;x++) {  // player may be on more than one team so we need to loop
				var fid = cbsRosterInfo[pid][x][0];
				var fname = franchiseDatabase['fid_'+fid].name;
				//playerUpdateHistory = (time, player name pos team, fantasy team, pt change, pt cumulative, pid, fid); 
				playerUpdateHistory[playerUpdateHistory.length] = new Array(hour+":"+minutes+":"+seconds, cbsPlayerInfo[pid][0], cbsPlayerInfo[pid][2], cbsPlayerInfo[pid][1], fname, ptChange, ptOriginal, ptCumulative, pid, fid);
			}
			updatePlayerUpdates();
		}
		function getCBSCookieValue(name) {
			name = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name) == 0) 
					return c.substring(name.length, c.length);
			}
			return "";
		}
		function disableEnterKey(e) {
			var key;      
			if(window.event)
				key = window.event.keyCode; //IE
			else
				key = e.which; //firefox      
			return (key != 13);
		} 
		function initialJSONCalls() {
			//ASYNC = TRUE CALLS
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=standings&L="+league_id+"&JSON=1&rand=" + Math.random(), async: true, standingsData: {'USER_ID': userCookieValue}}).done(function (standingsData) {
				for (var i=0;i<standingsData.standings.franchise.length;i++) cbsTeamWLT[standingsData.standings.franchise[i].id] = "("+standingsData.standings.franchise[i].h2hw.$t+"-"+standingsData.standings.franchise[i].h2hl.$t+"-"+standingsData.standings.franchise[i].h2ht.$t+")";  
				standingsData=null;
			});
				
			if(includeCustomPlayers) var playerURL = habBaseURL+"/"+year+"/export?TYPE=players&L="+league_id+"&JSON=1&rand=" + Math.random(); else var playerURL = habBaseURL+"/"+year+"/export?TYPE=players&JSON=1&rand=" + Math.random();
			$.ajax({type: 'GET',url: playerURL, async: true, playerData: {'USER_ID': userCookieValue}}).done(function (playerData) {
				for(var i=0; i<playerData.players.player.length; i++) cbsPlayerInfo[playerData.players.player[i].id] = new Array(formatName(playerData.players.player[i].name), playerData.players.player[i].team, playerData.players.player[i].position);
				playerData=null;
			});

			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=injuries&W="+liveScoringWeek+"&JSON=1&rand=" + Math.random(), async: true, injuryData: {'USER_ID': userCookieValue}}).done(function (injuryData) {
				for(var i=0; i<injuryData.injuries.injury.length; i++) {
					if(injuryData.injuries.injury[i].status.substring(0,1)=="I") var injuryCode = "IR"; else var injuryCode = injuryData.injuries.injury[i].status.substring(0,1);
					cbsInjuryInfo[injuryData.injuries.injury[i].id] = new Array(injuryCode, injuryData.injuries.injury[i].status, formatEscapeCharacter(injuryData.injuries.injury[i].details));
				}
				injuryData=null;
			});
		
			for(var i=1;i<=completedWeek;i++) {
				$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=nflSchedule&W="+i+"&JSON=1&rand=" + Math.random(), async: true, nflScheduleData: {'USER_ID': userCookieValue}}).done(function (nflScheduleData) {
					for(var j=0;j<nflScheduleData.nflSchedule.matchup.length;j++) {
						if(cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[0].id]==undefined) cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[0].id] = new Array(0,0,0);
						if(cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[1].id]==undefined) cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[1].id] = new Array(0,0,0);
						if(validateAsNumber(nflScheduleData.nflSchedule.matchup[j].team[0].score)>validateAsNumber(nflScheduleData.nflSchedule.matchup[j].team[1].score)) {
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[0].id][0]++;
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[1].id][1]++;
						} else if(validateAsNumber(nflScheduleData.nflSchedule.matchup[j].team[0].score)<validateAsNumber(nflScheduleData.nflSchedule.matchup[j].team[1].score)) {
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[0].id][1]++;
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[1].id][0]++;
						} else {
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[0].id][2]++;
							cbsNFLTeamWLT[nflScheduleData.nflSchedule.matchup[j].team[1].id][2]++;
						}
					}
				});
			}
					
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=rosters&L="+league_id+"&JSON=1&rand=" + Math.random(), async: true, rostersData: {'USER_ID': userCookieValue}}).done(function (rostersData) {
				for(var i=0; i<rostersData.rosters.franchise.length; i++) {
					for(var j=0;j<rostersData.rosters.franchise[i].player.length; j++) {
						var statusID = rostersData.rosters.franchise[i].player[j].status;
						try {
							var status = statusID;
							if(statusID=="ROSTER") status="Roster";
							if(statusID=="TAXI_SQUAD") status="Taxi Squad";
							if(statusID=="INJURED_RESERVE") status="IR";
							if(status=="Roster") var playingStatus="Bench"; else var playingStatus=status;
							if(cbsRosterInfo[rostersData.rosters.franchise[i].player[j].id]==undefined) cbsRosterInfo[rostersData.rosters.franchise[i].player[j].id] = new Array();
							cbsRosterInfo[rostersData.rosters.franchise[i].player[j].id][cbsRosterInfo[rostersData.rosters.franchise[i].player[j].id].length] = new Array(rostersData.rosters.franchise[i].id,status,playingStatus,rostersData.rosters.franchise[i].id,status);  // the 2nd rostersData.rosters.franchise[i].id & status are needed to record original value of a player since it may change when weeks are flipped
						} catch(er) {
							// do nothing
						}
					}
				}
				rostersData=null;
			});
		
			//	ASYNC = FALSE CALLS
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=league&L="+league_id+"&JSON=1&rand=" + Math.random(), async: false, leagueData: {'USER_ID': userCookieValue}}).done(function (leagueData) {
				cbsLeagueInfo[0] = leagueData.league.name;
				cbsLeagueInfo[1] = leagueData.league.precision;
				cbsLeagueInfo[2] = "";
				cbsLeagueInfo[3] = leagueData.league.startWeek;
				cbsLeagueInfo[4] = leagueData.league.endWeek;
				cbsLeagueInfo[5] = leagueData.league.lastRegularSeasonWeek;
				for(var i=0; i<leagueData.league.franchises.franchise.length; i++) if(leagueData.league.franchises.franchise[i].iscommish==1) cbsLeagueInfo[2] = leagueData.league.franchises.franchise[i].id;
				cbsLeagueInfo[6] = leagueData.league.franchises.franchise.length;
				leagueData = null;
			});
		
			$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1&rand=" + Math.random(), async: false, weeklyResultsData: {'USER_ID': userCookieValue}}).done(function (weeklyResultsData) {
				//rosterData[fid][ nonstarters, starters, (tiebreaker) ]
				rosterData = getCBSRosterDataFromWeeklyResults(weeklyResultsData);
				weeklyResultsData=null;
			});
		
			//check if there is a schedule set up for next week playoffs game
			if(liveScoringWeek>=cbsLeagueInfo[5]) {
				$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=weeklyResults&L="+league_id+"&W="+(liveScoringWeek+1)+"&JSON=1&rand=" + Math.random(), async: false, weeklyResultsData: {'USER_ID': userCookieValue}}).done(function (weeklyResultsData) {
					try {
						if(weeklyResultsData.weeklyResults.matchup.length>=1) cbsNextWeeksPlayoffMatchupSet = true;
					} catch(er){
						cbsNextWeeksPlayoffMatchupSet = false;
					}
					weeklyResultsData=null;
				});
			} else {
				cbsNextWeeksPlayoffMatchupSet = false;
			}
		
			if(includeProjections) {
				//including &rand=Math.random() in fantasy projections causes my week parameter to fail
				$.ajax({type: 'GET',url: habBaseURL+"/"+year+"/export?TYPE=projectedScores&L="+league_id+"&W="+cbsCurrentWeek+"&JSON=1", async: false, projectionsData: {'USER_ID': userCookieValue}}).done(function (projectionsData) {
					for(var i=0; i<projectionsData.projectedScores.playerScore.length; i++) {
						if(projectionsData.projectedScores.playerScore[i].score.length==0)
							fsProjections[projectionsData.projectedScores.playerScore[i].id] = 0;
						else
							fsProjections[projectionsData.projectedScores.playerScore[i].id] = projectionsData.projectedScores.playerScore[i].score;
					}
					projectionsData=null;
				});
			}

			//UPDATE GLOBAL VARS BASED ON VALUES RETURNED FROM JSON DOCUMENTS	
			precision = cbsLeagueInfo[1];
			commishfranchise_id = cbsLeagueInfo[2];
			if(franchise_id==undefined||franchise_id==""||franchise_id=="0000") {
				if(commishfranchise_id==undefined||commishfranchise_id==""||commishfranchise_id=="0000") {
						currentAllPlayTeam="0001";
				} else currentAllPlayTeam = commishfranchise_id;
			} else currentAllPlayTeam = franchise_id;
			myUpdateTeam = currentAllPlayTeam;
		}
		function initialHTMLSetup() {
			//==FIRST THING I WANT IS ONE TABLE TO HOLD ALL OF MY OTHER NESTED TABLES; CLASS NAME WILL BE cbsOuterTable	
			var myBoxScoreTables = createBoxScoreTables();
			var myNFLBoxScoreTables = createNFLBoxScoreTables();
			var myMainScoreboardTable = createMainScoreboardTable();
			var topTable = myMainScoreboardTable;
			var middleTable = "<div id='cbsFantasyMatchups'>" + myBoxScoreTables + "</div><div id='cbsNFLMatchups' style='display:none'>" + myNFLBoxScoreTables + "</div>";
			var topTableHolder = "myTopTableHolder";
			var middleTableHolder = "myMiddleTableHolder";

			var myHTML = "";
			myHTML = myHTML + "<center>\n";
			myHTML = myHTML + "<div style='max-width:1024px'>\n";
			myHTML = myHTML + "<table class='cbsOuterTable'"+myAdjWidthOuter+">\n";
	
			// This table row contains my weekly nav (if desired)
			if(includeWeeklyNavigation) {
				myHTML = myHTML + " <tr>\n";
				myHTML = myHTML + "  <td id='myNavigationHolder'>\n";
				myHTML = myHTML + createWeeklyNavigation();
				myHTML = myHTML + "  </td>\n";
				myHTML = myHTML + " </tr>\n";
			}
	
			// This table row contains all the current matchups or main scoreboard depending on user setting
			myHTML = myHTML + " <tr>\n";
			myHTML = myHTML + "  <td id='"+topTableHolder+"'>\n";
			myHTML = myHTML + topTable;
			myHTML = myHTML + "  </td>\n";
			myHTML = myHTML + " </tr>\n";
	
			// This table row contains all the current matchups or main scoreboard depending on user setting
			myHTML = myHTML + " <tr>\n";
			myHTML = myHTML + "  <td id='"+middleTableHolder+"'>\n";
			myHTML = myHTML + middleTable;
			myHTML = myHTML + "  </td>\n";
			myHTML = myHTML + " </tr>\n";
	
			//This table row contains team lineups
			if(liveScoringEmpty==false) {
				myHTML = myHTML + " <tr>\n";
				myHTML = myHTML + "  <td>\n";
				myHTML = myHTML + "   <table class='cbsLineups'>\n";
				myHTML = myHTML + "    <tr>\n";
				myHTML = myHTML + "     <td valign='top' id='cbsRoadLineup' style='vertical-align:top; text-align:left;'></td>\n";
				myHTML = myHTML + "     <td valign='top' id='cbsBlankLineup'></td>\n";
				myHTML = myHTML + "     <td valign='top' id='cbsHomeLineup' style='vertical-align:top; text-align:right;'></td>\n";
				myHTML = myHTML + "    </tr>\n";
				myHTML = myHTML + "   </table>\n";
				myHTML = myHTML + "  </td>\n";
				myHTML = myHTML + " </tr>\n";
			}
			myHTML = myHTML + "</table>\n";
	
			if(includePlayerUpdates) myHTML = myHTML + "<table class='playerUpdateContainer' id='playerUpdateContainer'><tr class='playerUpdateHeaderRow'><td id='playerUpdateHeader' style='text-align:left;'>&nbsp;Latest Player Updates:&nbsp;</td><td id='playerFilter'><table class='updateHistoryHeader'><tr><td><i>fantasy points by player will update below</i></td></tr></table></td></tr><tr class='playerUpdateUpdateRow'><td colspan='2' id='playerUpdates'><table class='updateHistoryPlayer'><tbody><tr><th>&nbsp;Time&nbsp;</th><th>&nbsp;Player&nbsp;</th><th>&nbsp;Pos&nbsp;</th><th>&nbsp;NFL&nbsp;</th><th>&nbsp;Fantasy Team&nbsp;</th><th>&nbsp;Status&nbsp;</th><th>&nbsp;Update Pts&nbsp;</th><th>&nbsp;Previous Pts&nbsp;</th><th>&nbsp;Total Pts&nbsp;</th></tr></tbody></table></td></tr></table>";
		
			myHTML = myHTML + "</div>\n";
			myHTML = myHTML + "</center>\n";
			document.getElementById("outerCBSScoreboardDiv").innerHTML = myHTML;
			if(liveScoringEmpty) document.getElementById("cbsScoreboardMessage").innerHTML = "<span id='cbsScoreboardMessageResetTimer' onclick='reloadThisPage();' style='background-color:red; color:white;'>&nbsp;CLICK HERE TO REFRESH&nbsp;</span>";
			//START THE UPDATE
			if(fullyLoaded) {
				if(liveScoringEmpty==false) setTimeout("checkCBSMatchup()",1500);  // most browsers
			} else {
				try {  // chrome and safari typically
					if(liveScoringEmpty==false) setTimeout("checkCBSMatchup()",2000);
				} catch(er) {
					try { // iPad and iPhone
						if(liveScoringEmpty==false) setTimeout("checkCBSMatchup()",2000); // chrome and safari typically
					} catch(er) {
						if(liveScoringEmpty==false) setTimeout("checkCBSMatchup()",4000); // chrome and safari typically
					}
				}
			}
		}

	//IF THIS SCRIPT APPEARS ON THE HOME PAGE THEN ALERT USER AND REVERSE ANY ATTEMPT AT HIDING MENUS
	if(location.href.indexOf("MODULE=MESSAGE")>0||location.href.indexOf("/message")>0||location.href.indexOf("SEQNO=")>0) { //GOOD TO GO

	//SET GLOBAL VARS
		var cbsCurrentWeek = liveScoringWeek;
		if(cbsCurrentWeek>cbsEndWeek) cbsCurrentWeek = cbsEndWeek;
		if(cbsCurrentWeek==completedWeek) var cbsLiveMode = false; else var cbsLiveMode = true;
		var cbsLeagueInfo = new Array();
		var cbsLiveScoringMatchups = new Array();
		var cbsNFLLiveScoringMatchups = new Array();
		var cbsPlayerInfo = new Array();
		var cbsInjuryInfo = new Array();
		var cbsRosterInfo = new Array();
		var cbsTeamWLT = new Array();
		var cbsNFLTeamWLT = new Array();
		var rosterData = new Array();          // contains my weeklyResults information
		var fsProjections = new Array();
		var doubleHeader = new Array();
		var playerUpdates = new Array();
		var nflTeamUpdate = new Array();
		var playerUpdateHistory = new Array();
		var futureLineup = new Array();        // used to simulate future lineup if no submission given
		var matchupsDisplayedIsFantasy = true; // used to track which matchups are currently displayed; 0=fantasy or 1=nfl
		var radioButtonValue = -1;             // used for player update form team filter
		var radioButtonValue2 = -1;            // used for player update form player filter
		var radioButtonValue2Str = "";         // used for player update form player filter holds actual search string of radio
		var selectBoxValue = "";               // used for player update form team filter
		var selectBoxValue2 = "";              // used for player update form player filter
		playerUpdates[0] = new Array();        // will hold current player score
		playerUpdates[1] = new Array();        // will hold previous player score
		var fullyLoaded = false;               // include this in the last parsing call done from the initial setup and set to true
		var cbsNoData = false;
		var cbsNextWeeksPlayoffMatchupSet = false;
		var tempAllPlayCheck = false;

		var currentGameHilighted=0;
		var currentNFLGameHilighted = -1;
		var lastPlayerUpdate = 0;
		var currentAllPlayTeam="0001";
		var myMainScoreboardTimer;  // counts 30 minutes then pauses unless reset by user sooner
		var mySecondsTimer;         // countdown by seconds until next refresh
		var myLoopCount=0;
		var mySecondsCount=0;
		var userCookieValue = getCBSCookieValue('USER_ID');
		
		var precision = 0;
		var commishfranchise_id = "0001";
		var myUpdateTeam = currentAllPlayTeam;
		var myOppUpdateTeam = "";
		
		document.write("<div id='outerCBSScoreboardDiv'></div>");
		if(jQueryLoaded) {
			initialJSONCalls();
			initialHTMLSetup();
		} else {
			setTimeout("initialJSONCalls()",1000);
			setTimeout("initialHTMLSetup()",1100);
		}

	} else { // NOT ON HOME PAGE OR MESSAGE PREVIEW
		document.write("<div style='position: relative;'>");
		document.write("<table class='homepagemodule report' align='center' cellspacing='1'>");
		document.write("<caption><span>SCOREBOARD WARNING</span></caption>");
		document.write("<tbody>");
		document.write("<tr class='oddtablerow'><td>This is where the Live Scoreboard should appear however the scoreboard was not designed to be placed on the Home Page and therefore has been blocked from appearing here.</td></tr>");
		document.write("<tr class='eventablerow'><td>Placing it on the home page can cause several problems including exceeding the amount of calls any one league can make to the export progam in a 24 hour period, slowing down the initial load time of the home page, and hiding several key menu items that are crucial to navigate the website.</td></tr>");
		document.write("<tr class='oddtablerow'><td>To view the scoreboard create a link to the Home Page Module where the scoreboard is placed and use that link to access the live scoreboard.</td></tr>");
		document.write("</tbody>");
		document.write("</table>");
		document.write("</div>");
	}
	
