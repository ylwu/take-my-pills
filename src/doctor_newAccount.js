
$(function() {
	var first = $(new_first_name).val();
	var last = $(new_last_name).val();
	var email = $(new_email).val();
	var pw = $(new_pw).val();
	var re_pw = $(new_re_pw).val();
	
	$(create_doctor).click(function() {
		var first = $(new_first_name).val();
		var last = $(new_last_name).val();
		var email = $(new_email).val();
		var pw = $(new_pw).val();
		var re_pw = $(new_re_pw).val();
		
		//window.location="doctor_messages.html";
		$(message).html("New account registration is not open at the moment.");
	});
	
	$(cancel).click(function() {
		window.location="doctor_login.html";
		
	});
	
	
});