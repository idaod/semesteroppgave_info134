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
    element = befolkning.getInfo(nummer);
    innbygger = element["Menn"]["2018"] + element["Kvinner"]["2018"]
  //console.log("Kommunenummer: " + nummer + " Kommune: " + befolkning.getNames(nummer)[0] + " Befolkning: " + befolkning.getTotal(nummer,"2018"))
  var liste = document.createElement("table");
  var oversikt = document.createTextNode(" Kommune: "+ befolkning.getNames(nummer)[0] + ", " + "Kommunenummer: " + nummer + ", " +  "Befolkning: " + befolkning.getTotal(nummer,"2018"))
  liste.appendChild(oversikt);
  document.body.appendChild(liste);
}
}

function detaljer_input(){

  var user_value = document.getElementById("nummer").value;
  var found = false;

  for(var kommunenummer of befolkning.getIDs()){
    if(kommunenummer === user_value){
      detaljer(user_value);
      found = true;
      break
    }
  }
  if(found == false){
    console.log("Dette er feil.");
  }
}



function detaljer(nr){
  console.log(befolkning.getInfo(nr));

}




function getNames(){

  var list = [];
  for (var name in this.data["elementer"]){
    var kommune_objekt = this.data["elementer"][name];
    var kommunenummer = kommune_objekt["kommunenummer"];

    list.push(name);
    }
  return list;
}

function getIDs(){

     var list = [];
     for (var x in this.data["elementer"]){
       var kommune = this.data["elementer"][x]
      let id = kommune["kommunenummer"];
      list.push(id)
}
return list
}

function getInfo(id){

    for(let kommune in this.data["elementer"]){
      let kommune_objekt = this.data["elementer"][kommune]
      let nr = kommune_objekt["kommunenummer"]
      if(id==nr){
      return kommune_objekt;
      }
    }
}

function getTotal(id, år){
    let list = []
    for(let kommune in this.data["elementer"]){
      let kommune_objekt = this.data["elementer"][kommune]
      let nr = kommune_objekt["kommunenummer"]
      if (id===nr){
        let befolkning = (kommune_objekt["Menn"][år] + kommune_objekt["Kvinner"][år])
        list.push(befolkning)
      }
    }
    return list
  };



  //Hvordan få verdien fra skjemaet?
  //Hvordan få ut den enkelte kommunen fra objektet??
  //of henter ut elementer, for x in y finner index
  //hvorfor får vi bare opp Halden som kommunenavn?
  //hjelp til å skjule ting
  //når vi trykker på oversikt en gang til så kommer den to ganger 
