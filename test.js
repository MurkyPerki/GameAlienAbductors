let bullet = [];



class Player {
  constructor(x, y) {
    this.xdir = 2;
    this.r = 30;
    this.startPositionx = 0 + this.r / 2
    this.startPositiony = 500
    this.x = this.startPositionx
    this.y = this.startPositiony
  }

  update() {

    //this moves the player/enemy
    this.x += this.xdir;

    //bounces of left and right wall.
    if (this.x >= width - this.r / 2 || this.x <= this.r / 2) {
      this.xdir *= -1;
    } 
    //edge check and shift down
    if (player.x >= width - player.r / 2 || player.x <= player.r / 2){
      this.y += 50
    }

    //shoots a bullet at frameCount 150
    if (frameCount % 150 === 0) {
      bullet.push(new Bullet(this.x, this.y));
    } //else if (frameCount % 150 === 1) {
    //   bullet = new Bullet(player.x, player.y);
    // }
  }


  show() {
    fill(200, 0, 50);
    ellipse(this.x, this.y, this.r);
  }


  // I want to ppush bullets to array.


  // console.log(bullet)
  // console.log(frameCount)

  // console.log(bullet + frameCount)


}


class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ydir = 1;
    this.width = 10;
    this.height = 20;
  }

  update() {
    this.y += this.ydir;


  }

  show() {
    fill(200, 200, 10);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}
//will be keyboard function for shooting projectile player

// let spacePressed = false

// function keyPressed(){

//   if ( key === " " && spacePressed) {

//   }

// }

// function keyReleased(){ 

//   if (key === " "){
//     spacePressed = false;
//   }

// }

function setup() {
  createCanvas(800, 1000);
  frameRate(60);
  player = new Player();

}

function draw() {
  background(220);

  text(frameCount, 50, 50);
  //calling all the show and update methoods from classes




  //   console.log(bullet)

  for (let i = 0; i < bullet.length; i++) {

    bullet[i].update();
    bullet[i].show();

    if (bullet[i].y > height + bullet[i].height / 2) {
      bullet.splice(i, 1)
    }
  }
  player.show();
  player.update();
}