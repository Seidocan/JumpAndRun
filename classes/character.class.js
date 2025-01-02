class Character extends MovableObject {

    world;
    currentImage = 0;
    speed = 5;
    idleTimeout = null;
    idleAnimationInterval = null;
    sleepTimeout = null;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.jump();
        this.animate();
        this.offset = {
            left: 32,
            right: 32,
            top: 120,
            bottom: 15
        };
        this.noActivity();
    }

    /**
     * Initializes the no-activity detection by listening for keydown events and resetting the idle timer.
     */
    noActivity() {
        window.addEventListener("keydown", () => this.resetIdleTimer());
        this.resetIdleTimer();
    }

    /**
     * Resets the idle timer, clearing any existing timeouts or intervals and restarting the timers
     * for idle and sleep states.
     */
    resetIdleTimer() {
        if (this.idleTimeout)
            clearTimeout(this.idleTimeout);
        if (this.sleepTimeout)
            clearTimeout(this.sleepTimeout);
        if (this.idleAnimationInterval) {
            clearInterval(this.idleAnimationInterval);
            this.idleAnimationInterval = null;
        }
        this.idleTimeout = setTimeout(() => this.onIdle(), 500);
        this.sleepTimeout = setTimeout(() => this.onSleep(), 10000);
    }

    /**
     * Called when the entity becomes idle. Starts the idle animation if energy is greater than 0.
     */
    onIdle() {
        if (this.energy > 0) {
            this.startIdleAnimation();
        }
    }

    /**
     * Called when the entity transitions into sleep. Plays a sound and starts the sleep animation if energy is greater than 0.
     */
    onSleep() {
        if (this.energy > 0) {
            playSound('idle_sound');
            this.startSleepAnimation();
        }
    }

    /**
     * Starts the idle animation, clearing any existing animations.
     */
    startIdleAnimation() {
        this.stopAnimation();
        this.idleAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 500);
    }

    /**
     * Starts the sleep animation, clearing any existing animations.
     */
    startSleepAnimation() {
        this.stopAnimation();
        this.idleAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SLEEP);
        }, 500);
    }

    /**
     * Stops the current animation by clearing the interval.
     */
    stopAnimation() {
        if (this.idleAnimationInterval) {
            clearInterval(this.idleAnimationInterval);
            this.idleAnimationInterval = null;
        }
    }

    /**
     * Calls functions to handle character animations, movements, and jumping.
     */
    animate() {
        this.characterAnimations();
        this.characterMovesRight();
        this.characterMovesLevt();
        this.characterJumps();
    }

    /**
     * Controls the character's movement to the right.
     * Updates the camera position based on the character's x position.
     */
    characterMovesRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                pauseSound('idle_sound');
                playSound('walking_sound');
                this.resetIdleTimer();
            }
            this.world.cam_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Controls the character's movement to the left.
     * Updates the camera position based on the character's x position.
     */
    characterMovesLevt() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                pauseSound('idle_sound');
                playSound('walking_sound');
                this.resetIdleTimer();
            }
            this.world.cam_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Controls the character's jumping action.
     */
    characterJumps() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                playSound('jump_sound');
                this.resetIdleTimer();
            }
            this.world.cam_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Determines which animation to play depending on whether the character is dead, hurt, jumping, or walking.
     */
    characterAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.x += this.speed;
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 80);
    }
}