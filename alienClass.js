
class Aliens {

    constructor(x, y, size) {

        this.x = x;
        this.y = y;
        this.size = size
        this.moveSpeed = 10

    }



    update() {


        this.x += this.moveSpeed


    } //end update function



    show() {


        noStroke()
        fill(255)
        rectMode(CENTER)
        rect(this.x, this.y, this.size)



    }//end show function


    shiftDown() {

        this.y += 50
        this.moveSpeed *= - 1

    }




}//! end alien class




class shootingAlien extends Aliens{

    constructor(){

        this.size = 50


    }




    update(){


    }



    render(){


        fill(200,10,10)
        rectMode(CENTNER)
        rect(x,y,this,size)



    }


}