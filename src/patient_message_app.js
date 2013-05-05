  $(document).ready(function(){
      $(home_btn).click(function()    {
            
                window.location="mainPage_jason.html";
        });

      $('#EditPills').click(function(evt){
      window.location = "mainPage_jason.html";
      var myPillsList=returnAllDrugs();
      updateManagePills(myPillsList);
        document.getElementById("home").style.display="none";
        document.getElementById("add_new").style.display="none";
      document.getElementById("edit_main").style.display="block";
      document.getElementById("edit_title").innerHTML="Edit Your Pills";
      })

   });  

   $(document).ready(function(){
  		$(app_sign_out_btn).click(function()    {
            
                window.location="patient_log_in.html";
        });      
   });	

    $(document).ready(function(){
      $(doctor_div).click(function()    {
            
                window.location="patient_message.html";
        });      
   });  

