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

<<<<<<< HEAD
function test(){
  for (let nr of befolkning.getIDs()){
    for(let elm of befolkning.getInfo()){
      innbygger=elm["Menn"]["2018"]+elm["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: "+nr +" Kommune: "+befolkning.getNames(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  var h = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: "+nr + ", " + " Kommune: "+befolkning.getNames(nr)[0]+ ", " + "Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  h.appendChild(oversikt);
  document.body.appendChild(h);
  }
}

=======
>>>>>>> 52e6ebe480e0df9b0b142c36376f7d4066e76dca

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


<<<<<<< HEAD
function getNames(){
  var name;
  var list = [];
  for (name in this.data["elementer"][kommune]){

  list.push(name);
=======
function oversikt(){
  for (var nummer of befolkning.getIDs()){
    for(var element of befolkning.getInfo()){
      innbygger = element["Menn"]["2018"] + element["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: " + nummer + " Kommune: " + befolkning.getNames(nummer)[0] + " Befolkning: " + befolkning.getTotal(nummer,"2018"))
  var dokument = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: " + nummer + ", " + " Kommune: "+befolkning.getNames(nummer)[0] + ", " + "Befolkning: " + befolkning.getTotal(nummer,"2018"))
  dokument.appendChild(oversikt);
  document.body.appendChild(dokument);
  }
}

function detaljer(){
  var nummer = document.getElementById("nummer").value;
  befolkning.getInfo(nummer);

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
    let l=[]
    for(let kommune in this.data.elementer){
      let kommune_objekt = this.data.elementer[kommune]
      let nr=kommune_objekt["kommunenummer"]
      if(id==nr){
      l.push(kommune_objekt)
      }
  return l
>>>>>>> 52e6ebe480e0df9b0b142c36376f7d4066e76dca
  }
}

<<<<<<< HEAD
function getIDs(){
  var kommune;
  var list = [];
  for (var kommune of this.data.elementer){
    list.push(this.data["elementer"][kommune])
    let nr=kommune["kommunenummer"];
   }
   return list;
 }


this.getInnbygger=function(id, år){
=======
function getTotal(id, år){
>>>>>>> 52e6ebe480e0df9b0b142c36376f7d4066e76dca
    let l=[]
    for(let kommune in this.data.elementer){
      let kommune_obj=this.data.elementer[kommune]
      //skal returnere x egentlig
      let nr=kommune_obj["kommunenummer"]
      if (id===nr){
        let befolkning=(kommune_obj["Menn"][år] + kommune_obj["Kvinner"][år])
        l.push(befolkning)
      }
    }
    return l
  };




<<<<<<< HEAD
  //function getNAME(id){
    //let l=[]
    //for (let kommune in this.data.elementer){
      //let kommune_obj=this.data.elementer[kommune]


      //let kommunenr=kommune_obj["kommunenummer"]
      //if(id===kommunenr){
        //l.push(kommune)
      //}
    //}
    //return l
  }


//this.getIDs=function(){
  //  let l=[]
  //  for(let x in this.data.elementer){
      //let kommune=this.data.elementer[x]
      //l.push(nr);
    //}
    //return l
  //}
=======


>>>>>>> 52e6ebe480e0df9b0b142c36376f7d4066e76dca






//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
