class Clouds extends MovableObject {

    speed = 0.15;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.height = 250;
        this.width = 450;
        this.x = Math.random() * 500;
        this.y = Math.random() * 120;
        this.animate();
    }

    /**
     * Animates the entity by continuously moving it to the left.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the entity to the left at a constant speed.
     * Updates the `x` position in intervals.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}