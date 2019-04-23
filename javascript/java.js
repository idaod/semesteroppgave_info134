
const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json"
const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"


function parset_tekst(url, objekt) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var variabel = JSON.parse(this.responseText);
      objekt.data = variabel
      console.log(variabel);
    }
  };
  xhttp.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhttp.send();
}

parset_tekst();
/*

  function befolkning(){
  this.getNames = function(){

    }

  }


  this.load = function(){
    parset_tekst(url, this);
  }


function sysselsetting(URL_sysselsetting){
  this.load = function(){
    oversikt(url, this);
  }
}

function utdanning(URL_utdanning){
  this.load = function(){
    oversikt(url, this);
  }
}

*/

let befolkning = new Befolkning(URL_befolkning,this){
  befolkning.load()
}
