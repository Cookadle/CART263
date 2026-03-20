//TEAM:NouNounne Barette,Joyce A. Lam,Jeany Corrius V.
class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY =10;
    this.shapeCol = "#000000";
 
    //blur filter
    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    this.userProvidedBlur  = 0;
    let self = this;

    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      console.log(self.userProvidedBlur);
    });

    //hue filter
    let filterButton_hue  = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");  
    this.userProvidedDeg = 0;

    filterButton_hue.addEventListener("click", function () {
    //get value from input field
      self.userProvidedDeg = hueInput.value;
      console.log(self.userProvidedDeg)
    });

    //sepia filter
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");
    this.userProviderSepia = 0;

    filterButton_sepia.addEventListener("click", function() {
      //get value from input field
      self.userProviderSepia = sepiaInput.value;
      console.log(self.userProviderSepia);
    });

    //invert filter
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");
    this.userProviderInvert = 0;

    filterButton_invert.addEventListener("click", function() {
      //get value from input field
      self.userProviderInvert = invertInput.value;
      console.log(self.userProviderInvert);
    });

  }

  display() {
    this.context.save();
    this.context.filter = `blur(${this.userProvidedBlur}px)`; //blur filter
    this.context.filter += `hue-rotate(${this.userProvidedDeg}deg)`; //hue rotate filter
    this.context.filter +=`sepia(${this.userProviderSepia}%)`; // can add % for slower change
    this.context.filter += `invert(${this.userProviderInvert})`;// can add % for slower chaage
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50,50)
    this.context.restore();
  }

  //called when rectangle color is to be updated
  changeColor(newCol){
    this.shapeCol = newCol;
  }

  //called when rectangle Pos is to be updated
  updatePositionRect(mx,my){
    this.shapeX = mx;
    this.shapeY = my;
  }

  update(videoElement) {
    this.videoElement = videoElement;
  }
}