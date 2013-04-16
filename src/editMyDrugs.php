<?php
session_start();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Take Your Pills</title>
    	 <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
<link rel="stylesheet" href="/resources/demos/style.css" />
	
		<script type="text/javascript">
		
			$(function() {
				document.getElementById("add_new").style.display="none";
				document.getElementById("cycle").style.display="block";
				document.getElementById("specific_time").style.display="none";
				document.getElementById("num_dosage").style.display="none";
				
				function editPill() { // for each drug button on Edit Your Pills page
				document.getElementById("edit_main").style.display="none";
				document.getElementById("add_new").style.display="block";
				document.getElementById("edit_title").innerHTML="Edit Pill";
				
				// TODO: RE-save params into fields
				alert("how to RE-save to JSON object? php session cookie?");
					
				}
				
				// TODO: remove line in DOM
				function deletePill() {
					alert("how to delete this line in DOM");
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
				alert('link to Home: Take Your Pills page!');
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
				var del = document.createElement("input");
				del.setAttribute("type", "button");
				del.setAttribute("value", "-");
				del.setAttribute("onclick", "deletePill()");
				
				var newButton = document.createElement("input");
				newButton.setAttribute("type", "button");
				newButton.setAttribute("value", document.getElementById("new_drugname").value);
				
				pdiv.appendChild(newButton);
				pdiv.appendChild(del);
				document.getElementById("drug_section").appendChild(pdiv);
				
				// TODO: save info into some form
				// SAVE ALL INFO INTO php?? json object? and then clear all fields
				alert("how to save to JSON object? php session cookie?");
				
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
		</script>
  </head>

  <body>

    <h1 id="edit_title">Edit Your Pills</h1>
	<div id="edit_main">
		<input type="button" id="edit_to_home" onclick="redirectToHome()" value="Back to Home">
		
		<div id="drug_section">
		</div>
			
		<input type="button" id="add_new_drug" onclick="changeDivToAddNewDrug()" value="+">
	</div>
		
		
	<div id="add_new">

		<input type="button" id="back_to_edit" onclick="backToEdit()" value="Back to Edit">

		<div id="add_new_section">
			<p>New Pill Name: <input type="text" id="new_drugname" /></p>
			<p>Dose: <input type="text" id="new_drugdose" /></p>
			<p>Start Date: <input type="text" id="add_startdate" /></p>
			<p>End Date: <input type="text" id="add_enddate" /></p>
			<p>Dose Frequency: <select id="add_dosefrequency">
				  <option value="0">Set Cycle</option>
				  <option value="1">Set Specific Time</option>
				  <option value="2">Set Number of Dose(s) Per Day</option>
			</select></p>

			<div id="cycle">
				<p>Take every <select id="cycle_hour">
				  <option value="0">0</option>
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
				  <option value="6">6</option>
				  <option value="7">7</option>
				  <option value="8">8</option>
				  <option value="9">9</option>
				  <option value="10">10</option>
				  <option value="11">11</option>
				  <option value="12">12</option>
				  <option value="13">13</option>
				  <option value="14">14</option>
				  <option value="16">15</option>
				  <option value="16">16</option>
				  <option value="17">17</option>
				  <option value="18">18</option>
				  <option value="19">19</option>
				  <option value="20">20</option>
				  <option value="21">21</option>
				  <option value="22">22</option>
				  <option value="23">23</option>
			</select> hour(s), and <select id="cycle_minute">
				  <option value="0">0</option>
				  <option value="15">15</option>
				  <option value="30">30</option>
				  <option value="45">45</option>
			</select> minute(s)
			</p>
			</div>
			<div id="specific_time">
				Take every day at: <div id="selected_times"></div>
				<p><select id="specific_hour">
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
				  <option value="6">6</option>
				  <option value="7">7</option>
				  <option value="8">8</option>
				  <option value="9">9</option>
				  <option value="10">10</option>
				  <option value="11">11</option>
				  <option value="12">12</option>
			</select> : <select id="specific_minute">
				  <option value="00">00</option>
				  <option value="15">15</option>
				  <option value="30">30</option>
				  <option value="45">45</option>
			</select> <select id="am_pm">
				  <option value="am">am</option>
				  <option value="pm">pm</option>
			</select>
			</p>
			<p><input type="button" id="clear_specific" onclick="clearSpecificTime()" value="Clear Times"> <input type="button" id="add_specific" onclick="addSpecificTime()" value="Add This Time"></p>
			</div>
			<div id="num_dosage">
				<p>Take <select id="cycle_hour">
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
				  <option value="6">6</option>
				  <option value="7">7</option>
				  <option value="8">8</option>
				  <option value="9">9</option>
				  <option value="10">10</option>
			</select> time(s) per day
			</div>
			<p><input type="button" id="save_new" onclick="save_new()" value="Save New Pill"></p>
			
		</div>
	</div>

<?php

$_SESSION['list_of_pills']="";
?>


  </body>

</html>
