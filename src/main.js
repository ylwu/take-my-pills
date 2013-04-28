			var m = new Model();
			
			function changeDivToAddNewDrug() {
				document.getElementById("home").style.display="none";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_title").innerHTML="Add New Pill";
			}

			function showHistory(){
				document.getElementById("history").style.display="block";
				document.getElementById('home').style.display="none";
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

			function deletePill(ele) {
				var parent=document.getElementById("drug_section");
				var child=document.getElementById(ele.id+"_pdiv");
				parent.removeChild(child);

				m.drugsQueue = m.drugsQueue.filter(function(pill){
  					return pill.name !== ele.id;
				});
					
			}

			function editPill(ele) {

				var selectedPill=m.drugsQueue.filter(function(pill){
  					return pill.name == ele.value;
				});

				myPill=selectedPill[0];

				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("edit_title").innerHTML="Edit " + ele.value;

				var pillName = myPill.name;
				var pillDose = myPill.dose;
				var pillStart = myPill.startdate;
				var pillEnd = myPill.enddate;
				var pillFreq = myPill.frequency;
				var pillTimes = myPill.times;
				
				document.getElementById("new_drugname").value=pillName;
				document.getElementById("new_drugdose").value=pillDose;
				document.getElementById("add_startdate").value=pillStart;
				document.getElementById("add_enddate").value=pillEnd;
				document.getElementById("add_dosefrequency").value=pillFreq;

				if (pillFreq==0) { // cycle = two numbers
					parsedTimes=pillTimes.split(",");
					document.getElementById("cycle_hour").value=parsedTimes[0];
					document.getElementById("cycle_minute").value=parsedTimes[1];
				}
				else if (pillFreq==1) { // specific time = innerHTML type string
					document.getElementById("selected_times").innerHTML=pillTimes; // <p>some:time am</p> listed
					console.log(pillTimes);

				}
				else { // number of doses per day = one number (1-10)

					document.getElementById("num_hour").value=pillTimes;
				}

			}

			var save_new = function() {
				var pdiv = document.createElement("div");
				//pdiv.setAttribute("class", "row");
				//pdiv.setAttribute("align", "center");
				pdiv.setAttribute("id",document.getElementById("new_drugname").value+"_pdiv");

				var del = document.createElement("input");
				del.setAttribute("type", "button");
				del.setAttribute("value", "-");
				del.setAttribute("id", document.getElementById("new_drugname").value);
				del.setAttribute("onclick", "deletePill(this);");
				del.setAttribute("class", "btn");
				
				
				var newButton = document.createElement("input");
				newButton.setAttribute("type", "button");
				newButton.setAttribute("value", document.getElementById("new_drugname").value);
				newButton.setAttribute("onclick", "editPill(this);");
				newButton.setAttribute("class", "btn");

				
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

				// if pill exist already, update (ie delete, save new)
				var checkPill=m.drugsQueue.filter(function(pill){
  					return pill.name == document.getElementById("new_drugname").value;
				});
				while (checkPill.length>0) {
					deletePill(document.getElementById(checkPill[0].name));
					checkPill.pop();
				}

				m.drugsQueue.push(myPill);
				m.initDrug(myPill);
				//console.log(m.actionQueue);


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

		// function returnAllDrugs(){
		// 	$.getJSON('pilldata.json',null, function(data){
		// 		return data;
		// 	})
		// }

		// function readDrugsfromJson(){
		// 	$.getJSON('pilldata.json',null, function(data){
  // 			data.forEach(function(entry){
  // 				m.drugsQueue.push(entry);
  // 				console.log(m.drugsQueue);
  // 			})
		// 	})
		// }

		function readDrugs(){
			$.ajax({
  				dataType: "json",
  				url: 'pilldata.json',
  				async: false,
  				success: function(data){
  					data.forEach(function(entry){
  						m.drugsQueue.push(entry);
  						console.log(m.drugsQueue);
  					})
				}
			});
		}


	$(document).ready(function() {

		document.getElementById("history").style.display="none";

		// var drugA = new myDrug("Vitamin A", "2", "4/1/2013", "7/30/2013", 1, "<p>7 : 00 am</p><p>7 : 00 pm</p>");
		// var drugB = new myDrug("Aspirin", "1", "4/6/2013", "7/30/2013", 1, "<p>12 : 00 pm</p>");
		// var drugC = new myDrug("Sulfonylureas", "2", "4/6/2013", "7/30/2013", 1, "<p>3 : 00 pm</p>");

		// m.drugsQueue.push(drugA);
		// // m.drugsQueue.push(drugB);
		// // m.drugsQueue.push(drugC);

  		$('#EditPills').click(function(evt){
  			document.getElementById("home").style.display="none";
  			document.getElementById("add_new").style.display="none";
			document.getElementById("edit_main").style.display="block";
			document.getElementById("edit_title").innerHTML="Edit Your Pills";
  		})

  		$('#history-header').click(function(evt){
  			showHistory();
  		})


  		$('#present-header').click(function(evt){
  			redirectToHome();
  		})

  		$('#home_btn').click( function(evt){
  			redirectToHome();
  		})

  		$("#add").click(function(evt){

		changeDivToAddNewDrug();
		});

		$("#morepills").click(function(evt){
  				m.moreDrugs();
  				refresh();
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
  				console.log("x");
  				if ($("input:checked").length != 0){
  			$("#actionbar").show();
  			$("#morepills").hide();
  			} else {
  				$("#actionbar").hide();
  				$("#morepills").show();
  			};

  			$("#take").click(function(evt){
  				$("input:checked").parent().parent().remove();
  				$("#actionbar").hide();
  				$("#morepills").show();
  			});

  			$("#miss").click(function(evt){
  				$("input:checked").parent().parent().remove();
  				$("#actionbar").hide();
  				$("#morepills").show();
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
				document.getElementById("history").style.display = "none";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='block';
				m.initDrugs();
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
						$("#cycle").show();
						$("#specific_time").hide();
						$("#num_dosage").hide();
						//document.getElementById("cycle").style.display="block";
						//document.getElementById("specific_time").style.display="none";
						//document.getElementById("num_dosage").style.display="none";
					}
					else if ($(this).val()==1) {
						$("#cycle").hide();
						$("#specific_time").show();
						$("#num_dosage").hide();
						//document.getElementById("cycle").style.display="none";
						//document.getElementById("specific_time").style.display="block";
						//document.getElementById("num_dosage").style.display="none";
					}
					else {
						$("#cycle").hide();
						$("#specific_time").hide();
						$("#num_dosage").show();
						//document.getElementById("cycle").style.display="none";
						//document.getElementById("specific_time").style.display="none";
						//document.getElementById("num_dosage").style.display="block";
					}
				});

				readDrugs();
				m.initDrugs();
				redirectToHome();

			
	});

/*Morgan's jquery for button response 

*/

				
   $(document).ready(function(){
  		$(contact_doctor_btn).click(function()    {
            
                window.location="patient_message_app.html";
        });      
   });						

   $(document).ready(function(){
  		$(app_sign_out_btn).click(function()    {
            
                window.location="patient_log_in.html";
        });      
   });	
					
