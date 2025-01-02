let level1;

function initLevel() {

    level1 = new Level(

        [
            new Chicken('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 300),
            new Chicken('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 1000),
            new Chicken('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 1200),
            new Chick('img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 500),
            new Chick('img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 1500),
            new Chick('img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 1800),
            new Endboss('img/4_enemie_boss_chicken/2_alert/G5.png'),
        ],

        [
            new Background('img/5_background/layers/air.png', -719),
            new Background('img/5_background/layers/3_third_layer/2.png', -719),
            new Background('img/5_background/layers/2_second_layer/2.png', -719),
            new Background('img/5_background/layers/1_first_layer/2.png', -719),
            new Background('img/5_background/layers/air.png', 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 0),
            new Background('img/5_background/layers/air.png', 719),
            new Background('img/5_background/layers/3_third_layer/2.png', 719),
            new Background('img/5_background/layers/2_second_layer/2.png', 719),
            new Background('img/5_background/layers/1_first_layer/2.png', 719),
            new Background('img/5_background/layers/air.png', 719 * 2),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new Background('img/5_background/layers/air.png', 719 * 3),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],

        [
            new Clouds('img/5_background/layers/4_clouds/1.png'),
            new Clouds('img/5_background/layers/4_clouds/2.png'),
        ],

        [
            new Coin('img/8_coin/mycoin.png', 400, 210),
            new Coin('img/8_coin/mycoin.png', 475, 160),
            new Coin('img/8_coin/mycoin.png', 575, 150),
            new Coin('img/8_coin/mycoin.png', 675, 160),
            new Coin('img/8_coin/mycoin.png', 750, 210),
            new Coin('img/8_coin/mycoin.png', 1000, 210),
            new Coin('img/8_coin/mycoin.png', 1075, 160),
            new Coin('img/8_coin/mycoin.png', 1175, 150),
            new Coin('img/8_coin/mycoin.png', 1275, 160),
            new Coin('img/8_coin/mycoin.png', 1350, 210),
        ],

        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 660, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1000, 340),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1250, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1550, 340),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1820, 340),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 860, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 1200, 340),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1450, 340),
            new Bottle('img/6_salsa_bottle/salsa_bottle.png', 450, 340),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1720, 340)
        ]
    );
}