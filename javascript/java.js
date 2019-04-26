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
  for (let nr of befolkning.getIDs()){
    for(let elm of befolkning.getInfo()){
      innbygger=elm["Menn"]["2018"]+elm["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: "+nr +" Kommune: "+befolkning.getNAME(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  var h = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: "+nr + ", " + " Kommune: "+befolkning.getNAME(nr)[0]+ ", " + "Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  h.appendChild(oversikt);
  document.body.appendChild(h);
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
  let l=[]
  for (let kommune in this.data.elementer){
    let kommune_obj=this.data.elementer[kommune]


    let kommunenr=kommune_obj["kommunenummer"]
    if(id===kommunenr){
      l.push(kommune)
    }
  }
  return l
}



this.getInnbygger=function(id, år){
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





function getNames(){
  var output = "<ul>";
  var name;
  var list = [];
  for (var name in this.data["elementer"]){
     output += "<li>" + name + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  list.push(name);
  }
  return list;
}

this.getIDs=function(){
    let l=[]
    for(let x in this.data.elementer){
      let kommune=this.data.elementer[x]
      let nr=kommune["kommunenummer"]
      l.push(nr);
    }
    return l
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
    let l=[]
    for(let kommune in this.data.elementer){
      let kommune_obj=this.data.elementer[kommune]
      let nr=kommune_obj["kommunenummer"]
      if(nr===id){
        l.push(kommune_obj)
      }
  }
  return l
}

//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
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
  for (let nr of befolkning.getIDs()){
    for(let elm of befolkning.getInfo()){
      innbygger=elm["Menn"]["2018"]+elm["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: "+nr +" Kommune: "+befolkning.getNAME(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  var h = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: "+nr +" Kommune: "+befolkning.getNAME(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  h.appendChild(oversikt);
  document.body.appendChild(h);
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
  let l=[]
  for (let kommune in this.data.elementer){
    let kommune_obj=this.data.elementer[kommune]


    let kommunenr=kommune_obj["kommunenummer"]
    if(id===kommunenr){
      l.push(kommune)
    }
  }
  return l
}



this.getInnbygger=function(id, år){
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





function getNames(){
  var output = "<ul>";
  var name;
  var list = [];
  for (var name in this.data["elementer"]){
     output += "<li>" + name + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  list.push(name);
  }
  return list;
}

this.getIDs=function(){
    let l=[]
    for(let x in this.data.elementer){
      let kommune=this.data.elementer[x]
      let nr=kommune["kommunenummer"]
      l.push(nr);
    }
    return l
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
    let l=[]
    for(let kommune in this.data.elementer){
      let kommune_obj=this.data.elementer[kommune]
      let nr=kommune_obj["kommunenummer"]
      if(nr===id){
        l.push(kommune_obj)
      }
  }
  return l
}

//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
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
  for (let nr of befolkning.getIDs()){
    for(let elm of befolkning.getInfo()){
      innbygger=elm["Menn"]["2018"]+elm["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: "+nr +" Kommune: "+befolkning.getNAME(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  var h = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: "+nr +" Kommune: "+befolkning.getNAME(nr)[0]+" Befolkning: "+befolkning.getInnbygger(nr,"2018"))
  h.appendChild(oversikt);
  document.body.appendChild(h);
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
  let l=[]
  for (let kommune in this.data.elementer){
    let kommune_obj=this.data.elementer[kommune]


    let kommunenr=kommune_obj["kommunenummer"]
    if(id===kommunenr){
      l.push(kommune)
    }
  }
  return l
}



this.getInnbygger=function(id, år){
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





function getNames(){
  var output = "<ul>";
  var name;
  var list = [];
  for (var name in this.data["elementer"]){
     output += "<li>" + name + "</li>"
  output += "</ul>";
  document.getElementById("oversikt").innerHTML = output;
  list.push(name);
  }
  return list;
}

this.getIDs=function(){
    let l=[]
    for(let x in this.data.elementer){
      let kommune=this.data.elementer[x]
      let nr=kommune["kommunenummer"]
      l.push(nr);
    }
    return l
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
    let l=[]
    for(let kommune in this.data.elementer){
      let kommune_obj=this.data.elementer[kommune]
      let nr=kommune_obj["kommunenummer"]
      if(nr===id){
        l.push(kommune_obj)
      }
  }
  return l
}

//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
