//TEAM:NouNounne Barette,Joyce A. Lam,Jeany Corrius V.
class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = .07;
    this.context = context;

  }

  display() {
    //this.theta = 0; //reset everytime
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 4; //for thickness
    this.context.beginPath();
    this.context.moveTo(this.x, this.y)

for (let i = 0; i < this.context.canvas.width; i++) {
    let x = i + this.x;
    let y = this.y + Math.sin(this.theta + (i + this.x) * 0.05) * this.yOffset;

    if (i === 0) {
        this.context.moveTo(i, y); //start path first point
    } else {
        this.context.lineTo(i, y); //continue the wave=removed weird straight line
    }
}
    this.context.stroke(); //set the stroke
  
  }
  //class p t3; same as rectangular.js
  update(volume) {
      this.theta += this.angularSpeed;//move wave with theta


    this.x += 1;
      if (this.x > 400) {
        this.x = 0;
      }

    if (volume !== undefined) {

      this.micVolume = volume;
      //class p t3;  we change colour  
      let g = Math.min(255, this.micVolume * 2);
      this.stroke_color = `rgb(100, ${g}, 255)`;
      //Shaope change 
      this.yOffset = 20 + this.micVolume * 0.5;

      //class p t3 ;wave movement for animation
       this.yOffset = 20 + this.micVolume * 0.5; // bigger wave
    
      // class p t3 ;then we add horizontal move addded on top so move regardless


      //console.log(volume);
      // console.log("free style update"
    }
  }
}