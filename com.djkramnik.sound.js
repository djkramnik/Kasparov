(function(){
  this.com = this.com || {};
  this.com.djkramnik= this.com.djkramnik || {};
  this.com.djkramnik.sound= this.com.djkramnik.sound || {};
  
  var sound= this.com.djkramnik.sound;
  
  sound.soundPlayer=function(audioTag){
	this.audioTag= document.getElementById(audioTag) || document.createElement("audio");
	this.audioTag.addEventListener("loadeddata",function(){
		this.play();
	},false);
	
  };
  sound.soundPlayer.prototype.playSound=function(soundPath){
	
	this.audioTag.src=soundPath;
	
  };
  
  
}());