class Endboss extends MovableObject {

    height = 450;
    width = 350;
    world;
    currentImage = 0;
    y = 10;
    damagetaken = false;
    isDead = false;
    bossContact = false;
    speed = 3;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_WIN = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WIN);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2400;
        this.animate();
        this.offsetX = 20;
        this.offsetY = 10;
        this.offset = {
            left: 40,
            right: 10,
            top: 70,
            bottom: 30
        };
    }

    /**
     * Handles the boss animations and behavior, including contact with the character and movement logic.
     */
    animate() {
        this.animations();
        this.bossContactAndMovement();
    }

    /**
     * Sets up the boss animations based on its state, including walking, attacking, and alert animations.
     */
    animations() {
        setInterval(() => {
            if (!this.isDead) {
                if (this.bossContact) {
                    if (this.isColliding(world.character)) {
                        this.playAnimation(this.IMAGES_ATTACK);
                    } else {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 200);
    }

    /**
     * Sets up the boss's contact logic, movement, and damage handling.
     */
    bossContactAndMovement() {
        setInterval(() => {
            this.checkBossContact();
            this.movementAndDamage();
            this.bossDown();
        }, 50);
    }

    /**
     * Checks if the boss is in contact with the character, initiating its movement and attack behavior.
     */
    checkBossContact() {
        if (world.character.x > 1800 && !this.bossContact) {
            this.bossContact = true;
        }
    }

    /**
     * Handles the boss's movement and damage animations.
     */
    movementAndDamage() {
        if (this.bossContact && !this.isDead && !this.isColliding(world.character)) {
            this.moveLeft();
        }
        if (this.damagetaken) {
            this.playAnimation(this.IMAGES_HURT);
            setTimeout(() => {
                this.damagetaken = false;
            }, 250);
        }
    }

    /**
     * Handles the boss's state when its energy reaches zero, playing the win animation and marking it as dead.
     */
    bossDown() {
        if (this.bossEnergy <= 0 && !this.isDead) {
            this.isDead = true;
            this.playAnimation(this.IMAGES_WIN);
            setTimeout(() => {
                this.img = this.imageCache[this.IMAGES_WIN[this.IMAGES_WIN.length - 1]];
            }, this.IMAGES_WIN.length * 300);
        }
    }
}