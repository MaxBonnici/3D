class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;
  
      this.isPlayerControlled = config.isPlayerControlled || false; 
  
      this.directionUpdate = {
        //effet du mouvement
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
      }
    }
  
    update(state) {
      if (this.movingProgressRemaining > 0) {  //Si mouvement possible
        this.updatePosition();
      } else {

        //case : mouvement autorisé et touche appuyé
        if (this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          })
        }
        this.updateSprite(state);
      }
    }

    startBehavior(state, behavior) {
      //set character direction to whatever behavior
      this.direction =  behavior.direction;
      if (behavior.type === "walk") {
        //stop here if space is not free
        if (state.map.isSpaceTaken(this.x,this.y,this.direction)) {
          return;
        }
        //ready to walk
        state.map.moveWall(this.x, this.y, this.direction)
        this.movingProgressRemaining = 16;
        this.updateSprite(state);
      }

      if (behavior.type === "stand") {
        setTimeout(() => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
        },behavior.time)

      }

    }
  
    updatePosition() {
      
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
        
        if (this.movingProgressRemaining === 0) {
          //we finish the walk
          //const event = new CustomEvent("PersonWalkingComplete", {
          //  detail: {
          //    whoId: this.id
          //  }
          //});
          //document.dispatchEvent(event);
          utils.emitEvent("PersonWalkingComplete",{
            whoId: this.id
          })

        }
    }

    updateSprite(){
      if(this.movingProgressRemaining > 0 ){
        this.sprite.setAnimation("walk-"+this.direction); //Animation de marche
        return;
      }
      this.sprite.setAnimation("idle-"+this.direction); //Animation d'etre tourner dans un sens
    }

  }