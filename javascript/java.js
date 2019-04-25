let befolkning;
let sysselsetting;
let utdanning;

window.onload = function(){
   befolkning = new Befolkning(URL_befolkning);
   befolkning.load()
   //sysselsetting = new Sysselsetting(URL_sysselsetting);
   //utdanning = new Utdanning(URL_utdanning);
}

const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json";
const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";


function parset_tekst(url, objekt) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status)
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      objekt.data = data
    }
  };
  xhttp.open("GET", url);
  xhttp.send(null);
}


function Befolkning(url){
  this.getNames = getNames
  this.getIDs = getIDs
  //this.getInfo = getInfo
  this.load = function(){
    parset_tekst(url,this)
  }
}

function getNames(){
  var output = "<ul>";
  var name;
  for (var name in this.data.elementer){
     output += "<li>" + name + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  }
}

function getIDs(){
  var output = "<ul>";
  var id;
  for (var id in this.data.elementer.Halden){
     output += "<li>" + id + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  }
}


//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
