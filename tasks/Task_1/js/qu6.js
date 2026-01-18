"use strict";

const message= "test"; //text object
let offset = 20; //spacing variable 

function setup() {
    createCanvas(600, 400);
    
}


function draw(){
background(88, 90, 30);

    textSize(28);
    fill(255);//white text
    textAlign(CENTER, CENTER);
  text(message,300,200);

   for(let i = 0; i<10; i++){
    const x = i * offset + 15 ; //x posit will space numbers
    let y=15
   
  fill(255);
        textSize(20);
        text(i, x, y);
}


     for(let j = 15; j>1; j--){
    const y = j * offset + 15 ; //yposit will space numbers
    let x=15
      fill(255);
        textSize(20);
        text(j, x, y);
    }



}