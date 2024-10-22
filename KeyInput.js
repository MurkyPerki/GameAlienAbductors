









/* global fucntions for keypressed and keyreleased,
and i call the class specific functions in them
 to keep it more clean. */

 function keyPressed() {

    player1.keyPressed();



    if (key === 'r' || key === 'R' && player1Lives === 0) {
        restart();
    }


}
function keyReleased() {

    player1.keyReleased();
}



