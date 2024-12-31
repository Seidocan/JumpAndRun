class Bottle extends MovableObject {

    width = 90;
    height = 90;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.offset = {
            left: 35,
            right: 20,
            top: 10,
            bottom: 5
        };
    }
}