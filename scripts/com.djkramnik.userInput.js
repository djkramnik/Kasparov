(function (){
  
  this.com = this.com || {};
  this.com.djkramnik= this.com.djkramnik || {};
  this.com.djkramnik.userInput= this.com.djkramnik.userInput || {};
  
  var userInput= this.com.djkramnik.userInput;
  
  var _emptySpace=-1;
  var _airSpace;
  var _holdingPiece=false; 
  var _moveFrom;
  var _moveTo; 
  var _cursorX;
  var _cursorY;
  var _flyingPiece;
  var _aiTurn=1;
  var _aiScore=0;
  var _huScore=0;
  var _msInMinutes = 60000;
  var _msInSecond = 1000;
  var _initGameTime= 10 * _msInMinutes;
  var _clockIsStarted;
  var _boardOrientation=0;
  
    
  userInput.chessBoard;  
  userInput.gameState; 
  userInput.gameTime=_initGameTime;
  userInput.optionConfig;
  userInput.kasparov;
  
  document.onmousedown=function(e){
    if(e.target.name !== undefined){
		return false;
	}
  } 
  document.onmousemove=function(e){
	_cursorX= e.pageX;
	_cursorY= e.pageY;
	if(_holdingPiece){
      adhereToCursor();
    }
  }
  document.onmouseup=function(e){
    
	if(_holdingPiece){
	  var dirtyTricks=false;
	  if((!userInput.gameState.gameIsOver) && userInput.gameState.sideToPlay == _aiTurn){
		dirtyTricks=true;
		////console.log("dirty tricks... under the table");
	  }
	  
	  _holdingPiece=false;
	  _moveTo=_airSpace;

	  //determine if legal.  if yes, gamestate will update.  if no, set _moveTo to original square 
		var promoteMove=false;
		if(!dirtyTricks && userInput.gameState.isLegalMove(_moveFrom,_moveTo)){
			var updateMoves = userInput.gameState.updateGameState(_moveFrom,_moveTo);
			if(updateMoves){
				for(var i=0; i<updateMoves.length; i++){
					switch(updateMoves[i].cmdType){
						case "move":
							movePiece(updateMoves[i].moveFrom,updateMoves[i].moveTo);
							break;
						case "remove":
							removePiece(updateMoves[i].moveTo);
							break;
						case "promote":
							promoteMove= updateMoves[i];
							break;
					}
				}
				if(!userInput.gameState.gameIsOver){
					
					MakeMove(GetMoveFromString
					(userInput.gameState.moveConverter(_moveFrom) 
					+ userInput.gameState.moveConverter(_moveTo)
					+ (promoteMove ? "q" : "")
					));
				
				}
				userInput.chessBoard.playSound(updateMoves.moveType);
				
				var lastMove= userInput.gameState.lastMove();
				if(lastMove){
					userInput.chessBoard.toggleHighlight(lastMove.from);
					userInput.chessBoard.toggleHighlight(lastMove.to);
				}
				
				if(userInput.gameState.sideToPlay == _aiTurn){
					setTimeout(function(){Search(FinishAIMove,99,null);},1000);
					//userInput.gameState.callForAI(handleAjaxResponse);
			
				}
			}
			else{
				_moveTo = _moveFrom;
				userInput.chessBoard.toggleHighlight(_moveFrom);
				
			}
		}	  
		else{
			userInput.gameState.specialMove=0;
			_moveTo = _moveFrom;
			userInput.chessBoard.toggleHighlight(_moveFrom);
		}
	  _flyingPiece.changeClass("flyingPiece");
	  _flyingPiece.pieceImg.style.width="100%";
	  _flyingPiece.pieceImg.style.height="100%";
	  userInput.chessBoard.addPiece(_moveTo,_flyingPiece);
	  userInput.chessBoard.chessSquares[_moveTo].innerDiv.classList.toggle("showPointer");
	  if(updateMoves){
		userInput.chessBoard.toggleHighlight(_moveTo);
		userInput.chessBoard.switchPlayerToMove();
	  }
 	  cheatCursorTech(false);
	  if(promoteMove){
		promotePiece(promoteMove.moveTo, promoteMove.pieceType);
	  }
    }
  }
  function handleAIResponse(response){

  }
  
  function putThatCookieDown(moveFrom,moveTo){
	if(_holdingPiece && (_moveFrom == moveFrom || _moveFrom == moveTo)){
		_holdingPiece=false;
		_moveTo=_moveFrom;
		_flyingPiece.changeClass("flyingPiece");
		_flyingPiece.pieceImg.style.width="100%";
		_flyingPiece.pieceImg.style.height="100%";
		userInput.chessBoard.addPiece(_moveTo,_flyingPiece);
		userInput.chessBoard.chessSquares[_moveTo].innerDiv.classList.toggle("showPointer");
		cheatCursorTech(false);
	}
  }
  
  function FinishAIMove(bestMove, value){
	
	console.log("value: "+value);
	if(userInput.gameState.gameIsOver) {
		return ;
	}
	if(!bestMove){
		userInput.resignGame(); 
		return;
	}
	else if(value > 190000){
		userInput.gameState.sideToPlay ^= 1;
		userInput.resignGame();
	}

		
	var moveObj={},
	promoteMove=false,
	queenCaptured=false,
	moveFormat = FormatMove(bestMove); 
	moveObj.posGrade= generatePosGrade(value); 
	console.log("grade: "+ moveObj.posGrade); 

	moveObj.moveFrom = userInput.gameState.reverseMoveConverter(moveFormat.substring(0,2)); 
	moveObj.moveTo = userInput.gameState.reverseMoveConverter(moveFormat.substring(2,moveFormat.length)); 
  
	MakeMove(bestMove);
	if(userInput.gameState.pieces[moveObj.moveTo] == 4){
		queenCaptured=true;
	}

	
	//err handle 1 
	
	if(userInput.gameState.isLegalMove(moveObj.moveFrom,moveObj.moveTo)){
		var updateMoves = userInput.gameState.updateGameState(moveObj.moveFrom,moveObj.moveTo);
		if(updateMoves){
			for(var i=0; i<updateMoves.length; i++){
				switch(updateMoves[i].cmdType){
					case "move":
						movePiece(updateMoves[i].moveFrom,updateMoves[i].moveTo);
						break;
					case "remove":
						removePiece(updateMoves[i].moveTo);
						break;
					case "promote":
						promoteMove= updateMoves[i];
						break;
				}
				putThatCookieDown(updateMoves[i].moveFrom,updateMoves[i].moveTo);
			}				
			userInput.chessBoard.playSound(updateMoves.moveType);
		}
		putThatCookieDown(moveObj.moveFrom,moveObj.moveTo);
		userInput.chessBoard.chessSquares[moveObj.moveTo].innerDiv.classList.toggle("showPointer");
		movePiece(moveObj.moveFrom,moveObj.moveTo);
		
		if(!moveObj.endGameStatus)
			kasparov.reactToPosition(moveObj.posGrade,userInput.gameState.moveConverter(moveObj.moveTo),queenCaptured,promoteMove);
		
		if(promoteMove){
			promotePiece(promoteMove.moveTo, promoteMove.pieceType);
		}
		var lastMove= userInput.gameState.lastMove();
		if(lastMove){
			userInput.chessBoard.toggleHighlight(lastMove.from);
			userInput.chessBoard.toggleHighlight(lastMove.to);
		}
		
		userInput.chessBoard.toggleHighlight(moveObj.moveFrom);
		userInput.chessBoard.toggleHighlight(moveObj.moveTo);
		userInput.chessBoard.switchPlayerToMove();
		
	}
  
  
  }
  
  function handleAjaxResponse(xmlHttpRequest,status){
	
	////console.log(xmlHttpRequest);
	//put that cookie down, NOW!
	if(userInput.gameState.gameIsOver) {
		return ;
	}

	var moveObj={},
		promoteMove=false,
		queenCaptured=false;
		
	parseAIMove($(xmlHttpRequest.responseXML).text(),moveObj);
	
	
	
	if(isNaN(moveObj.endGameStatus)){
		////console.log("ajax call failed");
		userInput.resignGame();
		return;
	}
	
	//check if the game has ended 
	if(moveObj.endGameStatus != 0){
		if(moveObj.endGameStatus ==1){
			//draw game 
			userInput.drawGame();
			return;
		}
		else if(moveObj.endGameStatus == (_aiTurn+2)){
			//kasparov wins.  switch turn and then call resign 
			userInput.gameState.sideToPlay ^=1;
			userInput.resignGame();
		}
		else{
			//kasparov loses.  call resign immediately 
			userInput.resignGame();
			return;
		}
		
	}
	
	if(userInput.gameState.pieces[moveObj.moveTo] == 4){
		queenCaptured=true;
	}

	
	//err handle 1 
	
	if(userInput.gameState.isLegalMove(moveObj.moveFrom,moveObj.moveTo)){
		var updateMoves = userInput.gameState.updateGameState(moveObj.moveFrom,moveObj.moveTo);
		if(updateMoves){
			for(var i=0; i<updateMoves.length; i++){
				switch(updateMoves[i].cmdType){
					case "move":
						movePiece(updateMoves[i].moveFrom,updateMoves[i].moveTo);
						break;
					case "remove":
						removePiece(updateMoves[i].moveTo);
						break;
					case "promote":
						promoteMove= updateMoves[i];
						break;
				}
				putThatCookieDown(updateMoves[i].moveFrom,updateMoves[i].moveTo);
			}				
			userInput.chessBoard.playSound(updateMoves.moveType);
		}
		putThatCookieDown(moveObj.moveFrom,moveObj.moveTo);
		userInput.chessBoard.chessSquares[moveObj.moveTo].innerDiv.classList.toggle("showPointer");
		movePiece(moveObj.moveFrom,moveObj.moveTo);
		
		if(!moveObj.endGameStatus)
			kasparov.reactToPosition(moveObj.posGrade,userInput.gameState.moveConverter(moveObj.moveTo),queenCaptured,promoteMove);
		
		if(promoteMove){
			promotePiece(promoteMove.moveTo, promoteMove.pieceType);
		}
		var lastMove= userInput.gameState.lastMove();
		if(lastMove){
			userInput.chessBoard.toggleHighlight(lastMove.from);
			userInput.chessBoard.toggleHighlight(lastMove.to);
		}
		
		userInput.chessBoard.toggleHighlight(moveObj.moveFrom);
		userInput.chessBoard.toggleHighlight(moveObj.moveTo);
		userInput.chessBoard.switchPlayerToMove();
		
	}
	//err handle 2 	
  }
  function parseAIMove(aiMoveText,moveObj){ 
	////console.log("aimove: "+aiMoveText);
	moveObj.moveFrom = parseInt(aiMoveText.substring(0,aiMoveText.indexOf("-")),10);
	moveObj.moveTo = parseInt(aiMoveText.substring(aiMoveText.indexOf("-")+1,aiMoveText.indexOf(":")),10);	
	moveObj.endGameStatus = parseInt(aiMoveText.substring(aiMoveText.indexOf("$")+1,aiMoveText.indexOf("@")),10);
	moveObj.posGrade= aiMoveText.substring(aiMoveText.indexOf("@")+1);
	
  }
  
  function generatePosGrade(value){
	if(value > 9000) return "B"; 
	else if(value > 5000) return "C"; 
	else if(value > 3000) return "D"; 
	else if(value > 1500) return "E"; 
	else if(value > 600) return "F"; 
	else if (value < -600) return "H";
	else if(value < -1500) return "I"; 
	else if(value < -3000) return "J"; 
	else if(value < -5000) return "K"; 
	else if(value < -9000) return "L"; 
	else return "G";
  }
  
  function pickUpPiece(squareID){
	
	var offsetHeight= userInput.chessBoard.chessSquares[squareID].chessPiece.pieceImg.offsetHeight; 
	
	_flyingPiece= userInput.chessBoard.removePiece(squareID);
	if(!_flyingPiece) return;
	_flyingPiece.changeClass("flyingPiece");
	_flyingPiece.pieceImg.style.width= 
	_flyingPiece.pieceImg.style.height= offsetHeight + "px";
	userInput.chessBoard.chessSquares[squareID].innerDiv.classList.toggle("showPointer");
	
	//userInput.chessBoard.chessSquares[squareID].changeClass("selectedSquare"+squareColour);
	userInput.chessBoard.toggleHighlight(squareID);
	
	_moveFrom=squareID;
	document.body.appendChild(_flyingPiece.pieceImg);
	_holdingPiece=true;
	adhereToCursor();
	cheatCursorTech(true);
	////console.log("pick up " + squareID);
  }
  
  function adhereToCursor(){  
    if(!_flyingPiece || !_flyingPiece.pieceImg) return;
	_flyingPiece.pieceImg.style.left=_cursorX-Math.floor(_flyingPiece.pieceImg.offsetWidth/2)+"px";
    _flyingPiece.pieceImg.style.top=_cursorY-Math.floor(_flyingPiece.pieceImg.offsetHeight/2)+"px";    
  }
  
  function cheatCursorTech(notEvenTurnOn){
    if(notEvenTurnOn){
	  document.body.classList.add("showPointer");
	}
	else{
	  document.body.classList.remove("showPointer");
	}
  }
  
  function promotePiece(squareID,pieceType){
	userInput.chessBoard.chessSquares[squareID].promotePiece(pieceType);
  }
  function removePiece(squareID){
	userInput.chessBoard.chessSquares[squareID].removePiece();
  }
  function movePiece(moveFrom,moveTo){
	userInput.chessBoard.addPiece(moveTo,userInput.chessBoard.removePiece(moveFrom));
  }
  

  
  userInput.createMappedSquares= function(boardName){
  	var boardName= "#"+boardName;

	$(boardName+" > div > div").each(function(idx){
	  this.name=idx;
	  this.classList.add("mappedSquareClass");
	});
	
	$(boardName+" > div").has("img").find("div").addClass("showPointer");
	$(boardName).on("mouseover",function(e){
	  if(e && e.target){
	    
		_airSpace= e.target.name; 
		
		//document.getElementById("testMsg").innerHTML= _airSpace;
	  }
	});
	$(boardName).on("mouseout",function(e){
	  _airSpace= _emptySpace;

	});
	$(boardName).on("mousedown",function(e){ 
	  if(e && e.target){
	    pickUpPiece(e.target.name);
	  }
	});
  };
  
  userInput.setOptions=function(){
	var prevAITurn= _aiTurn;
	_aiTurn = userInput.optionsConfig.updateOptionGroup("playerColor");
	_aiTurn = (_aiTurn==2 ? (prevAITurn ^ 1) : (_aiTurn ^ 1));
	
	userInput.gameTime = userInput.optionsConfig.updateOptionGroup("maxTime") * _msInMinutes;
  };
  userInput.beginGame=function(){
	
	ResetGame();
	//check options and update aiturn and gametime
	userInput.setOptions();
	
	userInput.chessBoard.restorePosition(userInput.gameState.restoreGameAtMoveNum(0));
	userInput.gameState.gameIsOver=false;
	userInput.kasparov.playEventSound("start");
	userInput.kasparov.showEventPic("start");
	userInput.gameState.resetTime(userInput.gameTime);
	userInput.chessBoard.displayTime(userInput.gameTime);
	
	
	if(_aiTurn == _boardOrientation){
		userInput.reverseBoard();
	}
	userInput.startClocks();
	if(userInput.gameState.sideToPlay == _aiTurn){
		Search(FinishAIMove,99,null); 
		//userInput.gameState.callForAI(handleAjaxResponse);
		////console.log(userInput.gameState.moveNum);
	}
	userInput.chessBoard.setPlayerToMove();
	userInput.chessBoard.removeAllSelectedSquares();
	
	////console.log("gameover: "+userInput.gameState.gameIsOver);
  };
  
  userInput.resignClick=function(){
	if(userInput.gameState.sideToPlay == _aiTurn){
		//dirty tricks event
	}
	else{
		userInput.resignGame();
	}
  };
  
  userInput.resignGame=function(){
	if(userInput.gameState.sideToPlay == _aiTurn){
		userInput.gameState.playerScore++;
		kasparov.adjustEgo(false);
		kasparov.playEventSound("loss");
		kasparov.showEventPic("loss");
		kasparov.showMoodCaption("loss");
		kasparov.adjustEgoMetre(-10);
		kasparov.adjustRageMetre(10);
		
	}
	else{
		userInput.gameState.kasparovScore++;
		kasparov.adjustEgo(true);
		kasparov.playEventSound("win");
		kasparov.showEventPic("win");
		kasparov.showMoodCaption("win");
		kasparov.adjustEgoMetre(10);
		kasparov.adjustRageMetre(-10);
	}
	userInput.gameState.gameIsOver=true;
	userInput.chessBoard.scoreBoard.addMessage("--Score--<br />Kasparov: "+userInput.gameState.kasparovScore+" Player: "+userInput.gameState.playerScore);
	userInput.stopClocks();
	userInput.chessBoard.menuReset();
	////console.log("gameover: "+userInput.gameState.gameIsOver);
	////console.log("playerscore:"+userInput.gameState.playerScore);
	////console.log("kmanscore:"+userInput.gameState.kasparovScore);
  };
  userInput.drawGame= function(){
	userInput.kasparov.playEventSound("drawDecline"); 
	return;
	
	//for another day
	
	userInput.gameState.playerScore += 0.5;
	userInput.gameState.kasparovScore += 0.5;
	userInput.gameState.gameIsOver=true;
	userInput.chessBoard.scoreBoard.addMessage("--Score--<br />Kasparov: "+userInput.gameState.kasparovScore+" Player: "+userInput.gameState.playerScore);
	userInput.stopClocks();
	userInput.chessBoard.menuReset();
	
	////console.log("gameover: "+userInput.gameState.gameIsOver);
	////console.log("playerscore:"+userInput.gameState.playerScore);
	////console.log("kmanscore:"+userInput.gameState.kasparovScore);
  };
  userInput.restorePositionAt=function(posIdx){
    
	if (posIdx >= 0){
			userInput.chessBoard.restorePosition(userInput.gameState.restoreGameAtMoveNum(posIdx));
			return true;
	}
	return false;
  };
  userInput.takeBack=function(stepsBack){
	
	userInput.restorePositionAt(userInput.gameState.moveNum - stepsBack) ;
	////console.log("rollback to:" + userInput.gameState.moveNum);
  };
  userInput.reverseBoard=function(){
	userInput.chessBoard.reverseBoard();
	_boardOrientation ^= 1;
	////console.log("switching teams:" + _boardOrientation);
  };
  
  userInput.startClocks=function(){
	_clockIsStarted= setInterval(userInput.clockCheck,200);
  };
  
  userInput.stopClocks=function(){
	clearInterval(_clockIsStarted);
	_clockIsStarted=null;
	userInput.gameState.stopClock();
  }
  userInput.clockCheck=function(){
		
		var sideToPlay= userInput.gameState.sideToPlay;
		
		var timeFunc= sideToPlay ? userInput.gameState.decrementDark : userInput.gameState.decrementLight;
		var timeLeft= timeFunc.call(userInput.gameState);
		var lostOnTime;
		//if(timeLeft && (timeLeft % 1000)) return;
		
		if(sideToPlay){
			userInput.chessBoard.updateOneClock(sideToPlay, userInput.gameState.darkTime, _aiTurn);
		}
		else{
			//userInput.chessBoard.updateOneClock(sideToPlay, userInput.gameState.lightTime);
			userInput.chessBoard.updateOneClock(sideToPlay, userInput.gameState.lightTime, _aiTurn);
		}	
		if(timeLeft <=0){			
			userInput.resignGame();
		}
		
	};
	userInput.optionsConfiguration=function(){
		this.optionArr={};
		this.updateOptionGroup= function(optionName){
			this.optionArr[optionName]=$("input[name='"+optionName+"']:checked").val();
			return this.optionArr[optionName];
			
		};
	};
  
  
  
}());