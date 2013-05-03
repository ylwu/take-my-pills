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


	

	
		//load drugList, drugNameList
		var drugList= returnAllDrugs();
		var drugNameList = [];
		
		//console.log(drugList);		
		
		//loadup drugTab
		for (i=0;i<drugList.length;i++){
			$(drugTab).append("<li ><a data-toggle='tab' href='#' onclick=global.editDrugTab("+i+") >"+drugList[i].name+"</a></li>");
			drugNameList.push(drugList[i].name);
		}
		
		$( "#add_startdate").datepicker();
		$( "#add_enddate" ).datepicker();
		
		//clear all fields, set to add drug tab
		addDrugTab()
		
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
		
		
		$(add_newdrug).click(function()	{ //add new drug
				var drugname = $(new_drugname).val();
				
				//not empty name
				if (drugname.replaceAll(" ","").length !=0){
					//replicate name
					if (drugNameList.indexOf(drugname) != -1){
						$(message).html("Drug name already exists! Please name the drug a different name.");
					}else{
					
						var name=$(new_drugname).val();
						var dose=$("#dose").val();

						var startdate=$(add_startdate).val();
						var enddate=$(add_enddate).val();
						var frequency=parseInt($(add_dosefrequency).val());
						
						var times;
						if (frequency == 0){
				
							times = $(cycle_hour).val()+","+$(cycle_minute).val();
						}else if (frequency == 1){
							times = $(selected_times).html();
						}else{
							times = $(num_hour).val();
						}
						
						var pill=new myDrug(name, dose, startdate, enddate, frequency, times);
						drugList.push(pill);
						drugNameList.push(name);
						console.log(pill);
						$(drugTab).append("<li class='active'><a data-toggle='tab'  href='#' onclick=global.editDrugTab("+(drugList.length-1)+") >"+name+"</a></li>");
						$(addTab).removeClass("active");
						global.editDrugTab(drugList.length-1);
						$(top_message).html("New pill added!");
						
						//TODO write to json
						//writePill(pill);
					}
				}
			
		});

		global.editDrug=function(index){ //save edited drug
			var p = drugList[index];
			p.dose=$("#dose").val();

			p.startdate=$(add_startdate).val();
			p.enddate=$(add_enddate).val();
			p.frequency=parseInt($(add_dosefrequency).val());
						
			var times;
			if (p.frequency == 0){
				
				p.times = $(cycle_hour).val()+","+$(cycle_minute).val();
			}else if (p.frequency == 1){
				p.times = $(selected_times).html();
			}else{
				p.times = $(num_hour).val();
			}
			
			global.editDrugTab(index);
			$(top_message).html("Pill info updated!");
			
			//TODO: save edit to json
			//writePill(p);
		}
		global.editDrugTab=function(index){ //switch to edit drug view
			clearSpecificTime();
			$(everyLabel).css("height",60);
			$(message).html("");
			$(top_message).html("");
			
			var drug = drugList[index];
			
			$(legend_name).html("Edit Drug");
			$(new_drugname).val(drug.name);
			$(new_drugname).attr("disabled",true); //disable name change to make things easier
			$(dose).val(drug.dose);
			$(add_startdate).val(drug.startdate);
			$(add_enddate).val(drug.enddate);
			$(add_dosefrequency).val(drug.frequency);
			
			//change onclick event of delete yes button, and edit button
			$(delete_yes).attr("onClick","global.deleteDrug("+index+")");
			$(edit_newdrug).attr("onClick","global.editDrug("+index+")");
			
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
	
		global.deleteDrug=function(index){ //delete drug
		
			var pill=drugList[index];
			//TODO: delete in json file
			//unwritePill(pill);
			
			var name=drugNameList[index];
			drugNameList.splice(index, 1);
			drugList.splice(index, 1);
			
			//loadup drugTab
			$(drugTab).html("");
			$(drugTab).append("<li class='active' id='addTab'><a data-toggle='tab'  href='#' onclick=addDrugTab() >Add New Drug</a></li><hr>");
			for (i=0;i<drugList.length;i++){
				$(drugTab).append("<li ><a data-toggle='tab' href='#' onclick=global.editDrugTab("+i+") >"+drugList[i].name+"</a></li>");
				drugNameList.push(drugList[i].name);
			}
			

			addDrugTab();
			$(top_message).html("You have deleted: "+name);
			
			
		}

		
	
	}else{ // patient doesnt exist
		$(patient_body).html("Given patient "+patient_name+" doesn't exist");
	}
});
	
	
	

	function addDrugTab(){
	
		//form default values
		clearSpecificTime();
		$(everyLabel).css("height",60);
		$(new_drugname).val("");
		$(new_drugname).attr("disabled",false);
		$(dose).val("");
		$(add_startdate).val("");
		$(add_enddate).val("");
		$(cycle_hour).val("0");
		$(cycle_minute).val("0");
		$(specific_hour).val("1");
		$(specific_minute).val("00");
		$(am_pm).val("am");
		$(num_hour).val("1");
		
		$(legend_name).html("Add New Drug");
		
		$(add_dosefrequency).val(0);
		document.getElementById("cycle").style.display="block";
		document.getElementById("specific_time").style.display="none";
		document.getElementById("num_dosage").style.display="none";
		clearSpecificTime();
		$(everyLabel).css("height",60);
		
		$(message).html("");
		$(top_message).html("");
		
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
			

			