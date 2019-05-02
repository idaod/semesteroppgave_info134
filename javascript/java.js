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

function show_introduksjon(){

  document.getElementById("introduksjon").className = "show-me";
  document.getElementById("oversikt").className = "hide-me";
  document.getElementById("detaljer").className = "hide-me";
  document.getElementById("sammenligning").className = "hide-me";
}

function show_oversikt(){

  document.getElementById("introduksjon").className = "hide-me";
  document.getElementById("oversikt").className = "show-me";
  document.getElementById("detaljer").className = "hide-me";
  document.getElementById("sammenligning").className = "hide-me";
  oversikt();
}

function show_detaljer(){

  document.getElementById("introduksjon").className = "hide-me";
  document.getElementById("oversikt").className = "hide-me";
  document.getElementById("detaljer").className = "show-me";
  document.getElementById("sammenligning").className = "hide-me";
}

function show_sammenligning(){

  document.getElementById("introduksjon").className = "hide-me";
  document.getElementById("oversikt").className = "hide-me";
  document.getElementById("detaljer").className = "hide-me";
  document.getElementById("sammenligning").className = "show-me";
}

oversikt_kjør = false;

function oversikt(){

  if (oversikt_kjør){
    return 0
  }
  oversikt_kjør = true;

  for (var nummer of befolkning.getIDs()){
    element = befolkning.getInfo(nummer);
    innbygger = element["Menn"]["2018"] + element["Kvinner"]["2018"]

  var liste = document.createElement("ul");
  var tekst = document.createTextNode(" Kommune: " + befolkning.getNames(nummer) + ", " + "Kommunenummer: " + nummer + ", " +  "Befolkning: " + befolkning.getTotal(nummer,"2018")[2]);
  liste.appendChild(tekst);
  document.getElementById("oversikt").appendChild(liste);
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
    alert("Ugyldig kommunenummer. Prøv igjen.")
  }
}


function detaljer(nr){

  var kommune_navn = befolkning.getNames(nr);
  var kommune_info = befolkning.getInfo(nr);
  var kommune_befolkning = befolkning.getTotal(nr,"2018")[2];

  var liste = document.createElement("ul");
  var detaljer = document.createTextNode("Kommune: "+ kommune_navn + ", " + "Kommunenummer: " + nr + ", " +  "Befolkning: " + kommune_befolkning);
  liste.appendChild(detaljer);
  document.getElementById("detaljer").appendChild(liste);

  var kvinner_prc = sysselsetting.getPercent(nr)[0];
  var menn_prc = sysselsetting.getPercent(nr)[1];
  var begge_prc = sysselsetting.getPercent(nr)[2];
  var kvinner_befolkning = befolkning.getTotal(nr, "2018")[0];
  var menn_befolkning = befolkning.getTotal(nr, "2018")[1];

  
}

function getPercent(nr){

  var kvinner_prc = [];
  var menn_prc = [];
  var begge_prc = [];

  for(var x in this.data["elementer"]){

    var kommune_objekt = this.data["elementer"][x];
    var kommunenummer = kommune_objekt["kommunenummer"];

    var menn = kommune_objekt["Menn"]["2018"];
    var kvinner = kommune_objekt["Kvinner"]["2018"];
    var begge = kommune_objekt["Begge kjønn"]["2018"]

    if(nr==kommunenummer){
      kvinner_prc.push(kvinner);
      menn_prc.push(menn);
      begge_prc.push(begge);
      //console.log(kvinner_prc);
      //console.log(menn_prc);
      //console.log(begge_prc);
    }
  }
  return [kvinner_prc, menn_prc, begge_prc];
}



function getNames(id){

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

    var begge = [];
    var kvinner = [];
    var menn = [];

    for(var kommune in this.data["elementer"]){

      var kommune_objekt = this.data["elementer"][kommune];
      var nr = kommune_objekt["kommunenummer"];
      var menn = kommune_objekt["Menn"][år];
      var kvinner = kommune_objekt["Kvinner"][år];

      if (id===nr){
        var befolkning = (menn + kvinner);
        begge.push(befolkning)
      }
    }
    return [kvinner, menn, begge]
  };

// let table = document.createElement("table");
// table.setAttribute("id", "myTable")
//
// let arrHead = ["Årstall", "Befolkning", "Sysselsatte", "Grunnskole", "Vgs", "Fagskole", "Høyere utdanning"]
// let årstall = ["2007", "2009" "2011", "2013", "2015", "2017"]
//
// let statistikk = []
// for (let år of årstall){
//   statistikk.push([år, befolkning.getTotal(nr,år)[0]])
// }
//
// let tr=table.insertRow(-1)
//
// for(let i=0; i<arrHead.length; i++){
//   let header=document.createElement("th");
//   header.innerHTML=arrHead[i]
//   tr.appendChild(header)
// }
//
// for(let y=0; y<årstall.length; y++){
//   tr=table.insertRow(-1);
//
//   for(let j=0; j<arrHead.length; j++){
//     let td=document.createElement("td");
//     td=tr.insertCell(-1);
//     td.innerHTML=statistikk[y][j]
//   }
// }
//
// document.getElementById("detaljer").appendChild(table)


  //for x of y henter ut elementer, for x in y finner index

  //når vi trykker på oversikt en gang til så kommer den to ganger
  //Lage en ul og li i for løkke
  //Lage innerHTML istedenfor?
  //Insert loading message?
  // Hvorfor blir ikke sammenligning diven center?
  //Få detaljer til å ikke stå flere ganger
