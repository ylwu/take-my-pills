	function updateManagePills(myPillsList) { // takes a list of myDrug objects, creates buttons for each on "manage pills" page under div "drug_section"

		// clear all childs (ie pill buttons) of div drug_section first
		document.getElementById("drug_section").innerHTML="";

		//var myPillsList=returnAllDrugs();

		for (var i=0; i<myPillsList.length; i++) {
			var pdiv = document.createElement("div");
		        pdiv.setAttribute("id",myPillsList[i].name+"_pdiv");

		        var del = document.createElement("input");
		        del.setAttribute("type", "button");
		        del.setAttribute("value", "-");
		        del.setAttribute("id", myPillsList[i].name);
		        del.setAttribute("onclick", "deletePill(this);");
		        del.setAttribute("class", "btn");


		        var newButton = document.createElement("input");
		        newButton.setAttribute("type", "button");
		        newButton.setAttribute("value", myPillsList[i].name);
		        newButton.setAttribute("onclick", "editPill(this);");
		        newButton.setAttribute("class", "btn");
			newButton.setAttribute("style", "width:50%; font-family: Akzidenz Grotesk;");

		        pdiv.appendChild(newButton);
		        pdiv.appendChild(del);
		        document.getElementById("drug_section").appendChild(pdiv);
		}
	}


	function addSpecificTime() {
		var p = document.createElement("p");
		p.innerHTML=document.getElementById("specific_hour").value+" : "+document.getElementById("specific_minute").value+" "+document.getElementById("am_pm").value;

		var selected=document.getElementById("selected_times");
		selected.appendChild(p);
		
		var objDiv = document.getElementById("add_new");
		objDiv.scrollTop = objDiv.scrollHeight;

	}

	function clearSpecificTime() {
		document.getElementById("selected_times").innerHTML="";

	}

	function clear_add_new() {
		document.getElementById("new_drugname").value="";
		document.getElementById("new_drugdose").value="";
		document.getElementById("add_startdate").value="";
		document.getElementById("add_enddate").value="";
		document.getElementById("selected_times").innerHTML="";
		document.getElementById("add_dosefrequency").value=0;
	}

	function save_new() {
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

				var myPill=new myDrug(document.getElementById("new_drugname").value, document.getElementById("new_drugdose").value, document.getElementById("add_startdate").value, document.getElementById("add_enddate").value,  document.getElementById("add_dosefrequency").value, pillTimes);

				var newList=writePill(myPill);

				clear_add_new();
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_main").style.display="block";
				$("#message_selectDoctors").hide();
				document.getElementById("edit_title").innerHTML="Edit Your Pills";
			}


	function backToEdit() {
		var noSave=confirm("Your changes have not been saved. Do you still want to go back to Edit My Pills page?");
		if (noSave==true) {
			clear_add_new();

			updateManagePills(myJsonPills);
			document.getElementById("add_new").style.display="none";
			document.getElementById("edit_main").style.display="block";
			document.getElementById("edit_title").innerHTML="Edit Your Pills";
		}
	}

	function changeDivToAddNewDrug() {
		clear_add_new();
		document.getElementById("home").style.display="none";
		document.getElementById("edit_main").style.display="none";
		document.getElementById("add_new").style.display="block";
		document.getElementById("edit_title").innerHTML="Add New Pill";

		$("#cycle").show();
		$("#specific_time").hide();
		$("#num_dosage").hide();
	}			


		function deletePill(ele) {
				var parent=document.getElementById("drug_section");
				var child=document.getElementById(ele.id+"_pdiv");
				parent.removeChild(child);

				var toDelete=new myDrug(ele.id, "", "", "", 0, 0); // unwritePill only matches by pill.name; but is secure in that only one pill can be named pill.name
				unwritePill(toDelete);

			}

			function editPill(ele) {

				// cool old backend implementation: selects based on filter (ie, if pill.name == ele.value)

				//var selectedPill=m.drugsQueue.filter(function(pill){
  				//	return pill.name == ele.value;
				//});

				//myPill=selectedPill[0];

				var pillSelected;
				//var myPillsList=returnAllDrugs();
				for (var i=0; i<myJsonPills.length; i++) {
					if (ele.value==myJsonPills[i].name) {
						pillSelected=myJsonPills[i]; // finds the selected pill
					}
				}

				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_main").style.display="none";
				$(selected_times).html("");
				document.getElementById("edit_title").innerHTML="Edit " + ele.value;

				var pillName = pillSelected.name;
				var pillDose = pillSelected.dose;
				var pillStart = pillSelected.startdate;
				var pillEnd = pillSelected.enddate;
				var pillFreq = pillSelected.frequency;
				var pillTimes = pillSelected.times;

				document.getElementById("new_drugname").value=pillName;
				document.getElementById("new_drugdose").value=pillDose;
				document.getElementById("add_startdate").value=pillStart;
				document.getElementById("add_enddate").value=pillEnd;
				document.getElementById("add_dosefrequency").value=pillFreq;

				if (pillFreq==0) { // cycle = two numbers
					$(selected_times).hide();
					document.getElementById("cycle").style.display="block";
					document.getElementById("num_dosage").style.display="none";
					document.getElementById("specific_time").style.display="none";
					parsedTimes=pillTimes.split(",");
					document.getElementById("cycle_hour").value=parsedTimes[0];
					document.getElementById("cycle_minute").value=parsedTimes[1];
				}
				else if (pillFreq==1) { // specific time = innerHTML type string
					$(selected_times).show();
					document.getElementById("cycle").style.display="none";
					document.getElementById("num_dosage").style.display="none";
					document.getElementById("specific_time").style.display="block";
					document.getElementById("selected_times").innerHTML=pillTimes; // <p>some:time am</p> listed
					//console.log(pillTimes);

				}
				else { // number of doses per day = one number (1-10)
					$(selected_times).hide();
					document.getElementById("cycle").style.display="none";
					document.getElementById("num_dosage").style.display="block";
					document.getElementById("specific_time").style.display="none";
					document.getElementById("num_hour").value=pillTimes;
				}

			}


	//Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function missDrugEvent(DrugName, dateString, timeString){
  for (var i = 0; i < m.displayQueue.length; i++) {
    entry = m.displayQueue[i];
    if ((entry.name == DrugName) && (entry.dateString == dateString) && (entry.timeString == timeString)){
    	entry.state = "missed";
      m.historyQueue.push(entry);
      m.displayQueue.remove(i);

      //To do: Ty, write *entry* (which is a javascript object in the format of drugevent.js); you'll have to change to format according the format in missedPillsData.json
      return entry;
    };
  };
}

