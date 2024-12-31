class Level {

    enemies;
    background;
    clouds;
    healthbar;
    coinbar;
    bottlebar;
    bossbar;
    coin;
    bottle;
    level_end_x = 2200;

    constructor(enemies, background, clouds, coin, bottle, healthbar, coinbar, bottlebar, bossbar) {

        this.enemies = enemies;
        this.background = background;
        this.clouds = clouds;
        this.coin = coin;
        this.bottle = bottle;
        this.healthbar = healthbar;
        this.coinbar = coinbar;
        this.bottlebar = bottlebar;
        this.bossbar = bossbar;

    }
}