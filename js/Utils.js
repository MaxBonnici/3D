const utils = {
    //permet d'éviter les chiffres a virgules pour la postion
    withGrid(n) {
        return n*16;
    },
    //return les coordonnées x et y
    asGridCoord(x,y){
        return `${x*16},${y*16}`
    },

    //Détecte la position que l'entitité aura lors du choix de la direction
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x +=size;
        } else if (direction === "up") {
            y -=size;
        } else if (direction === "down") {
            y +=size;
        }
        return{x,y};
    }
}