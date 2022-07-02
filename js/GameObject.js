class GameObject {
    constructor(config) {
      this.isMounted = false;   //Initialisation de superposition à false
      this.x = config.x || 0;   //Initialisation de la variable X, sinon 0
      this.y = config.y || 0;   //Initialisation de la variable Y, sinon 0
      this.direction = config.direction || "down"; //choix de la direction, défault down
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "/images/characters/people/hero.png",  //choix du png du hero
      });
    }

    mount(map) {
      this.isMounted = true;      //Superposition = true
      map.addWall(this.x, this.y);  //Rajoute mur a cette position
    }


    update() {
  
    }
  }