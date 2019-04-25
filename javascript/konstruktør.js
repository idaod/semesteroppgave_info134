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
