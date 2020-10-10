/////////////////////////////////////
// Les variables
////////////////////////////////////
//Un canvas = une zone rectangulaire dans le HTML
var canvas;
//ctx = le contexte du canvas
var ctx;

// Variables des éléments visuels
var head;
var target;
var sqare;
var obstacle;

var bodySize;
var target_x;
var target_y;
var obstacle_x;
var obstacle_y;

// Boolean permettant de savoir si on est en train:
var leftDirection = false; // de descendre (downDirection=true, tous les autres à false),
var rightDirection = true; // de monter (upDirection, tous les autres à false),
var upDirection = false; // d'aller sur la gauche (leftDirection, tous les autres à false),
var downDirection = false; // d'aller sur la droite (rightDirection, tous les autres à false)

// Variable pour savoir si on a perdu (on joue --> inGame=true; on perd --> inGame=false)
var inGame = true;    

//Taille de chaque élément du serpent
var SQUARE_SIZE_WITH_MARGIN = 12;
var SQUARE_SIZE = 10;
//Taille maximale du serpent
var MAX_SIZE = 999;
var MAX_WIDTH_RAND = 38;
var MAX_HEIGHT_RAND = 28;
var DELAY = 140;
//Taille du terrain de jeu
var C_HEIGHT = 300;
var C_WIDTH = 400;

// Code ASCII correspondant aux touches haut, bas, gauche et droite du clavier
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var UP_KEY = 38;
var DOWN_KEY = 40;

// Deux listes, x représente la taille horizontale en pixel et y représente la taille verticale en pixel
// x[0]=la tête; x[1]=la 1ère partie du corps; x[2]=la 2ième partie du corps; ...
// x[0]=la tête; x[1]=la 1ère partie du corps; x[2]=la 2ième partie du corps; ...
var x = new Array(MAX_SIZE);
var y = new Array(MAX_SIZE);

var myScore = 0;
var highScore = 0;


/////////////////////////////////////
// Les fonctions
////////////////////////////////////
// Fonction d'initialisation
function init() {
    //On récupère le canvas présent dans le HTML grâce à son ID
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    positionTarget();
    positionObstacle();
    setTimeout("gameCycle()", DELAY);
}

// Fonction permettant de redémarrer le jeu
function restartGame() {
    inGame = true;
    myScore = 0;
    init();
}

// Fonction permettant de charger les images utilisées dans le jeu (donc dans le HTML)
function loadImages() {
    head = new Image();
    head.src = 'img/head.png';
    
    sqare = new Image();
    sqare.src = 'img/square.png';

    target = new Image();
    target.src = 'img/head-cat-40.png';

    head = new Image();
    head.src = 'img/head.png';

    obstacle = new Image();
    obstacle.src = 'img/dinausore-50.png';
}

// Fonction permettant de créer le serpent et de définir où on spawn
function createSnake() {
    bodySize = 3;

    for (var bodyIndex = 0; bodyIndex < bodySize; bodyIndex++) {
        x[bodyIndex] = 50 - bodyIndex * SQUARE_SIZE_WITH_MARGIN;
        y[bodyIndex] = 50;
    }
}

// Fonction permettant de dessiner chaque élément du jeu
function doDrawing() {
    // On vide le canvas
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {
        // On dessine la target
        ctx.drawImage(target, target_x, target_y);
        // On dessine l'obstacle
        ctx.drawImage(obstacle, obstacle_x, obstacle_y);

        // Ici on dessine le serpent
        for (var z = 0; z < bodySize; z++) {
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(sqare, x[z], y[z]);
            }
        }    
    } else {
        gameOver();
    }        
}

