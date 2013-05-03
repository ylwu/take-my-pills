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

	//list of all patient
	var all_patient = ["Amy Fox"];
	
	//patient info from url
	var patient_name= $.getUrlVar("patient_name");


	patient_name= patient_name.replaceAll("_"," ");

	if (all_patient.indexOf(patient_name) != -1){

		$(patientname).html(patient_name);


	

	
	//load druglist
	var drugList= returnAllDrugs();
	console.log(drugList);
	
	//loadup drugTab
	for (i=0;i<drugList.length;i++){
		$(drugTab).append("<li ><a data-toggle='tab' href='#' onclick=global.editDrug("+i+") >"+drugList[i].name+"</a></li>");
	}
	
	$( "#add_startdate").datepicker();
	$( "#add_enddate" ).datepicker();
	

	$(new_drugname).val("");
	$(dose).val("");
	$(add_startdate).val("");
	$(add_enddate).val("");
	$(cycle_hour).val("");
	$(add_dosefrequency).val(0);
	
	$("#edit_buttons").hide();
	
	$( "#add_dosefrequency" ).change(function() {
					if ($(this).val()==0) {
						document.getElementById("cycle").style.display="block";
						document.getElementById("specific_time").style.display="none";
						document.getElementById("num_dosage").style.display="none";
						clearSpecificTime();
						$(everyLabel).css("height",60);
						
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
						clearSpecificTime();
						$(everyLabel).css("height",60);
					}
	});
	$(save_newdrug).click(function()	{
			var drugname = $(new_drugname).val();
			
			if (drugname.replaceAll(" ","_").length !=0){

				$(drugTab).append("<li class=''><a data-toggle='tab' href='#' onclick=editDrug() >"+drugname+"</a></li>");
			}
		
	});

	global.editDrug=function(index){
		clearSpecificTime();
		$(everyLabel).css("height",60);
		
		var drug = drugList[index];
		
		$(legend_name).html("Edit Drug");
		$(new_drugname).val(drug.name);
		$(dose).val(drug.dose);
		$(add_startdate).val(drug.startdate);
		$(add_enddate).val(drug.enddate);
		$(add_dosefrequency).val(drug.frequency);
		
		if (drug.frequency == 0){
			
			var n = drug.times.split(",");
			$(cycle_hour).val(n[0]);
			$(cycle_minute).val(n[1]);
			document.getElementById("cycle").style.display="block";
			document.getElementById("specific_time").style.display="none";
			document.getElementById("num_dosage").style.display="none";
			clearSpecificTime();
			$(everyLabel).css("height",60);
			
		}else if (drug.frequency ==1){
			$(selected_times).html(drug.times);
			document.getElementById("cycle").style.display="none";
			document.getElementById("specific_time").style.display="block";
			document.getElementById("num_dosage").style.display="none";
			//formatting label height
			$(everyLabel).css("height",60+$(selected_times).children().length*30);
			
		}else{
			$(num_hour).val(drug.times);
			document.getElementById("cycle").style.display="none";
			document.getElementById("specific_time").style.display="none";
			document.getElementById("num_dosage").style.display="block";
			clearSpecificTime();
			$(everyLabel).css("height",60);
		}
		
		$("#new_buttons").hide();
		$("#edit_buttons").show();
	}
	
	}else{ // patient doesnt exist
		$(patient_body).html("Given patient "+patient_name+" doesn't exist");
	}
});
	
	
	

	function addDrug(){
		clearSpecificTime();
		$(everyLabel).css("height",60);
		$(new_drugname).val("");
		$(dose).val("");
		$(add_startdate).val("");
		$(add_enddate).val("");
		$(cycle_hour).val("");
		$(legend_name).html("Add New Drug");
		
		$("#new_buttons").show();
		$("#edit_buttons").hide();
	}
	function addSpecificTime() {
					var time=document.getElementById("specific_hour").value+" : "+document.getElementById("specific_minute").value+" "+document.getElementById("am_pm").value;
					
				
					$(selected_times).append("<p>"+time+"</p>");
					var height = $(selected_times).height();
					height+=60;
					$(everyLabel).css("height",height);
				
				}
				
	function clearSpecificTime() {
					document.getElementById("selected_times").innerHTML="";
					$(everyLabel).css("height",60);
				}
			

			