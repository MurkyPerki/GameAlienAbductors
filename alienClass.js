
class Aliens {

    constructor(x, y, sizeX, sizeY) {

        this.x = x;
        this.y = y;
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.moveSpeed = 2
        this.isDestroyed = false
        this.health = 3

    }



    update() {


        this.x += this.moveSpeed


    } //end update function



    render() {

        noStroke();
        // Change color based on health
        if (this.health === 3) {
          fill(0, 255, 0); // Green
        } else if (this.health === 2) {
          fill(255, 165, 0); // Orange
        } else if (this.health === 1) {
          fill(255, 0, 0); // Red
        }
        rectMode(CENTER)
        rect(this.x, this.y, this.sizeX, this.sizeY)



    }//end show function


    takeDamage(damage){
        
        this.health -= damage;
        if(this.health <= 0){
        // Alien is dead, mebe add explosion effect or score increment here
            return true;
        }
        return false
        }

    

    destroyed(){

        this.isDestroyed = true

    }


    shiftDown() {

        this.y += 50
        this.moveSpeed *= - 1

    }




}//! end alien class




class ShootingAlien extends Aliens{

    constructor(x,y,sizeX, sizeY){
        super(x, y, sizeX, sizeY)

        this.sizeX = sizeX
        this.sizeY = sizeY
        this.x = x
        this.y = y

        this.shootInterval = 120
        this.lastShot = frameCount;
    }




    update(){
        super.update();
        this.shoot();

    }



    shoot(){

        if (frameCount - this.lastShot >= this.shootInterval) {
            const bullet = new AlienBullet(this.x, this.y + this.sizeY / 2);
            alienBullets.push(bullet);
            const bulletBox = new AABB(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY);
            alienBulletBoxes.push(bulletBox);
      
            this.lastShot = frameCount;


        }
    }

    render(){

        noStroke()
        fill(10,10,200)
        rectMode(CENTER)
        rect(this.x,this.y,this.sizeX,this.sizeY)



    }


}




class AlienBullet{

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sizeX = 5;
        this.sizeY = 10;
        this.speed = 6; // Positive to move downwards
      }
    
      update() {
        this.y += this.speed;
      }
    
      offScreen() {
        return this.y > canvasHeight;
      }
    
      render() {
        fill(255, 0, 0); // Red bullet
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.sizeX, this.sizeY);
      }



}