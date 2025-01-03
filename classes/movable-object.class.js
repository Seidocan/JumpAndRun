class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.75;
    energy = 100;
    bossEnergy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object, updating its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 30);
        setInterval(() => {
            if(world.character.y > 135) {
                world.character.y = 135;
            }
        }, 200);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above ground, or if it is a Throwableobject.
     */
    isAboveGround() {
            if (this instanceof Throwableobject) {
                return true;
            } else {
                return this.y < 135;
            } 
    }

    /**
     * Checks if the current object is colliding with another movable object.
     * @param {object} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Handles the object being hit, reducing energy and checking for game over.
     */
    hit() {
        playSound('hurt');
        this.energy -= 10;
        if (this.energy == 0) {
            this.gameOver();
        } if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles the boss being hit, reducing its energy and triggering win conditions if defeated.
     */
    bossHit() {
        this.bossEnergy -= 20;
        this.damagetaken = true;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;
            playSound('win');
            setTimeout(() => {
                this.win();
            }, 2800);
        } if (this.bossEnergy < 0) {
            this.bossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Marks the enemy as hit by a bottle.
     */
    enemyHit() {
        this.hitByBottle = true;
    }

    /**
     * Collects coins and plays a sound, capping the total at 100.
     */
    picCoins() {
        if (this.coins < 100) {
            playSound('coin');
            this.coins += 10;
            if (this.coins >= 100) {
                this.coins = 100;
            }
        }
    }

    /**
     * Collects bottles and plays a sound, capping the total at 100.
     */
    picBottles() {
        if (this.bottles < 100) {
            playSound('bottle');
            this.bottles += 10;
            if (this.bottles >= 100) {
                this.bottles = 100;
            }
        }
    }

    /**
     * Checks if the object is currently hurt (within a short time of last hit).
     * @returns {boolean} True if the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.75;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through the provided image paths.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Spends coins to restore energy to full if the player has enough coins.
     */
    spendCoins() {
        if (this.coins >= 95) {
            this.coins = 0;
            this.energy = 100;
            playSound('spend');
        }
    }

    /**
     * Triggers the game over sequence, hiding the canvas and showing the game over screen.
     */
    gameOver() {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('panel-div').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'flex';
        document.getElementById('retry-button').style.display = 'block';
        muteSounds();
        stopAll();
    }

    /**
     * Triggers the win sequence, hiding the canvas and showing the win screen.
     */
    win() {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('panel-div').style.display = 'none';
        document.getElementById('win-screen').style.display = 'flex';
        document.getElementById('restart-button').style.display = 'block';
        muteSounds();
        stopAll();
    }
}