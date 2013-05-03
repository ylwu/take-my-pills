$(function (){

	$(doctor_message_box).val("");

	$(doctor_message_submit_btn).click(function(){
		var num = $("conversation_table").find("tr:first td").length;
		var newChat = $(doctor_message_box).val();
		var message = "<tr class='patient-message'><td><div><img src='patient.jpg' width='40' height='40'></div><div><span class='conversation-text'>"+newChat+"</span> </div></td></tr>";
		$(conversation_table).append(message);
		$(doctor_message_box).val("");
		$(doctor_message_box).focus;

		// messaging php - Ty
		var currentdate = new Date();
		var datetime = (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " " 
                + currentdate.getHours() + ":" 
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

		var newMsg = new message("patient", datetime, newChat, "false");
		writeMsg(newMsg);

	});
	

});
