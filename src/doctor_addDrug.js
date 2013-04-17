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

$(function() {
	
	//list of all patient
	var all_patient = ["Amy Bxxx","Cathy Dxxx","Eric Fxxx","Gary Hxxx","Irene Jxxx","Katherine Lxxx"];
	
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");


	patient_name= patient_name.replaceAll("_"," ");

	if (all_patient.indexOf(patient_name) != -1){

		$(patientname).html(patient_name);


	}else{ // patient doesnt exist
		$(patient_body).html("Given patient "+patient_name+" doesn't exist");
	}
	

})

$(document).ready(function() {
	$( "#add_startdate" ).datepicker();
	$( "#add_enddate" ).datepicker();
	
	
	
	$( "#add_dosefrequency" ).change(function() {
					if ($(this).val()==0) {
						document.getElementById("cycle").style.display="block";
						document.getElementById("specific_time").style.display="none";
						document.getElementById("num_dosage").style.display="none";
					}
					else if ($(this).val()==1) {
						document.getElementById("cycle").style.display="none";
						document.getElementById("specific_time").style.display="block";
						document.getElementById("num_dosage").style.display="none";
					}
					else {
						document.getElementById("cycle").style.display="none";
						document.getElementById("specific_time").style.display="none";
						document.getElementById("num_dosage").style.display="block";
					}
	});
	$(save_newdrug).click(function()	{
			var drugname = $(new_drugname).val();
			
			if (drugname.replaceAll(" ","_").length !=0){

				$(drugTab).append("<li class=''><a data-toggle='modal' href='#myModal'>"+drugname+"</a></li>");
			}
		
	});

	
});

function addSpecificTime() {
				var p = document.createElement("p");
				p.innerHTML=document.getElementById("specific_hour").value+" : "+document.getElementById("specific_minute").value+" "+document.getElementById("am_pm").value;
				
				var selected=document.getElementById("selected_times");
				selected.appendChild(p);
			
			}
			
function clearSpecificTime() {
				document.getElementById("selected_times").innerHTML="";
			
			}
			

			