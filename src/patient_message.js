   $(document).ready(function(){
      $(home_btn).click(function()    {
            
               window.location="mainPage_jason.html";
      });      
   }); 


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

var objDiv = document.getElementById("conversation_table");
                objDiv.scrollTop = objDiv.scrollHeight;

   