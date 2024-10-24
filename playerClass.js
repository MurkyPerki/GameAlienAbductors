class Player {  //start player class

    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.sizeX = 60
        this.sizeY = 20
        this.moveSpeed = 8
        this.isMovingLeft = false
        this.isMovingRight = false
        this.rand = color(random(255), random(255), random(255))


        this.fireRate = 100
        this.lastShot = 0
    }


    //logic player
    update() {


        if (this.isMovingLeft) {

            this.x -= this.moveSpeed
        }


        if (this.isMovingRight) {

            this.x += this.moveSpeed
        }

        this.x = constrain(this.x, this.sizeX / 2, canvasWidth - this.sizeX / 2)



        //todo shooting logic player

    } // update logic




    //evrything visual that needs to be shown
    render() {


        noStroke()
        fill(this.rand)
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)

    }



    gameOver(){


        
    }




    /* key input. // i can put the keypPressed and keyReleased functions in the class
     but i also need to call them a seprate keyreleased and pressed function outside the class.
      i cant directly call them in draw like 'player.keyPressed'  */

    keyPressed() {


        if (key === "a" || keyCode === LEFT_ARROW) {
            this.isMovingLeft = true;
        }

        if (key === "d" || keyCode === RIGHT_ARROW) {
            this.isMovingRight = true;
        }

        if (key === ' ' && !spacePressed) {

            let currentTime = frameCount

            if(currentTime - this.lastShot >= this.fireRate ){
            bullet = new Bullet(this.x, this.y,)
            bullets.push(bullet)

            let bulletBox = new AABB(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)
            bulletBoxes.push(bulletBox);

            spacePressed = true;
            this.lastShot = currentTime
            console.log(frameCount)
           }
           
        }
        
    }

    // let bulletBoX = new AABB(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)

    keyReleased() {

        if (key === "a" || keyCode === LEFT_ARROW) {
            this.isMovingLeft = false;
        }
        if (key === "d" || keyCode === RIGHT_ARROW) {
            this.isMovingRight = false;
        }


        if (key === ' ') {
            spacePressed = false
        }


    }


} //!end player class block