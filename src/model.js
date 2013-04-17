var Model = function(){
	this.historyQueue = [];
	this.drugsQueue = [];
	this.displayQueue = [];
	this.actionQueue = [];
	this.curdate = new Date(2013,3,20,0,0,0,0);

	this.allHandlers = new Array();
	
	/**
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchEvent = function(type, details){
		var newEvent = new BoardEvent(type, details);

		if (this.allHandlers[type]){
			for (var i in this.allHandlers[type]){
				this.allHandlers[type][i](newEvent);
			}
		}
	}

	/**
	 * Add a new event listener for a given event type
	 * the parameter 'handler' has to be a function with one parameter which is an event object
	 */
	this.addEventListener = function(eventType, handler){
		if (!this.allHandlers[eventType])
			this.allHandlers[eventType] = [];
		this.allHandlers[eventType].push(handler);
	}

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

	this.initDrugs = function(){
		for (var i=0; i<this.drugsQueue.length; i++){
			x = this.drugsQueue[i];
			if (x.frequency == 1){
				if ((this.startDate(x) <= this.curdate) && 
					(this.endDate(x) >= this.curdate)){
						times = this.stringtoTime(x.times);
						for (var j=0; j<times.length; j++){
							t = times[j].split(" ");
							console.log(t);
							hour = parseInt(t[0]);
							min = parseInt(t[2]);
							ex = t[3];
							if (ex == "pm" && (! ((hour == 12) && (min == 0)))){
								hour += 12;
							}
							fdate= new Date(this.curdate.getYear(), this.curdate.getMonth(),this.curdate.getDate(),hour,min);
							this.actionQueue.push(new DrugEvent(x.name,fdate,x.dose,this.curdate.toDateString(),times[j]));
							this.actionQueue.sort(function(a,b)
							{
								return (a.date - b.date);
							});
						}
				}
			}
		}
	}





}



