
// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore) 
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

$(document).ready(function() {

	var last_name = "Williams";
	var first_name = "John";

	//display doctor name
	$(doctor_name).html("Dr. "+first_name+" "+last_name);

	//load patient info from json
	var patient = returnAllPatients();
	
	//patient lists
	var all_patient = [];
	if (patient.connect == "true"){
		all_patient.push(patient.name);
		//load chat, check for new messages		
		var messages = returnAllMessages();
		var counter = 0;
		for (i=0;i<messages.length;i++){
			if (messages[i].read != "true" && messages[i].from =="patient"){
				counter +=1;
			}
		}
		
		if (counter != 0){
			$(newMsgNum).html(counter);
		}
		
	}
	
	//auto complete for patient search
	$(search_patient).val("");
	$(search_patient).typeahead({
		source: all_patient,
		minLength: 2,
		});
	
	//search button go to patient page 
	$(search_patient_btn).click(function()	{
			var patient_name = $(search_patient).val();
			if (patient_name.length >0){
				patient_name = patient_name.replaceAll(" ","_");
				window.location="doctor_patient.html?patient_name="+patient_name;
			}
		
	});
	
	$(search_patient).keyup(function (e) {
		if (e.keyCode == 13) {
			var patient_name = $(search_patient).val();
			if (patient_name.length >0){
					patient_name = patient_name.replaceAll(" ","_");
					window.location="doctor_patient.html?patient_name="+patient_name;
			}
		}
	});


		
});



