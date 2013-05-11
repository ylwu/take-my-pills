function myDrug(name, dose, startdate, enddate, frequency, times){
	this.name = name; // string
	this.dose = dose; // string
	this.startdate = startdate; // string $("#yourinput").datepicker( "setDate" , "7/11/2011" );
	this.enddate = enddate; // string
	this.frequency = frequency; // value 0,1,2; 0==cycle, 1==specific time(s), 2==select number of times per day
	this.times = times; // 2 numbers, strings with tags, or 1 number
	this.nextPillTime = [-1,-1];
}
