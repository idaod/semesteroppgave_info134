

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
  var URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
  xhr.open("GET", URL_befolkning);
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    representResult(JSON.parse(xhr.responseText));

  }
};
xmlhttp.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
xmlhttp.send();
}

detaljer();
