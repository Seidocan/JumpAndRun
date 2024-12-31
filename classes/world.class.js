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


    setWorld() {
        this.character.world = this;
    }


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


    checkCollisions() {
        this.level.enemies.forEach((enemy, Endboss) => {
            if (this.character.isColliding(enemy, Endboss) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkBottleHit() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle, index) => {
                this.level.enemies.forEach((enemy, indexOfEnemy) => {
                    if (bottle.isColliding(enemy) && !enemy.isDead) {
                        if (enemy instanceof Chick || enemy instanceof Chicken) {
                            enemy.isDead = true;
                            playSound('hit_enemy');
                            bottle.isSplashed = true;
                            bottle.splashAnimation();
                            enemy.enemyHit();
                            setTimeout(() => {
                                this.level.enemies.splice(indexOfEnemy, 1);
                                this.throwableObjects.splice(index, 1);
                            }, 1000);
                        } else if (enemy instanceof Endboss) {
                            bottle.isSplashed = true;
                            playSound('boss_hit');
                            bottle.splashAnimation();
                            playSound('hit_enemy');
                            enemy.bossHit();
                            this.bossBar.setBossPercentage(enemy.bossEnergy);
                            this.throwableObjects.splice(index, 1);
                        }
                    }
                });
            }, 500);
        });
    }

    stompEnemy(){
        setInterval(() => {
            this.level.enemies.forEach((enemy, indexOfEnemy) => {
                if(this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead){
                    enemy.isDead = true;
                    playSound('stomp'); 
                    enemy.enemyHit();  
                    setTimeout(() => {
                    this.level.enemies.splice(indexOfEnemy, 1);
                    }, 1000);    
                }
            }
        )}, 50);
    }

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

    addobjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}