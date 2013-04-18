
// http://dumpsite.com/forum/index.php?topic=4.msg8#msg8
String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};


$(function() {
	$(chat_text).val("");
	
	$(send_chat).click(function() {
		var newChat = $(chat_text).val();
		if (newChat.replaceAll(" ","").length !=0){

			var message = "<tr class='doctor-chat-right'><td class = 'span6'><div><img class='chat-img' src='doctor.jpg'></div>";
			message +="<div>Dr. Xxxx Xxxxxxxx: "+newChat+"</div></td></tr>";
			$(chat_history).append(message);
			
			$(chat_text).val("");
			$(chat_text).focus();
		}
	});
	
});