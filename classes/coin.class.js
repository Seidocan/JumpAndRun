class Coin extends MovableObject {

    width = 45;
    height = 45;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}