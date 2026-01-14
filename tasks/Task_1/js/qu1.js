"use strict";
//note to self ask sabine if its okay to have no draw,only setup and keep all in setup later
function setup() {
  console.log("go")
  createCanvas(400, 400)
  background(76, 70, 120);

  //declare variables
  let x, y, w, h;
  let r, g, b;

  //draw ellipses start here
  x = 100;
  y = 100;
  w = 80;
  h = 60;

  r = 255;
  g = 0;
  b = 0;
  fill(r, g, b);
  ellipse(x, y, w, h);//draw first eclipse

  //second one 
  x = 250;
  y = 150;
  w = 120; 
  h = 90;

  r = 0;
  g = 255;
  b = 0;
  fill(r, g, b);
  ellipse(x, y, w, h);//draw second eclipse

//third ellipse start here 
  x = 150;
  y = 300;
  w = 150;
  h = 100;
  
  r = 0;
  g = 0;
  b = 255;
  fill(r, g, b);
  ellipse(x, y, w, h);//draw third eclipse
}