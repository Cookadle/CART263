"use strict";
let circleSize = 30 //multiple of 5
let circleColor;//store color
let isCircle = true; // start w circle


function setup() {
    createCanvas(600, 300);
    rectMode(CENTER);//center square when clicked
    circleColor = color(random(255), random(255), random(255));

}


function draw() {
    background(40, 80, 90);


    let spacing = circleSize * 1;//space circle 
    fill(circleColor);
    stroke(0);


    //for (start value; condition; change) {}
    //distance btwen circles( let y=start at 50,loop as long yx smaller canvas h/w,increase)
    for (let y = spacing; y < height; y += spacing) { //rows
        for (let x = spacing; x < width; x += spacing) { //columns
            
            if (isCircle) {
                ellipse(x, y, circleSize, circleSize);
            }
            else {
           
                rect(x, y, circleSize, circleSize);
            }
        }
    }



}
function keyPressed() {
    if (keyCode === 32) {
        circleColor = color(random(255), random(255), random(255));
    }
}

function mousePressed() {
    isCircle = !isCircle;
}
