// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};
$(function (){

		var messages = returnAllMessages();
	
		var code = "";
		for (var i=0;i<messages.length;i++){
			var msgObj = messages[i];
			
			if (msgObj.from == "patient"){ //message from patient (right)
				code += '<tr class="patient-message success"><td><div><img src="patient.jpg" alt="Doctor" width="40" height="40"></div><div><span class="conversation-text">"' + msgObj.message + '</span></div></td></tr>';
			}
			else{ // message from doctor (left)
				code += '<tr><td class="doctor-message"><div><img src="doctor.jpg" alt="Doctor" width="40" height="40"></div><div><span>';	

				if (msgObj.read != "true"){ //unread message
					code += "<strong>new message:</strong> "; // can make diff color? red?
					changeBoolMsg(msgObj, "false");
				}

				code += msgObj.message + '</span></div></td></tr>';
			}

		}	
		//append the message	
		$(conversation_table).append(code);


	$(doctor_message_box).val("");

	$(doctor_message_submit_btn).click(function(){
		var num = $("conversation_table").find("tr:first td").length;
		var newChat = $(doctor_message_box).val();
		if (newChat.replaceAll(" ","").length !=0){
			newChat = newChat.replaceAll("\n"," ");
			newChat = newChat.replaceAll("\""," ");
			newChat = newChat.replaceAll("'"," ");
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
		}

	});
	

});
