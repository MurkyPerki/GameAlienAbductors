let player;
let moveDir = 0;
let bullets = [];
let aliens = [];
let alienBullets = [];
let img;
let spacePressed = false;

function preload() {
    img = loadImage("betterSpace.jpg");
}

class AABB {
    constructor(xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
    }

    // Method to check if this AABB intersects with another AABB
    intersects(other) {
        return !(this.xMax < other.xMin ||
            this.xMin > other.xMax ||
            this.yMax < other.yMin ||
            this.yMin > other.yMax);
    }

    // Method to update the bounds of the AABB
    update(xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
    }

    move(x, y) {
        this.xMin += x;
        this.xMax += x;
        this.yMin += y;
        this.yMax += y;

    }

    // Method to get the width of the AABB
    getWidth() {
        return this.xMax - this.xMin;
    }

    // Method to get the height of the AABB
    getHeight() {
        return this.yMax - this.yMin;
    }
}




class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 4; //redius of bullet
        this.width = 10;
        this.height = 20;


        // this.AABB = new AABB(0, 0, 0, 0);
        this.AABB = new AABB(this.x - (this.width / 2), this.x + (this.width / 2),
            this.y - (this.height / 2), this.y + (this.height / 2));
    }

    show() {
        fill(50, 255, 50);
        noStroke();
        // ellipse(this.x, this.y, this.r * 2);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height)
        // rect(CENTER)


        // fill(255, 0, 255); //green
        // rectMode(CORNERS);
        // rect(this.AABB.xMin, this.AABB.yMin, this.AABB.xMax, this.AABB.yMax);
    }

    move() {
        this.y -= 16;
        console.log("Moving bullets")
        // this.AABB.move(0, -16);
    }

    // hits(alien) {
    //   if (alien.size) {
    //     let d = dist(this.x, this.y, alien.x, alien.y);
    //     return d < this.r + alien.size;
    //   } else if (alien.size) {
    //     return (
    //       this.x + this.width / 2 > alien.x - alien.size / 2 &&
    //       this.x - this.width / 2 < alien.x + alien.size / 2 &&
    //       this.y + this.height / 2 > alien.y - alien.size / 2 &&
    //       this.y - this.height / 2 < alien.y + alien.size / 2
    //     );

    //   }
    // }

    hits(alien) {
        if (alien.size) {
            return (
                this.x + this.width / 2 > alien.x - alien.size / 2 &&
                this.x - this.width / 2 < alien.x + alien.size / 2 &&
                this.y + this.height / 2 > alien.y - alien.size / 2 &&
                this.y - this.height / 2 < alien.y + alien.size / 2
            );

        }
    }
}



class Player {
    constructor() {
        this.x = width / 2; //starts in the middle, horizontally
        this.y = height - 50; //position near the bottem
        this.width = 60;
        this.height = 20;
        this.speed = 5;

        this.isAlive = true;

        this.AABB = new AABB(this.x - (this.width / 2), this.x + (this.width / 2),
            this.y - (this.height / 2), this.y + (this.height / 2));
    }

    // Displaya the player ship
    draw() {
        fill(0, 255, 0); //green
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);

        fill(255, 0, 255); //green
        rectMode(CORNERS);
        // rect(this.AABB.xMin, this.AABB.xMax, this.AABB.yMin, this.AABB.yMax);
        rect(this.AABB.xMin, this.AABB.yMin, this.AABB.xMax, this.AABB.yMax);
        // console.log(`xMin: ${this.AABB.xMin}`);
        // console.log(`xMax: ${this.AABB.xMax}`);
        // console.log(`yMin: ${this.AABB.yMin}`);
        // console.log(`yMax: ${this.AABB.yMax}`);
    }

    //move the ship right to left

    move() {
        var moved = 0;
        var ogX = this.x;
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
            moved -= this.speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
            moved += this.speed;
        }
        this.x = constrain(this.x, this.width / 2, width - this.width / 2);
        // var c = width / 2;
        if (this.x != ogX) {
            this.AABB.move(moved, 0);
        }
    }
}

class AlienBullet {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.width = 10;
        this.height = 20;

        this.AABB = new AABB(this.x - this.width, this.x + this.width,
            this.y - this.height, this.y + this.height);
    }


    show() {

        fill(255, 0, 0)
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }


    move() {
        this.y += this.speed;
        this.AABB.move(this.x, this.y)
    }


    hits(player) {
        let bulletLeft = this.x - this.width / 2;
        let bulletRight = this.x + this.width / 2;
        let bulletTop = this.y - this.height / 2;
        let bulletBottem = this.y + this.height / 2;


        let playerLeft = player.x - player.width / 2;
        let playerRight = player.x + player.width / 2;
        let playerTop = player.y - player.height / 2;
        let playerBottom = player.y + player.height / 2;


        return !(
            bulletLeft > playerRight ||
            bulletRight < playerLeft ||
            bulletTop > playerBottom ||
            bulletBottem < playerTop
        );

    }
}

