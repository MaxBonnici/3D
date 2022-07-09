class GameObject {
    constructor(config) {
      this.id = null;           //Initialisation à nul pour éviter erreur
      this.isMounted = false;   //Initialisation de superposition à false
      this.x = config.x || 0;   //Initialisation de la variable X, sinon 0
      this.y = config.y || 0;   //Initialisation de la variable Y, sinon 0
      this.direction = config.direction || "down"; //choix de la direction, défault down
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "/images/characters/people/hero.png",  //choix du png du hero
      });

      this.behaviorLoop = config.behaviorLoop || {};
      this.behaviorLoopIndex = 0;
    }

    mount(map) {
      this.isMounted = true;      //Superposition = true
      map.addWall(this.x, this.y);  //Rajoute mur a cette position
    
      //If we have a behavior, kick off after a short delay
      setTimeout(() =>{
        this.doBehaviorEvent(map);
      },10)
    }


    update() {
    }

    //function asynchrone pour le "await" on attend que init soit fini avant de continuer la fonction
    async doBehaviorEvent(map) {

      //no mouvement if there is a cutscene
      if(map.isCutscenePlaying || this.behaviorLoop.length === 0 ){
        return;
      }
      //Setting up our event with relevent info
      let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
      eventConfig.who = this.id;


      //create an event instance out of our next event config
      const eventHandler = new OverworldEvent({ map, event: eventConfig });
      await eventHandler.init();

      //setting the next event to fire
      this.behaviorLoopIndex +=1;
      if (this.behaviorLoopIndex === this.behaviorLoop.length) {
        this.behaviorLoopIndex = 0;
      }
      
      //rappelle de la fonction
      this.doBehaviorEvent(map);

    }


  }