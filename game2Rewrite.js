


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

let alienBullets = []
let alienBulletBoxes = []


function setup() { //? start setup
    createCanvas(canvasWidth, canvasHeight)

    player1 = new Player(width / 2, height - 20) // spawns player

    playerBox = new AABB(player1.x, player1.y, player1.sizeX, player1.sizeY)

    // let bulletBoX = new AABB(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)



    for (let a = 0; a < basicAliensX; a++) { //for loop for instantiating aliens.
        for (let b = 0; b < basicAliensY; b++) {
            let gapX = random(51,62)
            let gapY = random(51,55)
            sizeX = 50
            sizeY = 50

            x = a * (sizeX + gapX) + sizeX / 2 // placement aliens x-axis
            y = 50 + b * (sizeX + gapY) + sizeX / 2  // placement aliens y-axis


            let alien;
            if (b === 0) {
              // First row of aliens are shooting aliens
              alien = new ShootingAlien(x, y, sizeX, sizeY);
            } else {
              alien = new Aliens(x, y, sizeX, sizeY);
            }





            // alien = new Aliens(x, y, sizeX, sizeY)
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

        if (aliens[i]) {
            aliens[i].update();
            aliens[i].render();

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
            fill(0, 255, 0)
            textSize(25)
            textAlign(CENTER)
            text('press space', canvasWidth / 2, canvasHeight / 2)
            noLoop()


            if (player1Lives === 0) {


                noLoop()
                gameOver()

            }



        }
        }

    } // end for loop


    if (edge) { // so that all te aliens shift at once
        for (let i = 0; i < aliens.length; i++)
            aliens[i].shiftDown();
    } // end if edge




}


function checkCollision() {

    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
            if (bulletBoxes[i].intersects(enemyBoxes[j])) {
                // Collision detected between bullet i and alien j

                // Remove bullet and its bounding box
                bullets.splice(i, 1);
                bulletBoxes.splice(i, 1);


                // Damage the alien
                const alienDead = aliens[j].takeDamage(1);

                if (alienDead) {
                    // Remove alien and its bounding box
                    aliens.splice(j, 1);
                    enemyBoxes.splice(j, 1);
                }




                //  Increase score, play sound, show explosion, 

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

            x =  a * (sizeX + gap) + sizeX / 2 // placement aliens x-axis
            y =  b * (sizeX + gap) + sizeX / 2  // placement aliens y-axis


            alien = new Aliens(x, y, sizeX, sizeY)
            aliens.push(alien)

            let enemyBox = new AABB(alien.x, alien.y, alien.sizeX, alien.sizeY)
            enemyBoxes.push(enemyBox)

        }
    }
}

function restart() {
   // Reset player state
  player1 = new Player(width / 2, height - 20);
  player1.health = 3; // Reset player health
  player1Damaged = false;

  // Reset aliens and their bounding boxes
  resetAliens();

  // Reset bullets and their bounding boxes
  bullets = [];
  bulletBoxes = [];
  alienBullets = [];
  alienBulletBoxes = [];

  // Re-enable the game loop
  loop();
}



function gameOver() {

    fill(255)
    textSize(50)
    textAlign(CENTER)
    text('YOU DIED',
        canvasWidth / 2,
        canvasHeight / 2
    )
    textSize(30)
    text('press R to try again', canvasWidth / 2, canvasHeight / 2 + 40)



}



function checkPlayerHit() {
    for (let i = alienBullets.length - 1; i >= 0; i--) {
      if (alienBulletBoxes[i].intersects(playerBox)) {
        // Collision detected between alien bullet and player
  
        // Remove bullet and its bounding box
        alienBullets.splice(i, 1);
        alienBulletBoxes.splice(i, 1);
  
        // Reduce player health
        player1.takeDamge(1);
  
        // If player is dead, end the game
        if (player1.health <= 0) {
          noLoop();
          gameOver();
        }
      }
    }
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

 // Update and render alien bullets
 for (let i = alienBullets.length - 1; i >= 0; i--) {
    alienBullets[i].update();
    alienBulletBoxes[i].update(alienBullets[i].x, alienBullets[i].y, alienBullets[i].sizeX, alienBullets[i].sizeY);

    // Check if bullet is off-screen
    if (alienBullets[i].offScreen()) {
      alienBullets.splice(i, 1);
      alienBulletBoxes.splice(i, 1);
    } else {
      alienBullets[i].render();
      // alienBulletBoxes[i].draw(); // Optional for debugging
    }
  }






    playerBox.update(player1.x, player1.y, player1.sizeX, player1.sizeY)
    checkCollision()
    checkPlayerHit();


    textSize(30)
    fill(0,250,1)
    text('lives:' + player1Lives, 50, 50)


    textSize(30)
    fill(0,250,1)
    text('health:' + player1.health, 150, 50)

    player1.render();
    playerBox.draw()




}//! end draw


