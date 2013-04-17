var DrugEvent = function(name, date, dosage, dateString, timeString,state){
	this.name = name;
	this.date = date;
	this.dosage = dosage;
	this.dateString = dateString;
	this.timeString = timeString;
	this.state = state;  // "future" or "past"
}