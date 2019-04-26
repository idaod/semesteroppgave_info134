function Befolkning(url){
  this.getNames = getNames;
  this.getIDs = getIDs;
  this.getInfo = getInfo;
  this.getTotal=getTotal;
  this.load = function(){
    parset_tekst(url,this)
  }
}
