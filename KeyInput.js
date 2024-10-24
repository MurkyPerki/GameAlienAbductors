









/* global fucntions for keypressed and keyreleased,
and i call the class specific functions in them
 to keep it more clean. */

 function keyPressed() {

    player1.keyPressed();

    if (keyIsDown(32) && player1Lives < 3 && player1Lives >= 1 &&
        player1Damaged){
        resetAliens()
        loop()
        }

    if (key === 'r' && player1Lives === 0) {
        restart();
    }

  
}
function keyReleased() {

    player1.keyReleased();
}



