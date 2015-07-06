(function(){
  this.com= this.com || {};
  this.com.djkramnik= this.com.djkramnik || {};
  this.com.djkramnik.ui= this.com.djkramnik.ui ||  {};
  var ui= this.com.djkramnik.ui;
  
  var _totalSquareNum= 64;
  var _lightSquares= "lightSquares"
  var _darkSquares= "darkSquares";
  var _squareClass= "squareClass";
  var _pieceClass= "pieceClass";
  
  var _picDirectory= "./finalCopy/"
  var _soundDirectory= _picDirectory;
  
  var _colorNameToPath=
  {
    "light":"l",
	"dark":"b",
  };
  var _pieceNameToPath=
  {
    "pawn":"pawn.png",
	"knight":"knight.png",
	"bishop":"bishop.png",
	"rook":"rook.png",
	"queen":"queen.png",
	"king":"king.png"
  };
  
  var _squareColors=
  [
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0,
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0,
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0,
  0,1,0,1,0,1,0,1,
  1,0,1,0,1,0,1,0
  ];
  
  var _msInMinute=60000;
  var _msInSecond=1000;
  
  
  function _convertMilliSeconds(milliseconds){
    var minutes= Math.floor(milliseconds/_msInMinute);
	var seconds= Math.floor((milliseconds % _msInMinute)/_msInSecond);
	
	
	return minutes + " : " + (seconds < 10 ? "0"+seconds : seconds);

  }
  
  function _resolvePathToImage(color,pieceType){
    return _picDirectory + _colorNameToPath[color] + _pieceNameToPath[pieceType];
  }
  
    ui.hideElementsByClassName= function hideElementsByClassName(className){
		$("."+className).hide();
	};
		
	ui.showElementsByClassName=function showElementsByClassName(className){
		$("."+className).show();
	};
	ui.menuReset=function menuReset(){
		ui.hideElementsByClassName("inGame");
		ui.hideElementsByClassName("optionsMenu");
		ui.showElementsByClassName("startGame");
	};

		
	ui.moveSound=
	{
		check: _soundDirectory + "move-check.mp3",
		promote: _soundDirectory + "promote.mp3",
		capture: _soundDirectory + "capture.mp3",
		castle: _soundDirectory + "castle.mp3",
		normal: _soundDirectory + "move-self.mp3"
	};
	
	ui.playSound=function(soundPlayer,moveType){
		//console.log("moveType: "+moveType);
		var moveClip= ui.moveSound[moveType]; 
		if(soundPlayer && moveClip){
			soundPlayer.playSound(moveClip);
		}
	};
	
  
  ui.optionButton= function(buttonName,buttonStyle,fieldType){
	
	this.optionBtn= document.getElementById(buttonName) || document.createElement(fieldType ? fieldType : "button");
	this.optionBtn.id=buttonName;
	if(buttonStyle){
		this.optionBtn.classList.add(buttonStyle);
	}
	this.toggleButtonStyle=function(buttonStyle){
		this.optionBtn.classList.toggle(buttonStyle);
	};
	this.addButtonStyle=function(buttonStyle){
		this.optionBtn.classList.add(buttonStyle);
	};
	this.removeButtonStyle=function(buttonStyle){
		this.optionBtn.classList.remove(buttonStyle);
	};
	
	this.addButtonEvent= function(funcName,func){
		$(this.optionBtn).on(funcName,func);
	};
	this.addMessage=function(msg){
		this.optionBtn.innerHTML=msg;
		////console.log("writing a message: "+msg);
	};
			
  };
  
  
  ui.chessPiece= function chessPiece(color,pieceType,pieceClass){ 
	this.color=color.toLowerCase();
	this.pieceType=pieceType.toLowerCase();
	this.pieceImg= document.createElement("img");
	this.pieceImg.src= _resolvePathToImage(this.color,this.pieceType);
	if(pieceClass) this.pieceImg.classList.add(pieceClass);
	this.changeClass=function(className){
	  if(className){ 
		this.pieceImg.classList.toggle(className);
	  }
	};
	this.promotePiece=function(color,pieceType){
	  this.color=color.toLowerCase();
	  this.pieceType= pieceType.toLowerCase();
	  this.pieceImg.src= _resolvePathToImage(this.color,this.pieceType);
	}
    
  }
  ui.chessSquare= function chessSquare(squareID,squareClass,colorClass){ 
	this.squareDiv= document.createElement("div");
	this.squareDiv.id=squareID;
    this.innerDiv= document.createElement("div");
	this.squareDiv.appendChild(this.innerDiv);
	
	if(squareClass) this.squareDiv.classList.add(squareClass);
    if(colorClass) this.squareDiv.classList.add(colorClass);	
   
	this.chessPiece= null;  
	this.changeClass=function(className){
	  if(className){
	    this.squareDiv.classList.toggle(className);
	  }
	}
	
	this.hasPiece=function(){
	  return (this.chessPiece != null);
	}
	this.addPiece=function(chessPiece){  
	  this.chessPiece=chessPiece;
	  this.squareDiv.appendChild(chessPiece.pieceImg);
	}
	this.removePiece=function(){
	  var removedPiece= this.chessPiece;
	  $(this.chessPiece.pieceImg).remove();
	  this.chessPiece=null;
	  return removedPiece;
	}
	this.promotePiece=function(pieceType){
		if(this.chessPiece){
			this.chessPiece.promotePiece(this.chessPiece.color,pieceType);
		}
	}

  }
  ui.chessBoard= function chessBoard(boardID, squareClass, lightSquares, darkSquares, pieceClass){
	squareClass= squareClass || _squareClass;
	pieceClass= pieceClass  || _pieceClass;
	lightSquares= lightSquares || _lightSquares;
	darkSquares= darkSquares || _darkSquares;
	
	this.boardDiv= document.getElementById(boardID) || document.createElement("div");
	this.boardDiv.id= boardID;
    this.chessSquares={}; 	
	this.chessSquaresIdx=[];
	this.scoreBoard= new ui.optionButton("scoreMsg",null,"span");
	this.scoreBoard.addMessage("--Score--<br />Kasparov: 0 Player: 0");
	this.lightClockDisplay= new ui.optionButton("lclockMsg",null,"span");
	this.darkClockDisplay= new ui.optionButton("dclockMsg",null,"span");

		
	this.displayTime= function(timeToDisplay){	
		var convertedTime= _convertMilliSeconds(timeToDisplay);
		this.lightClockDisplay.addMessage(convertedTime);
		this.darkClockDisplay.addMessage(convertedTime);
		////console.log("displaying time: "+convertedTime);
	};
	this.updateOneClock=function(isLight,timeToDisplay,aiSide){
		if(timeToDisplay < 0) timeToDisplay=0;
		var convertedTime= _convertMilliSeconds(timeToDisplay);
		var clockObj= isLight ? this.lightClockDisplay : this.darkClockDisplay;
		clockObj.addMessage(convertedTime);
		////console.log("displaying time for: "+convertedTime);
	};
	this.reverseClocks= function(){
		var tempObj= this.lightClockDisplay;
		this.lightClockDisplay= this.darkClockDisplay;
		this.darkClockDisplay=tempObj;
	};
	
	this.setPlayerToMove=function(){
		this.lightClockDisplay.removeButtonStyle("playerToMove");
		this.darkClockDisplay.addButtonStyle("playerToMove");
	};
	this.switchPlayerToMove=function(){
		this.lightClockDisplay.toggleButtonStyle("playerToMove");
		this.darkClockDisplay.toggleButtonStyle("playerToMove");
	};
	
	this.createSquares= function(){
	  for(var i=0; i<_totalSquareNum; i++){
		//this.chessSquares.push(new ui.chessSquare(i,squareClass,_squareColors[i] ? darkSquares : lightSquares)); 
		this.chessSquaresIdx.push(i);
		this.chessSquares[i]= (new ui.chessSquare(i,squareClass,_squareColors[i] ? darkSquares : lightSquares)); 
		this.boardDiv.appendChild(this.chessSquares[i].squareDiv);
	  }
	};
	
	this.getSquareColour=function(squareID){
		return _squareColors[squareID] ? "Dark" : "Light";
	};
	this.toggleHighlight=function(squareID){
		this.changeSquareClass(squareID,"selectedSquare"+this.getSquareColour(squareID));
	};
	this.removeAllSelectedSquares=function(){
		jQuery(".selectedSquareLight").removeClass("selectedSquareLight");
		jQuery(".selectedSquareDark").removeClass("selectedSquareDark");
	};
	
	this.clearPieces=function(){
	  
	  for(var i=0; i<_totalSquareNum; i++){
	    if(this.chessSquares[i].hasPiece()){
		  this.chessSquares[i].removePiece();
		}
	  }
	}
    this.setPieces= function(piecePosConfig){
	  for(var squareID in piecePosConfig){
	    this.chessSquares[squareID].addPiece(new ui.chessPiece(piecePosConfig[squareID].color,piecePosConfig[squareID].pieceType,pieceClass));
	  }
    };
	this.resetPointers=function(){
		var boardName= "#"+this.boardDiv.id;

		$(boardName+" > div").find("div").removeClass("showPointer");
		$(boardName+" > div").has("img").find("div").addClass("showPointer");
	};
	this.restorePosition = function(piecePosConfig){
		this.clearPieces();
		this.setPieces(piecePosConfig);
		this.resetPointers();
	};
	
	this.changeSquareClass=function (squareID,className){
	  this.chessSquares[squareID].changeClass(className);
	}
	this.changePieceClass=function (squareID,className){
	  if (this.chessSquares[squareID].hasPiece){
	    this.chessSquares[squareID].chessPiece.changeClass(className);
	  }
	}
    this.addPiece=function(squareID,chessPiece){
	  if(this.chessSquares[squareID].hasPiece()){
	    this.removePiece(squareID);
	  }
	  this.chessSquares[squareID].addPiece(chessPiece);
	}
	this.removePiece=function(squareID){
	  return this.chessSquares[squareID].removePiece();
	}
	this.destroyBoard=function(){
		$("#"+boardID+" > div").remove();
	}
	this.reverseBoard=function(){
		this.destroyBoard();
		this.chessSquaresIdx.reverse();
		for(var i=0; i < this.chessSquaresIdx.length; i++){
			this.boardDiv.appendChild(this.chessSquares[this.chessSquaresIdx[i]].squareDiv);
		}
		this.reverseClocks();
		//ui.reverseNames();
	};
	this.reverseBoardNicely=function(){
		//under construction.  swap the squares instead of removing and appending them 
	};
	
	this.menuReset=function(){
		ui.menuReset();
	};
		
	this.initSoundPlayer=function(soundPlayer){
		this.soundPlayer= soundPlayer;
	};
	this.playSound= function(moveType){
		ui.playSound(this.soundPlayer,moveType);
	};
	
	

  };
  

  

  
  
}());