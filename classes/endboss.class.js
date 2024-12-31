class Endboss extends MovableObject {

    height = 450;
    width = 350;
    world;
    currentImage = 0;
    y = 10;
    damagetaken = false;
    isDead = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_WIN = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png', 
        'img/4_enemie_boss_chicken/4_hurt/G22.png', 
        'img/4_enemie_boss_chicken/4_hurt/G23.png' 
    ];

    IMAGES_ALERT = [
       'img/4_enemie_boss_chicken/2_alert/G5.png',
       'img/4_enemie_boss_chicken/2_alert/G6.png',
       'img/4_enemie_boss_chicken/2_alert/G7.png',
       'img/4_enemie_boss_chicken/2_alert/G8.png',
       'img/4_enemie_boss_chicken/2_alert/G9.png',
       'img/4_enemie_boss_chicken/2_alert/G10.png',
       'img/4_enemie_boss_chicken/2_alert/G11.png',
       'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    bossContact = false;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WIN);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 2400;
        this.animate();
        this.offsetX = 20;
        this.offsetY = 10;
        this.offset = {
            left: 40,
            right: 10,
            top: 70,
            bottom: 30
        };
    }


    animate() {
                        // aus Video Modul 12
        let i = 0;
        setInterval(() => {
            if(i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

            i++;

            if(world.character.x > 2000 && !bossContact) {
                i = 0;
                bossContact = true;
            }
        }, 150);
//
        setInterval(() => {
            if (this.damagetaken) {
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.damagetaken = false;
                }, 500);
            }
            if (this.bossEnergy <= 0) {
                this.playAnimation(this.IMAGES_WIN);
            }
        }, 200);
    }
}