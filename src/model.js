var Model = function(){
	this.historyQueue = [];
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
		min = date.getMinutes().toString();
		hour = date.getHours();
		if (min.length == 1){
			min+= "0";
		}

		if (hour<12){
			return hour.toString() + " : " + min + " am"
		} else if (hour == 12){
			return 12 + " : " + min + " pm"
		} else {
			return (hour-12).toString() + " : " + min + " pm"
		}
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
			} else if (x.frequency == 0){                       //cycle drugs

				if ((this.startDate(x) <= this.curtime) && 
					(this.endDate(x) >= this.curtime)){
				if (x.nextPillTime[0] == -1){
				drugEventTime = new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),0,0);
				this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),"Start Cycle","past"));
				} else {
					drugEventTime = new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),x.nextPillTime[0],x.nextPillTime[1]);
					if (drugEventTime < this.curtime){
								this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),this.dateToTimeString(drugEventTime),"past"));
							} else {
								this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),this.dateToTimeString(drugEventTime),"future"));
							}
				}
				this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
			    }
			} else {                                            //times per day drug
				if ((this.startDate(x) <= this.curtime) && 
					(this.endDate(x) >= this.curtime)){
				drugEventTime = new Date(this.curtime.getFullYear(), this.curtime.getMonth(),this.curtime.getDate(),9,0);
				this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),x.times.toString()+" times","future"));
				this.displayQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
			}
		}
	}


	this.moreDrug = function(x){
		if (x.frequency == 1){                                //specific time drugs
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
							drugEventTime= new Date(this.newtime.getFullYear(), this.newtime.getMonth(),this.newtime.getDate(),hour,min);
							if (drugEventTime < this.newtime){
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
			} else if (x.frequency == 0){                       //cycle drugs
			} else {                                            //times per day drug
				if ((this.startDate(x) <= this.newtime) && 
					(this.endDate(x) >= this.newtime)){
				drugEventTime = new Date(this.newtime.getFullYear(), this.newtime.getMonth(),this.newtime.getDate(),9,0);
				this.displayQueue.push(new DrugEvent(x.name,drugEventTime,x.dose,this.dateToDateString(drugEventTime),x.times.toString()+" times","future"));
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
			console.log(this.drugsQueue[i]);
	}
	}

	this.moreDrugs= function(){
		this.newtime = new Date(2013,this.newtime.getMonth(),this.newtime.getDate()+1,0,0,0,0);
		for (var i=0; i<this.drugsQueue.length; i++){
			this.moreDrug(this.drugsQueue[i]);
	}

	}
}