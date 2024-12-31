class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 150;
    y = 130;
    height = 290;
    width = 130;
    offsetX = 0;
    offsetY = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };


    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * @param {string} path - The path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the object's image on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the object's original and adjusted hitboxes on the canvas for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
/*
    drawFrame(ctx) {
        if (
            this instanceof Throwableobject ||
            this instanceof Chick ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Character ||
            this instanceof Bottle
        ) {
            ctx.beginPath();
            ctx.lineWidth = '6';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);      // zeigt die original "hitboxen" an (gelbe umrandung)
            ctx.stroke()
        }
        if (this instanceof Throwableobject ||
            this instanceof Chick ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Character ||
            this instanceof Bottle
        ) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,           //Zeigt die neuen "hitboxen" an (rote umrandung)
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
*/

    /**
     * Loads an array of images into the `imageCache` object.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}