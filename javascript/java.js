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

//---OVERSIKT--//

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

//---DETALJER--//

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

  var sysselsatte_kvinner = sysselsetting.getSysselsatte(nr, "2018")[0]
  var sysselsatte_menn = sysselsetting.getSysselsatte(nr, "2018")[1]
  var totalt_sysselsatte = sysselsetting.getSysselsatte(nr, "2018")[2]

  var høyere_utdanning_kvinner = utdanning.getUtdanning(nr, "2017")[0]
  var høyere_utdanning_menn = utdanning.getUtdanning(nr, "2017")[1]
  var høyere_utdanning_begge = utdanning.getUtdanning(nr, "2017")[2];

  var liste = document.createElement("ul");
  var liste_oversikt = document.createElement("li");
  var liste_sysselsatte = document.createElement("li")
  var liste_uni = document.createElement("li");

  var oversikt = document.createTextNode("Kommune: "+ kommune_navn + ", " + "Kommunenummer: " + nr + ", " +  "Befolkning: " + kommune_befolkning)
  var sysselsatte = document.createTextNode(" Antall sysselsatte menn: " + sysselsatte_menn + " Antall sysselsatte kvinner: " + sysselsatte_kvinner + " Antall sysselsatte totalt: " + totalt_sysselsatte );
  var utdanninger = document.createTextNode("Antall menn med høyere utdanning: " + høyere_utdanning_menn + " Antall kvinner med høyere utdanning: " + høyere_utdanning_kvinner + " Total befolkning med høyere utdanning: " + høyere_utdanning_begge);

  liste_oversikt.appendChild(oversikt);
  liste_sysselsatte.appendChild(sysselsatte);
  liste_uni.appendChild(utdanninger);

  liste.appendChild(liste_oversikt);
  liste.appendChild(liste_sysselsatte);
  liste.appendChild(liste_uni);

  document.getElementById("detaljer").appendChild(liste);

  detaljer_tabell(nr);

}


function detaljer_tabell(nr){


  let table = document.createElement("table");
  table.setAttribute("id", "tabell");

  let tableHead = ["Årstall", "Befolkning", "Sysselsatte", "Grunnskole", "Vgs", "Fagskole", "Høyere utdanning"];
  let årstall = ["2007", "2009", "2011", "2013", "2015", "2017"];

  let resultater = [];

  for (let år of årstall){
    resultater.push([år, befolkning.getTotal(nr, år)[2], sysselsetting.getSysselsatte(nr, år)[2], utdanning.getUtdanning(nr, år)[3], utdanning.getUtdanning(nr, år)[4], utdanning.getUtdanning(nr, år)[5], utdanning.getUtdanning(nr, år)[2]],);

  }

  let tr = table.insertRow(-1);

  for(let i = 0; i < tableHead.length; i++){
    let header = document.createElement("th");
    header.innerHTML = tableHead[i];
    tr.appendChild(header);
  }

  for(let y = 0; y < årstall.length; y++){

    tr = table.insertRow(-1);

    for(let j = 0; j< tableHead.length; j++){
      let td = document.createElement("td");
      td = tr.insertCell(-1);
      td.innerHTML = resultater[y][j];
    }
  }
  document.getElementById("detaljer").appendChild(table);
}





//---SAMMENLIGNING--//

function sammenligning_input(){

  var user_value = document.getElementById("nummer_1").value;
  var user_value2 = document.getElementById("nummer_2").value;
  var found = true;
  var found2 = true;

  for(var kommunenummer of befolkning.getIDs()){
    if(kommunenummer === user_value){
      found = false
    }
    if(kommunenummer === user_value2){
      found2 = false;
    }
  }
  if (found || found2 == true){
    alert("Ugyldig kommunenummer. Prøv igjen.")
  } else if (user_value == user_value2){
    alert("Du må skrive inn to ulike kommunenummer.")
  } else{
    sammenligning(user_value, user_value2)
  }
}

function sammenligning(user_value, user_value2){
}








function getSysselsatte(nr, år){

  for(var x in this.data["elementer"]){

    var kommune_objekt = this.data["elementer"][x];
    var kommunenummer = kommune_objekt["kommunenummer"];

    if(nr == kommunenummer){

      var menn_prc = kommune_objekt["Menn"][år];
      var kvinner_prc = kommune_objekt["Kvinner"][år];
      var begge_prc = kommune_objekt["Begge kjønn"][år]

      var befolkning_kvinner = befolkning.getTotal(nr, år)[0];
      var befolkning_menn = befolkning.getTotal(nr, år)[1];

      var antall_sysselsatte_menn = Math.round((befolkning_menn * menn_prc) / 100);
      var antall_sysselsatte_kvinner = Math.round((befolkning_kvinner * kvinner_prc) / 100);
      var antall_sysselsatte_totalt = Math.round((antall_sysselsatte_kvinner + antall_sysselsatte_menn));

      var sysselsatte_kvinner = antall_sysselsatte_kvinner + "(" + kvinner_prc + "%)"
      var sysselsatte_menn = antall_sysselsatte_menn + "(" + menn_prc + "%)"
      var sysselsatte_begge = antall_sysselsatte_totalt + "(" + begge_prc + "%)"

    }
  }
  return [sysselsatte_kvinner, sysselsatte_menn, sysselsatte_begge];
}