// Fonction permettant d'afficher le message "Game over"
function gameOver() {
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 25px serif';

    if (myScore > highScore) {
        highScore = myScore;
        displayHighScore();
    }
    
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

// Fonction permettant de vérifier si on a touché une target avec le serpent
function checkTarget() {
    console.log("target_x", target_x);
    console.log("target_y", target_y);
    console.log("x[0], y[0]", x[0], y[0]);
    if ((target_x <= x[0] && x[0] <= target_x+35) && (target_y <= y[0] && y[0] <= target_y+35)) {

        bodySize++;
        myScore++;
        positionTarget();
        positionObstacle();
    }
}

// Fonction permettant de vérifier si on a touché un obstacle avec le serpent
function checkCollisionWithObstacle() {
    if ((obstacle_x <= x[0] && x[0] <= obstacle_x+45) && (obstacle_y <= y[0] && y[0] <= obstacle_y+45)) {
        inGame = false;
        gameOver();
    }
}

//Fonction qui affiche le mouvement du serpent
function move() {
    //Chaque élément du corp (sauf la tête) avance en se plaçant à la place de l'élément qui est devant lui
    for (var z = bodySize; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    //La tête avance d'une distance de SQUARE_SIZE_WITH_MARGIN=12 (l'équivalent de sa taille)
    if (leftDirection) {
        x[0] -= SQUARE_SIZE_WITH_MARGIN;
    }

    if (rightDirection) {
        x[0] += SQUARE_SIZE_WITH_MARGIN;
    }

    if (upDirection) {
        y[0] -= SQUARE_SIZE_WITH_MARGIN;
    }

    if (downDirection) {
        y[0] += SQUARE_SIZE_WITH_MARGIN;
    }
}    

// Fonction qui vérifie s'il y a une collision du serpent avec un bord ou avec lui-même
function checkCollision() {
    //Ici on vérifie s'il y a une collision du serpent avec lui même
    //On boucle sur la taille du serpent
    for (var z = bodySize; z > 0; z--) {
        //Si la coordonnée horizontale et verticale de la tête est la même que la coordonnée du corp d'index z, alors "game over"
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    //Ici on vérifie s'il y a une collision du serpent avec un bord
    //est-ce la tête touche le bord du bas?
    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }
    //est-ce la tête touche le bord du haut?
    if (y[0] < 0) {
       inGame = false;
    }
    //est-ce la tête touche le bord de droite?
    if (x[0] >= C_WIDTH) {
      inGame = false;
    }
    //est-ce la tête touche le bord de gauche?
    if (x[0] < 0) {
      inGame = false;
    }

    checkCollisionWithObstacle();
}

// Permet de positionner aléatoirement une target dans le jeu
function positionTarget() {
    var randomPositionFactor = Math.floor(Math.random() * MAX_WIDTH_RAND);
    target_x = randomPositionFactor * SQUARE_SIZE; //Au max on aura randomPositionFactor=39 && SQUARE_SIZE=10 donc target_x=390

    randomPositionFactor = Math.floor(Math.random() * MAX_HEIGHT_RAND);
    target_y = randomPositionFactor * SQUARE_SIZE; //Au max on aura randomPositionFactor=29 && SQUARE_SIZE=10 donc target_y=290
}

// Permet de positionner aléatoirement un obstacle dans le jeu
function positionObstacle() {
    var randomPositionFactor = Math.floor(Math.random() * MAX_WIDTH_RAND);
    obstacle_x = randomPositionFactor * SQUARE_SIZE;

    randomPositionFactor = Math.floor(Math.random() * MAX_HEIGHT_RAND);
    obstacle_y = randomPositionFactor * SQUARE_SIZE;
}

// Fonction permettant d'afficher le score
function displayScore() {
    document.getElementById('scoreVariable').innerHTML = myScore;
}

// Fonction permettant d'afficher le high score
function displayHighScore() {
    document.getElementById('highScoreVariable').innerHTML = highScore;
}

// Fonction qui est lancé dans la fonction d'init et qui boucle sur elle-même toutes les 140ms tant que inGame=true
// (c'est-à-dire, tant que ce n'est pas "Game over")
function gameCycle() {
    if (inGame) {
        checkTarget();
        checkCollision();
        move();
        doDrawing();
        displayScore();
        displayHighScore();
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
