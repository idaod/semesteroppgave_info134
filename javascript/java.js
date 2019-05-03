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

  var kvinner_prc = sysselsetting.getPercent(nr, "2018")[0];
  var menn_prc = sysselsetting.getPercent(nr, "2018")[1];
  var begge_prc = sysselsetting.getPercent(nr, "2018")[2];

  var kvinner_befolkning_2018 = befolkning.getTotal(nr, "2018")[0];
  var menn_befolkning_2018 = befolkning.getTotal(nr, "2018")[1];

  var unikort_menn = utdanning.getUtdanning(nr, "2017")[0];
  var unikort_kvinner = utdanning.getUtdanning(nr, "2017")[1];
  var unilang_menn = utdanning.getUtdanning(nr, "2017")[2];
  var unilang_kvinner = utdanning.getUtdanning(nr, "2017")[3];

  var kvinner_befolkning_2017 = befolkning.getTotal(nr, "2017")[0];
  var menn_befolkning_2017 = befolkning.getTotal(nr, "2017")[1];
  var samlet_befolkning_2017 = kvinner_befolkning_2017 + menn_befolkning_2017;

  var samlet_uni_prc_menn = unikort_menn + unilang_menn;
  var samlet_uni_prc_kvinner = unikort_kvinner + unilang_kvinner;

  var menn_ant = Math.round((menn_befolkning_2018 * menn_prc) / 100);
  var kvinner_ant = Math.round((kvinner_befolkning_2018 * kvinner_prc) / 100);
  var begge_ant = Math.round((menn_ant + kvinner_ant));
  var uni_menn_ant = Math.round((menn_befolkning_2017 * samlet_uni_prc_menn)/100);
  var uni_kvinner_ant = Math.round((kvinner_befolkning_2017 * samlet_uni_prc_kvinner)/100);
  var begge_ant_utd = Math.round(uni_menn_ant + uni_kvinner_ant);
  var begge_prc_utd = Math.round((begge_ant_utd/samlet_befolkning_2017)*100);

  var liste = document.createElement("ul");
  var liste_oversikt = document.createElement("li");
  var liste_sysselsatte = document.createElement("li")
  var liste_uni = document.createElement("li");

  var oversikt = document.createTextNode("Kommune: "+ kommune_navn + ", " + "Kommunenummer: " + nr + ", " +  "Befolkning: " + kommune_befolkning)
  var sysselsatte = document.createTextNode(" Antall sysselsatte menn: " + menn_ant + "(" + menn_prc + "%)" + " Antall sysselsatte kvinner: " + kvinner_ant + "(" + kvinner_prc + "%)" + " Antall sysselsatte totalt: " + begge_ant + "(" + begge_prc + "%)" );
  var utdanninger = document.createTextNode("Antall menn med høyere utdanning: " + uni_menn_ant + "(" + samlet_uni_prc_menn + "%)" + " Antall kvinner med høyere utdanning: " + uni_kvinner_ant + "(" + samlet_uni_prc_kvinner + "%)" + " Total befolkning med høyere utdanning: " + begge_ant_utd + "(" + begge_prc_utd + "%)");

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

//--Sysselsatte--//
    var antall_menn_sysselsatt = Math.round((befolkning.getTotal(nr, år)[1] * sysselsetting.getPercent(nr, år)[1]) / 100);
    var antall_kvinner_sysselsatt = Math.round((befolkning.getTotal(nr, år)[0] * sysselsetting.getPercent(nr, år)[0]) / 100);
    var totalt_antall_sysselsatt = Math.round((antall_menn_sysselsatt + antall_kvinner_sysselsatt));
    var totalt_antall_sysselsatte = totalt_antall_sysselsatt + "(" + sysselsetting.getPercent(nr, år)[2]; + "%)";

//--HØYERE UTDANNING--//
    // var samlet_uni_prc_menn = utdanning.getUtdanning(nr, år)[0] + utdanning.getUtdanning(nr, år)[2];
    // var samlet_uni_prc_kvinner = utdanning.getUtdanning(nr, år)[1] + utdanning.getUtdanning(nr, år)[3];
    var unikort_menn = utdanning.getUtdanning(nr, år)[0];
    var unikort_kvinner = utdanning.getUtdanning(nr, år)[1];
    var unilang_menn = utdanning.getUtdanning(nr, år)[2];
    var unilang_kvinner = utdanning.getUtdanning(nr, år)[3];

    var samlet_uni_prc_menn = unikort_menn + unilang_menn;
    var samlet_uni_prc_kvinner = unikort_kvinner + unilang_kvinner;

    var kvinner_befolkning_2017 = befolkning.getTotal(nr, år)[0];
    var menn_befolkning_2017 = befolkning.getTotal(nr, år)[1];
    var total_befolkning = befolkning.getTotal(nr, år);

    var uni_menn_ant = Math.round((menn_befolkning_2017 * samlet_uni_prc_menn)/100);
    var uni_kvinner_ant = Math.round((kvinner_befolkning_2017 * samlet_uni_prc_kvinner)/100);
    var begge_ant_utd = Math.round(uni_menn_ant + uni_kvinner_ant);
    var begge_prc_utd = Math.round((begge_ant_utd/total_befolkning)*100);

    var total_antall_utdannede = begge_ant_utd + "(" + begge_prc_utd + "%)";

    resultater.push([år, befolkning.getTotal(nr, år)[2], totalt_antall_sysselsatte, utdanning.getUtdanning(nr, år)[4], utdanning.getUtdanning(nr, år)[5], utdanning.getUtdanning(nr, år)[6], total_antall_utdannede],);

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



