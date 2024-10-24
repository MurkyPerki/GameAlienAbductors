

class Bullet {


    constructor(x, y, sizeX, sizeY) {
        this.x = x
        this.y = y
        this.sizeX = 5
        this.sizeY = 10
    }



    update() {

        this.y -= 16

        // if(this.y - this.sizeHeight > canvasHeight){

        //     this.y = 0
        // }


    }

    offScreen(){

    return this.y < 0 || this.y > canvasHeight;


    }

    render() {

        fill(255)
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)



    }


}


function shoot() {






}