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


function oversikt(){
  for (var nummer of befolkning.getIDs()){
    for(var element of befolkning.getInfo()){
      innbygger = element["Menn"]["2018"] + element["Kvinner"]["2018"]
      console.log(innbygger)
  }
  console.log("Kommunenummer: " + nummer + " Kommune: " + befolkning.getNAME(nr)[0] + " Befolkning: " + befolkning.getInnbygger(nummer,"2018"))
  var dokument = document.createElement("li");
  var oversikt = document.createTextNode("Kommunenummer: " + nummer + ", " + " Kommune: "+befolkning.getNAME(nummer)[0] + ", " + "Befolkning: " + befolkning.getInnbygger(nummer,"2018"))
  dokument.appendChild(oversikt);
  document.body.appendChild(dokument);
  }
}


function getNames(){
  var name;
  var list = [];
  for (var name in this.data["elementer"]){
    var kommune_objekt = this.data["elementer"][name];
    var kommunenummer = kommuneobjekt["kommunenummer"];

  list.push(name);
  }
  return list;
}

function getInnbygger(id, år){
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

  function getInfo(){
      let l=[]
      for(let kommune in this.data.elementer){
        let kommune_obj=this.data.elementer[kommune]
        let nr=kommune_obj["kommunenummer"]
          l.push(kommune_obj)
        }
    }
    return l


  function getIDs(){
       var kommune;
       var list = [];
       for (var x of this.data["elementer"][kommune]){
        let nr = kommune["kommunenummer"];
        list.push(nr)


//this.getIDs=function(){
  //  let l=[]
  //  for(let x in this.data.elementer){
  //  let kommune=this.data.elementer[x]
    //  let nr=kommune["kommunenummer"]
    //  l.push(nr);
  //  }
  //  return l
  //}



  //function getNAME(id){
  //  let l=[]
    //for (let kommune in this.data.elementer){
    //  let kommune_objekt = this.data.elementer[kommune]
      //let kommunenummer = kommune_objekt["kommunenummer"]

    //  if(id===kommunenummer){
      //  l.push(kommune)
    //  }
    //}
    //return l
  //}


   //}
   //return list;
 //}

//befolkning.getNames();


//function Sysselsetting(url){
  //this.getNames = getNames
  //this.getIDs = getIDs
  //this.getInfo = getInfo
  //this.load = parset_tekst
//}
