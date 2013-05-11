<?php
  $function = $_POST['function'];

  if ($function=="writePill") {
	  $newPill = $_POST['input'];
	  $file = fopen('pilldata.json','w+');
	  fwrite($file, $newPill);
	  fclose($file);
  }
  else if ($function=="writeMsg") {
	  $newPill = $_POST['input'];
	  $file = fopen('messageData.json','w+');
	  fwrite($file, $newPill);
	  fclose($file);
  }
  else if ($function=="writeMissedDrugEvent") {
	  $newPill = $_POST['input'];
	  $file = fopen('drugEventsData.json','w+');
	  fwrite($file, $newPill);
	  fclose($file);
  }

  else if ($function=="writePatient") {
	  $newPill = $_POST['input'];
	  $file = fopen('patientData.json','w+');
	  fwrite($file, $newPill);
	  fclose($file);
  }
?>
