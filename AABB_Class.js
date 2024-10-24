

class AABB {
    constructor(x, y, w, h) {
      this.x = x - w / 2; 
      this.y = y - h / 2; 
      this.w = w; // Width of the box
      this.h = h; // Height of the box
      
    }
  
    // Check if this AABB intersects with other AABB
    intersects(other) {
      return !(
        this.x + this.w < other.x || // this is left of other
        this.x > other.x + other.w || // this is right of other
        this.y + this.h < other.y || // this is above other
        this.y > other.y + other.h // this is below other
      );
    }
  
    // Check if a point is inside this AABB
    contains(px, py) {
      return (
        px >= this.x &&
        px <= this.x + this.w &&
        py >= this.y &&
        py <= this.y + this.h
      );
    }
  
    update(x, y, w, h){

        this.x = x - w / 2
        this.y = y - h / 2
        this.w = w
        this.h = h
         

    }


    //debug
    draw() {
      noFill();
      stroke(0, 255, 0); // green 
      rectMode(CORNER)
      rect(this.x, this.y, this.w, this.h);
    }
  }