function setup() {

    createCanvas(800, 600);

    player = new Player();

    //allien rows and collums
    let rows = 3;
    let cols = 6;

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            let x = col * 100 + 100;
            let y = row * 100 + 100;

            let alien;

            //  if( (row + col) % 3 === 0) {
            //    alien = new GreenAlien(x,y)
            //    aliens.push(alien);
            //  } else if((row + col) % 2 === 0){
            //    alien = new RedAlien(x,y)
            //    aliens.push(alien);
            //  } else if((row + col) % 7 === 0){
            //    alien = new BlueAlien(x,y)
            //    aliens.push(alien);
            // }

            if ((row + col) % 7 === 0) {
                alien = new BlueAlien(x, y)
            } else if ((row + col) % 3 === 0) {
                alien = new RedAlien(x, y)
            } else {
                alien = new GreenAlien(x, y)
            }



            //   let alien = new GreenAlien(x, y);
            //   let RedAlien = new RedAlien(x,y);//import



            aliens.push(alien);
        }
    }
}

function keyPressed() {
    if (key === " " && !spacePressed) {

        // spacebar pressed to shoot bullet
        let bullet = new Bullet(player.x, player.y - player.height / 2);
        bullets.push(bullet);
        spacePressed = true;
    }
}

function keyReleased() {
    if (key === " ") {
        spacePressed = false;
    }
}

// let lastShotTime = 0; track time between shots
// let shootingInterval = 300; // min interval between shots

// function onUpdate()
// {
//   background(0); //black background
//   image(img, 0, 0, width, height);

//   player.draw();
//   player.move();

//   // display aliens and move'
//   let edge = false;

//   for (let alien of aliens) {
//     alien.show();
//     alien.move();

//     //check if alien hits edge
//     if (alien.x > width - alien.radius || alien.x < alien.radius) {
//       edge = true;
//     }

//     if (alien.y + alien.radius > player.y - player.height / 2) {
//       textSize(32);
//       fill(255);
//       textAlign(CENTER);
//       text("Game Over", width / 2, height / 2);
//       noLoop();
//     }
//   }

//   if (edge) {
//     for (let alien of aliens) {
//       alien.shiftDown();
//     }
//   }


//   //display and move bullet
//   for (let i = bullets.length - 1; i >= 0; i--) {
//     bullets[i].show();
//     bullets[i].move();

//     if (bullets[i].y < 0) {
//       bullets.splice(i, 1);
//       continue;
//     }

//     for (let j = aliens.length - 1; j >= 0; j--) {
//       if (bullets[i] && bullets[i].hits(aliens[j])) {
//         //removes aliens and bullets
//         aliens.splice(j, 1);
//         bullets.splice(i, 1);
//         break; //exit loop after collision
//       }
//     }

//     if (bullets[i] && bullets[i].y < 0) {
//       bullets.splice(i, 1);
//     }
//   }
// }

function onUpdate() {
    player.move();

    // display aliens and move'
    let edge = false;

    for (let alien of aliens) {
        alien.move();

        //check if alien hits edge
        if (alien instanceof BlueAlien) {
            // console.log("This is a GreenAlien");
            alien.update();
        }
        // if (alien.x > width - alien.radius || alien.x < alien.radius) {
        //   edge = true;
        // }

        // if (alien.x > width - alien.size || alien.x < alien.size) {
        //   edge = true;
        // }

        if ((alien.x - (alien.size / 2)) < 0 || (alien.x + (alien.size / 2)) > width) {
            edge = true;
        }

    }

    if (edge) {
        for (let alien of aliens) {
            alien.shiftDown();
        }
    }

    for (let i = alienBullets.length - 1; i >= 0; i--) {
        let bullet = alienBullets[i];
        bullet.move();

        if (bullet.hits(player)) {
            // textSize(32);
            // fill(255);
            // textAlign(CENTER);
            // text("Game Over", width / 2, height / 2);
            // noLoop();

            player.isAlive = false;

        }

        if (bullet.hits(player)) {
            alienBullets.splice(i, 1);
            continue;
        }
    }
    //display and move bullet
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].move();
    
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            continue;
        }
    
        for (let j = aliens.length - 1; j >= 0; j--) {
            // AABB aabb;
    
            if (bullets[i] && bullets[i].hits(aliens[j])) {
                //removes aliens and bullets
                aliens.splice(j, 1);
                bullets.splice(i, 1);
                break; //exit loop after collision
            }
        }
    
        if (bullets[i] && bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }

}



function onRender() {
    background(0); //black background
    image(img, 0, 0, width, height);

    player.draw();

    // display aliens and move'
    let edge = false;

    for (let alien of aliens) {
        alien.show();

        if (alien.y + alien.radius > player.y - player.height / 2) {
            textSize(32);
            fill(255);
            textAlign(CENTER);
            text("Game Over", width / 2, height / 2);
            noLoop();
        }
    }

    //display and move bullet
    // for (let i = bullets.length - 1; i >= 0; i--) {
    //   bullets[i].show();
    // }
    for (let bullet of bullets) {
        bullet.show();
    }


    for (let bullet of alienBullets) {
        bullet.show();
    }

    if (player.isAlive == false) {
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2);
        noLoop();
    }
}

function draw() {
    onUpdate();
    onRender();



    //?maybe make this score later
    textSize(16)
    fill(255)
    text(frameCount,width/ 15, height / 10)
}
