class CoinBar extends DrawableObject {

    coinAmmount = 0;

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 20;
        this.y = 40;
        this.width = 150;
        this.height = 45;
        this.setCoinAmmount(0);
    }


    /**
     * Updates the amount of coins collected and adjusts the corresponding coin bar image.
     * @param {number} coinAmmount - The current amount of coins collected.
     */
    setCoinAmmount(coinAmmount) {
        this.coinAmmount = coinAmmount;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of the coin bar image based on the current coin amount.
     * @returns {number} The index of the image in the `IMAGES_COINBAR` array.
     */
    resolveImageIndex() {
        if (this.coinAmmount >= 95) {
            return 5;
        } else if (this.coinAmmount >= 75) {
            return 4;
        } else if (this.coinAmmount >= 55) {
            return 3;
        } else if (this.coinAmmount >= 35) {
            return 2;
        } else if (this.coinAmmount > 15) {
            return 1;
        } else {
            return 0;
        }
    }
}