class OverworldEvent {
    constructor({map,event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve){ //resolve permettra de finir la méthode "await"
         //presque la même chose que dans "Person.js"
         const who = this.map.gameObjects[this.event.who];
         who.startBehavior({
             map: this.map
         },{
             type: "stand",
             direction: this.event.direction,
             time: this.event.time
         })

        //set up a handler to complete when correct person is done walking then resolve the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete",completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)

    }

    walk(resolve){
        //presque la même chose que dans "Person.js"
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        },{
            type: "walk",
            direction: this.event.direction
        })
        //set up a handler to complete when correct person is done walking then resolve the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete",completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)

    }

    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}