function getUtdanning(nr, år){

  for(var x in this.data["elementer"]){

    var kommune_objekt = this.data["elementer"][x];
    var kommunenummer = kommune_objekt["kommunenummer"];

    if(nr == kommunenummer){

      var befolkning_kvinner = befolkning.getTotal(nr, år)[0];
      var befolkning_menn = befolkning.getTotal(nr, år)[1];
      var total_befolkning = befolkning.getTotal(nr, år)[2];

//---HØYERE UTDANNING---//

      var kort_utdannede_menn = kommune_objekt["03a"]["Menn"][år];
      var kort_utdannede_kvinner = kommune_objekt["03a"]["Kvinner"][år];
      var langt_utdannede_menn = kommune_objekt["04a"]["Menn"][år];
      var langt_utdannede_kvinner = kommune_objekt["04a"]["Kvinner"][år];

      var samlet_utdannede_prc_menn = kort_utdannede_menn + langt_utdannede_menn;
      var samlet_utdannede_prc_kvinner = kort_utdannede_kvinner + langt_utdannede_kvinner;

      var utdannede_menn_antall = Math.round((befolkning_menn * samlet_utdannede_prc_menn)/100);
      var utdannede_kvinner_antall = Math.round((befolkning_kvinner * samlet_utdannede_prc_kvinner)/100);
      var begge_antall_utdannede = Math.round(utdannede_menn_antall + utdannede_kvinner_antall);
      var begge_prc_utdannede = Math.round((begge_antall_utdannede/total_befolkning)*100);

      var høyere_utdanning_kvinner = utdannede_kvinner_antall + "(" + samlet_utdannede_prc_kvinner + "%)";
      var høyere_utdanning_menn = utdannede_menn_antall + "(" + samlet_utdannede_prc_menn + "%)";
      var høyere_utdanning_begge = begge_antall_utdannede + "(" + begge_prc_utdannede + "%)";


//---GRUNNSKOLE--//
      var prc_menn_grunnskole = kommune_objekt["01"]["Menn"][år]
      var prc_kvinner_grunnskole = kommune_objekt["01"]["Kvinner"][år]

      var antall_kvinner_grunnskole = Math.round((befolkning_kvinner*prc_kvinner_grunnskole)/100);
      var antall_menn_grunnskole = Math.round((befolkning_menn*prc_menn_grunnskole)/100);
      var totalt_antall_grunnskole = antall_kvinner_grunnskole + antall_menn_grunnskole;
      var total_prosentandel_grunnskole = Math.round((totalt_antall_grunnskole/total_befolkning)*100);

      var grunnskole = totalt_antall_grunnskole + "(" + total_prosentandel_grunnskole + "%)";

//----VGS----//
      var prc_menn_vgs = kommune_objekt["02a"]["Menn"][år];
      var prc_kvinner_vgs = kommune_objekt["02a"]["Kvinner"][år];

      var antall_kvinner_vgs = Math.round((befolkning_kvinner*prc_kvinner_vgs)/100);
      var antall_menn_vgs = Math.round((befolkning_menn*prc_menn_vgs)/100);
      var totalt_antall_vgs = antall_kvinner_vgs + antall_menn_vgs;
      var total_prosentandel_vgs = Math.round((totalt_antall_vgs/total_befolkning)*100);

      var vgs = totalt_antall_vgs + "(" + total_prosentandel_vgs + "%)";

//---FAGSKOLE---//

      var prc_menn_fagskole = kommune_objekt["11"]["Menn"][år];
      var prc_kvinner_fagskole = kommune_objekt["11"]["Kvinner"][år];

      var antall_kvinner_fagskole = Math.round((befolkning_kvinner*prc_kvinner_fagskole)/100);
      var antall_menn_fagskole = Math.round((befolkning_menn*prc_menn_fagskole)/100);
      var totalt_antall_fagskole = antall_kvinner_fagskole + antall_menn_fagskole;
      var total_prosentandel_fagskole = Math.round((totalt_antall_fagskole/total_befolkning)*100);

      var fagskole = totalt_antall_fagskole + "(" + total_prosentandel_fagskole + "%)";

    }
  }

  return [høyere_utdanning_kvinner, høyere_utdanning_menn, høyere_utdanning_begge, grunnskole, vgs, fagskole];
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
        return [kvinner, menn, begge]
      }
    }
  };


  //for x of y henter ut elementer, for x in y finner index

  //Insert loading message?
  //Få detaljer til å ikke stå flere ganger
  //Fikse tabell til sammenligning
  //Fikse tabell til stor skjerm (media queries)
