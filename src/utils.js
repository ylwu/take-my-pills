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

function loadHistory(){
	$.ajax({
  				dataType: "json",
  				url: 'drugEventsData.json',
  				async: false,
  				success: function(data){
  					m.historyQueue.length = 0;
  					data.forEach(function(entry){
  						console.log(entry);
  						m.historyQueue.push(entry);
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
          url: 'drugEventsData.json',
          async: false,
          success: function(data){
            s = data;
        }
  });
  return s;
}

function returnAllPatients(){
      var t;
      $.ajax({
          dataType: "json",
          url: 'patientData.json',
          async: false,
          success: function(data){
            t = data;
        }
      });
      return t;

    }

// TY_GLOBAL WRITE_TO_JSON FUNCTIONS

	function pillToJsonString(aPill) {
		var pillString='{"name": "'+aPill.name+'", "dose": "'+aPill.dose+'", "startdate": "'+aPill.startdate+'", "enddate": "'+aPill.enddate+'", "frequency": "'+aPill.frequency+'", "times": "'+aPill.times+'", "lasttake": ['+aPill.lasttake+']}';
		return pillString;
	}


	function writePill(aPill) {

		var oldPillsList=returnAllDrugs(); // oldPillsList = list of javascript myPill *objects*

		// if edit aPill:
		var managePillsList=[]; // this is actually NOT a string!
		for (var i=0; i<oldPillsList.length; i++) {
			if (aPill.name!=oldPillsList[i].name) { // delete myPill
				managePillsList.push(oldPillsList[i]);
			}
		}

		var newPillsList='['; // string list

		for (var i=0; i<oldPillsList.length; i++) {
			if (aPill.name!=oldPillsList[i].name) { // if aPill existed previously, erase old info to write new info == don't write it
				if (i!=0) {
					newPillsList+=', ';
				}
				var stringifyPill=pillToJsonString(oldPillsList[i]);
				newPillsList+=stringifyPill;
			}
		}
		if (oldPillsList.length!=0) {
			newPillsList+=', ';
		}
		var stringifyPill=pillToJsonString(aPill);
		newPillsList+=stringifyPill;
		
		newPillsList+=']';

		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writePill', 'input': newPillsList });
		managePillsList.push(aPill);
		updateManagePills(managePillsList);
	}


	function unwritePill(aPill) {

		// JS GLOBAL WRITE
		// if edit aPill, must delete aPill first before writing to js global and .JSON
		var index=-1;
		for (var i=0; i<myJsonPills.length; i++) {
			if (aPill.name==myJsonPills[i].name) {
				index=i;
			}
		}
		if (index!=-1) { // if index==-1, is add not edit
			myJsonPills.splice(index, 1); // SPLICE HERE
		}
		else {
			alert(aPill.name + " does not exist? This should not happen..");
		}


		// .JSON WRITE (slower than read)
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
		
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writePill', 'input': newPillsList } );

	}


	function writeMsg(aMsg) {
		var oldMsgsList=returnAllMessages();
		oldMsgsList.push(aMsg);

		var newMsgsList='[';

		for (var i=0; i<oldMsgsList.length; i++) {
			if (i!=0) {
				newMsgsList+=', ';
			}
			newMsgsList+='{"from": "'+oldMsgsList[i].from+'", "time": "'+oldMsgsList[i].time+'", "message": "'+oldMsgsList[i].message+'", "read": "'+oldMsgsList[i].read+'"}';
		}
		newMsgsList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writeMsg', 'input': newMsgsList });
	}


	function changeBoolMsg(aMsg, bool) {
		var oldMsgsList=returnAllMessages();
		var updatedMsgsList=[];	

		for (var i=0; i<oldMsgsList.length; i++) {
			if (aMsg.message==oldMsgsList[i].message) {
				var newAMsg = new myMessage(oldMsgsList[i].from, oldMsgsList[i].time, oldMsgsList[i].message, bool);
				updatedMsgsList.push(newAMsg);
			}
			else {
				updatedMsgsList.push(oldMsgsList[i]);
			}
		}
		

		var newMsgsList='[';
		for (var i=0; i<updatedMsgsList.length; i++) {
			if (i!=0) {
				newMsgsList+=', ';
			}
			newMsgsList+='{"from": "'+updatedMsgsList[i].from+'", "time": "'+updatedMsgsList[i].time+'", "message": "'+updatedMsgsList[i].message+'", "read": "'+updatedMsgsList[i].read+'"}';
		}
		newMsgsList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writeMsg', 'input': newMsgsList });
		
	}


	function writeMissedDrugEvent(missedEvent) {
		var oldMissedList=returnMissedDrugs();
		oldMissedList.push(missedEvent);

		var newMissedList='[ \n';

		for (var i=0; i<oldMissedList.length; i++) {
			if (i!=0) {
				newMissedList+=',\n';
			}
			newMissedList+='{"name": "'+ oldMissedList[i].name+'", "date": "'+oldMissedList[i].date + '", "dosage": "'+oldMissedList[i].dosage+'", "dateString": "'+oldMissedList[i].dateString+'", "timeString": "'+oldMissedList[i].timeString+'", "state": "'+oldMissedList[i].state+'"}';
		}
		newMissedList+=']';
		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writeMissedDrugEvent', 'input': newMissedList });

	}


	function changePatientInfo(newInfo) {
		var newPatientInfo = '[{"email": "'+newInfo.email+'", "name": "'+newInfo.name+'", "age": "'+newInfo.age+'", "info": "'+newInfo.info+'", "connect": "'+newInfo.connect+'"}]';

		$.post('/take-my-pills/src/writeToJson.php', { 'function': 'writePatient', 'input': newPatientInfo });
	}
