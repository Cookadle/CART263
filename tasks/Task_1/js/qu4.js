
//im a lazy baby so ill reuse the same variables from question 3 
"use strict";

//w=w/h=heigth as always

const canvasW = 400;
const canvasH = 400;
const rectW = canvasW / 3;  //rectangle 1/3 of the w of the canvas as asked
const rectH = canvasH;   //full h of the canvas=full h rectangle

const colors = {
    rect1: color(0, 0, 255),
    rect2: color(0, 0, 200),
    rect3: color(0, 0, 150)
};



function setup() {
    console.log("go")
    createCanvas(400, 400)

}

function draw() {
    background(220);

    //check if mouse hover rectangle n change color
    if (mouseX >= 0 && mouseX <= rectW && mouseY >= 0 && mouseY <= rectH) {
        color.rect1 = color(255);  //white when mouse hover first rectangle
    }
    else {
        color.rect1 = color(0, 0, 255);  //backtoblue
    }

    if (mouseX > rectW && mouseX <= 2 * rectW && mouseY >= 0 && mouseY <= rectH) {
        color.rect2 = color(255);  //white when mouse hover second rectangle
    } else {
        color.rect2 = color(0, 0, 200);// og color
    }

    if (mouseX > 2 * rectW && mouseX <= canvasW && mouseY >= 0 && mouseY <= rectH) {
        color.rect3 = color(255);  //white when mouse hover third rectangle
    } else {
        color.rect3 = color(0, 0, 150);  // og color
    }

    //draw rectangles 
    fill(color.rect1);
    rect(0, 0, rectW, rectH);  //first rectangle x=0 aka edge canvas (x,y,rectW,rectH)

    fill(color.rect2);
    rect(rectW, 0, rectW, rectH);  // x = rectw cuz this rect start here 1st end // second rectangle

    fill(color.rect3);
    rect(2 * rectW, 0, rectW, rectH);  //third rectangle at x=2*rectW like last
}
