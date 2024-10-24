
class Aliens {

    constructor(x, y, sizeX, sizeY) {

        this.x = x;
        this.y = y;
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.moveSpeed = 2
        this.isDestroyed = false

    }



    update() {


        this.x += this.moveSpeed


    } //end update function



    show() {


        noStroke()
        fill(255)
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)



    }//end show function


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