
// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore) 
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

$(function() {

	var last_name = "Xxxxxx";
	var first_name = "Xxxx";

	//display doctor name
	$(doctor_name).html("Dr. "+first_name+" "+last_name);

	//patient lists
	var all_patient = ["Amy Bxxx","Cathy Dxxx","Eric Fxxx","Gary Hxxx","Irene Jxxx","Katherine Lxxx"];
	
	//auto complete for patient search
	$(search_patient).val("");
	$(search_patient).typeahead({
		source: all_patient,
		minLength: 2,
		});
		
		
});

//search button go to patient page TODO
function goToPatient()	{
		var patient_name = $(search_patient).val();
		if (patient_name.length >0){
			patient_name = patient_name.replaceAll(" ","_");
			console.log("doctor_patient.html?="+patient_name);
			window.location="doctor_patient.html?="+patient_name;
		}
	
}

