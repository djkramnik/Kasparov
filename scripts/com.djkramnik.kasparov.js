(function(){
  this.com = this.com || {};
  this.com.djkramnik= this.com.djkramnik || {};
  this.com.djkramnik.kasparov= this.com.djkramnik.kasparov || {};

  var kasparov= this.com.djkramnik.kasparov;
  var _soundDirectory= "./assets/soundclips/";
  var _picDirectory= "./assets/images/";
  var _initEgo= 0;
  var _initColor=0;
  var _initPosGrade="G";
  var _initEgoMetre=50;
  var _initRageMetre=10;

  var _masterMoodList=
  [
	{value:"Calm", title:"Calm", rep:0, color:-1},
	{value:"Full of Shit", title:"Full of Shit", rep:0, color:-1},
	{value:"Intoxicated", title:"Intoxicated", rep:0, color:-1},
	{value:"Cocksure", title:"Cocksure", rep:0, color:-1},
	{value:"Manic", title:"Manic", rep:0, color:-1},
	{value:"Uppity", title:"Uppity", rep:0, color:-1},
	{value:"Presumptuous", title:"Presumptuous", rep:0, color:-1},
	{value:"Puffed up", title:"Puffed up", rep:0, color:-1},
	{value:"Fearless", title:"Fearless", rep:0, color:-1},
	{value:"Satisfied", title:"Satisfied", rep:0, color:-1},
	{value:"Self-assured", title:"Self-assured", rep:0, color:-1},
	{value:"Upbeat", title:"Upbeat", rep:0, color:-1},
	{value:"Philantrophic", title:"Philantrophic", rep:0, color:-1},
	{value:"Generous", title:"Generous", rep:0, color:-1},
	{value:"Gleeful", title:"Gleeful", rep:0, color:-1},
	{value:"Perky", title:"Perky", rep:0, color:-1},
	{value:"Playful", title:"Playful", rep:0, color:-1},
	{value:"Tickled", title:"Tickled", rep:0, color:-1},
	{value:"Flying High", title:"Flying High", rep:0, color:-1},
	{value:"Pleased", title:"Pleased", rep:0, color:-1},
	{value:"Pleasant", title:"Pleasant", rep:0, color:-1},
	{value:"Peaceful", title:"Peaceful", rep:0, color:-1},
	{value:"Glad", title:"Glad", rep:0, color:-1},
	{value:"Cheerful", title:"Cheerful", rep:0, color:-1},
	{value:"Elated", title:"Elated", rep:0, color:-1},
	{value:"Chipper", title:"Chipper", rep:0, color:-1},
	{value:"Convival", title:"Convival", rep:0, color:-1},
	{value:"Sunny", title:"Sunny", rep:0, color:-1},
	{value:"Light", title:"Light", rep:0, color:-1},
	{value:"Looking Good", title:"Looking Good", rep:0, color:-1},
	{value:"Can't Complain", title:"Can't Complain", rep:0, color:-1},
	{value:"Restless", title:"Restless", rep:0, color:-1},
	{value:"Edgy", title:"Edgy", rep:0, color:-1},
	{value:"Uneasy", title:"Uneasy", rep:0, color:-1},
	{value:"Unsettled", title:"Unsettled", rep:0, color:-1},
	{value:"Strung out", title:"Strung out", rep:0, color:-1},
	{value:"Neutral", title:"Neutral", rep:0, color:-1},
	{value:"Even-handed", title:"Even-handed", rep:0, color:-1},
	{value:"Fair-minded", title:"Fair-minded", rep:0, color:-1},
	{value:"Socratic", title:"Socratic", rep:0, color:-1},
	{value:"Platonic", title:"Platonic", rep:0, color:-1},
	{value:"Standing By", title:"Standing By", rep:0, color:-1},
	{value:"Stoic", title:"Stoic", rep:0, color:-1},
	{value:"Unruffled", title:"Unruffled", rep:0, color:-1},
	{value:"Collected", title:"Collected", rep:0, color:-1},
	{value:"Cool", title:"Cool", rep:0, color:-1},
	{value:"Irked", title:"Irked", rep:0, color:-1},
	{value:"Sore", title:"Sore", rep:0, color:-1},
	{value:"Peeved", title:"Peeved", rep:0, color:-1},
	{value:"Annoyed", title:"Annoyed", rep:0, color:-1},
	{value:"Frustrated", title:"Frustrated", rep:0, color:-1},
	{value:"Perturbed", title:"Perturbed", rep:0, color:-1},
	{value:"Anxious", title:"Anxious", rep:0, color:-1},
	{value:"A lil disappointed", title:"A lil disappointed", rep:0, color:-1},
	{value:"Philosophic", title:"Philosophic", rep:0, color:-1},
	{value:"Rationalizing failure", title:"Rationalizing failure", rep:0, color:-1},
	{value:"Still hopeful", title:"Still hopeful", rep:0, color:-1},
	{value:"Down but not out", title:"Down but not out", rep:0, color:-1},
	{value:"Vexed", title:"Vexed", rep:0, color:-1},
	{value:"Pissed", title:"Pissed", rep:0, color:-1},
	{value:"Nettled", title:"Nettled", rep:0, color:-1},
	{value:"Bull****", title:"Bull****", rep:0, color:-1},
	{value:"Disgruntled", title:"Disgruntled", rep:0, color:-1},
	{value:"Chagrined", title:"Chagrined", rep:0, color:-1},
	{value:"Shook up", title:"Shook up", rep:0, color:-1},
	{value:"A tad bitter", title:"A tad bitter", rep:0, color:-1},
	{value:"Ruminating", title:"Ruminating", rep:0, color:-1},
	{value:"Pained", title:"Pained", rep:0, color:-1},
	{value:"Disappointed for real now", title:"Disappointed for real now", rep:0, color:-1},
	{value:"Ready to tilt", title:"Ready to tilt", rep:0, color:-1},
	{value:"Indignation", title:"Indignation", rep:0, color:-1},
	{value:"Tantrum incoming", title:"Tantrum incoming", rep:0, color:-1},
	{value:"Learned helplessness", title:"Learned helplessness", rep:0, color:-1},
	{value:"Disillusioned", title:"Disillusioned", rep:0, color:-1},
	{value:"Clearly I will go sailing no more", title:"Clearly I will go sailing no more", rep:0, color:-1},
	{value:"Ruminating on all the failures of his life", title:"Ruminating on all the failures of his life", rep:0, color:-1},
	{value:"Alone with a bottle of vodka", title:"Alone with a bottle of vodka", rep:0, color:-1},
	{value:"Annihilation of the personality", title:"Annihilation of the personality", rep:0, color:-1}
  ];

  var _masterPicList=
  [
	{value: "aftermath.jpg", title: "aftermath", rep:0, color:-1 },
	{value: "aftermath2.png", title: "aftermath", rep:0, color:-1 },
	{value: "aftermath3.jpg", title: "aftermath3", rep:0, color:-1 },
	{value: "aftermath4.jpg", title: "aftermath4", rep:0, color:-1 },
	{value: "aftermath2.jpg", title: "aftermath5", rep:0, color:-1 },
	{value: "aftermath3.jpg", title: "aftermath6", rep:0, color:-1 },
	{value: "distressed.jpg", title: "distressed", rep:0, color:-1 },
	{value: "distressed2.jpg", title: "distressed2", rep:0, color:-1 },
	{value: "distressed3.jpg", title: "distressed4", rep:0, color:-1 },
	{value: "distressed4.jpg", title: "distressed5", rep:0, color:-1 },
	{value: "prayer.jpg", title: "prayer2", rep:0, color:-1 },
	{value: "prayer2.jpg", title: "prayer3", rep:0, color:-1 },
	{value: "prayer3.jpg", title: "prayer4", rep:0, color:-1 },
	{value: "prayer4.jpg", title: "prayer5", rep:0, color:-1 },
	{value: "prayer5.jpg", title: "prayer6", rep:0, color:-1 },
	{value: "swag.jpg", title: "swag", rep:0, color:-1 },
	{value: "swag.jpg", title: "swag10", rep:0, color:-1 },
	{value: "swag2.jpg", title: "swag11", rep:0, color:-1 },
	{value: "swag3.jpg", title: "swag12", rep:0, color:-1 },
	{value: "swag2.jpg", title: "swag2", rep:0, color:-1 },
	{value: "swag3.jpg", title: "swag3", rep:0, color:-1 },
	{value: "swag4.jpg", title: "swag4", rep:0, color:-1 },
	{value: "swag5.jpg", title: "swag5", rep:0, color:-1 },
	{value: "swag6.jpg", title: "swag6", rep:0, color:-1 },
	{value: "swag8.jpg", title: "swag8", rep:0, color:-1 },
	{value: "swag7.jpg", title: "swag9", rep:0, color:-1 },
	{value: "thinkin.jpg", title: "thinkink2", rep:0, color:-1 },
	{value: "thinkin2.jpg", title: "thinkink", rep:0, color:-1 },
	{value: "thinkin3.jpg", title: "thinkink3", rep:0, color:-1 },
	{value: "thinkin4.jpg", title: "thinkink4", rep:0, color:-1 },
	{value: "thinkin5.jpg", title: "thinkink5", rep:0, color:-1 },
	{value: "sample.jpg", title: "sampler", rep:0, color:-1 }
  ];

  var _masterClipList=
  [
	{value: "badpos.mp3", title: "badpos",rep:0, color:-1},
	{value: "bb2.mp3", title: "bb2",rep:0, color:-1},
	{value: "bd3.mp3", title: "bd3",rep:0, color:-1},
	{value: "blackattack.mp3", title: "blackattack",rep:0, color:-1},
	{value: "blackattack2.mp3", title: "blackattack2",rep:0, color:-1},
	{value: "blackbetter.mp3", title: "blackbetter",rep:0, color:-1},
	{value: "blackgame.mp3", title: "blackgame",rep:0, color:-1},
	{value: "c4.mp3", title: "c4",rep:0, color:-1},
	{value: "castle.mp3", title: "castle",rep:0, color:-1},
	{value: "coolpawns.mp3", title: "coolpawns",rep:0, color:-1},
	{value: "d5.mp3", title: "d5",rep:0, color:-1},
	{value: "d52.mp3", title: "d52",rep:0, color:-1},
	{value: "deepthought.mp3", title: "deepthought",rep:0, color:-1},
	{value: "domination.mp3", title: "domination",rep:0, color:-1},
	{value: "draw.mp3", title: "draw",rep:0, color:-1},
	{value: "draw2.mp3", title: "draw2",rep:0, color:-1},
	{value: "draw3.mp3", title: "draw3",rep:0, color:-1},
	{value: "endgamepin.mp3", title: "endgamepin",rep:0, color:-1},
	{value: "expected.mp3", title: "expected",rep:0, color:-1},
	{value: "gamelove.mp3", title: "gamelove",rep:0, color:-1},
	{value: "gamelove2.mp3", title: "gamelove2",rep:0, color:-1},
	{value: "gamelove3.mp3", title: "gamelove3",rep:0, color:-1},
	{value: "gamelove4.mp3", title: "gamelove4",rep:0, color:-1},
	{value: "gamelove5.mp3", title: "gamelove5",rep:0, color:-1},
	{value: "giveupqueen.mp3", title: "giveupqueen",rep:0, color:-1},
	{value: "greatchess.mp3", title: "greatchess",rep:0, color:-1},
	{value: "history1.mp3", title: "history1",rep:0, color:-1},
	{value: "history2.mp3", title: "history2",rep:0, color:-1},
	{value: "history3.mp3", title: "history3",rep:0, color:-1},
	{value: "history4.mp3", title: "history4",rep:0, color:-1},
	{value: "idea.mp3", title: "idea",rep:0, color:-1},
	{value: "isolatedpawn.mp3", title: "isolatedpawn",rep:0, color:-1},
	{value: "keymove.mp3", title: "keymove",rep:0, color:-1},
	{value: "krep.mp3", title: "krep",rep:0, color:-1},
	{value: "krep2.mp3", title: "krep2",rep:0, color:-1},
	{value: "krep3.mp3", title: "krep3",rep:0, color:-1},
	{value: "kresolve.mp3", title: "kresolve",rep:0, color:-1},
	{value: "kresolve2.mp3", title: "kresolve2",rep:0, color:-1},
	{value: "kresolve3.mp3", title: "kresolve3",rep:0, color:-1},
	{value: "kresolve4.mp3", title: "kresolve4",rep:0, color:-1},
	{value: "kresolve5.mp3", title: "kresolve5",rep:0, color:-1},
	{value: "kresolve6.mp3", title: "kresolve6",rep:0, color:-1},
	{value: "lostontime.mp3", title: "lostontime",rep:0, color:-1},
	{value: "matein3.mp3", title: "matein3",rep:0, color:-1},
	{value: "miracles.mp3", title: "miracles",rep:0, color:-1},
	{value: "moretime.mp3", title: "moretime",rep:0, color:-1},
	{value: "ne4.mp3", title: "ne4",rep:0, color:-1},
	{value: "ne5.mp3", title: "ne5",rep:0, color:-1},
	{value: "ne52.mp3", title: "ne52",rep:0, color:-1},
	{value: "ne7.mp3", title: "ne7",rep:0, color:-1},
	{value: "nf4.mp3", title: "nf4",rep:0, color:-1},
	{value: "nh4.mp3", title: "nh4",rep:0, color:-1},
	{value: "patzercheck.mp3", title: "patzercheck",rep:0, color:-1},
	{value: "photographiclense.mp3", title: "photographiclense",rep:0, color:-1},
	{value: "promoted.mp3", title: "promoted",rep:0, color:-1},
	{value: "promotion.mp3", title: "promotion",rep:0, color:-1},
	{value: "qf6.mp3", title: "qf6",rep:0, color:-1},
	{value: "queenside.mp3", title: "queenside",rep:0, color:-1},
	{value: "rant.mp3", title: "rant",rep:0, color:-1},
	{value: "rant10.mp3", title: "rant10",rep:0, color:-1},
	{value: "rant11.mp3", title: "rant11",rep:0, color:-1},
	{value: "rant12.mp3", title: "rant12",rep:0, color:-1},
	{value: "rant13.mp3", title: "rant13",rep:0, color:-1},
	{value: "rant2.mp3", title: "rant2",rep:0, color:-1},
	{value: "rant3.mp3", title: "rant3",rep:0, color:-1},
	{value: "rant4.mp3", title: "rant4",rep:0, color:-1},
	{value: "rant5.mp3", title: "rant5",rep:0, color:-1},
	{value: "rant6.mp3", title: "rant6",rep:0, color:-1},
	{value: "rant7.mp3", title: "rant7",rep:0, color:-1},
	{value: "rant8.mp3", title: "rant8",rep:0, color:-1},
	{value: "rant9.mp3", title: "rant9",rep:0, color:-1},
	{value: "selflove.mp3", title: "selflove",rep:0, color:-1},
	{value: "selflove2.mp3", title: "selflove2",rep:0, color:-1},
	{value: "selflove3.mp3", title: "selflove3",rep:0, color:-1},
	{value: "selflove4.mp3", title: "selflove4",rep:0, color:-1},
	{value: "selflove5.mp3", title: "selflove5",rep:0, color:-1},
	{value: "selflove6.mp3", title: "selflove6",rep:0, color:-1},
	{value: "selflove7.mp3", title: "selflove7",rep:0, color:-1},
	{value: "soreloser.mp3", title: "soreloser",rep:0, color:-1},
	{value: "soreloser2.mp3", title: "soreloser2",rep:0, color:-1},
	{value: "soreloser3.mp3", title: "soreloser3",rep:0, color:-1},
	{value: "soreloser4.mp3", title: "soreloser4",rep:0, color:-1},
	{value: "soreloser5.mp3", title: "soreloser5",rep:0, color:-1},
	{value: "soreloser6.mp3", title: "soreloser6",rep:0, color:-1},
	{value: "started.mp3", title: "started",rep:0, color:-1},
	{value: "threats.mp3", title: "threats",rep:0, color:-1},
	{value: "unclear.mp3", title: "unclear",rep:0, color:-1},
	{value: "waiting.mp3", title: "waiting",rep:0, color:-1},
	{value: "wastedpawn.mp3", title: "wastedpawn",rep:0, color:-1},
	{value: "whiteattack.mp3", title: "whiteattack",rep:0, color:-1},
	{value: "whiteattack2.mp3", title: "whiteattack2",rep:0, color:-1},
	{value: "whiteattack3.mp3", title: "whiteattack3",rep:0, color:-1},
	{value: "whitebetter.mp3", title: "whitebetter",rep:0, color:-1},
	{value: "whitebetter2.mp3", title: "whitebetter2",rep:0, color:-1},
	{value: "whiteopening.mp3", title: "whiteopening",rep:0, color:-1},
	{value: "whiteresign.mp3", title: "whiteresign",rep:0, color:-1}
  ];


  kasparov.range= function(egomin,arrClips){
	this.egomin= egomin;
	this.clips= arrClips;
	this.minrep=0;
  };

  kasparov.emoKasparov=function(canvasElem,soundPlayer,moodCaption,init){
	this.init= init || _initKasparovEvents;
	this.playerColor=_initColor;
	this.ego=_initEgo;
	this.masterClipList= _masterClipList;
	this.masterPicList= _masterPicList;
	this.masterMoodList= _masterMoodList;
	this.soundPlayer=soundPlayer;
	this.emoEvts={};
	this.picEvts={};
	this.litEvts={};
	this.posHistory= _initPosGrade;
	this.canvasElem= canvasElem;
	this.context= canvasElem.getContext("2d");
	this.kasparovPic= new Image();
	this.moodCaption= moodCaption;
	this.egoMetreElem;
	this.rageMetreElem;
	this.egoMetre= 0;
	this.rageMetre= 0;

	this.testEmote=function(title){
		for(var i=0; i<this.masterClipList.length; i++){
			if(this.masterClipList[i].title == title){
				this.emote(i);
				break;
			}
		}
	};
	this.emote=function(idx){
		//console.log("emoting: "+idx);
		this.soundPlayer.playSound(_soundDirectory+this.masterClipList[idx].value);
	};
	this.visualEmote= function(idx){
		//console.log("visual emote: "+idx);
		this.kasparovPic.src= _picDirectory+this.masterPicList[idx].value;
		var context= this.context;
		var canvasElem= this.canvasElem;

		this.kasparovPic.addEventListener("load",function(){
			context.drawImage(this,0,0,canvasElem.width,canvasElem.height);
		});

	};
	this.literaryEmote=function(idx){
		this.moodCaption.innerHTML= "Mood: "+this.masterMoodList[idx].value;
	};

	this.createClipArray=function(titleArr,delimiter,masterList){
		delimiter= (delimiter || "|");
		var str= delimiter+titleArr.join(delimiter)+delimiter,
			clipArr=[];
		for(var i=0; i< masterList.length; i++){
			if(str.indexOf(delimiter+masterList[i].title+delimiter) != -1) clipArr.push(i);
		}
		return clipArr;
	};


	this.createRange= function(egomin,titleArr,masterList){

		return new kasparov.range(egomin,this.createClipArray(titleArr,"|",masterList));
	};
	this.initEvent=function(evtName){
		this.emoEvts[evtName]= [];
	};
	this.addRange=function(evtName,egomin,titleArr){
		if(this.emoEvts[evtName]){
			this.emoEvts[evtName].push(this.createRange(egomin,titleArr,this.masterClipList));
		}
	};
	this.initPicEvent= function(evtName){
		this.picEvts[evtName]=[];
	};
	this.addPicRange=function(evtName,egomin,titleArr){
		if(this.picEvts[evtName]){
			this.picEvts[evtName].push(this.createRange(egomin,titleArr,this.masterPicList));
		}
	};
	this.initLitEvent=function(evtName){
		this.litEvts[evtName]=[];
	};
	this.addLitRange=function(evtName,egomin,titleArr){
		if(this.litEvts[evtName]){
			this.litEvts[evtName].push(this.createRange(egomin,titleArr,this.masterMoodList));
		}
	};

	this.playMediaFromRange=function(range,callback,masterList){
		// copy the array
		var rangeCopy= range.clips.slice();

		// splice out according to repetition and color

		for(var i=rangeCopy.length-1,clip; i >= 0; i--){
			clip=masterList[rangeCopy[i]];
			if(clip.rep != range.minrep) rangeCopy.splice(i,1);
			else if(clip.color != -1 && clip.color != this.playerColor) rangeCopy.splice(i,1);
		}
		// pick a sound at random from the remainder
		if(rangeCopy.length ==0 ){
			range.minrep++;
			return;
		}

		var clipIdx= rangeCopy[Math.floor(Math.random() * rangeCopy.length)];

		callback.call(this,clipIdx);
		//this.emote(clipIdx);
		// increase the repetition property on the selected clip
		masterList[clipIdx].rep++;
		// see if the minimum repetition property of the range needs to be incremented
		if(rangeCopy.length < 2) range.minrep++;
	};

	this.playEventSound=function(evtName){
		var eventArr= this.emoEvts[evtName];
		if(eventArr){
			for(var i=0; i<eventArr.length; i++){
				if(this.ego >= eventArr[i].egomin){
					this.playMediaFromRange(eventArr[i],this.emote,this.masterClipList);
					break;
				}
			}
		}
	};
	this.showEventPic=function(evtName){
		var eventArr= this.picEvts[evtName];
		if(eventArr){
			for(var i=0; i<eventArr.length; i++){
				if(this.ego >= eventArr[i].egomin){
					this.playMediaFromRange(eventArr[i],this.visualEmote,this.masterPicList);
					break;
				}
			}
		}
	};
	this.showMoodCaption= function(evtName){
		var eventArr= this.litEvts[evtName];
		if(eventArr){
			for(var i=0; i<eventArr.length; i++){
				if(this.ego >= eventArr[i].egomin){
					this.playMediaFromRange(eventArr[i],this.literaryEmote,this.masterMoodList);
					break;
				}
			}
		}
	};

	this.reactToPosition=function(posGrade,move,queenCapture,promoteMove){
		//console.log("isQueen: "+queenCapture);
		//console.log("isPromote: "+promoteMove);
		//console.log("posGrade: "+posGrade);


		if(promoteMove){
			this.playEventSound("promote");
			return;
		}


		this.posHistory+=posGrade;
		var incredulity= this.posHistory[this.posHistory.length-2].charCodeAt(0)- this.posHistory[this.posHistory.length-1].charCodeAt(0);
		//if this position compared to last represents a significant change in score, play a sound clip based on the position grade
		if(incredulity){
			//play adv/dis event
			switch(posGrade){
				case "B":
				case "C":
				case "D":
				  if(queenCapture) this.playEventSound("queenWin");
				  else {
					this.playEventSound("adv2");
					this.showEventPic("adv2");
					this.showMoodCaption("adv2");
					this.adjustEgoMetre(5);
					this.adjustRageMetre(-5);
				  }
				  break;
				case "E":
				case "F":
				  this.playEventSound("adv1");
				  this.showEventPic("adv1");
				  this.adjustEgoMetre(2.5);
				  this.adjustRageMetre(-2.5);
				case "G":
				  this.playEventSound(move);
				  break;
				case "H":
				case "I":
				  this.playEventSound("dis1");
				  this.showEventPic("dis1");
				  this.adjustEgoMetre(-2.5);
				  this.adjustRageMetre(2.5);
				  break;
				case "J":
				case "K":
				case "L":
				  this.playEventSound("dis2");
				  this.showMoodCaption("dis2");
				  this.adjustEgoMetre(-5);
				  this.adjustRageMetre(5);
				  break;
			}
		}
		else{
			//always see if there is a sound to be played based on the specific move
			this.playEventSound(move);
		}
	};

	this.adjustEgo=function(happyDay){
		if(happyDay){
			this.ego= this.ego < 3 ? this.ego+1 : this.ego;
		}
		else{
			this.ego= this.ego > -3 ? this.ego-1 : this.ego;
		}
	}

	this.adjustEgoMetre=function(egoBoost){

		this.egoMetre+= egoBoost;
		if(this.egoMetre < 0) this.egoMetre=0;
		if(this.egoMetre > 100) this.egoMetre=100;
		$(this.egoMetreElem).animate({width:this.egoMetre+"%"},700);
		//console.log("ego is: "+this.egoMetre);
	};
	this.adjustRageMetre=function(rageBoost){
		this.rageMetre+= rageBoost;
		if(this.rageMetre < 0) this.rageMetre=0;
		if(this.rageMetre > 100) this.rageMetre=100;
		$(this.rageMetreElem).animate({width:this.rageMetre+"%"},700);
		//console.log("rage is: "+this.rageMetre);
	};
	this.init.call(this);
	this.visualEmote(this.masterPicList.length-1);
	this.literaryEmote(0);


  };
  	function _initKasparovEvents(){

		//win

		this.initEvent("win");
		this.addRange("win",2,["gamelove4","kRep","kRep2","kRep3","selflove","selflove2","selflove5"]);
		this.addRange("win",-1,["selflove3","selflove4","selflove6","selflove7","history3"]);
		this.addRange("win",-2,["expected"]);

		this.initPicEvent("win");
		this.addPicRange("win",2,["swag8","swag9","swag10","swag11","swag12"]);
		this.addPicRange("win",-1,["swag","swag2","swag3","swag4","swag5","swag6"]);
		this.addPicRange("win",-2,["samplePic","thinkink","thinkink4","thinkink5"]);

		this.initLitEvent("win");
		this.addLitRange("win",3,["Full of Shit","Intoxicated","Cocksure","Manic","Gleeful","Tickled"]);
		this.addLitRange("win",2,["Uppity","Presumptuous","Puffed up","Fearless","Satisfied","Flying High","Elated"]);
		this.addLitRange("win",1,["Self-Assured","UpBeat","Philantrophic","Looking Good","Can't Complain","Glad"]);
		this.addLitRange("win",-1,["Cheerful","Peaceful","Light","Conival","Chipper"]);
		this.addLitRange("win",-2,["Pleased","Socratic","Platonic","Neutral","Standing By","Philosophic"]);

		//loss
		this.initEvent("loss");
		this.addRange("loss",2,["expected"]);
		this.addRange("loss",-1,["rant12","rant11","rant","rant2","rant4","rant7","kresolve2","kresolve4","kresolve5","kresolve6"]);
		this.addRange("loss",-3,["soreloser","soreloser2","soreloser3","soreloser4","soreloser5","soreloser6","rant3","rant6","rant9","rant5","rant10","rant8"]);

		this.initPicEvent("loss");
		this.addPicRange("loss",2,["samplePic","thinkink","thinkink4","thinkink5"]);
		this.addPicRange("loss",-1,["distressed3","distressed4","distressed5","aftermath","prayer6"]);
		this.addPicRange("loss",-3,["distressed","distressed2"]);

		this.initLitEvent("loss");
		this.addLitRange("loss",1,["Neutral","Socratic","Platonic","Standing By","Collected","Cool","Calm","Still hopeful","Ruminating"]);
		this.addLitRange("loss",-1,["Irked","Peeved","Annoyed","Frustrated","Perturbed","Anxious","A lil disappointed"]);
		this.addLitRange("loss",-2,["Disappointed for real now","Rationalizing failure","Chagrined","Shook up","Nettled","Pissed","Disgruntled","A tad bitter"]);
		this.addLitRange("loss",-3,["Learned helplessness","Pained","Bull****",
		"Ready to tilt","Indignation","Tantrum incoming",
		"Clearly I will go sailing no more","Alone with a bottle of vokda","Annihilation of the personality"]);

		//start
		this.initEvent("start");
		this.addRange("start",-1,["started","history1","history2","greatchess"]);
		this.addRange("start",-3, ["rant8"]);

		this.initPicEvent("start");
		this.addPicRange("start",-1,["thinkink","thinkink2","thinkink3","thinkink4","thinkink5"]);
		this.addPicRange("start",-3,["aftermath2","aftermath3","aftermath4","aftermath5","aftermath6"]);

		//draw decline
		this.initEvent("drawDecline");
		this.addRange("drawDecline",-2,["draw","draw2","draw3"]);

		//loss on time
		this.initEvent("timeLoss");
		this.addRange("timeLoss",-1,["lostontime"]);

		//queenadv
		this.initEvent("queenWin");
		this.addRange("queenWin",-2,["giveupqueen"]);

		//promotion
		this.initEvent("promote");
		this.addRange("promote",-2,["promotion"]);

		//specific moves
		this.initEvent("d5");
		this.addRange("d5",-2,["d5","d52"]);
		this.initEvent("bb2");
		this.addRange("bb2",-2,["bb2"]);
		this.initEvent("bd3");
		this.addRange("bd3",-2,["bd3"]);
		this.initEvent("c4");
		this.addRange("c4",-2,["c4"]);
		this.initEvent("ne4");
		this.addRange("ne4",-2,["ne4"]);
		this.initEvent("ne5");
		this.addRange("ne5",-2,["ne5","ne52"]);
		this.initEvent("ne7");
		this.addRange("ne7",-2,["ne7"]);
		this.initEvent("nf4");
		this.addRange("nf4",-2,["nf4"]);
		this.initEvent("nh4");
		this.addRange("nh4",-2,["nh4"]);
		this.initEvent("qf6");
		this.addRange("qf6",-2,["qf6"]);
		this.initEvent("castle");
		this.addRange("castle",-2,["castle"]);

		//adv2
		this.initEvent("adv2");
		this.addRange("adv2",1,["domination","gamelove3","gamelove4","gamelove5","patzercheck","matein3","miracles","whitebetter2","whiteattack3","whiteresign","blackbetter","blackattack2"]);
		this.addRange("adv2",-1,["gamelove","gamelove2","patzercheck","idea","keymove","whiteattack","whiteattack2","whitebetter","blackgame","blackattack"]);
		this.addRange("adv2",-3,["queenside","unclear","deepthought","threats"]);

		this.initPicEvent("adv2");
		this.addPicRange("adv2",2,["swag3","swag4","swag5","swag8","swag9","swag10","swag11","swag12"]);
		this.addPicRange("adv2",-1,["swag","swag2","swag6"]);
		this.addPicRange("adv2",-3,["prayer2","prayer3","prayer4","prayer5","prayer6"]);

		this.initLitEvent("adv2");
		this.addLitRange("adv2",2,["Flying High","Presumptuous","Cocksure","Uppity","Fearless","Self-assured","Generous","Gleeful","Perky","Playful"]);
		this.addLitRange("adv2",0,["Pleased","Cheerful","Convival","Sunny","Elated","Can't Complain","Looking Good"]);
		this.addLitRange("adv2",-2,["Neutral","Stoic","Standing By","Unruffled","Collected","Cool"]);
		this.addLitRange("adv2",-3,["A tad bitter","Socratic","Even-handed","Philosophic","Standing By"]);

		//adv1
		this.initEvent("adv1");
		this.addRange("adv1",2,["domination","gamelove3","gamelove4","gamelove5","patzercheck","matein3","miracles","whitebetter2","whiteattack3","whiteresign","blackbetter","blackattack2"]);
		this.addRange("adv1",0,["gamelove","gamelove2","patzercheck","idea","keymove","whiteattack","whiteattack2","whitebetter","blackgame","blackattack"]);
		this.addRange("adv1",-2,["queenside","unclear","deepthought","threats"]);

		this.initPicEvent("adv1");
		this.addPicRange("adv1",2,["swag3","swag4","swag5","swag8","swag9","swag10","swag11","swag12"]);
		this.addPicRange("adv1",1,["swag","swag2","swag6"]);
		this.addPicRange("adv1",-2,["prayer2","prayer3","prayer4","prayer5","prayer6"]);

		//dis1
		this.initEvent("dis1");
		this.addRange("dis1",2,["queenside","unclear","deepthought","threats"]);
		this.addRange("dis1",-1,["expected","badpos","rant13","rant12"]);
		this.addRange("dis1",-3,["kresolve","kresolve4","kresolve6","rant8","rant7","soreloser","soreloser2","rant","soreloser6"]);

		this.initPicEvent("dis1");
		this.addPicRange("dis1",-1,["prayer2","prayer3","prayer4","prayer5","prayer6"]);
		this.addPicRange("dis1",-3,["distressed","distressed2","distressed4","distressed5","aftermath4"]);

		//dis2
		this.initEvent("dis2");
		this.addRange("dis2",1,["expected","badpos","rant13","rant12"]);
		this.addRange("dis2",-3,["kresolve","kresolve4","kresolve6","rant8","rant7","soreloser","soreloser2","rant","soreloser6"]);

		this.initLitEvent("dis2");
		this.addLitRange("dis2",2,["Still hopeful","Down but not out","Philosophic","Stoic","Socratic","Philosophic"]);
		this.addLitRange("dis2",0,["A lil disappointed","Uneasy","Anxious","Restless","Edgy","Unsettled","A tad bitter"]);
		this.addLitRange("dis2",-2,["Irked","Sore","Frustrated","Disappointed for real now","Disgruntled","Nettled","Annoyed"]);
		this.addLitRange("dis2",-3,["Chagrined","Pained","Pissed","Bull****","Ruminating","Vexed","Shook up","Disillusioned","Alone with a bottle of vodka"]);

	}



 })();
