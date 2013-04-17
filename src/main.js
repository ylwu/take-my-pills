			var m = new Model();
			
			function changeDivToAddNewDrug() {
				document.getElementById("home").style.display="none";
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

			
			var save_new = function() {
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
					console.log(pillTimes);

				}
				else { // number of doses per day = one number (1-10)

					pillTimes=document.getElementById("num_hour").value;
				}

				var myPill=new myDrug(document.getElementById("new_drugname").value, document.getElementById("new_drugdose").value, document.getElementById("add_startdate").value, document.getElementById("add_enddate").value,  document.getElementById("add_dosefrequency").value, pillTimes);

				m.drugsQueue.push(myPill);
				m.initDrug(myPill);
				console.log(m.actionQueue);


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

				model.drugsQueue = model.drugsQueue.filter(function(pill){
  					return pill.name !== ele.id;
				});
					
			}

	$(document).ready(function() {

		var drugA = new myDrug("vatamin A", "2", "4/1/2013", "7/30/2013", 1, "<p>7 : 00 am</p><p>7 : 00 pm</p>");
		var drugB = new myDrug("Aspirin", "1", "4/6/2013", "7/30/2013", 1, "<p>12 : 00 pm</p>");
		var drugC = new myDrug("Sulfonylureas", "2", "4/6/2013", "7/30/2013", 1, "<p>3 : 00 pm</p>");
		m.drugsQueue.push(drugA);
		m.drugsQueue.push(drugB);
		m.drugsQueue.push(drugC);

  		$('#EditPills').click(function(evt){
  			document.getElementById("home").style.display="none";
  			document.getElementById("add_new").style.display="none";
			document.getElementById("edit_main").style.display="block";
			document.getElementById("edit_title").innerHTML="Edit Your Pills";
  		})

  		$('#home_btn').click( function(evt){
  			redirectToHome();
  		})

  		$("#add").click(function(evt){

		changeDivToAddNewDrug();
		});

		var addDrugEvent = function (drugEvent){
			var row = document.createElement('tr');
  			var td1 = document.createElement('td');
  			$(td1).append($(document.createElement('input')).attr('type','checkbox').addClass('checkbox'));
  			$(td1).append(drugEvent.name);
  			$(row).append($(td1));
  			$(row).append($(document.createElement('td')).append(drugEvent.dateString));
  			$(row).append($(document.createElement('td')).append(drugEvent.timeString));
  			$(row).append($(document.createElement('td')).append(drugEvent.dosage + "pills"));
  			$(row).append($(document.createElement('td')).append($(document.createElement('button')).addClass('btn').addClass('btn-info').append('info')));
  			$(row).addClass('drug');
  			if (drugEvent.state == "future"){
  				$(row).addClass("success");
  			} else {
  				$(row).addClass("error");
  			}
  			$('#drugtable').append($(row));

  			$(".checkbox").click(function(evt){
  				if ($("input:checked").length != 0){
  			$("#actionbar").show();
  			} else {
  				$("#actionbar").hide();
  			};

  			$("#take").click(function(evt){
  				var d = $("input:checked");
  				console.log("1");
  				console.log(d);
  				// var c = $("input:checked").parent().parent();
  				// console.log(c);
  				//$("input:checked").parent().parent().remove();
  			});

  			$("#miss").click(function(evt){
  				$("input:checked").parent().parent().remove();
  			});

  			});

  		}

			var refresh = function(){
				$('#drugtable').empty();
				for (var i=0; i<m.displayQueue.length; i++){
					addDrugEvent(m.displayQueue[i]);
				}
			}

			function redirectToHome() {
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='block';
				refresh();
			}


	/*
	This is the start of Ty's javascript
	*/
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


			m.initDrugs();
			redirectToHome();
			console.log(m.displayQueue);
			});



				
						


					