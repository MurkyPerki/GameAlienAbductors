//height and width variables to make adjusting canvas easier
let canvasWidth = 800;
let canvasHeight = 800;
let r, r2;
let ball; //declare ball function.

// let bullet; already declared locally
let bulletArray = []


//? bullet class.
class Bullet {
    constructor(x,y,c) {

        this.x = x
        this.y = y
        this.c = c
        this.sizeX = 20
        this.sizeY = 10
    }


    update() {
        
        this.y += 1


        if (this.y >= canvasHeight){
            
        }
        }
    


    show(){

        noStroke()
        fill(this.c);
        rectMode(CENTER);
        rect(this.x, this.y, this.sizeX, this.sizeY);


    }

}




//? ball class or player.
class Ball {
    constructor() {
        //pass along

        this.x = 40;
        this.y = height / 2;
        this.sizeCir = 50;
        this.c = color(random(0, 255), random(0, 255), random(0, 255));
        this.d = color(random(0, 255), random(0, 255), random(0, 255));
        this.speed = random(1, 3);
        this.transitionProgress = 0;
    }

    colorChange() {
        //this replaces the map inter i created in the draw function
        this.transitionProgress += 0.01;

        if (this.transitionProgress >= 1) {
            this.c = this.d;
            this.d = color(random(0, 255), random(0, 255), random(0, 255));
            this.transitionProgress = 0;
        }
    }

    draw() {
        // let inter = map(frameCount,0,width,0,1)
        let inter = (sin(frameCount * 0.02) + 1) / 2; // using sin function to go back and forth between two colours
        let tryOut = lerpColor(this.c, this.d, this.transitionProgress); //lerping between two colours

        fill(tryOut);
        noStroke();
        // ellipse(this.x,this.y,this.sizeCir,this.sizeCir)
        ellipse(this.x, this.y, this.sizeCir, this.sizeCir);
    }

    update() {
        this.x += this.speed;

        if (this.x > canvasWidth - this.sizeCir / 2 || this.x <= this.sizeCir / 2) {
            this.speed *= -1;
        }
    }
}


//! Main setup and draw function.




function setup() {
    createCanvas(canvasWidth, canvasHeight);
    ball = new Ball();
   
    frameRate(60)

     r = color(random(50,255),random(50,255),random(50,255))
     r2 = color(random(50,255),random(50,255),random(50,255))
    
    // for(let i = 0; i < 9; i++)
    //     {

    //     bullet = new Bullet(ball.x, ball.y,ball.c);
    //     bulletArray.push(bullet)

    // }
    
}


function draw() {

   
    
    let change = map(ball.x,0, canvasWidth, 0,1)
    let colourTry = lerpColor(r,r2,change)     
    background(colourTry);
    textAlign(CENTER)
    fill(200)
    text(frameCount,50,50)
    

    ball.colorChange();
    ball.update();
    ball.draw();

    // bullet.update();
    // bullet.draw();
    looping();
    console.log(bulletArray)
}

function looping() {

    //! shows and updates bullet position
    // for(let i = 0; i < bulletArray.length; i++){
        
    //     bulletArray[i].update();
    //     bulletArray[i].show();
        
        
    // }
    //! adds bullet new object to array
    if(frameCount >= 150 && ((frameCount - 150) % 150) < 50){
        if(frameCount % 10 === 0){
            let bullet = new Bullet(ball.x, ball.y, ball.c);
            bulletArray.push(bullet);
        }
    }
    
    for (let i = bulletArray.length - 1; i >= 0; i--){

        bulletArray[i].update();
        bulletArray[i].show();

        if (bulletArray[i].y > height + bulletArray[i].sizeY / 2) {
            bulletArray.splice(i, 1)
          }
    }

}