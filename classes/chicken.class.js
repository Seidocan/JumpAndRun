class Chicken extends MovableObject {

    height = 60;
    width = 45;
    world;
    currentImage = 0;
    isDead = false;

    IMAGES_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_CHICKEN_WALKING);
        this.loadImage(this.IMAGES_CHICKEN_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.x = x + Math.random() * 800;
        this.y = 370;
        this.offset = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this.animate();
    }

    /**
     * Animates the chicken object. Handles movement, animations, and sound effects.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (!this.isDead){
            this.playAnimation(this.IMAGES_CHICKEN_WALKING);
            playSound('chicken');
            }
            if (this.hitByBottle) {
                this.loadImage(this.IMAGES_CHICKEN_DEAD);
                setTimeout(() => {
                    this.hitByBottle = false;
                }, 2200);
            }
        }, 200);
    }
}