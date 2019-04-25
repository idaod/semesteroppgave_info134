let befolkning;
let sysselsetting;
let utdanning;

window.onload = function(){
   befolkning = new Befolkning(URL_befolkning);
   sysselsetting = new Sysselsetting(URL_sysselsetting);
   utdanning = new Utdanning(URL_utdanning);
}

const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json";
const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";


function parset_tekst(url, objekt) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status)
    if (this.readyState == 4 && this.status == 200) {
      var variabel = JSON.parse(this.responseText);
      objekt.data = variabel
    }
  };
  xhttp.open("GET", url);
  xhttp.send(null);
}


function Befolkning(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  this.load = function(){
    parset_tekst(url,this)
  }
}

//function getNames(){
//  this.data???


function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  this.load = parset_tekst

}




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
