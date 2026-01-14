"use strict";
function setup() {
  createCanvas(400, 400);
    background(88,90,30)
  drawEllipse(100, 100, 80, 60, 255, 0, 0);   //red eclipse top left
  drawEllipse(250, 150, 120, 90, 0, 255, 0); //green eclipse rigth middle
  drawEllipse(150, 300, 150, 100, 0, 0, 255); //blue eclipse bottom
}


function drawEllipse(x, y, w, h, r, g, b) { 
  fill(r, g, b);
  ellipse(x, y, w, h);
}