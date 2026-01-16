"use strict";




function setup() {
    createCanvas(600, 400);
    background(88, 90, 30);
    textSize(28);
    fill(255);// white text
    textAlign(CENTER, CENTER);// text centered
    text("test", 300, 200);
    for (let i = 0; i <= 9; i++) {
        let x = i * 20;
        let y = 100;

        text(i, x, y);
    }


}