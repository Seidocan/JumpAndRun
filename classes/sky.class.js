class Sky extends MovableObject {

    width = 720;
    height = 400;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
    }
}