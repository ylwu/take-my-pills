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
	
	//load patient info from json
	var patient = returnAllPatients();
	
	
	//patient lists
	var all_patient = [];
	
	if (patient.connect == "true"){ //have a patient
		all_patient.push(patient.name);
	}
	
	
	
		
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");
	
	
	
	$(go_to_addpatient).click(function()	{
			$(back_patient_list).show();
			$(back_patient).hide();
	
			$(patient_list_div).hide();
			$(add_patient_div).show();
			$(add_patient).show();
			$(save_patient).hide();
			$(email).attr("disabled",false);
			$(form_legend).html("Add Patient");
			$(clear_form).show();
			$(delete_patient).hide();
			$(save_patient).hide();
			$(add_patient).show();
			
			$(message).html("");
			$("#email").val("");
			$("#pat_name").val("");
			$("#age").val("");
			$("#info").val("");
		}
	);
	
	/*$(delete_patient).click(function(){
		$(message).html("Sorry, patient deletion is not allowed at the moment.");
		
	});*/
	
	$(save_patient).click(function()	{
			
			
			
			
			
			//TODO: save to patient file
			
			var email = $("#email").val();
			var name = $("#pat_name").val();
			var age = $("#age").val();
			var info = $("#info").val();
			
			if (email=="" || name=="" ||age==""||info==""){
				$(message).html("All fields must be filled out.");
			}else{
					$(message).html("Patient information successfully saved.");
					var patientEdit = new myPatient(email,name,age,info,"true");
					
					all_patient = [];
					all_patient.push(name);
					$(patient_list).html("");
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
					$(add_patient_div).hide();
					$(patient_list_div).show();
					
					$(back_patient).click(function(){
						window.location='doctor_patient.html?patient_name='+all_patient[0].replaceAll(' ','_')				
					});
					
					changePatientInfo(patientEdit);
					
					//window.location="doctor_addPatient.html";
				
				
			}
		}
	);
	
	$(add_patient).click(function()	{
			
			
			
			
			
			//TODO: save to patient file
			var email = $("#email").val();
			var name = $("#pat_name").val();
			var age = $("#age").val();
			var info = $("#info").val();
			
				
			if (email=="" || name=="" ||age==""||info==""){
				$(message).html("All fields must be filled out.");
			}else{

				if (email != patient.email){
					$(message).html("The patient email is not registered.");
				}else if (patient.connect == "true"){ //repeated user
					$(message).html("Already connected to this patient email.");
				}else{
					var patientEdit = new myPatient(email,name,age,info,"true");
					
					all_patient = [];
					all_patient.push(name);
					$(patient_list).html("");
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
					
					$(add_patient_div).hide();
					$(patient_list_div).show();
					
					$(back_patient).click(function(){
						window.location='doctor_patient.html?patient_name='+all_patient[0].replaceAll(' ','_')				
					});
					changePatientInfo(patientEdit);
					
					
				}
				
			}
			
			
		}
		
	);
	
	$(back_patient_list).click(function(){
		$(add_patient_div).hide();
		$(patient_list_div).show();
		
	});
	
	$(yes_delete).click(function()	{
			
			//TODO: disconnect from patient
			var patientEdit = new myPatient(patient.email,patient.name,patient.age,patient.info,"false");
			
			all_patient=[];
			patient.connect = "false";
			$(patient_list).html("You are not connected to any patient yet!");
			
			$(myModal).hide();
			$(add_patient_div).hide();
			$(patient_list_div).show();
			
			
			changePatientInfo(patientEdit);
			//window.location="doctor_addPatient.html";
		}
	);
		
	if (patient_name != undefined){
	
		$(add_patient).hide();
		$(save_patient).show();
		$(patient_list_div).hide();
		patient_name= patient_name.replaceAll("_"," ");
		
		if (all_patient.indexOf(patient_name) != -1){ //show edit particular patient

			//fill info for patient
			$(email).attr("disabled",true);
			$(form_legend).html("Edit Patient "+patient.name);
			$(pat_name).val(patient.name);
			$(age).val(patient.age);
			$(email).val(patient.email);
			$(info).val(patient.info);
			
			$(back_patient).click(function(){
				window.location='doctor_patient.html?patient_name='+all_patient[0].replaceAll(' ','_')				
			});
			
			$(back_patient_list).hide();
			$(back_patient).show();
			
		
			$(clear_form).hide();
		
		}else{
			window.location="doctor_addPatient.html";
		}

	}else{ //patient list
		
		$(add_patient_div).hide();
		$(delete_patient).hide();
		$(patient_list).html("");
		
		if (all_patient.length==0){
			$(patient_list).html("You are not connected to any patient yet!");
		}else{//show list of patient
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
	}
	
	



	
	
	


})