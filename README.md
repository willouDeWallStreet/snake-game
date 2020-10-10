
# Features

- Background avec une image retro gaming
- Affichage du "SCORE"
- Affichage du "HIGH SCORE"
- Une target et un obstacle
- Relancer le jeu quand on clique sur une flèche du clavier

## Idées d'amélioration pour le snake-game

- Agrandir la fenêtre de jeu
- Changer le message "Game over"
- Ajouter des sound effect
- Faire un spawn du serpent aléatoire
- Ajouter Bootstrap 4
- Ajouter un obstacle à chaque dizaine de score

## Sources

- Image en JS: https://developer.mozilla.org/fr/docs/Web/API/HTMLImageElement/Image
- Canvas: https://www.w3schools.com/html/html5_canvas.asp
- Context d'un canvas: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext
- Button CSS: https://www.w3schools.com/css/css3_buttons.asp
- Draw image: https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage
- Math.random(): https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
- Math.floor(): https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor

## Documentation

- Les "console.log" permettent d'afficher des variables JS dans la console de debug du navigateur. Pour voir la console de debug du navigateur, tu dois faire F12 et aller dans l'onglet "console".
- Math.floor() arrondi le nombre qui lui est passé en paramètre.
- Math.random() génère un nombre aléatoire entre 0 et 1.
- Dans les fonctions positionTarget() && positionObstacle(), 
    - Au max on aura randomPositionFactor=39 && SQUARE_SIZE=10 donc target_x=390
    - Au max on aura randomPositionFactor=29 && SQUARE_SIZE=10 donc target_y=290
    - et comme notre Canvas (terrain de jeu) fait pour x entre 0 et 400 et pour y entre 0 300, on aura toujours notre target et l'obstacle dans le canvas affiché à l'écran