//variaveis da bolinha
let xAxysBall = 300;
let yAxysBall = 200;
let diamaterBall = 15;
let radiosBall = diamaterBall / 2


//velocidade da bolinha
let xvelocityBall = 6;
let yvelocityBall = 6;


//variáveis da raquete
let xAxysRacket = 5;
let yAxysRacket = 150;
let widthRacket = 10;
let heightRacket = 90;

//variáveis do oponente
let xAxysRacketOpponent = 585;
let yAxysRacketOpponent = 150; 
let yOpponentVelocity;


// placar do jogo
let myScore = 0;
let opponentScore = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// função que pré-carrega os sons antes de iniciar o programa
function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

//fundo do cenário
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}


//desenho da bolinha
function draw() {
  background(0);
  showRacket(xAxysRacket, yAxysRacket);
  movementRacket();
  verifyRacketCollision();
  showBall();
  movementBall();
  verifyCollisionBorder();
  showRacket(xAxysRacketOpponent, yAxysRacketOpponent);
  movimentOpponentRacket();
  verifyRacketCollisionOpponent();
  showScore();
  goal();
}



//funções que alimentam a 'function draw()'
function showBall() {
  circle(xAxysBall, yAxysBall, diamaterBall);
}

function showRacket(x, y) {
  rect(x, y, widthRacket, heightRacket);

}

function movementRacket() {
  if (keyIsDown(UP_ARROW)) {
    yAxysRacket -= 5;
  } 
  if (keyIsDown(DOWN_ARROW)) {
    yAxysRacket += 5;
  }
}

function verifyRacketCollision() {
  if (xAxysBall - radiosBall < xAxysRacket + widthRacket && yAxysBall - radiosBall <  yAxysRacket + heightRacket && yAxysBall + radiosBall > yAxysRacket) {
    raquetada.play();
    xvelocityBall  *= -1;
  }
}

function verifyRacketCollisionOpponent() {
  if (xAxysBall + radiosBall > xAxysRacketOpponent && yAxysBall + radiosBall > yAxysRacketOpponent && yAxysBall - radiosBall < yAxysRacketOpponent + heightRacket) {
    raquetada.play();
    xvelocityBall  *= -1;
  }
}

function movementBall() {
  xAxysBall += xvelocityBall;
  yAxysBall += yvelocityBall;
}

function verifyCollisionBorder() {
  if (xAxysBall + radiosBall > width || xAxysBall - radiosBall < 0 ) {
    xvelocityBall  *= -1;
  }
  if (yAxysBall + radiosBall > height || yAxysBall - radiosBall < 0) {
    yvelocityBall *= -1;
  }
}

function movimentOpponentRacket() {
  yOpponentVelocity = yAxysBall - yAxysRacketOpponent - widthRacket / 2 - 70;
  yAxysRacketOpponent += yOpponentVelocity;
}

function player2() {
  
}

function showScore() {
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill('orange');
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill('orange');
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentScore, 470, 26);
}

function goal(){
  if (xAxysBall > 590){
    ponto.play();
    myScore += 1;
  }
  if (xAxysBall < 10){
    ponto.play();
    opponentScore += 1;
  }
}