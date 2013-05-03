$(function (){

		var messages = returnAllMessages();
	
		for (i=0;i<messages.length;i++){
			var msgObj = messages[i];
			var code = "";
			
			if (msgObj.from == "patient"){ //message from patient (right)
				code += '<tr class="patient-message"><td><div><img src="patient.jpg" alt="Doctor" width="40" height="40"></div><div><span class="conversation-text">";'
				if (msgObj.read != "read"){ //unread message
					code += " new_message";
				}
				code+=msgObj.message + '</span></div></td></tr>';



				code += "'><td class = 'span6'>"+
						"<div><img class='chat-img' src='patient.jpg'>"+
						"<span><a href='doctor_patient.html?patient_name="+all_patient[0].replaceAll(' ','_')+
						"'>"+all_patient[0]+" </a></span> <span>" +msgObj.time+"</span></div>";
			}
			else{ // message from doctor (left)
				code += "<tr class='doctor-chat-right";	

				code += "'><td class = 'span6'>"+
						"<div><span>" +msgObj.time+"</span><span> Dr. John Williams </span><img class='chat-img' src='doctor.jpg'>"+
						"</div>";
			}
			

			code+= "<div>"+msgObj.message+"</div></td></tr>";	
				
			//append the message	
			$(conversation_table).append(code);
		}



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

		var newMsg = new myMessage("patient", datetime, newChat, "false");
		writeMsg(newMsg);

	});
	

});
