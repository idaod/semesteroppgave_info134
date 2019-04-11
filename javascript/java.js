//const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json"
//const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json"
//const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"


function oversikt() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var variabel = JSON.parse(this.responseText);
      document.getElementById("hello").innerHTML = variabel;
    }
  };
  xhttp.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhttp.send();
}


console.log("hei");
