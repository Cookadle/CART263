"use strict";

//variables
let counter = 0;
let baseRadius = 50; //size of first circle
let baseAlpha = 50; 

//square orange 
let square = {
    w: 50,
    h: 50,
    x: 100,
    y: 100,
    color: "orange"
};

//red square
let redSquare = {
    w: 50,
    h: 50,
    x: 200,
    y: 100,
    color: "red"
};

//prevent multiple increments 
let mouseWasPressed = false;

function setup() {

    createCanvas(600, 400);

}

function draw() {
    background(175, 209, 148);

    //will draw the square
    displaySquare();
    displayRedSquare();

    //counter up if mouse on square n pressed 4 orange square
    if (mouseWasPressed && checkCollisionWithSquare()) {
        counter++;
        if (counter > 10) counter = 10; //limit counter like constr
        mouseWasPressed = false; //reset after click
    }
    //counter up if mouse on square n pressed 4 red square
    if (mouseWasPressed && checkCollisionWithRedSquare()) {
        counter--;
        if (counter < 0) counter = 0;
        mouseWasPressed = false;
    }






    //Do not draw anything if the counter is greater than 10 or less than 1 (credits to sabine github for this sentence)
    if (counter >= 1 && counter <= 10) {



        //for loop here jen //for (initialization; condition; increment) { bonus 3



        let i = 0;//track how many circles drawn //put for(let here)
        let currentRadius = baseRadius;
        let currentAlpha = baseAlpha;
        // i do this cuz easier for me to track what im doing you could keep it simple by only keeping base radius 

        while (i < counter) { // (let i = 0; i < counter;i++) {
            drawCircle(width / 2, height / 2, currentRadius, currentAlpha);//middle circle elipse wtv

            currentRadius += 25;
            currentAlpha += 10; //modify length (from up to down of circle)
            i++;


        }


    }


}
//register mouse click
function mousePressed() {
    mouseWasPressed = true;
}



//draw orange square
function displaySquare() {
    if (checkCollisionWithSquare()) { //the function is in the name
        fill(255, 165, 0, 200); //lighter orange when hover
    }
    else {
        fill(square.color);//regular orange
    }

    rect(square.x, square.y, square.w, square.h);
}

//draw red square
function displayRedSquare() {
    if (checkCollisionWithRedSquare()) {
        fill(255, 100, 100, 200); // lighter red
    } else {
        fill(redSquare.color);//regular red
    }
    rect(redSquare.x, redSquare.y, redSquare.w, redSquare.h);
}


// Check mouse collision with square orange
function checkCollisionWithSquare() {

    let insideX = mouseX > square.x && mouseX < square.x + square.w;
    //is mouse between left n right sides of the square

    let insideY = mouseY > square.y && mouseY < square.y + square.h;
    //is mouse between top n bottom of the square
    if (insideX && insideY) {
        return true;
    }

    else {
        return false;
    }
}
// Check mouse collision with square red 
function checkCollisionWithRedSquare() {
      
    let insideX = mouseX > redSquare.x && mouseX < redSquare.x + redSquare.w;
    //is mouse between left n right sides of the square
 
    let insideY = mouseY > redSquare.y && mouseY < redSquare.y + redSquare.h;
    //is mouse between top n bottom of the square
    if (insideX && insideY) {
        return true;
    }

    else {
        return false;
    }
}


//draw a ellipse a=alpha r=radius
function drawCircle(x, y, r, a) {
    fill(255, 0);
    ellipse(x, y, r, a);
}

