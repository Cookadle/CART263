"use strict";
let circleSize = 30
let spacing = circleSize * 2; 

function setup() {
    createCanvas(600, 400);

}


function draw() {
    background(40, 80, 90);
    
    let spacing = 50;//distance btwen circles( let y=start at 50,loop as long yx smaller canvas h/w,increase)
    for (let y = spacing; y < height; y += spacing) { //rows
        for (let x = spacing; x < width; x += spacing) { //columns
            ellipse(x, y, 30, 30);
        }
    }
}