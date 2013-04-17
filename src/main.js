	var actionQueue = [];
	var displayQueue = [];
	var hiddenDrugQueue = [];
	var drugsQueue=[];
	$(document).ready(function() {
    	
    	$(".checkbox").click(function(evt){
  		if ($("input:checked").length != 0){
  			$("#actionbar").show();
  		} else {
  			$("#actionbar").hide();
  		};

  		$("#take").click(function(evt){
  			$("input:checked").parent().parent().remove();
  		});

  		$("#miss").click(function(evt){
  			$("input:checked").parent().parent().remove();
  		});

  		});

  		$('#EditPills').click(function(evt){
  			document.getElementById("home").style.display="none";
  			document.getElementById("add_new").style.display="none";
			document.getElementById("edit_main").style.display="block";
			document.getElementById("edit_title").innerHTML="Edit Your Pills";
  		})

  		$("#add").click(function(evt){
  			var row = document.createElement('tr');
  			var td1 = document.createElement('td');
  			$(td1).append($(document.createElement('input')).attr('type','checkbox').addClass('checkbox'));
  			$(td1).append("DrugD");
  			$(row).append($(td1));
  			$(row).append($(document.createElement('td')).append('3/18/13'));
  			$(row).append($(document.createElement('td')).append('8:00pm'));
  			$(row).append($(document.createElement('td')).append('2pills'));
  			$(row).append($(document.createElement('td')).append($(document.createElement('button')).addClass('btn').addClass('btn-info').append('info')));
  			$(row).addClass("success").addClass('drug');
  			$('#drugtable').append($(row));

  			$(".checkbox").click(function(evt){
  				if ($("input:checked").length != 0){
  			$("#actionbar").show();
  			} else {
  				$("#actionbar").hide();
  			};

  			$("#take").click(function(evt){
  				$("input:checked").parent().parent().remove();
  			});

  			$("#miss").click(function(evt){
  				$("input:checked").parent().parent().remove();
  			});

  			});

  		});
	});
		
	/*
	This is the start of Ty's javascript
	*/

			$(function() {
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("cycle").style.display="block";
				document.getElementById("specific_time").style.display="none";
				document.getElementById("num_dosage").style.display="none";

			
				function editPill() { // for each drug button on Edit Your Pills page
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_title").innerHTML="Edit Pill";
									
				}
				
				// in Add New Pill
				$( "#add_startdate" ).datepicker();
				$( "#add_enddate" ).datepicker();
				
				// TODO: fix bug here (reset to default)
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
				
			});
						
			function redirectToHome() {
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='block';
			}
			
			function changeDivToAddNewDrug() {
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_title").innerHTML="Add New Pill";
			}
			
			function backToEdit() {
				var noSave=confirm("Your changes have not been saved. Do you still want to go back to Edit My Pills page?");
				if (noSave==true) {
					clear_add_new();
					document.getElementById("add_new").style.display="none";
					document.getElementById("edit_main").style.display="block";
					document.getElementById("edit_title").innerHTML="Edit Your Pills";
				}
			}
			
			function save_new() {
				var pdiv = document.createElement("div");
				pdiv.setAttribute("id",document.getElementById("new_drugname").value+"_pdiv");

				var del = document.createElement("input");
				del.setAttribute("type", "button");
				del.setAttribute("value", "-");
				del.setAttribute("id", document.getElementById("new_drugname").value);
				del.setAttribute("onclick", "deletePill(this);");
				
				var newButton = document.createElement("input");
				newButton.setAttribute("type", "button");
				newButton.setAttribute("value", document.getElementById("new_drugname").value);
				
				pdiv.appendChild(newButton);
				pdiv.appendChild(del);
				document.getElementById("drug_section").appendChild(pdiv);
				
				// save info into shared object function
				var pillTimes;
				if (document.getElementById("add_dosefrequency").value==0) { // cycle = two numbers
					pillTimes=document.getElementById("cycle_hour").value+","+document.getElementById("cycle_minute").value;
				}
				else if (document.getElementById("add_dosefrequency").value==1) { // specific time = innerHTML type string
					pillTimes=document.getElementById("selected_times").innerHTML; // <p>some:time am</p> listed

				}
				else { // number of doses per day = one number (1-10)

					pillTimes=document.getElementById("num_hour").value;
				}

				var myPill=new myDrug(document.getElementById("new_drugname").value, document.getElementById("new_drugdose").value, document.getElementById("add_startdate").value, document.getElementById("add_enddate").value, document.getElementById("new_drugname").value, document.getElementById("add_dosefrequency").value, pillTimes);

				drugsQueue.push(myPill);
				
				clear_add_new();
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_main").style.display="block";
				document.getElementById("edit_title").innerHTML="Edit Your Pills";
			}
			
			function clear_add_new() {
				document.getElementById("new_drugname").value="";
				document.getElementById("new_drugdose").value="";
				document.getElementById("add_startdate").value="";
				document.getElementById("add_enddate").value="";
				document.getElementById("selected_times").innerHTML="";
			}
			
			function addSpecificTime() {
				var p = document.createElement("p");
				p.innerHTML=document.getElementById("specific_hour").value+" : "+document.getElementById("specific_minute").value+" "+document.getElementById("am_pm").value;
				
				var selected=document.getElementById("selected_times");
				selected.appendChild(p);
			
			}
			
			function clearSpecificTime() {
				document.getElementById("selected_times").innerHTML="";
			
			}

			function deletePill(ele) {
				var parent=document.getElementById("drug_section");
				var child=document.getElementById(ele.id+"_pdiv");
				parent.removeChild(child);

				drugsQueue = drugsQueue.filter(function(pill){
  					return pill.name !== ele.id;
				});
					
			}