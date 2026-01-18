"use strict";

const message = "test"; //text object
let offset = 22; //spacing numbers

function setup() {
    createCanvas(600, 400);

}


function draw() {
    background(88, 90, 30);
    push();
    textSize(28);
    fill(255);//white text
    textAlign(CENTER, CENTER);
    text(message, 300, 200);
    pop();


    textAlign(LEFT, TOP);
    for (let i = 0; i < 10; i++) {
        const x = i * offset + 40;
        const y = 20

        fill(255);
        textSize(16);
        text(i, x, y);
    }

    textAlign(LEFT, TOP);
    for (let j = 15; j >= 1; j--) {
        const y = (16 - j) * offset + 30;//hated this bonus
        const x = 15
        fill(255);
        textSize(16);
        text(j, x, y);
    }



}