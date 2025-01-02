class BottleBar extends DrawableObject {

    bottleAmmount = 0;

    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 20;
        this.y = 80;
        this.width = 150;
        this.height = 45;
        this.setBottleAmmount(0);
    }

    /**
     * Sets the bottle amount and updates the displayed image accordingly.
     * The bottle amount is clamped between 0 and 10.
     * @param {number} bottleAmmount - The new bottle amount (0-10).
     */
    setBottleAmmount(bottleAmmount) {
        this.bottleAmmount = Math.max(0, Math.min(bottleAmmount, 10));
        let index = Math.floor(this.bottleAmmount / 2);
        let path = this.IMAGES_BOTTLEBAR[index];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index to be used based on the bottle amount.
     * @returns {number} The index of the image in the IMAGES_BOTTLEBAR array.
     */
    resolveImageIndex() {
        if (this.bottleAmmount >= 95) {
            return 5;
        } else if (this.bottleAmmount >= 75) {
            return 4;
        } else if (this.bottleAmmount >= 55) {
            return 3;
        } else if (this.bottleAmmount >= 35) {
            return 2;
        } else if (this.bottleAmmount > 15) {
            return 1;
        } else {
            return 0;
        }
    }
}