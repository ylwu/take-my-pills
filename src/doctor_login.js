


$(document).ready(function() {	
	$(login).val("");
	
	
	$(login).click(function() {
		var email = $(login_email).val();
		var pw = $(login_pw).val();
		
		if (email=="" || pw==""){ //check for existing acc
			$(message).html("Cannot have empty account email or password");
		}else{
			window.location="doctor_messages.html";
		}
	});
	

	$(new_acc).click(function() {
		window.location="doctor_newAccount.html";
		
	});
	
})