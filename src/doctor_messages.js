
// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};


$(document).ready(function() {
	$(chat_text).val("");
	
	//load patient info from json
	var patient = returnAllPatients();
	
	
	//patient lists
	var all_patient = [];
	
	if (patient.connect == "true"){ //have a patient
		all_patient.push(patient.name);
	
		for (i=0;i<all_patient.length;i++){
			$(patientTab).append("<li class='active'><a data-toggle='tab' href='#'>"+all_patient[i]+"<span id='newMessage'></a></li>");
		}
		
		//load up messages
		var messages = returnAllMessages();
		//console.log(messages);
		$(chat_history).html("");
		//show message history if there is a patient
		if (all_patient.length>0){
			for (i=0;i<messages.length;i++){
				var msgObj = messages[i];
				var code = "";
				
				if (msgObj.from == "patient"){ //message from patient
					code += "<tr class='doctor-chat-left";
					if (msgObj.read != "true"){ //unread message
					
						//TODO: change object read status to true
						changeBoolMsg(msgObj, "true");
						code += " new_message";
					}
					code += "'><td class = 'span6'>"+
							"<div><img class='chat-img' src='patient.jpg'>"+
							"<span><a href='doctor_patient.html?patient_name="+all_patient[0].replaceAll(' ','_')+
							"'>"+all_patient[0]+" </a></span> <span>" +msgObj.time+"</span></div>";
				}else{
					code += "<tr class='doctor-chat-right";	

					code += "'><td class = 'span6'>"+
							"<div><span>" +msgObj.time+"</span><span> Dr. John Williams </span><img class='chat-img' src='doctor.jpg'>"+
							"</div>";
				}
				

				code+= "<div style='word-wrap: break-word; white-space: -moz-pre-wrap;'>"+msgObj.message+"</div></td></tr>";	
					
				//append the message	
				$(chat_history).append(code);
			}
				
				
				
			
		}
		var objDiv = document.getElementById("chat_history");
		objDiv.scrollTop = objDiv.scrollHeight;
	
	
	
		$(function() {
			
			
			$(send_chat).click(function() {
				var newChat = $(chat_text).val();
				if (newChat.replaceAll(" ","").length !=0){
					var currentdate = new Date(); 
					var datetime = (currentdate.getMonth()+1)  + "/" 
						+ currentdate.getDate() + "/"
						+ currentdate.getFullYear() + " "  
						+ currentdate.getHours() + ":"  
						+ currentdate.getMinutes() + ":" 
						+ currentdate.getSeconds();
						
					var message = "<tr class='doctor-chat-right'><td class = 'span6'><div><span>" +datetime+"</span><span> Dr. John Williams </span><img class='chat-img' src='doctor.jpg'></div>";
					message +=newChat;
					//message +="<div style='word-wrap: break-word; white-space: -moz-pre-wrap;'>"+newChat+"</div></td></tr>";
					$(chat_history).append(message);
					var objDiv = document.getElementById("chat_history");
					objDiv.scrollTop = objDiv.scrollHeight;
					

					$(chat_text).val("");
					$(chat_text).focus();
					
					//TODO: write to message file
					var jsonMsg = new myMessage("doctor",datetime,newChat,"false");
					
					writeMsg(jsonMsg);
				}
			});

		
		
		});
	
	}else{ //have no patient
		$(chat_history).html("You are not connected to any patient yet!");
	}
	
	
});

