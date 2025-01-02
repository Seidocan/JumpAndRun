class World {

    canvas;
    ctx;
    keyboard;
    cam_x = 0;
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    throwableObjects = [];
    bottleToThrow = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkConnectCoins();
        this.checkConnectBottles();
        this.checkBottleHit();
        this.stompEnemy()
        this.run();
        playSound('music');
    }

    /**
     * Sets the world for the character, linking the character to the world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game logic at regular intervals, checking for collisions, throwing bottles, and handling coin and energy interactions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrow();
            if (this.keyboard.C) {
                this.character.spendCoins();
                this.coinBar.setCoinAmmount(this.character.coins);
                this.statusBar.setPercentage(this.character.energy);
            }
        }, 200);
    }

    /**
     * Checks if the character is attempting to throw a bottle and handles the throwing logic.
     */
    checkThrow() {
        if (this.keyboard.B && this.bottleToThrow > 0) {
            let bottle = new Throwableobject(this.character.x + 80, this.character.y + 140);
            this.throwableObjects.push(bottle);
            this.bottleToThrow--;
            if (this.bottleToThrow % 2 === 0) {
                this.bottleBar.setBottleAmmount(this.bottleToThrow);
            }
        }
    }

    /**
     * Checks for collisions between the character and enemies, applying damage if necessary.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, Endboss) => {
            if (this.character.isColliding(enemy, Endboss) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Periodically checks if throwable objects (bottles) collide with any enemies.
     */
    checkBottleHit() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle, index) => {
                this.level.enemies.forEach((enemy, indexOfEnemy) => {
                    if (this.isCollision(bottle, enemy)) {
                        if (enemy instanceof Chick || enemy instanceof Chicken) {
                            this.handleChickenHit(enemy, bottle, index, indexOfEnemy);
                        } else if (enemy instanceof Endboss) {
                            this.handleEndbossHit(enemy, bottle, index);
                        }
                    }
                });
            });
        }, 500);
    }

    /**
     * Checks whether a bottle has collided with an enemy and if the enemy is not already dead.
     * @param {Object} bottle - The throwable object being checked for collision.
     * @param {Object} enemy - The enemy being checked for collision.
     * @returns {boolean} True if the bottle collides with the enemy and the enemy is not dead.
     */
    isCollision(bottle, enemy) {
        return bottle.isColliding(enemy) && !enemy.isDead;
    }

    /**
     * Handles the collision logic when a bottle hits a chicken enemy.
     * Marks the enemy as dead, plays the hit sound, triggers splash animation, and removes the enemy and bottle after a delay.
     * @param {Object} enemy - The chicken enemy being hit.
     * @param {Object} bottle - The throwable object that hit the enemy.
     * @param {number} index - The index of the bottle array.
     * @param {number} indexOfEnemy - The index of the enemy array.
     */
    handleChickenHit(enemy, bottle, index, indexOfEnemy) {
        enemy.isDead = true;
        playSound('hit_enemy');
        bottle.isSplashed = true;
        bottle.splashAnimation();
        enemy.enemyHit();
        this.removeEnemyAndBottle(indexOfEnemy, index);
    }

    /**
     * Handles the collision logic when a bottle hits the endboss.
     * Triggers splash animation, reduces the boss's energy, and removes the bottle.
     * @param {Object} enemy - The endboss being hit.
     * @param {Object} bottle - The bottle that hit the boss.
     * @param {number} index - The index of the bottle in the array.
     */
    handleEndbossHit(enemy, bottle, index) {
        bottle.isSplashed = true;
        playSound('boss_hit');
        bottle.splashAnimation();
        playSound('hit_enemy');
        enemy.bossHit();
        this.bossBar.setBossPercentage(enemy.bossEnergy);
        this.throwableObjects.splice(index, 1);
    }

    /**
     * Removes a chicken enemy and the bottle from the arrays.
     * @param {number} indexOfEnemy - The index of the enemy in the array.
     * @param {number} index - The index of the bottle in the array.
     */
    removeEnemyAndBottle(indexOfEnemy, index) {
        setTimeout(() => {
            this.level.enemies.splice(indexOfEnemy, 1);
            this.throwableObjects.splice(index, 1);
        }, 1000);
    }

    /**
     * Checks if the character collides with any enemy while jumping and applies a stomp effect.
     */
    stompEnemy() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, indexOfEnemy) => {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
                    enemy.isDead = true;
                    playSound('stomp');
                    enemy.enemyHit();
                    setTimeout(() => {
                        this.level.enemies.splice(indexOfEnemy, 1);
                    }, 1000);
                }
            }
            )
        }, 50);
    }

    /**
     * Checks if the character collects coins and updates the coin count.
     */
    checkConnectCoins() {
        setInterval(() => {
            this.level.coin.forEach((coin, i) => {
                if (this.character.isColliding(coin)) {
                    this.character.picCoins();
                    this.coinBar.setCoinAmmount(this.character.coins);
                    this.level.coin.splice(i, 1);
                }
            });
        }, 250);
    }

    /**
     * Checks if the character collects bottles and updates the bottle count.
     */
    checkConnectBottles() {
        setInterval(() => {
            this.level.bottle.forEach((bottle, i) => {
                if (this.character.isColliding(bottle)) {
                    if (this.bottleToThrow < 10) {
                        this.bottleToThrow++;
                    }
                    this.character.picBottles();
                    if (this.bottleToThrow % 2 === 0) {
                        this.bottleBar.setBottleAmmount(this.bottleToThrow);
                    }
                    this.level.bottle.splice(i, 1);
                }
            });
        }, 100);
    }

    /**
     * Clears the canvas and redraws all game objects, updating the view.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cam_x, 0);
        this.addobjectsToMap(this.level.background);
        this.ctx.translate(-this.cam_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.cam_x, 0);
        this.addobjectsToMap(this.level.clouds);
        this.addobjectsToMap(this.level.enemies);
        this.addobjectsToMap(this.level.coin);
        this.addobjectsToMap(this.level.bottle);
        this.addobjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.cam_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map for rendering.
     * @param {Array} objects - An array of objects to add to the map.
     */
    addobjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map for rendering.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for objects facing the opposite direction.
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the image flip back to the normal orientation.
     * @param {Object} mo - The object to revert.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}