


//global variables
let canvasHeight = 600
let canvasWidth = 800
let img;


//class variables 
let player1;



function preload() {
    img = loadImage("betterSpace.jpg");

}


//classes


class Player {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sizeX = 60
        this.sizeY = 20
        this.moveSpeed = 10
        this.isMovingLeft = false
        this.isMovingRight = false

    }


    //logic player
    update() {

        if (this.isMovingLeft) {
            this.x -= this.moveSpeed
        }

        if (this.isMovingRight) {
            this.x += this.moveSpeed
        }




    }




    //evrything visual that needs to be shown
    render() {

        noStroke()
        fill(255)
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)

    }




    //key input.

    keyPressed() {


        if (key === "a" || key === LEFT_ARROW) {
            this.isMovingLeft = true;
        }

        if (key === "d" || key === RIGHT_ARROW) {
            this.isMovingRight = true;
        }

    }



    keyReleased() {
        
        if (key === "a" || key === LEFT_ARROW) {
            this.isMovingLeft = false;
        }
        if (key === "d" || key === RIGHT_ARROW) {
            this.isMovingRight = false;
        }
    }


}








function setup() {
    createCanvas(canvasWidth, canvasHeight)


    player1 = new Player(width / 2, height - 20)



}





function draw() {
    background(0)
    image(img, 0, 0, width, height);

    player1.render();
    player1.update();

}


/* global fucntions for keypressed and keyreleased,
and i call the class specific functions in them
 to keep it more clean. */

function keyPressed() {

    player1.keyPressed();


}
function keyReleased() {

    player1.keyReleased();
}