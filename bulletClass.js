

class Bullet {


    constructor(x, y) {
        this.x = x
        this.y = y
        this.sizewidth = 5
        this.sizeHeight = 10
    }



    update() {

        this.y -= 16

        // if(this.y - this.sizeHeight > canvasHeight){

        //     this.y = 0
        // }


        if(this.y){


            
        }

    }



    render() {

        fill(255)
        rectMode(CENTER)
        rect(this.x, this.y, this.sizewidth, this.sizeHeight)



    }


}


function shoot() {






}