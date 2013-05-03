
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
	
	//load drugList, drugNameList
	var drugList= returnAllDrugs();
	var drugNameList = [];
	
	//loadup drugTab
	for (i=0;i<drugList.length;i++){
		$(drugTab).append("<li ><a data-toggle='tab' href='#' onclick=global.showHistoryInfo("+i+") >"+drugList[i].name+"</a></li>");
		drugNameList.push(drugList[i].name);
	}
		
	//loadup missed event
	var missList = returnMissedDrugs();
	
	console.log(missList);
	
	//list of all patient
	var all_patient = ["Amy Fox"];
	
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
	
	global.showHistoryInfo=function(index){ 
		$(drug_textarea).html("Missed drug history summary:\n\n");
		if (index == -1){ // clicked "All" tab
			
			for (i=0;i<missList.length;i++){
				
					$(drug_textarea).append("Missed "+missList[i].dosage+" dosage(s) of "+missList[i].name+
											" on "+missList[i].dateString+" at "+missList[i].timeString+".\n");
				
			}
		}else{
			
			for (i=0;i<missList.length;i++){
				if (missList[i].name == drugNameList[index]){
					$(drug_textarea).append("Missed "+missList[i].dosage+" dosage(s) of "+missList[i].name+
											" on "+missList[i].dateString+" at "+missList[i].timeString+".\n");
				}
			}
		}
	}
	
	global.showHistoryInfo(-1);
	
	

});
