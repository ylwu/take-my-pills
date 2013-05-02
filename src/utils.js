var m = new Model();

function returnAllDrugs(){
      var t;
			$.ajax({
  				dataType: "json",
  				url: 'pilldata.json',
  				async: false,
  				success: function(data){
            t = data;
				}
			});
      return t;

		}


function loadDrugs(){
			$.ajax({
  				dataType: "json",
  				url: 'pilldata.json',
  				async: false,
  				success: function(data){
  					m.drugsQueue.length = 0;
  					data.forEach(function(entry){
  						m.drugsQueue.push(entry);
  					})
				}
			});
		}

function returnAllMessages(){
  var s;
  $.ajax({
          dataType: "json",
          url: 'messageData.json',
          async: false,
          success: function(data){
            s = data;
        }
  });
  return s;
}

function returnMissedDrugs(){
  var s;
  $.ajax({
          dataType: "json",
          url: 'missedPillsData.json',
          async: false,
          success: function(data){
            s = data;
        }
  });
  return s;
}


// TY_GLOBAL WRITE_TO_JSON FUNCTIONS

	function writePill(aPill) {

		var oldPillsList=returnAllDrugs(); // oldPillsList = list of javascript myPill objects
		oldPillsList.push(aPill);

		var newPillsList='[';

		for (var i=0; i<oldPillsList.length; i++) {
			if (i!=0) {
				newPillsList+=', ';
			}
			newPillsList+='{"name": "'+oldPillsList[i].name+'", "dose": "'+oldPillsList[i].dose+'", "startdate": "'+oldPillsList[i].startdate+'", "enddate": "'+oldPillsList[i].enddate+'", "frequency": "'+oldPillsList[i].frequency+'", "times": "'+oldPillsList[i].times+'", "lasttake": "'+oldPillsList[i].lasttake+'"}';
		}


// if pill exist already, update (ie delete, save new)
				var checkPill=m.drugsQueue.filter(function(pill){
  					return pill.name == document.getElementById("new_drugname").value;
				});
				while (checkPill.length>0) {
					deletePill(document.getElementById(checkPill[0].name));
					checkPill.pop();
				}

		newPillsList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writePill', 'input': newPillsList });
	}


	function deletePill(aPill) {
		var oldPillsList=returnAllDrugs();

		var newPillsList='[';

		for (var i=0; i<oldPillsList.length; i++) {
			if (aPill.name!=oldPillsList[i].name) {
				if (i!=0) {
					newPillsList+=', ';
				}
				newPillsList+='{"name": "'+oldPillsList[i].name+'", "dose": "'+oldPillsList[i].dose+'", "startdate": "'+oldPillsList[i].startdate+'", "enddate": "'+oldPillsList[i].enddate+'", "frequency": "'+oldPillsList[i].frequency+'", "times": "'+oldPillsList[i].times+'", "lasttake": "'+oldPillsList[i].lasttake+'"}';
			}
		}
		newPillsList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writePill', 'input': newPillsList });
	}


	function writeMsg(aMsg) {
		var oldMsgsList=returnAllMessages();
		oldMsgsList.push(aMsg);

		var newMsgsList='[';


		for (var i=0; i<oldPillsList.length; i++) {
			if (i!=0) {
				newMsgsList+=', ';
			}
			newMsgsList+='{"from": "'+oldMsgsList[i].from+'", "time": "'+oldMsgsList[i].time+'", "message": "'+oldMsgsList[i].message+'", "read": "'+oldMsgsList[i].read+'"}';
		}
		newMsgsList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writeMsg', 'input': newMsgsList });
	}

// END TY_GLOBAL
