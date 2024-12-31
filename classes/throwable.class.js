class Throwableobject extends MovableObject {

    width = 45;
    height = 60;
    isSplashed = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    IMAGES_THROWN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    throw() {
        this.speedY = 25;
        this.applyGravity();
        playSound('throw_sound');
        setInterval(() => {
            if(!this.isSplashed){
            this.x += 28;
            this.playAnimation(this.IMAGES_THROWN);
            } else {
                this.speedY = 0;
                this.speedY = 0;
                this.acceleration = 0;
            }
        }, 60);
    }


    splashAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        },200);
    }
}