
//This script extracts parameters from the URL
//from jquery-howto.blogspot.com

$.extend({
        getUrlVars : function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(
                    window.location.href.indexOf('?') + 1).split('&');
            for ( var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar : function(name) {
            return $.getUrlVars()[name];
        }
    });

// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore) 
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

var global={};
$(document).ready(function() {
	/**
	 * Initializes calendar with current year & month
	 * specifies the callbacks for day click & agenda item click events
	 * then returns instance of plugin object
	 */
	var jfcalplugin = $("#mycal").jFrontierCal({
		date: new Date(),
		//agendaClickCallback: myAgendaClickHandler,
	}).data("plugin");
	//color codes for calendar event
	var color = ["#77A82D","#E01B6A","#7010A1","#1FAD8F","#1D78B5","#BDC229","#D99A48","#B51919","#1B37B3","#32A655"];
	
	/**
	 * Initialize previous month button
	 */
	$("#BtnPreviousMonth").button();
	$("#BtnPreviousMonth").click(function() {
		jfcalplugin.showPreviousMonth("#mycal");
		// update the jqeury datepicker value
		var calDate = jfcalplugin.getCurrentDate("#mycal"); // returns Date object
		var cyear = calDate.getFullYear();
		// Date month 0-based (0=January)
		var cmonth = calDate.getMonth();
		var cday = calDate.getDate();
		// jquery datepicker month starts at 1 (1=January) so we add 1
		$("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);
		$(displayDrugMonth).html((cmonth+1)+"/"+cyear);
		return false;
	});
	/**
	 * Initialize next month button
	 */
	$("#BtnNextMonth").button();
	$("#BtnNextMonth").click(function() {
		jfcalplugin.showNextMonth("#mycal");
		// update the jqeury datepicker value
		var calDate = jfcalplugin.getCurrentDate("#mycal"); // returns Date object
		var cyear = calDate.getFullYear();
		// Date month 0-based (0=January)
		var cmonth = calDate.getMonth();
		var cday = calDate.getDate();
		// jquery datepicker month starts at 1 (1=January) so we add 1
		$("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);
		$(displayDrugMonth).html((cmonth+1)+"/"+cyear);
		return false;
	});
	
	

	//load drugList, drugNameList
	var drugList= returnAllDrugs();
	var drugNameList = [];
	
	//loadup drugTab
	for (i=0;i<drugList.length;i++){
		$(drugTab).append("<li ><a data-toggle='tab' href='#' onclick=global.showHistoryInfo("+i+") >"+drugList[i].name+"<div style='width:12px; height:12px; float:right; border: white 1px solid; background-color:"+color[i]+"'>  </div></a></li>");
		drugNameList.push(drugList[i].name);
	}
		
	//loadup missed event
	var missList = returnMissedDrugs();
	//console.log(missList);
	var missListP = [];
	for (j=0;j<drugList.length;j++){
		//find all missed event for this drug
		var list = [];
		for (i=0;i<missList.length;i++){
			
			if (missList[i].name == drugNameList[j]){
				list.push(missList[i]);
			}
		}
		missListP.push(list);
	}	
	//console.log(missListP);
	
	//console.log(missList);
	
	//list of all patient
	//load patient info from json
	var patient = returnAllPatients();
	
	
	//patient lists
	var all_patient = [];
	all_patient.push(patient.name);
	
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");
	patient_name = patient_name.replaceAll("_"," ");
	
	if (all_patient.indexOf(patient_name) != -1){

		$(patientname).html(patient_name);
		
		$(edit_patient).click(function()	{
			patient_name = patient_name.replaceAll(" ","_");
			window.location="doctor_addPatient.html?patient_name="+patient_name;
			}
		
		);
		
		$(edit_drug).click(function()	{
				patient_name = patient_name.replaceAll(" ","_");
				window.location="doctor_addDrug.html?patient_name="+patient_name;
			}
		
		);
		
		
	}else{ // patient doesnt exist
		$(patient_body).html("Given patient "+patient_name+" doesn't exist");
	}
	
	/**
	 * Called when user clicks and agenda item
	 * use reference to plugin object to edit agenda item
	 
	function myAgendaClickHandler(eventObj){
		// Get ID of the agenda item from the event object
		var agendaId = eventObj.data.agendaId;		
		// pull agenda item from calendar
		var agendaItem = jfcalplugin.getAgendaItemById("#mycal",agendaId);
		clickAgendaItem = agendaItem;
		$("#display-event-form").dialog('open');
	};
	
	$("#display-event-form").dialog({
		autoOpen: false,
		height: 400,
		width: 400,
		modal: true,
		buttons: {		
			Cancel: function() {
				$(this).dialog('close');
			}
				
		},
		open: function(event, ui){
			if(clickAgendaItem != null){
				var title = clickAgendaItem.title;
				var startDate = clickAgendaItem.startDate;
				var data = clickAgendaItem.data;
				console.log(data);
				// in our example add agenda modal form we put some fake data in the agenda data. we can retrieve it here.
				$("#display-event-form").append(
					"<br><b>" + title+ "</b><br><br>"		
				);				
				$("#display-event-form").append(
						"Missed on "+startDate+"<br><br>"				
				);				
				
				for (var propertyName in data) {
					$("#display-event-form").append("<b>" + propertyName + ":</b> " + data[propertyName] + "<br>");
				}			
			}		
		},
		close: function() {
			// clear agenda data
			$("#display-event-form").html("");
		}
	});	 
	*/
	
	global.showHistoryInfo=function(tabIndex){ 
		jfcalplugin.deleteAllAgendaItems("#mycal");
		$(drug_textarea).html("Missed drug history summary:\n\n");
		var calDate = jfcalplugin.getCurrentDate("#mycal"); // returns Date object
		var cyear = calDate.getFullYear();
		// Date month 0-based (0=January)
		var cmonth = calDate.getMonth();
		$(displayDrugMonth).html((cmonth+1)+"/"+cyear);
		
		var startDateObj;
		var endDateObj;
		if (tabIndex == -1){ // clicked "All" tab
			$(displayDrugName).html("Missed events for: All pills in month ");
			for (index=0;index<drugList.length;index++){
				for (i=0;i<missListP[index].length;i++){
					if (missListP[index][i].state == "missed"){
						$(drug_textarea).append("Missed "+missListP[index][i].dosage+" dosage(s) of "+missListP[index][i].name+
													" on "+missListP[index][i].dateString+" at "+missListP[index][i].timeString+".\n");
													
							var parseDate = missListP[index][i].dateString.split("/");
							var parseFullTime = missListP[index][i].timeString.split(" ");
							if (parseFullTime.length == 2){
								var hour = 1;
								var minute = 0;
							}else{
								/*var parseTime = parseFullTime[0].split(":");
								var hour = parseInt(parseTime[0]);
								var minute = parseInt(parseTime[1]);*/
								var hour = parseInt(parseFullTime[0]);
								var minute = parseInt(parseFullTime[2]);
								if (parseFullTime[3] == "pm"){
									hour += 12;
								}
							}
							
							startDateObj = new Date(parseInt(parseDate[2]),parseInt(parseDate[0])-1,parseInt(parseDate[1]),hour,minute,0,0);
							endDateObj = new Date(parseInt(parseDate[2]),parseInt(parseDate[0])-1,parseInt(parseDate[1]),hour,minute,30,0);
							

							jfcalplugin.addAgendaItem(
								"#mycal",
								missListP[index][i].name,
								startDateObj,
								endDateObj,
								false,
								{
									Patient_name: "Amy Fox",
									Missed_drug: missListP[index][i].name,
									Dose: missListP[index][i].dosage
								},
								{
									backgroundColor: color[index%color.length],
									foregroundColor: "#FFFFFF"
								}
							);							
						
					}
				}
			}
		}else{
			$(displayDrugName).html("Missed events for: "+drugList[tabIndex].name+ " in month ");
			for (i=0;i<missListP[tabIndex].length;i++){
				if (missListP[tabIndex][i].state == "missed"){
					$(drug_textarea).append("Missed "+missListP[tabIndex][i].dosage+" dosage(s) of "+missListP[tabIndex][i].name+
												" on "+missListP[tabIndex][i].dateString+" at "+missListP[tabIndex][i].timeString+".\n");
												
					var parseDate = missListP[tabIndex][i].dateString.split("/");
						var parseFullTime = missListP[tabIndex][i].timeString.split(" ");
						if (parseFullTime.length == 2){
								var hour = 1;
								var minute = 0;
							}else{
								/*var parseTime = parseFullTime[0].split(":");
								var hour = parseInt(parseTime[0]);
								var minute = parseInt(parseTime[1]);*/
								var hour = parseInt(parseFullTime[0]);
								var minute = parseInt(parseFullTime[2]);
								if (parseFullTime[3] == "pm"){
									hour += 12;
								}
							}
						}
						
						//jfcalplugin.deleteAllAgendaItems("#mycal");
						startDateObj = new Date(parseInt(parseDate[2]),parseInt(parseDate[0])-1,parseInt(parseDate[1]),hour,minute,0,0);
						endDateObj = new Date(parseInt(parseDate[2]),parseInt(parseDate[0])-1,parseInt(parseDate[1]),hour,minute,30,0);
		
						jfcalplugin.addAgendaItem(
							"#mycal",
							missListP[tabIndex][i].name,
							startDateObj,
							endDateObj,
							false,
							{
								Patient_name: "Amy Fox",
								Missed_drug: missListP[tabIndex][i].name,
								Dose: missListP[tabIndex][i].dosage
							},
							{
								backgroundColor: color[tabIndex%color.length],
								foregroundColor: "#FFFFFF"
							}
						);							
					
				}
			}
		}
	}
	
	global.showHistoryInfo(-1);
	
	

});
