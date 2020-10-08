
/////////////////////////////////////
// Les variables
////////////////////////////////////
var canvas;
var ctx;

// Variables des éléments visuels
var head;
var apple;
var ball;

var bodySize;
var apple_x;
var apple_y;

// Boolean permettant de savoir si on est en train:
var leftDirection = false; // de descendre (downDirection=true, tous les autres à false),
var rightDirection = true; // de monter (upDirection, tous les autres à false),
var upDirection = false; // d'aller sur la gauche (leftDirection, tous les autres à false),
var downDirection = false; // d'aller sur la droite (rightDirection, tous les autres à false)

// Variable pour savoir si on a perdu (on joue --> inGame=true; on perd --> inGame=false)
var inGame = true;    

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;    

// Code ASCII correspondant aux touches haut, bas, gauche et droite du clavier
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   


/////////////////////////////////////
// Les fonctions
////////////////////////////////////
// Fonction d'initialisation
function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    positionApple();
    setTimeout("gameCycle()", DELAY);
}    

// Fonction permettant de charger les images utilisées dans le jeu
function loadImages() {
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 
}

// Fonction permettant de créer le serpent
function createSnake() {
    bodySize = 3;

    for (var bodyIndex = 0; bodyIndex < bodySize; bodyIndex++) {
        x[bodyIndex] = 50 - bodyIndex * 10;
        y[bodyIndex] = 50;
    }
}

function doDrawing() {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {
        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < bodySize; z++) {
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }    
    } else {
        gameOver();
    }        
}

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {
    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        bodySize++;
        positionApple();
    }
}

function move() {
    for (var z = bodySize; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x[0] += DOT_SIZE;
    }

    if (upDirection) {
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {
        y[0] += DOT_SIZE;
    }
}    

function checkCollision() {
    for (var z = bodySize; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
      inGame = false;
    }

    if (x[0] < 0) {
      inGame = false;
    }
}

// Permet de positionner aléatoirement une pomme dans le jeu
function positionApple() {
    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}    

function gameCycle() {
    if (inGame) {
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

// Fonction qui détecte quand on clique sur les flèches du clavier
onkeydown = function(e) {
    var key = e.keyCode;
    //Quand on clique sur la flèche de gauche et qu'on est pas en train d'aller sur la droite
    if ((key == LEFT_KEY) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }
    //Quand on clique sur la flèche de droite et qu'on est pas en train d'aller sur la gauche
    if ((key == RIGHT_KEY) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }
    //Quand on clique sur la flèche du haut et qu'on est pas en train d'aller vers le bas
    if ((key == UP_KEY) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
    //Quand on clique sur la flèche du bas et qu'on est pas en train d'aller vers le haut
    if ((key == DOWN_KEY) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
