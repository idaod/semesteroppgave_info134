
=======
//const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json"
//const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json"
//const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"


function oversikt() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var kommune = JSON.parse(this.responseText);
      document.getElementById("hello").innerHTML = kommune;
    }
  };
  xhttp.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhttp.send();
}


console.log("hei");
>>>>>>> cac88d0082798036d2c4df53ffd29d691bf2032a

const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json"
const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"


console.log("hei")



//DETALJER
//komunenavn, nr, siste målte befolkning(2018), siste målte statestikk for sysselsetting og utdanning antall + %.
//Historisk utvikling i tabell/graf
function detaljer() {
  var komunenummer = "nummer";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var variabel = JSON.parse(this.responseText);
    document.getElementById("hello").innerHTML = variabel;


  }
};
xmlhttp.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
xmlhttp.send();
}

detaljer();
<<<<<<< HEAD

=======
>>>>>>> cac88d0082798036d2c4df53ffd29d691bf2032a
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
>>>>>>> 31ab5bb7fcde3a823bf0f2f30021fcc3fbb7a454
