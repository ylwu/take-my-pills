var Model = function(){
	this.historyQueue = [];
	this.newDrugsQueue = [];
	this.drugsQueue = [];
	this.displayQueue = [];
	this.actionQueue = [];
	this.curtime = new Date();
	this.newtime = new Date();

	this.allHandlers = new Array();
	

	this.stringtoTime = function(timeString){
		var finalParts=[];
		var wantSplit="</p>"+timeString+"<p>";
		var splittedParts1 = wantSplit.split("</p><p>");
		for (var i=1;i<splittedParts1.length-1;i++){
    		finalParts.push(splittedParts1[i]);
		}
		return finalParts;
	}

	this.startDate = function(myDrug){
		n = myDrug.startdate.split("/");
		sMonth= parseInt(n[0])-1;
		sDate= parseInt(n[1]);
		sYear = parseInt(n[2]);
		d = new Date(sYear,sMonth,sDate,0,0,0,0);
		return d;
	}

	this.endDate = function(myDrug){
		n = myDrug.enddate.split("/");
		eMonth= parseInt(n[0])-1;
		eDate= parseInt(n[1]);
		eYear = parseInt(n[2]);
		d = new Date(eYear,eMonth,eDate,0,0,0,0);
		return d;

	}

	this.dateToDateString = function(date){
		return (date.getMonth()+1).toString() + "/" + date.getDate() + "/" + date.getFullYear();
	}

	this.dateToTimeString = function(date){
		d = date.getMinutes().toString();
		console.log(d.length);
		if (d.length == 1){
			d+= "0";
		}
		return date.getHours() + " : " + d;
	}

	this.initDrug = function(x){
			if (x.frequency == 1){                                //specific time drugs
				if ((this.startDate(x) <= this.curtime) && 
					(this.endDate(x) >= this.curtime)){
						times = this.stringtoTime(x.times);
						for (var j=0; j<times.length; j++){
							t = times[j].split(" ");
							hour = parseInt(t[0]);
							min = parseInt(t[2]);
							ex = t[3];
							if (ex == "pm" && (! ((hour == 12) && (min == 0)))){
								hour += 12;
							}
							drugEventTime= new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),hour,min);
							if (drugEventTime < this.curtime){
								this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),times[j],"past"));
							} else {
								this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),times[j],"future"));
							}
							this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
						}
				}
			} else if (x.frequency == 2){                       //cycle drugs
				if ((this.startDate(x) <= this.curtime) && 
					(this.endDate(x) >= this.curtime)){
				fdate = new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),9,0);
				this.displayQueue.push(new DrugEvent(x.name,fdate,x.dose,this.dateToDateString(fdate),x.times.toString()+" times","future"));
				this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
			    }
			} else {                                            //times per day drug
				if ((this.startDate(x) <= this.curtime) && 
					(this.endDate(x) >= this.curtime)){
				fdate = new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),x.lasttake[0],x.lasttake[1]);
				this.displayQueue.push(new DrugEvent(x.name,fdate,x.dose,this.dateToDateString(fdate),x.lasttake[0].toString()+" : "+x.lasttake[1].toString()+"0 am","future"));
				this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
			}
		}
	}


	this.moreDrug = function(x){
		this.newtime = new Date(2013,3, this.newtime.getDate()+1,0,0,0,0);
			if (x.frequency == 1){
				if ((this.startDate(x) <= this.newtime) && 
					(this.endDate(x) >= this.newtime)){
						times = this.stringtoTime(x.times);
						for (var j=0; j<times.length; j++){
							t = times[j].split(" ");
							hour = parseInt(t[0]);
							min = parseInt(t[2]);
							ex = t[3];
							if (ex == "pm" && (! ((hour == 12) && (min == 0)))){
								hour += 12;
							}
							fdate= new Date(this.newtime.getFullYear(), this.newtime.getMonth(),this.newtime.getDate(),hour,min);
							this.displayQueue.push(new DrugEvent(x.name,fdate,x.dose,this.dateToDateString(fdate),times[j],"future"));
							this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
						}
				}
			} else if (x.frequency == 2){
				if ((this.startDate(x) <= this.newtime) && 
					(this.endDate(x) >= this.newtime)){
				fdate = new Date(this.newtime.getFullYear(), this.newtime.getMonth(),this.newtime.getDate(),9,0);
				this.displayQueue.push(new DrugEvent(x.name,fdate,x.dose,this.dateToDateString(fdate),x.times.toString()+" times","future"));
				this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
			    }
			}
	}

	this.initDrugs = function(){
		this.displayQueue.length = 0;
		for (var i=0; i<this.drugsQueue.length; i++){
			this.initDrug(this.drugsQueue[i]);
	}
	}

	this.moreDrugs= function(){
		for (var i=0; i<this.drugsQueue.length; i++){
			this.moreDrug(this.drugsQueue[i]);
	}

	}

	


}



