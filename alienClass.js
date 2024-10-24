
class Aliens {

    constructor(x, y, sizeX, sizeY) {

        this.x = x;
        this.y = y;
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.moveSpeed = 2
        this.isDestroyed = false
        this.health = 3

    }



    update() {


        this.x += this.moveSpeed


    } //end update function



    show() {

        noStroke();
        // Change color based on health
        if (this.health === 3) {
          fill(0, 255, 0); // Green
        } else if (this.health === 2) {
          fill(255, 165, 0); // Orange
        } else if (this.health === 1) {
          fill(255, 0, 0); // Red
        }
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)



    }//end show function


    takeDamage(damage){
        
        this.health -= damage;
        if(this.health <= 0){
        // Alien is dead, mebe add explosion effect or score increment here
            return true;
        }
        return false
        }

    

    destroyed(){

        this.isDestroyed = true

    }


    shiftDown() {

        this.y += 50
        this.moveSpeed *= - 1

    }




}//! end alien class




class shootingAlien extends Aliens{

    constructor(x,y,sizeX, sizeY){

        this.sizeX = sizeX
        this.sizeY = sizeY
        this.x = x
        this.y = y

        this.shootInterval
    }




    // update(){
    //     this.x += this.moveSpeed

    // }



    render(){


        fill(200,10,10)
        rectMode(CENTNER)
        rect(this.x,this.y,this.size)



    }


}