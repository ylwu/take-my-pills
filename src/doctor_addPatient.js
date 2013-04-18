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
	var all_patient = ["Amy Fox","Cathy Dxxx","Eric Fxxx","Gary Hxxx","Irene Jxxx","Katherine Lxxx"];
	
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");

	$(yes_delete).click(function()	{
			
			window.location="doctor_addPatient.html";
		}
	);
		
	if (patient_name != undefined){
		patient_name= patient_name.replaceAll("_"," ");
		
		if (all_patient.indexOf(patient_name) != -1){
			//fill info for patient
			
			$(form_legend).html("Edit Patient "+patient_name);
			$(pat_name).val(patient_name);
			$(age).val("34");
			$(email).val("amybxxx@gmail.com");
			$(info).val("Type II diabetes, currently taking Drug A,B and C");
			
		}		

	}
	

})