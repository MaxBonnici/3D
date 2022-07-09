class Overworld {
    constructor(config) {
      //Creation de l'interface réctangulaire
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }
    //Loop effetuant diverse actions
     startGameLoop() {
       const step = () => {

         //Clear off the canvas
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
        //establish camera person
        const cameraPerson = this.map.gameObjects.hero;

        //update all objects
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
           arrow: this.directionInput.direction,
           map : this.map,
         })
        })

         //Draw Lower layer
         this.map.drawLowerImage(this.ctx, cameraPerson);
   
         //Draw Game Objects
         Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y; //permettre au personnage le plus bas d'être afficher avant celui au dessus
        }).forEach(object => {
           object.sprite.draw(this.ctx, cameraPerson);
         })
   
         //Draw Upper layer (nécessaire seulement si besoin de perspective ou d'étage)
         //this.map.drawUpperImage(this.ctx, cameraPerson);
         
         requestAnimationFrame(() => {
           step();   
         })
       }
       step();
    }
   
    init() {
     this.map = new OverworldMap(window.OverworldMaps.DemoRoom); //Choix de la carte
     this.map.mountObjects();     //verification de superposition de personnage
   
     this.directionInput = new DirectionInput(); //détection de changement de direction
     this.directionInput.init();
   
     this.startGameLoop();
    }
   }