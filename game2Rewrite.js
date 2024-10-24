


//global variables
let canvasHeight = 1000
let canvasWidth = 1500
let img;


//class variables 
let player1;
let alien;
let bullet = null
let spacePressed = false
let player1Damaged = false

let player1Lives = 3
let bullets = []
let bulletBoxes = []

function preload() {
    img = loadImage("betterSpace.jpg");

}




let aliens = []
let basicAliensX = 5
let basicAliensY = 3
let playerBox;
let enemyBoxes = []


function setup() { //? start setup
    createCanvas(canvasWidth, canvasHeight)

    player1 = new Player(width / 2, height - 20) // spawns player

    playerBox = new AABB(player1.x, player1.y, player1.sizeX, player1.sizeY)

    // let bulletBoX = new AABB(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)

    

    for (let a = 0; a < basicAliensX; a++) { //for loop for instantiating aliens.
        for (let b = 0; b < basicAliensY; b++) {
            let gap = 50
            sizeX = 50
            sizeY = 50

            x = 50 + a * (sizeX + gap) + sizeX / 2 // placement aliens x-axis
            y = 50 + b * (sizeX + gap) + sizeX / 2  // placement aliens y-axis


            alien = new Aliens(x, y, sizeX, sizeY)
            aliens.push(alien)

            let enemyBox = new AABB(alien.x, alien.y, alien.sizeX, alien.sizeY)
            enemyBoxes.push(enemyBox)
            
        }
    } //end forLoop





    // bullet = new Bullet(canvasWidth / 2,0)


}//! end setup



function renderAliens() { // for all the alien drawing.

    let edge = false

    


    for (let i = 0; i < aliens.length; i++) { //for loop for drawing and updating the aliens.

        aliens[i].update()
        aliens[i].show()
        

        //alien bounding boxes

        enemyBoxes[i].update(aliens[i].x, aliens[i].y, aliens[i].sizeX, aliens[i].sizeY);
        enemyBoxes[i].draw();


        if (aliens[i].x + aliens[i].sizeX / 2 >= canvasWidth ||
            aliens[i].x <= aliens[i].sizeX / 2) {
            edge = true
        }

        if (aliens[i].y + aliens[i].sizeY >= player1.y && !player1Damaged) {

            player1Lives -= 1
            player1Damaged = true
            fill(0,255,0)
            textSize(25)
            textAlign(CENTER)
            text('press space', canvasWidth / 2, canvasHeight / 2)
            noLoop()
        

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


function checkCollision(){

    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
          if (bulletBoxes[i].intersects(enemyBoxes[j])) {
            // Collision detected between bullet i and alien j
    
            // Remove bullet and its bounding box
            bullets.splice(i, 1);
            bulletBoxes.splice(i, 1);
    
            // Remove alien and its bounding box
            aliens.splice(j, 1);
            enemyBoxes.splice(j, 1);
    
            // Optional: Increase score, play sound, show explosion, etc.
    
            // Since the bullet is destroyed, break out of the inner loop
            break;
          }
        }
      }




}

function resetAliens() {
    aliens = [];  // Clear the current aliens array
    player1Damaged = false;
    // Re-create aliens 
    for (let a = 0; a < basicAliensX; a++) { //for loop for instantiating aliens.
        for (let b = 0; b < basicAliensY; b++) {
            let gap = 50
            sizeX = 50
            sizeY = 50

            x = 50 + a * (sizeX + gap) + sizeX / 2 // placement aliens x-axis
            y = 50 + b * (sizeX + gap) + sizeX / 2  // placement aliens y-axis


            alien = new Aliens(x, y, sizeX, sizeY)
            aliens.push(alien)

            let enemyBox = new AABB(alien.x, alien.y, alien.sizeX, alien.sizeY)
            enemyBoxes.push(enemyBox)
            
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
    textSize(10)
    text('press R to try again', canvasWidth / 2 , canvasHeight / 2 + 15)



}


function draw() { //? start draw
    background(0)
    image(img, 0, 0, width, height);

    player1.update();
    
   

    renderAliens();




  // Update and render bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    // bullets[i].render();

    // Update bullet bounding box
    bulletBoxes[i].update(bullets[i].x, bullets[i].y, bullets[i].sizeX, bullets[i].sizeY);

    // Check if bullet is off-screen
    if (bullets[i].offScreen()) {
      bullets.splice(i, 1);
      bulletBoxes.splice(i, 1);
    } else {
      bullets[i].render();
     
      bulletBoxes[i].draw();
    }
  }


  playerBox.update(player1.x, player1.y, player1.sizeX, player1.sizeY)
  checkCollision()


    textSize(15)
    text(player1Lives,50,50)

    player1.render();
    playerBox.draw()

  


}//! end draw


