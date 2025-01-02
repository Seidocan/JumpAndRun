class BossBar extends DrawableObject {
    
    bossPercentage = 100;

    IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSSBAR);
        this.setBossPercentage(100);
        this.x = 550;
        this.y = 0;
        this.width = 150;
        this.height = 45;
    }

    /**
     * Sets the boss's health percentage and updates the displayed image.
     * @param {number} bossPercentage - The boss's health percentage (0-100).
     */
    setBossPercentage(bossPercentage) {
        this.bossPercentage = bossPercentage;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index to be used based on the boss's health percentage.
     * @returns {number} The index of the image in the IMAGES_BOSSBAR array.
     */
    resolveImageIndex() {
        if (this.bossPercentage == 100) {
            return 5;
        } else if (this.bossPercentage > 80) {
            return 4;
        } else if (this.bossPercentage > 60) {
            return 3;
        } else if (this.bossPercentage > 40) {
            return 2;
        } else if (this.bossPercentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}