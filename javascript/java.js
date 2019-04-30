function Sysselsetting(url){
  this.getNames = getNames;
  this.getIDs = getIDs;
  this.getInfo = getInfo;
  this.getTotal = getTotal;
  this.load = function(){
    parset_tekst(url,this)
  }
}

function Utdanning(url){
  this.getNames = getNames;
  this.getIDs = getIDs;
  this.getInfo = getInfo;
  this.getTotal = getTotal;
  this.load = function(){
    parset_tekst(url,this)
  }
}

let befolkning;
let sysselsetting;
let utdanning;

window.onload = function(){
   befolkning = new Befolkning(URL_befolkning);
   sysselsetting = new Sysselsetting(URL_sysselsetting);
   utdanning = new Utdanning(URL_utdanning);
   befolkning.load();
   sysselsetting.load();
   utdanning.load();
}

const URL_befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
const URL_sysselsetting = "http://wildboy.uib.no/~tpe056/folk/100145.json";
const URL_utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";


function parset_tekst(url, objekt) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log(this.status);
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      objekt.data = data;
    }
  };
  xhttp.open("GET", url);
  xhttp.send(null);
}


function oversikt(){
  for (var nummer of befolkning.getIDs()){
    for(var element of befolkning.getInfo()){
      innbygger = element["Menn"]["2018"] + element["Kvinner"]["2018"]
  }
  //console.log("Kommunenummer: " + nummer + " Kommune: " + befolkning.getNames(nummer)[0] + " Befolkning: " + befolkning.getTotal(nummer,"2018"))
  var liste = document.createElement("li");
  var oversikt = document.createTextNode(" Kommune: "+ befolkning.getNames(nummer)[0] + ", " + "Kommunenummer: " + nummer + ", " +  "Befolkning: " + befolkning.getTotal(nummer,"2018"))
  liste.appendChild(oversikt);
  document.body.appendChild(liste);
  }
}

function detaljer_input(){
  var user_value = document.getElementById("nummer").value;

  for(var nr in befolkning.getIDs()){
    if(nr === user_value){
      detaljer(user_value);
    }
  }
}



function detaljer(nr){

}




function getNames(id){
  var name;
  var list = [];
  for (var name in this.data["elementer"]){
    var kommune_objekt = this.data["elementer"][name];
    var kommunenummer = kommune_objekt["kommunenummer"];
    if(id==kommunenummer){
      list.push(name);
    }

  }
  return list;
}

function getIDs(){

     var list = [];
     for (var x in this.data["elementer"]){
       var kommune = this.data["elementer"][x]
      let nr = kommune["kommunenummer"];
      list.push(nr)
}
return list
}

function getInfo(id){
    let l = []
    for(let kommune in this.data.elementer){
      let kommune_objekt = this.data.elementer[kommune]
      let nr=kommune_objekt["kommunenummer"]
      if(id==nr){
      l.push(kommune_objekt)
      }
  return l
  }
}

function getTotal(id, år){
    let l = []
    for(let kommune in this.data.elementer){
      let kommune_objekt=this.data.elementer[kommune]
      let nr = kommune_objekt["kommunenummer"]
      if (id===nr){
        let befolkning = (kommune_objekt["Menn"][år] + kommune_objekt["Kvinner"][år])
        l.push(befolkning)
      }
    }
    return l
  };



  //Hvordan få verdien fra skjemaet?
  //Hvordan få ut den enkelte kommunen fra objektet??
