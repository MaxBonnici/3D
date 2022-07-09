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
        this.ChangeMap(Map,"Kitchen");
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
    let [Map] = Object.keys(window.OverworldMaps) //Détection de la map

    }

    ChangeMap(Map,Room){
      var GAMEOBJECT=window.OverworldMaps[Object.keys(window.OverworldMaps)[0]];
      var HERO=GAMEOBJECT[Object.keys(GAMEOBJECT)[1]];
      var Position=HERO[Object.keys(HERO)[0]];
      var PositionX=(Position[Object.keys(Position)[3]])/16;
      var PositionY=(Position[Object.keys(Position)[2]])/16;

      if ( Map = "DemoRoom" && PositionX===10 && PositionY===5  ){
        console.log(this.map)
        this.map = new OverworldMap(window.OverworldMaps.Kitchen);
        console.log(this.map)
      }

    }

   }