function takeDrugEvent(DrugName, dateString, timeString){
  for (var i = 0; i < m.displayQueue.length; i++) {
    entry = m.displayQueue[i];
    if ((entry.name == DrugName) && (entry.dateString == dateString) && (entry.timeString == timeString)){
    	entry.state = "taken";
      m.historyQueue.push(entry);
      m.displayQueue.remove(i);
      return entry;
    };
  };
}

	$(document).ready(function() {

		myJsonPills=returnAllDrugs();

  		$('#EditPills').click(function(evt){
			updateManagePills(myJsonPills);
  			document.getElementById("home").style.display="none";
  			document.getElementById("add_new").style.display="none";

			document.getElementById("history").style.display="none";

			document.getElementById("edit_main").style.display="block";
			document.getElementById("edit_title").innerHTML="Edit Your Pills";
			$("#message_selectDoctors").hide();
			$("#message-main").hide();
  		})

  		$('#history-header').click(function(evt){
			if (document.getElementById("history-header").innerHTML=="See History") {
				document.getElementById("history-header").innerHTML="See Present";
				document.getElementById("history-header").style.fontSize="13.5px";

				// block Edit stuff from under app
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				$("#message_selectDoctors").hide();
				$("#message-main").hide();

				showHistory();
			}
			else {
				document.getElementById("history-header").innerHTML="See History";
				document.getElementById("history-header").style.fontSize="13.5px";
  				redirectToHome();
			}
  		});


  		$('#present-header').click(function(evt){
  			redirectToHome();
  		});

  		$('#home_btn').click( function(evt){
  			redirectToHome();
  		});

  		$("#add").click(function(evt){

		changeDivToAddNewDrug();
		});

		$("#morepills").click(function(evt){
  				m.moreDrugs();
  				reloadHome();
  		});

  		$("#contact_doctor_btn").click(function()    {
          clear_add_new();
          redirectToMessage();
          $("#message-main").hide();
        });

        $('#doctor_div').click(function()    {
            $("#message_selectDoctors").hide();
            $("#message-main").show();
        });  

        $("#app_sign_out_btn").click(function()    {
            		clear_add_new();
            window.location="patient_log_in.html";
        });     



		var addDrugEventToHome = function (drugEvent){
			var row = document.createElement('tr');
  			var td1 = document.createElement('td');
  			$(td1).append($(document.createElement('input')).attr('type','checkbox').addClass('checkbox'));
  			$(td1).append(drugEvent.name);
  			$(row).append($(td1));
  			$(row).append($(document.createElement('td')).append(drugEvent.dateString));
  			$(row).append($(document.createElement('td')).append(drugEvent.timeString));
  			$(row).append($(document.createElement('td')).append(drugEvent.dosage + "pills"));
  			//$(row).append($(document.createElement('td')).append($(document.createElement('button')).addClass('btn').addClass('btn-info').append('info')));
  			$(row).addClass('drug');
  			if (drugEvent.state == "future"){
  				$(row).addClass("untaken_med warning");
  			} else {
  				$(row).addClass("missed_med ty-error"); // might have to remove success and error class for ty-version
  			}
  			$('#drugtable').append($(row));

  			$(".checkbox").click(function(evt){
  			   if ($("input:checked").length != 0){
  			$("#actionbar").show();
  			$("#morepills").hide();
  			$(row).toggleClass('back-red');
  			} else {
  				$("#actionbar").hide();
  				$("#morepills").show();
  			};

  			
  			});

  		}


  		var addDrugEventToHistory = function (drugEvent){
			var row = document.createElement('tr');
  			var td1 = document.createElement('td');
  			$(td1).append(drugEvent.name);
  			$(row).append($(td1));
  			$(row).append($(document.createElement('td')).append(drugEvent.dateString));
  			$(row).append($(document.createElement('td')).append(drugEvent.timeString));
  			$(row).append($(document.createElement('td')).append(drugEvent.dosage + "pills"));
  			$(row).addClass('drug');
  			if (drugEvent.state == "taken"){
  				$(row).append($(document.createElement('td')).append("taken"));
  				$(row).addClass("success");
  			} else {
  				$(row).append($(document.createElement('td')).append("missed"));
  				$(row).addClass("error");
  			}
  			$('#historytable').append($(row));

  		}

			var reloadHome = function(){
				$('#drugtable').empty();
				for (var i=0; i<m.displayQueue.length; i++){
					addDrugEventToHome(m.displayQueue[i]);
				}

			}

			var reloadHistory = function(){
				$('#historytable').empty();
				for (var i=0; i<m.historyQueue.length; i++){
					addDrugEventToHistory(m.historyQueue[i]);
					console.log(m.historyQueue);
				}

			}

			function redirectToHome() {
				clear_add_new();
				document.getElementById("history").style.display = "none";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='block';
				$("#message_selectDoctors").hide();
				$("#message-main").hide();
				loadDrugs();
				//m.initDrugs();
				reloadHome();
			}

			function redirectToMessage() {
				document.getElementById("history").style.display = "none";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='none';
				$("#message_selectDoctors").show();
				$("#message-main").hide();
			}


			function startHome() {
				clear_add_new();
				document.getElementById("history").style.display = "none";
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="none";
				document.getElementById("edit_title").innerHTML="";
				document.getElementById('home').style.display='block';
				$("#message_selectDoctors").hide();
				$("#message-main").hide();

				loadDrugs();
				m.initDrugs();
				reloadHome();
			}

			function showHistory(){
				document.getElementById("history").style.display="block";
				document.getElementById('home').style.display="none";
				loadHistory();
				reloadHistory();
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
				})

				startHome();

				$("#take").click(function(evt){
				var e = $("input:checked");
				for (var i = 0; i < e.length; i++) {
					var drugName = e[i].parentNode.parentNode.children[0].textContent;
					var dateString = e[i].parentNode.parentNode.children[1].innerHTML;
					var timeString = e[i].parentNode.parentNode.children[2].innerHTML;
					var drugEvent = takeDrugEvent(drugName,dateString,timeString);

				}
  				$("input:checked").parent().parent().remove();
  				$("#actionbar").hide();
  				$("#morepills").show();
  				});

  				$("#miss").click(function(evt){
  				var e = $("input:checked");
				for (var i = 0; i < e.length; i++) {
					var drugName = e[i].parentNode.parentNode.children[0].textContent;
					var dateString = e[i].parentNode.parentNode.children[1].innerHTML;
					var timeString = e[i].parentNode.parentNode.children[2].innerHTML;
					var drugEvent = missDrugEvent(drugName,dateString,timeString);

				}
  					$("input:checked").parent().parent().remove();
  					$("#actionbar").hide();
  					$("#morepills").show();
  				});


	})