function getPercent(nr, år){

  for(var x in this.data["elementer"]){

    var kommune_objekt = this.data["elementer"][x];
    var kommunenummer = kommune_objekt["kommunenummer"];

    if(nr == kommunenummer){
      var menn = kommune_objekt["Menn"][år];
      var kvinner = kommune_objekt["Kvinner"][år];
      var begge = kommune_objekt["Begge kjønn"][år]
    }
  }
  return [kvinner, menn, begge];
}


function getUtdanning(nr, år){

  for(var x in this.data["elementer"]){

    var kommune_objekt = this.data["elementer"][x];
    var kommunenummer = kommune_objekt["kommunenummer"];

    if(nr == kommunenummer){
      var unikort_menn = kommune_objekt["03a"]["Menn"][år];
      var unikort_kvinner = kommune_objekt["03a"]["Kvinner"][år];
      var unilang_menn = kommune_objekt["04a"]["Menn"][år];
      var unilang_kvinner = kommune_objekt["04a"]["Kvinner"][år];

      befolkning_kvinner = befolkning.getTotal(nr, år)[0];
      befolkning_menn = befolkning.getTotal(nr, år)[1];
      total_befolkning = befolkning.getTotal(nr, år)[2];

//---GRUNNSKOLE--//
      var prc_menn_grunnskole = kommune_objekt["01"]["Menn"][år]
      var prc_kvinner_grunnskole = kommune_objekt["01"]["Kvinner"][år]

      var antall_kvinner_grunnskole = Math.round((befolkning_kvinner*prc_kvinner_grunnskole)/100);
      var antall_menn_grunnskole = Math.round((befolkning_menn*prc_menn_grunnskole)/100);
      var total_prosentandel_grunnskole = Math.round((totalt_antall_grunnskole/total_befolkning)*100);

      var totalt_antall_grunnskole = antall_kvinner_grunnskole + antall_menn_grunnskole;
      var grunnskole = totalt_antall_grunnskole + "(" + total_prosentandel_grunnskole + "%)";

//----VGS----//
      var prc_menn_vgs = kommune_objekt["02a"]["Menn"][år];
      var prc_kvinner_vgs = kommune_objekt["02a"]["Kvinner"][år];

      var antall_kvinner_vgs = Math.round((befolkning_kvinner*prc_kvinner_vgs)/100);
      var antall_menn_vgs = Math.round((befolkning_menn*prc_menn_vgs)/100);
      var total_prosentandel_vgs = Math.round((totalt_antall_vgs/total_befolkning)*100);

      var totalt_antall_vgs = antall_kvinner_vgs + antall_menn_vgs;
      var vgs = totalt_antall_vgs + "(" + total_prosentandel_vgs + "%)";

//---FAGSKOLE---//

      var prc_menn_fagskole = kommune_objekt["11"]["Menn"][år];
      var prc_kvinner_fagskole = kommune_objekt["11"]["Kvinner"][år];

      var antall_kvinner_fagskole = Math.round((befolkning_kvinner*prc_kvinner_fagskole)/100);
      var antall_menn_fagskole = Math.round((befolkning_menn*prc_menn_fagskole)/100);
      var total_prosentandel_fagskole = Math.round((totalt_antall_fagskole/total_befolkning)*100);

      var totalt_antall_fagskole = antall_kvinner_fagskole + antall_menn_fagskole;
      var fagskole = totalt_antall_fagskole + "(" + total_prosentandel_fagskole + "%)";

    }
  }

  return [unikort_menn, unikort_kvinner, unilang_menn, unilang_kvinner, grunnskole, vgs, fagskole];
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
  //Få opp prosent som ikke NAN
  //Kan vi gjøre det på en ryddigere måte
  //Gå over variabelnavn som unikort_menn, gjøre det mer forståelig for andre.
  //Fikse tabell til sammenligning
  //Fikse tabell til stor skjerm (media queries)
