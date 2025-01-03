class Chick extends MovableObject {

    height = 60;
    width = 45;
    world;
    currentImage = 0;
    hitByBottle = false;
    isDead = false;

    IMAGES_CHICK_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_CHICK_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_CHICK_WALKING);
        this.loadImage(this.IMAGES_CHICK_DEAD);
        this.speed = 0.60 + Math.random() * 0.25;
        this.x = x + Math.random() * 1000;
        this.y = 360;
        this.offset = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this.animate();
    }

    /**
     * Animates the chick object. Plays the walking animation and handles the behavior when hit by a bottle.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (!this.isDead){
            this.playAnimation(this.IMAGES_CHICK_WALKING);
            playSound('chick');
            }
            if (this.hitByBottle) {
                this.loadImage(this.IMAGES_CHICK_DEAD);
                setTimeout(() => {
                    this.hitByBottle = false;
                }, 2200);
            }
        }, 200);
    }
}