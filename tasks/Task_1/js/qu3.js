"use strict";

//w=Width h=heigth duh? setting up rectangle w/h here

//first
const rect1W = 110
const rect1H = 70
//second
const rect2W = 190
const rect2H = 95
//third (can this line be simplified into one line and programmer approved or is it bad habits?to ask sabine)
const rect3W = 160
const rect3H = 80

//set position of rectangle at launch
let rect1X = 30; //x/y position rectangle 1
let rect1Y = 45;

let rect2X = 250; //x/y position rectangle 2
let rect2Y = 150;

let rect3X = 30; //x/y position rectangle 3
let rect3Y = 300;

let rect3Color;  //color for rectangle 3


function setup() {
    console.log("go")
    createCanvas(400, 400)
    rect3Color = color(random(255), random(255), random(255));  //first random color rect3

}

function draw() {
    background(0, 70, 0);
    background(0, 70, 0); // Background color (greenish)

    //draw first red rectangle 
    fill(255, 0, 0);
    rect(rect1X, rect1Y, rect1W, rect1H);

    //draw second green rectangle
    fill(0, 255, 0);
    rect(rect2X, rect2Y, rect2W, rect2H);

    //draw third rectangle
    fill(rect3Color);  //random color for rect3
    rect(rect3X, rect3Y, rect3W, rect3H);
}


function mousePressed() {
    //move rectangle 1 randomly
    rect1X = random(width - rect1W); //subtracting the w/h of the rectangle so doesnt go off canvas
    rect1Y = random(height - rect1H); 
}
function keyPressed(){
    if (key === ' ') { // check spacebar pressed
rect2X= random(height - rect2H); //same thing as previous rectangle im boring sue me
rect2Y= random(height - rect2H); 
    }
}
function mouseMoved() {
    //color rect3 will b random when mouse moves
    rect3Color = color(random(255), random(255), random(255));
}
