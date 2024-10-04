class Alien {

	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.xdir = 1;
		// this.AABB = new AABB(1, 1, 1, 1);
		this.AABB = new AABB(this.x - (this.size / 2), this.x + (this.size / 2),
			this.y - (this.size / 2), this.y + (this.size / 2));
	}


	move() {
		this.x += this.xdir;
		this.AABB.move(this.xdir, 0);
	}


	shiftDown() {
		this.xdir *= -1;
		this.y += 50;
		this.AABB.move(0, 50);
	}
}

class RedAlien extends Alien {

	constructor(x, y) {
		super(x, y, 50);
	}

	show() {
		noStroke()
		fill(230, 20, 0);
		rectMode(CENTER);
		rect(this.x, this.y, this.size, this.size);
	}
}

class GreenAlien extends Alien {
	constructor(x, y)
	{
		super(x, y, 50);
		this.radius = 40;
	}

	show() {
		noStroke()
		fill(22, 222, 22);
		rectMode(CENTER);
		rect(this.x, this.y, this.size, this.size);
	}
}

class BlueAlien extends Alien {

	constructor(x, y) {
		super(x, y, 100);
		this.shootChance = 0.022
	}

	show() {
		noStroke()
		fill(22, 22, 222);
		rectMode(CENTER);
		rect(this.x, this.y, this.size);

		fill(255, 0, 255); //green
		rectMode(CORNERS);
		// rect(this.AABB.xMin, this.AABB.xMax, this.AABB.yMin, this.AABB.yMax);
		rect(this.AABB.xMin, this.AABB.yMin, this.AABB.xMax, this.AABB.yMax);
	}

	// yo
	//? yo
	//! yo
	//TODO: 

	update() {
		// if (random() < this.shootChance) {
		// 	this.shoot();
		// }

		 //shoots a bullet at frameCount 150
		 if (frameCount % 150 === 0) {
			let bullet = new AlienBullet(this.x, this.y + this.size / 2);
		  }
	}

	// shoot() {
	// 	let bullet = new AlienBullet(this.x, this.y + this.size / 2);
	// 	alienBullets.push(bullet);
	// 	console.log("Shooting bullet");
	// }
}


