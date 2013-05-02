
// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};


$(document).ready(function() {

	//patient lists
	var all_patient = ["Amy Fox"];
	
	for (i=0;i<all_patient.length;i++){
		$(patientTab).append("<li class='active'><a data-toggle='tab' href='#'>"+all_patient[i]+"<span id='newMessage'></a></li>");
	}
	
	//load up messages
	var messages = returnAllMessages();
	console.log(messages);
	
	//show message history if there is a patient
	if (all_patient.length>0){
		for (i=0;i<messages.length;i++){
			var msgObj = messages[i];
			var code = "";
			
			if (msgObj.from == "patient"){ //message from patient
				code += "<tr class='doctor-chat-left";
				if (msgObj.read != "read"){ //unread message
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
			

			code+= "<div>"+msgObj.message+"</div></td></tr>";	
				
			//append the message	
			$(chat_history).append(code);
		}
			
			
			
		
	}
	
	$(function() {
	$(chat_text).val("");
	
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
			message +="<div>"+newChat+"</div></td></tr>";
			$(chat_history).append(message);
			
			$(chat_text).val("");
			$(chat_text).focus();
			
			//TODO: write to message file
		}
	});
	
	
});
	
	
});

