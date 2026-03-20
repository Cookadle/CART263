class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.speed = 2; // move right default
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update(volume) {
    //update freestyle
    // this.x+=1;
    //class p; we set up mic volume storage
    if (volume !== undefined) {
      this.micVolume = volume;
      //class p; then size will change cuz mic
      this.width = 50 + this.micVolume * 0.4;   // width grow volume increases
      this.height = 70 + this.micVolume * 0.4;  // height grow volume increases

      let r = Math.min(255, this.micVolume * 2);
      this.fill_color = `rgb(${r}, 100, 200)`; // class p ;redder fill when volume goes

      //class p; move horizontally and bounce off canvas 
      this.x += this.speed;

      if (this.x + this.width > 400 || this.x < 0) {
        this.speed *= -1; // reverse direction
      }
      
    }
    //console.log("rectangle update")
  } 
}
