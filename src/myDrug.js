var myDrug = function(name, dose, startdate, enddate, frequency, times){
	this.name = name; // string
	this.dose = dose; // string
	this.startdate = startdate; // string $("#yourinput").datepicker( "setDate" , "7/11/2011" );
	this.enddate = enddate; // string
	this.frequency = frequency; // value 0,1,2
	this.times = times; // 2 numbers, strings with tags, or 1 number
}