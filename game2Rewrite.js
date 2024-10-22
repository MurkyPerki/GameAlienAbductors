


//global variables
let canvasHeight = 600
let canvasWidth = 800
let img;


//class variables 
let player1;
let alien;
let bullet = null
let spacePressed = false
let player1Damaged = false

let player1Lives = 3
let bullets = []

function preload() {
    img = loadImage("betterSpace.jpg");

}




let aliens = []
let basicAliensX = 5
let basicAliensY = 3




function setup() { //? start setup
    createCanvas(canvasWidth, canvasHeight)

    player1 = new Player(width / 2, height - 20) // spawns player

    for (let a = 0; a < basicAliensX; a++) { //for loop for instantiating aliens.
        for (let b = 0; b < basicAliensY; b++) {
            let gap = 50
            size = 50

            x = 50 + a * (size + gap) + size / 2 // placement aliens x-axis
            y = 50 + b * (size + gap) + size / 2  // placement aliens y-axis


            alien = new Aliens(x, y, size)
            aliens.push(alien)
        }
    } //end forLoop





    // bullet = new Bullet(canvasWidth / 2,0)


}//! end setup



function renderAliens() { // for all the alien drawing.

    let edge = false

    


    for (let i = 0; i < aliens.length; i++) { //for loop for drawing and updating the aliens.

        aliens[i].show()
        aliens[i].update()

        if (aliens[i].x + aliens[i].size / 2 >= canvasWidth ||
            aliens[i].x <= aliens[i].size / 2) {
            edge = true
        }

        if (aliens[i].y + aliens[i].size >= player1.y && !player1Damaged) {

            player1Lives -= 1
            player1Damaged = true
            resetAliens()
            

            if( player1Lives === 0){


                noLoop()
                gameOver()

            }



          
        }

    } // end for loop


    if (edge) { // so that all te aliens shift at once
        for (let i = 0; i < aliens.length; i++)
            aliens[i].shiftDown();
    } // end if edge




}

function resetAliens() {
    aliens = [];  // Clear the current aliens array
    player1Damaged = false;
    // Re-create aliens 
    for (let a = 0; a < basicAliensX; a++) {
        for (let b = 0; b < basicAliensY; b++) {
            let gap = 50;
            size = 50;

            x = 50 + a * (size + gap) + size / 2; // Placement on x-axis
            y = 50 + b * (size + gap) + size / 2;  // Placement on y-axis

            alien = new Aliens(x, y, size);
            aliens.push(alien);
        }
    }
}

function restart() {
    // Reset player state
    player1 = new Player(width / 2, height - 20);  // Reset player to starting position
    player1Lives = 3;  // Reset player lives
    player1Damaged = false;

    resetAliens()

    // Reset bullets
    bullets = [];

    // Re-enable the game loop
    loop();
}



function gameOver() {

    fill(255)
    textSize(30)
    textAlign(CENTER)
    text('YOU DIED',
        canvasWidth / 2,
        canvasHeight / 2
    )



}


function draw() { //? start draw
    background(0)
    image(img, 0, 0, width, height);

    player1.render();
    player1.update();

    renderAliens();

    text(player1Lives,50,50)


    for (let i = 0; i < bullets.length; i++) {



        bullets[i].update();
        bullets[i].render();

    }




    // if(bullet){
    // bullet.render();
    // bullet.update();
    // }


}//! end draw


