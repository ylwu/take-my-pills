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

$(document).ready(function() {
	
	//list of all patient
	var all_patient = ["Amy Fox"];
	
	
	
		
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");
	
	$(go_to_addpatient).click(function()	{
			
			$(patient_list_div).hide();
			$(add_patient_div).show();
			$(add_patient).show();
			$(save_patient).hide();
			$(add_form).reset();
			
			$(email).val("");
			$(pat_name).val("");
			$(age).val("");
			$(info).val("");
		}
	);
	
	$(save_patient).click(function()	{
			
			$(patient_list_div).hide();
			$(add_patient_div).show();
			
			$(message).html("Patient information successfully saved.");
			
			//TODO: save to patient file
		}
	);
	
	$(add_patient).click(function()	{
			
			$(patient_list_div).hide();
			$(add_patient_div).show();
			
			$(message).html("The patient email is not registered.");
			
			//TODO: save to patient file
		}
	);
	
	
	$(yes_delete).click(function()	{
			
			window.location="doctor_addPatient.html";
		}
	);
		
	if (patient_name != undefined){
		$(add_patient).hide();
		$(save_patient).show();
		$(patient_list_div).hide();
		patient_name= patient_name.replaceAll("_"," ");
		
		if (all_patient.indexOf(patient_name) != -1){
			//fill info for patient
			$(email).attr("disabled",true);
			$(form_legend).html("Edit Patient "+patient_name);
			$(pat_name).val(patient_name);
			$(age).val("34");
			$(email).val("amybxxx@gmail.com");
			$(info).val("Type II diabetes, currently taking Drug A,B and C");
		
		$(clear_form).hide();
		
		}else{
			window.location="doctor_addPatient.html";
		}

	}else{
		$(add_patient_div).hide();
		$(delete_patient).hide();
		
		
		for (i=0;i<all_patient.length;i++){
			var ul = document.getElementById("patient_list");
			var link = document.createElement('a'); // create the link
			link.setAttribute('href', 'doctor_patient.html?patient_name='+all_patient[i].replaceAll(' ','_'));
			var newLI = document.createElement("LI");
			ul.appendChild(newLI);
			newLI.innerHTML = all_patient[i];
			link.appendChild(newLI);
			ul.appendChild(link);
		}
	}
	
	



	
	
	


})