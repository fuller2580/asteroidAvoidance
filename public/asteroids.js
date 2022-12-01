$(document).ready(function() {
	var canvas = $("#gameCanvas");

var context = canvas.get(0).getContext("2d");

//Canvas dimensions
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();

//Game Settings
var playGame;

var asteroids;
var numAsteroids;
var player;
var score;
var scoreTimeout;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;
var dKey = 68;
var wKey = 87;
var sKey = 83;

//game UI

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiPlay = $("#gamePlay");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var soundBackground = $("#gameSoundBackground").get(0);
var soundThrust = $("#gameSoundThrust").get(0);
var soundDeath = $("#gameSoundDeath").get(0);
soundThrust.volume = 0.2;
soundBackground.volume = 0.2;
soundDeath.volume = 0.4;

var Asteroid = function(x, y, radius, vX){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.vX = vX;
	};

var Player = function(x, y){
	this.x = x;
	this.y = y;
	this.width = 24;
	this.height = 24;
	this.halfWidth = this.width/2;
	this.halfHeight = this.height/2;

	this.vX = 0;
	this.vY = 0;
	this.moveRight = false;
	this.moveUP = false;
	this.moveDown = false;
	this.flameLength = 20;
};
//reset and start the game
function startGame() {

	asteroids = new Array();
	numAsteroids = 10;
	score = 0;
	player = new Player(150, canvasHeight/2);
	for (var i = 0; i < numAsteroids; i++){
		var radius = 5+(Math.random()*10);
		var x = canvasWidth+radius+Math.floor(Math.random()*canvasWidth);
		var y = Math.floor(Math.random()*canvasHeight);
		var vX = -5-(Math.random()*5);

		asteroids.push(new Asteroid(x, y, radius, vX));
};

$(window).keydown(function(e){
	var keyCode = e.keyCode;

	if (!playGame){
		playGame = true;
		soundBackground.currentTime = 0;

		soundBackground.play();
		animate();
		timer();
		};

	if (keyCode == arrowRight || keyCode == dKey){
		player.moveRight = true;
		if(soundThrust.paused){
			soundThrust.currentTime = 0;
			soundThrust.play();
			};
		}
	else if (keyCode == arrowUp || keyCode == wKey){
		player.moveUp = true;}
	else if (keyCode == arrowDown || keyCode == sKey){
		player.moveDown = true;};

	});
	$(window).keyup(function(e){
	var keyCode = e.keyCode;

	if (keyCode == arrowRight || keyCode == dKey){
		player.moveRight = false;
		soundThrust.pause();}
	else if (keyCode == arrowUp || keyCode == wKey){
		player.moveUp = false;}
	else if (keyCode == arrowDown || keyCode == sKey){
		player.moveDown = false;};
	});

	//Reset game stats
	uiScore.html("0");
	uiStats.show();

	playGame = false;

	animate();

};

//Initialize the game environment
function init() {
	uiStats.hide();
	uiComplete.hide();

	uiPlay.click(function(e) {
		e.preventDefault();
		uiIntro.hide();
		startGame();
		});

	uiReset.click(function(e) {
		e.preventDefault();
		uiComplete.hide();

		$(window).unbind("keyup");
		$(window).unbind("keydown");

		soundThrust.pause();
		soundBackground.pause();
		clearTimeout(scoreTimeout);
		startGame();
		});
	};

function timer(){
	if (playGame){
		scoreTimeout = setTimeout(function(){
			uiScore.html(++score);
			if (score % 5 ==0){
				numAsteroids +=5;
			};
			timer();
		}, 1000);
	};
};

//animation loop
function animate(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	var asteroidsLength = asteroids.length;

	for (var i = 0; i < asteroidsLength; i++){
		var tmpAsteroid = asteroids[i];

		tmpAsteroid.x += tmpAsteroid.vX;

		if(tmpAsteroid.x+tmpAsteroid.radius < 0){
			tmpAsteroid.radius = 5+(Math.random()*10);
			tmpAsteroid.x = canvasWidth+tmpAsteroid.radius;
			tmpAsteroid.y = Math.floor(Math.random()*canvasHeight);
			tmpAsteroid.vX = -5-(Math.random()*5);
			};


	var dX = player.x - tmpAsteroid.x;
	var dY = player.y - tmpAsteroid.y;
	var distance = Math.sqrt((dX*dX)+(dY*dY));

	if (distance < (player.halfWidth+1)+tmpAsteroid.radius) {
		soundThrust.pause();

		soundDeath.currentTime = 0;

		soundDeath.play();
		//Game over
		playGame = false;
		clearTimeout(scoreTimeout);
		uiStats.hide();
		uiComplete.show();

		soundBackground.pause();

		$(window).unbind("keyup");
		$(window).unbind("keydown");
	};

		context.fillStyle = "rgb(255, 255, 255)";
		context.beginPath();
		context.arc(tmpAsteroid.x,tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		};
	player.vX = 0;
	player.vY = 0;

	if (player.moveRight){
		player.vX = 3;}
	else {
		player.vX = -3;
	};

	if (player.moveUp){
		player.vY = -3;
	};

	if (player.moveDown){
		player.vY = 3;
	};

	player.x += player.vX;
	player.y += player.vY;

	if(player.x-player.halfWidth < 20){
		player.x = 20+player.halfWidth;
		}
	else if (player.x+player.halfWidth > canvasWidth-20){
		player.x = canvasWidth-20-player.halfWidth;
		}

	if(player.y-player.halfHeight < 20){
		player.y = 20+player.halfHeight;
		}
	else if (player.y+player.halfHeight > canvasHeight-20){
		player.y = canvasHeight-20-player.halfHeight;
		};
	//create flame
	if (player.moveRight){
		context.save();
		context.translate(player.x-player.halfWidth, player.y);

		if(player.flameLength == 20){
			player.falmeLength = 15;}
		else {
			player.flameLength = 20;};

		context.fillStyle = "orange";
		context.beginPath();
		context.moveTo(0,-5);
		context.lineTo(-player.flameLength, 0);
		context.lineTo(0,5);
		context.closePath();
		context.fill();

		context.restore();
		};
	/*
	context.fillStyle = "rgb(255, 0, 0)";
	context.beginPath();
	context.moveTo(player.x+player.halfWidth, player.y);
	context.lineTo(player.x-player.halfWidth, player.y-player.halfHeight);
	context.lineTo(player.x-player.halfWidth, player.y+player.halfHeight);
	context.closePath();
	context.fill();
	*/
	context.fillStyle = '#999993';
  	context.strokeStyle = '#000000';
  	context.beginPath();
  	context.rect(player.x-player.halfWidth,player.y-player.halfHeight+3,player.halfWidth,player.height-6);
  	context.closePath();
  	context.fill();
  	context.stroke();
  	context.beginPath();
  	context.ellipse(player.x, player.y, 24, 9, 0, Math.PI * 1.5, Math.PI /2, false);
  	context.closePath();
  	context.fill();
  	context.stroke();
  	context.fillStyle = '#000000';
  	context.beginPath();
  	context.ellipse(player.x+player.halfWidth, player.y, 6, 3, 0, 0, Math.PI *2, true);
  	context.closePath();
  	context.fill();
  	context.stroke();
  	context.fillStyle = '#999993';
  	context.beginPath();
  	context.moveTo(player.x+4, player.y-player.halfHeight+3);
  	context.lineTo(player.x-8,player.y-player.halfHeight-3);
  	context.lineTo(player.x-12,player.y-player.halfHeight-3);
  	context.lineTo(player.x-12,player.y-player.halfHeight+3);
  	context.moveTo(player.x+4, player.y+player.halfHeight-3);
  	context.lineTo(player.x-8,player.y+player.halfHeight+3);
  	context.lineTo(player.x-12,player.y+player.halfHeight+3);
  	context.lineTo(player.x-12,player.y+player.halfHeight-3);
  /*
  context.lineTo(500,494);
  context.lineTo(500,500);
  context.moveTo(516,524);
  context.lineTo(504,530);
  context.lineTo(500,530);
  context.lineTo(500,524);
  */
  context.closePath();
  context.fill();
  context.stroke();

	while (asteroids.length < numAsteroids){
		var radius = 5+(Math.random()*10);
		var x = Math.floor(Math.random()*canvasWidth)+canvasWidth+radius;
		var y = Math.floor(Math.random()*canvasHeight);
		var vX = -5-(Math.random()*5);

		asteroids.push(new Asteroid(x, y, radius, vX));
	};

	if(playGame){
	setTimeout(animate, 33);
	};
};
init();
});

