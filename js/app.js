// function getQueryVariable(variable) {
//   var query = window.location.search.substring(1);
//   var vars = query.split("&");
//   for (var i=0;i<vars.length;i++) {
//     var pair = vars[i].split("=");
//     if (pair[0] == variable) {
//       return pair[1];
//     }
//   } 
//   alert('ID not found');
// }

var databaseRef = firebase.database().ref('4in1/');

databaseRef.once('value', function(snapshot) {
	// var mod_id = getQueryVariable("mod");
	// if(snapshot.child('mod').val() != mod_id){
	// 	document.getElementById('tess').innerHTML = "Not Connected";
	// 	return
	// }
	var i;
	for (i = 1; i < 5; i++) {
	  var trig = snapshot.child('sw_' + i + '/trigger').val();
	  button_change(i, trig);
	  document.getElementById('trigcheck_' + i).setAttribute('onclick','check(' + i + ')');
	} 
   

   document.getElementById('tess').innerHTML = "Connected";
   

  });

databaseRef.on('value', function(snapshot) {
	var i;
	for (i = 1; i < 5; i++) {
	  var trig = snapshot.child('sw_' + i + '/trigger').val();
	  button_change(i, trig);
	}
	
  });


function check(sw_num){
	var trig;
	// console.log(document.getElementById('trigcheck_' + sw_num).style.backgroundColor);
	if(document.getElementById('trigcheck_' + sw_num).className == "fa false"){
		trig = true;				
	}
	else {
		trig = false;
	}

	console.log(trig)

	var data = {
    		'trigger' : trig
    	}
	databaseRef.child('sw_' + sw_num).update(data);
	button_change(sw_num, trig)
}

function button_change(sw_num, sw_trig){
	if(sw_trig == true){
		document.getElementById('trigcheck_' + sw_num).className="fa true";
		document.getElementById('trigcheck_' + sw_num).style.backgroundColor = "#EA7052";
// 		document.getElementById(divId).getElementsByClassName("amount")[0].style.color= 'black';
	}
	else {
		document.getElementById('trigcheck_' + sw_num).className="fa false";
		document.getElementById('trigcheck_' + sw_num).style.backgroundColor = "#1ECB8D";
	}

}
