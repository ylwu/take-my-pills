var m = new Model();

function returnAllDrugs(){
      var t;
			$.ajax({
  				dataType: "json",
  				url: 'pillData.json',
  				async: false,
  				success: function(data){
            t = data;
				}
			});
      return t;

		}


function loadDrugs(){
			$.ajax({
  				dataType: "json",
  				url: 'pillData.json',
  				async: false,
  				success: function(data){
  					m.drugsQueue.length = 0;
  					data.forEach(function(entry){
  						m.drugsQueue.push(entry);
  					})
				}
			});
		}

function returnAllMessages(){
  var s;
  $.ajax({
          dataType: "json",
          url: 'messageData.json',
          async: false,
          success: function(data){
            s = data;
        }
  });
  return s;
}

function returnMissedDrugs(){
  var s;
  $.ajax({
          dataType: "json",
          url: 'missedPillsData.json',
          async: false,
          success: function(data){
            s = data;
        }
  });
  return s;
}

