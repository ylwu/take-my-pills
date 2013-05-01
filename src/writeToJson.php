<?php
  $function = $_POST['function'];

  if ($function=="writePill") {
	  $newPill = $_POST['input'];
	  $file = fopen('pilldata.json','w+');
	  fwrite($file, $newPill);
	  fclose($file);
  }
?>
