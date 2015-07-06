(function(){
  this.com = this.com || {};
  this.com.djkramnik= this.com.djkramnik || {};
  this.com.djkramnik.gameState= this.com.djkramnik.gameState || {};
  
  var gameState= this.com.djkramnik.gameState;
  
  var mailbox= 
  [
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
	 -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
	 -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
	 -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
	 -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
	 -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
	 -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
	 -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  ];

  var mailbox64 = 
  [
	21, 22, 23, 24, 25, 26, 27, 28,
	31, 32, 33, 34, 35, 36, 37, 38,
	41, 42, 43, 44, 45, 46, 47, 48,
	51, 52, 53, 54, 55, 56, 57, 58,
	61, 62, 63, 64, 65, 66, 67, 68,
	71, 72, 73, 74, 75, 76, 77, 78,
	81, 82, 83, 84, 85, 86, 87, 88,
	91, 92, 93, 94, 95, 96, 97, 98
  ];
  
  var pawnmoves=[10,20,9,11];
  var knightmoves=[-12,12,-19,19,8,-8,-21,21]; 
  var bishopmoves=[-9,9,-11,11];
  var rookmoves=[-1,1,10,-10];
  var kingmoves=[bishopmoves,rookmoves];
  
  var secondRank=[
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,
  0,0,0,0,0,0,0,0
];

var seventhRank=[
0,0,0,0,0,0,0,0,
1,1,1,1,1,1,1,1,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0
];
  
 var pawnOption=[secondRank,seventhRank]; 
  
  var _initPieces=
  [
    3,1,2,4,5,2,1,3,
	0,0,0,0,0,0,0,0,
	6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,
	0,0,0,0,0,0,0,0,
	3,1,2,4,5,2,1,3
  ];
  var _initColors=
  [
    1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,
    6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,
	6,6,6,6,6,6,6,6,	
	0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0
  ];
  
  var _initEnPassant = -1;
  var _initFiftyMoveCount = 0;
  var _initGameNumber = 0;
  var _initGameHistory = [];
  var _initGameIsOver = true; 
  var _initPlayerScore = 0;
  var _initKasparovScore = 0;
  var _initSideToPlay = 0;
  var _initEpFlag = false;
  var _initSpecialMove= 0;
  var _initMoveNum = 0;
  var _initDarkKing=4;
  var _initLightKing=60;
  
  var _idxToPieceName=
  [
    "pawn",
	"knight",
	"bishop",
	"rook",
	"queen",
	"king",
    "empty"
  ];
  var _idxToColorName=
  [
    "light",
    "dark"
  ];
  
  var _moveConverter = [
	"a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
	"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
	"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
	"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
	"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
	"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
	"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
	"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
  ];
  
  var _pieceConverter=
  ["","n","b","r","q","k"];
  
   
    
  function _createPiecePosConfig(colors,pieces){
    var piecePosConfig={};
	for(var i=0; i<colors.length; i++){
	  if(_idxToPieceName[colors[i]] != "empty"){
	    piecePosConfig[i]= 
		{
		  color: _idxToColorName[colors[i]],
		  pieceType: _idxToPieceName[pieces[i]]
		};
	  }
	}
    return piecePosConfig;
  }
  
  function _shallowClone(oldobj){
	var newobj= {};
	for(var key in oldobj){
		if(oldobj.hasOwnProperty(key)){
			newobj[key]=oldobj[key];
		}
	}
	return newobj;
  }
  
  function _convertMask(castleMaskObj){
	var cm=15;
	
	(!castleMaskObj.lightKingSide) && (cm ^= 1);
	(!castleMaskObj.lightQueenSide) && (cm ^= 2);
	(!castleMaskObj.darkKingSide) && (cm ^= 4);
	(!castleMaskObj.darkQueenSide) && (cm ^= 8);
	
	return cm;
  }
  
  
  gameState.stringifyBoard= function stringifyBoard(colors,pieces){
		var theFullBoard="";
		for(var i=0; i<64; i++){
			switch(pieces[i]){
				case 0:
					theFullBoard+= colors[i] ? "P" : "p";
					break;
				case 1:
					theFullBoard+= colors[i] ? "N" : "n";
					break;
				case 2:
					theFullBoard+= colors[i] ? "B" : "b";
					break;
				case 3:
					theFullBoard+= colors[i] ? "R" : "r";
					break;
				case 4:
					theFullBoard+= colors[i] ? "Q" : "q";
					break;
				case 5:
					theFullBoard+= colors[i] ? "K" : "k";
					break;
				case 6:
					theFullBoard+= "e";
					break;
			}
		}
		return theFullBoard;
  }
  
    gameState.callAI= function callAI(board,ep,cm,tp,callBack){
	
	var soapHeader = '<?xml version="1.0" encoding="utf-8"?>';
	soapHeader += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    soapHeader += "<soap:Body><ChessicMove xmlns='http://tempuri.org/'><s>"+board+"</s><ep>"+ep+"</ep><cm>"+cm+"</cm><tp>"+tp+"</tp><mp>5</mp><ro>1</ro></ChessicMove></soap:Body></soap:Envelope>";
	//the url of Webservice
	var postUrl = 'http://localhost/MasterBot/Service1.asmx';
    var soapActionUrl = 'http://tempuri.org/ChessicMove';
    
	$.ajax({
		url:postUrl,
		type:"POST",
		datatype:"xml",
		data:soapHeader,
		complete:callBack,
		contentType:"text/xml; charset=utf-8"
	});
	  
  }
  
  
  
  gameState.callAI2= function callAI(board,ep,cm,tp,callBack){

	var soapHeader = '<?xml version="1.0" encoding="utf-8"?>';
	soapHeader += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    soapHeader += "<soap:Body><ChessicMove xmlns='http://tempuri.org/'><s>"+board+"</s><ep>"+ep+"</ep><cm>"+cm+"</cm><tp>"+tp+"</tp><mp>5</mp><ro>1</ro></ChessicMove></soap:Body></soap:Envelope>";
	//the url of Webservice
	var postUrl = 'http://localhost/MasterBot/Service1.asmx';
    var soapActionUrl = 'http://tempuri.org/ChessicMove';
    var xmlhttp = null;

	
    try {
		xmlhttp = new XMLHttpRequest();

	}catch (e) {xmlhttp = false; }
	  
	if( xmlhttp ){

		xmlhttp.open ('POST', postUrl, true);
		xmlhttp.onreadystatechange = function(){
			if( xmlhttp.readyState == 4 ){
				callBack(xmlhttp.responseText);
			}
		};
	}

	xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
	xmlhttp.setRequestHeader("Host", "localhost");
	xmlhttp.setRequestHeader("SOAPAction", soapActionUrl); 
	xmlhttp.setRequestHeader("Content-Length", soapHeader.length );
		
	xmlhttp.send(soapHeader);
	  
  }
  
  
  
  
  gameState.moveCommand= function moveCommand(cmdType, moveFrom, moveTo,pieceType){
	this.cmdType= cmdType;
	this.moveFrom= moveFrom;
	this.moveTo= moveTo;
	this.pieceType= pieceType;
  }
  gameState.castleMaskType= function castleMaskType(){
	this.lightKingSide=true;
	this.lightQueenSide=true;
	this.darkKingSide=true;
	this.darkQueenSide=true;
  };
  
   
  gameState.moveHistory = function moveHistory(gameState){
	
	this.colors=  gameState.colors.slice();
	this.pieces=  gameState.pieces.slice();
	this.enPassant = gameState.enPassant;
	this.fiftyMoveCount = gameState.fiftyMoveCount;
	this.castleMask = _shallowClone(gameState.castleMask);
	this.sideToPlay = gameState.sideToPlay;
	this.epFlag = gameState.epFlag;
	this.specialMove = 0;
	this.darkKing = gameState.darkKing;
	this.lightKing= gameState.lightKing;
	
	this.restoreGameState= function (gameState){
		gameState.colors= this.colors.slice();
		gameState.pieces= this.pieces.slice();
		gameState.enPassant= this.enPassant;
		gameState.fiftyMoveCount= this.fiftyMoveCount;
		gameState.castleMask= _shallowClone(this.castleMask);
		gameState.sideToPlay= this.sideToPlay;
		gameState.epFlag= this.epFlag;
		gameState.specialMove= 0;
		gameState.darkKing= this.darkKing;
		gameState.lightKing= this.lightKing;
	};
  
  };	
  
  gameState.gameModel= function gameModel(maxTime){
		
	this.isLegalMove = function(moveFrom, moveTo){
		
		var legal= false;
		if(moveFrom < 0 || moveTo < 0 || moveFrom >= this.colors.length || moveTo >= this.colors.length || moveTo==moveFrom){
			return false;
		}	  
		if(this.colors[moveFrom]==this.sideToPlay){
			var piece= this.pieces[moveFrom];
			switch(piece){
				case 0:
					legal=this.pawn(moveFrom, moveTo);
					break;
				case 1:
					legal=this.knight(moveFrom, moveTo);
					break;
				case 2:
					legal=this.bishop(moveFrom, moveTo);
					break;
				case 3:
					legal=this.rook(moveFrom, moveTo);
					break;
				case 4:
					legal=this.queen(moveFrom, moveTo);
					break;
				case 5:
					legal=this.king(moveFrom, moveTo);
					break;
			}
		}

		return (this.gameIsOver || legal);
	};
	
	//this should also update an entry in game history 
	this.updateGameState = function(moveFrom, moveTo, isAI){
		
		var moveUpdateList = [];
		moveUpdateList.moveType="normal";
		
		//update castle masks
		this.updateCastleMask(moveFrom,moveTo);
		this.updateFiftyMove(moveFrom,moveTo);
		this.updateKingPositions(moveFrom,moveTo);
		//make the changes- copy this dude 
		
		
		//check for captures here 
		if(this.colors[moveTo] != 6)
			moveUpdateList.moveType="capture";
		
		this.colors[moveTo]=this.colors[moveFrom];
		this.colors[moveFrom]=6;
		this.pieces[moveTo]=this.pieces[moveFrom];
		this.pieces[moveFrom]=6;
		
		
		
		//special moves, add to extra moves that need to be updated beyond the usual  
		switch(this.specialMove){
			case 3:
				var pawnToCapture = moveTo-(8*(this.sideToPlay? 1:-1));
				this.updateEnPassant(moveTo,pawnToCapture);
				moveUpdateList.push(new gameState.moveCommand("remove",null,pawnToCapture));
				break;
			case 4:
			case 5:
			case 6:
			case 7:
				var castleUpdateSquares= this.updateCastleMove(this.specialMove);
				moveUpdateList.push(new gameState.moveCommand("move",castleUpdateSquares.emptySquare,castleUpdateSquares.rookSquare));
				moveUpdateList.moveType= "castle";
				break;
			case 8:
				this.promotePiece(moveTo,4);
				moveUpdateList.push(new gameState.moveCommand("promote",null,moveTo,_idxToPieceName[4]));
				moveUpdateList.moveType="promote";
				break;
		}
		
		//is the move a check 
		if(!this.gameIsOver && this.anyAttacks(this.sideToPlay ? this.lightKing : this.darkKing)){
			moveUpdateList.moveType="check";
		}
		
		if(!this.epFlag) this.enPassant = _initEnPassant;
		this.sideToPlay ^=1;
		this.specialMove=0;
		this.epFlag=false;

		// check if okay 
		//if not okay restore and return null
		//if ok return an array of updates that were made  
		
		if(!this.gameIsOver && !isAI && this.anyAttacks(this.sideToPlay ? this.lightKing : this.darkKing)){
			this.gameHistory[this.moveNum].restoreGameState(this);
			return false;
		}
		
		
		
		
		
		this.moveNum++;
		//update game history 	
		this.gameHistory[this.moveNum] = new gameState.moveHistory(this);
		this.moveHistory[this.moveNum]= {from:moveFrom, to:moveTo};
		//this.timeRef= new Date().getTime();
		return moveUpdateList;
		
	};
	this.lastMove=function(){
		return this.moveHistory[this.moveNum-1];
	};
	this.initGameStart= function(){
		this.colors=  _initColors;
		this.pieces=  _initPieces; 
		this.piecePosConfig= _createPiecePosConfig(this.colors,this.pieces);
		this.enPassant = _initEnPassant;
		this.fiftyMoveCount = _initFiftyMoveCount;
		this.castleMask = new gameState.castleMaskType(); 
		this.gameIsOver = _initGameIsOver;
		this.gameHistory = _initGameHistory;		
		this.sideToPlay = _initSideToPlay;
		this.epFlag = _initEpFlag;
		this.specialMove = _initSpecialMove;
		this.darkKing = _initDarkKing;
		this.lightKing= _initLightKing;
		this.moveNum = _initMoveNum;
		this.gameHistory[0] = new gameState.moveHistory(this);
		this.moveHistory=[];
		this.lightTime= maxTime;
		this.darkTime= maxTime;
		this.timeRef= "";
	};
	
	this.pawn=function(moveFrom, moveTo){
		var direction= (this.sideToPlay==0 ? -1 : 1);
		var validMove;
		for(var offset in pawnmoves){
			validMove=mailbox[mailbox64[moveFrom]+pawnmoves[offset]*direction];
			if(moveTo==validMove){
				if(pawnmoves[offset]== 10){ 
					var ok=(this.colors[validMove]==6);
					ok && (this.sideToPlay ? secondRank[moveFrom] : seventhRank[moveFrom]) && (this.specialMove=8);
					return ok; 
				} 
				if(pawnmoves[offset]==20){ 
					var ok= (pawnOption[this.sideToPlay][moveFrom] && this.colors[validMove]==6 && this.colors[validMove-(8*direction)]==6);  
					ok && (this.enPassant=(validMove-(8*direction)));
					this.epFlag=true;
					return ok;
				}
				if(pawnmoves[offset]==9 || pawnmoves[offset]==11){ 
					var ok= ((this.colors[validMove] !=6 && this.colors[validMove] != this.sideToPlay) || validMove==this.enPassant);
					ok && (validMove==this.enPassant) && (this.specialMove=3);
					ok && (this.sideToPlay ? secondRank[moveFrom] : seventhRank[moveFrom]) && (this.specialMove=8);
					return ok;
				}
			}
		}
		return false;  
	};
	
	this.knight=function(moveFrom, moveTo){
	    for(var offset in knightmoves){
			var validMove=mailbox[mailbox64[moveFrom]+knightmoves[offset]];
			if(moveTo==validMove){
				return (this.colors[moveTo]!= this.sideToPlay);
			}
		}
		return false;
	};
	
	this.bishop=function(moveFrom, moveTo){
	    var steps;
		var validMove;
		for(var offset in bishopmoves){
			steps=1;
			while((validMove=mailbox[mailbox64[moveFrom]+bishopmoves[offset]*steps++]) != -1){
				if(moveTo==validMove){
					return (this.colors[validMove] != this.sideToPlay);
				}
				if(this.colors[validMove] !=6) break;
			}
		}
		return false;
	};
	
	this.rook=function(moveFrom, moveTo){
	    var steps;
		var validMove;
		for(var offset in rookmoves){
			steps=1;
			while((validMove=mailbox[mailbox64[moveFrom]+rookmoves[offset]*steps++]) != -1){
				if(moveTo==validMove){
					return (this.colors[validMove] != this.sideToPlay);
				}
				if(this.colors[validMove] !=6) break;
			}
		}
		return false;
	};
	
	this.queen=function(moveFrom, moveTo){
	  return (this.rook(moveFrom,moveTo) || this.bishop(moveFrom, moveTo));
	};
	
	
	this.king= function(moveFrom,moveTo){
		var validMove;
		for(var i=0; i<2; i++){
			for(var offset in kingmoves[i]){
				validMove=mailbox[mailbox64[moveFrom]+kingmoves[i][offset]];
				if(moveTo==validMove){ 
					return (this.colors[moveTo] != this.sideToPlay);
				}
			}
		}

		//castle possibilities 
		if(!this.sideToPlay && moveFrom==60 && moveTo==62 && this.castleMask.lightKingSide 
			&& this.colors[62]==6 && this.colors[61]==6 && this.pieces[63]==3 && this.colors[63]==0){//white kingside
			this.specialMove=4;
			// have to use anyAttack here on squares 60 and 61 
			this.sideToPlay ^=1;
			if (this.anyAttacks(60) || this.anyAttacks(61) || (this.colors[52]==1 && this.pieces[52]==0)){ this.sideToPlay ^=1; return false;}
			//or if there is a black pawn on 52
			this.sideToPlay ^=1;
			return true;
		}
		if(!this.sideToPlay && moveFrom==60 && moveTo==58 && this.castleMask.lightQueenSide
		&& this.colors[59]==6 && this.colors[58]==6 && this.colors[57]==6 && this.pieces[56]==3 && this.colors[56]==0){//white queenside
			this.specialMove=5;
			this.sideToPlay ^=1;
			if(this.anyAttacks(60) || this.anyAttacks(59) || (this.colors[52]==1 && this.pieces[52]==0)){  this.sideToPlay ^=1; return false;}
			this.sideToPlay ^=1;
			return true;
		}
		if(this.sideToPlay && moveFrom==4 && moveTo==6 && this.castleMask.darkKingSide
		&& this.colors[5]==6 && this.colors[6]==6 && this.pieces[7]==3 && this.colors[7]==1){//black kingside
			this.specialMove=6; 
			this.sideToPlay ^=1;
			if(this.anyAttacks(4) || this.anyAttacks(5) || (this.colors[12]==0 && this.pieces[12]==0)){ this.sideToPlay ^=1; return false;}
			this.sideToPlay ^=1;	
			return true;
		}
		if(this.sideToPlay && moveFrom==4 && moveTo==2 && this.castleMask.darkQueenSide
		&& this.colors[1]==6 && this.colors[2]==6 && this.colors[3]==6 && this.pieces[0]==3 && this.colors[0]==1){//black queenside
			this.specialMove=7;
			this.sideToPlay ^=1;
			if(this.anyAttacks(4) || this.anyAttacks(3) || (this.colors[12]==0 && this.pieces[12]==0)){ this.sideToPlay ^=1; return false;}
			this.sideToPlay ^=1;
			return true;
		}
		return false;
	};
	
	this.anyAttacks=function(squareNum){
		for(var i=0; i<this.colors.length; i++){
			if(this.colors[i]==this.sideToPlay){
				if(this.isLegalMove(i,squareNum)) return true;
			}
		}
		return false;
	};
	
	this.updateCastleMask=function(moveFrom, moveTo){
	    
		if(this.pieces[moveFrom]==5){
			if(this.colors[moveFrom]){
				this.castleMask.darkKingSide=false;
				this.castleMask.darkQueenSide=false;
				
			}
			else if(!this.colors[moveFrom]){
				this.castleMask.lightKingSide=false;
				this.castleMask.lightQueenSide=false;
			}
		}	
		if(moveFrom==63 || moveTo==63){
			this.castleMask.lightKingSide=false; 
		}
		if(moveFrom==56 || moveTo==56){
			this.castleMask.lightQueenSide=false; 
		}
		if(moveFrom==7 || moveTo==7){
			this.castleMask.darkKingSide=false;
		}
		if(moveFrom==0 || moveTo==0){
			this.castleMask.darkQueenSide=false;
		}
		
	};
	this.updateFiftyMove=function(moveFrom,moveTo){
		if(this.pieces[moveTo] != 6 || this.pieces[moveFrom]==0){ 
			this.fiftyMoveCount=0;
		}
		else{
			this.fiftyMoveCount++;
		}
	}
	this.updateKingPositions=function(moveFrom,moveTo){
		if(this.pieces[moveFrom]==5){
			if(this.sideToPlay) 
				this.darkKing=moveTo; 
			else 
				this.lightKing=moveTo;
		}
	}
	this.updateCastleMove=function(specialMove){
		var emptySquare=null,
			rookSquare=null,
			rookColor=null;
		switch(specialMove){
			case 4:
				emptySquare=63;
				rookSquare=61;
				rookColor=0;
				break;
			case 5:
				emptySquare=56;
				rookSquare=59;
				rookColor=0;
				break;
			case 6:
				emptySquare=7;
				rookSquare=5;
				rookColor=1;
				break;
			case 7:
				emptySquare=0;
				rookSquare=3;
				rookColor=1;
				break;
		}
		if(emptySquare != null){
			this.pieces[emptySquare]=6;
			this.colors[emptySquare]=6;
			this.pieces[rookSquare]=3;
			this.colors[rookSquare]=rookColor;
			return {
				emptySquare:emptySquare,
				rookSquare:rookSquare
			};
		}
	};
	this.promotePiece= function(moveTo,pieceType){
		this.pieces[moveTo]=pieceType;
	};
	this.updateEnPassant=function(moveTo,pawnToCapture){
	  this.colors[pawnToCapture]=6;
	  this.pieces[pawnToCapture]=6;
	};
	this.callForAI=function(callBack){
		if(!this.gameIsOver)
			gameState.callAI(gameState.stringifyBoard(this.colors,this.pieces),this.enPassant,_convertMask(this.castleMask), this.sideToPlay , callBack);
	};
	this.restoreGameAtMoveNum = function(moveNum){
		
		this.gameHistory[moveNum].restoreGameState(this);
		this.moveNum= moveNum;
		return _createPiecePosConfig(this.colors,this.pieces);
		return _createPiecePosConfig(this.colors,this.pieces);
	};
	this.resetTime= function(maxTime){
		
		this.lightTime=maxTime;
		this.darkTime=maxTime;
		//alert(this.lightTime);
		return maxTime;
	};
	this.decrementDark=function(){
		
		//get current datetime 
		var timeNow= new Date().getTime();
		
		//if time reference is not set do so 
		if(this.timeRef == ""){
			this.timeRef= timeNow;
		}
		else{
		//this.darkTime-=100;
			this.darkTime -= (timeNow - this.timeRef);
			this.timeRef= timeNow;
		}
		return this.darkTime;
	};
	this.decrementLight=function(){
		
		var timeNow= new Date().getTime();
		
		//if time reference is not set do so 
		if(this.timeRef ==""){
			this.timeRef= timeNow;
		}
		else{

			this.lightTime -= (timeNow - this.timeRef);
			this.timeRef= timeNow;

		}
		return this.lightTime;
	};
	this.stopClock=function(){
		this.timeRef="";
	};
	this.moveConverter=function(squareNum){
		//return _pieceConverter[this.pieces[squareNum]]+_moveConverter[squareNum];
		return _moveConverter[squareNum];
	}
	this.reverseMoveConverter = function(notation){
		return _moveConverter.indexOf(notation);
	}
	
	this.gameNumber = _initGameNumber;
	this.playerScore = _initPlayerScore;
	this.kasparovScore = _initKasparovScore; 
	this.initGameStart();

  };

  
  

}());