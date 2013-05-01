<?php
  $data = $_POST['data'];
  echo 'hi index';

  $file = fopen('test.txt','w+');
  fwrite($file, "TEST TEST TEST");
  fclose($file);
?>
