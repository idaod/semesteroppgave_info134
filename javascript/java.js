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

function test(){
  for (let nummer of befolkning.getIDs()){
    for(let elementer of befolkning.getInfo()){
      innbygger=elementer["Menn"]["2018"]+elementer["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: "+nummer +" Kommune: "+befolkning.getNAME(nummer)[0]+" Befolkning: "+befolkning.getInnbygger(nummer,"2018"))
  var dokument = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: "+nummer +" Kommune: "+befolkning.getNAME(nummer)[0]+" Befolkning: "+befolkning.getInnbygger(nummer,"2018"))
  dokument.appendChild(oversikt);
  document.body.appendChild(dokument);
  }
}


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
  this.getInfo = getInfo
  this.getNAME=getNAME
  this.getInnbygger=getInnbygger
  this.load = function(){
    parset_tekst(url,this)
  }
}


function getNAME(id){
  let liste=[]
  for (let kommune in this.data.elementer){
    let kommune_objekt=this.data.elementer[kommune]


    let kommunenr=kommune_objekt["kommunenummer"]
    if(id===kommunenr){
      l.push(kommune)
    }
  }
  return liste
}



this.getInnbygger=function(id, år){
    let liste=[]
    for(let kommune in this.data.elementer){
      let kommune_objekt=this.data.elementer[kommune]
      //skal returnere x egentlig
      let nummer=kommune_objekt["kommunenummer"]
      if (id===nummer){
        let befolkning=(kommune_objekt["Menn"][år] + kommune_objekt["Kvinner"][år])
        liste.push(befolkning)
      }
    }
    return liste
  };


function getNames(){
  var output = "<ul>";
  var name;
  var liste = [];
  for (var name in this.data["elementer"]){
     output += "<li>" + name + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  liste.push(name);
  }
  return liste;
}

this.getIDs=function(){
    let liste=[]
    for(let x in this.data.elementer){
      let kommune=this.data.elementer[x]
      let nummer=kommune["kommunenummer"]
      liste.push(nummer);
    }
    return liste
  }

// function getIDs(){
//   var output = "<ul>";
//   var kommune;
//   var list = [];
//   for (var kommune of this.data.elementer){
//       list.push(this.data["elementer"][kommune]["kommunenummer"]);
//      output += "<li>" + kommune + "</li>"
//   output += "</ul>";
//   document.getElementById("oversikt").innerHTML = list;
//   }
//   return list;
// }

function getInfo(id){
    let liste=[]
    for(let kommune in this.data.elementer){
      let kommune_objekt=this.data.elementer[kommune]
      let nummer=kommune_objekt["kommunenummer"]
      if(nummer===id){
        liste.push(kommune_objekt)
      }
  }
  return liste
}

//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
