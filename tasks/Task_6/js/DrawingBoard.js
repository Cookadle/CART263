class DrawingBoard {
  /* Constructor */
  constructor(canvas, context,drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    this.drawingBoardId = drawingBoardId;
    // class p: we store microphone input
    this.micVolume = 0;  //class p; then we go to rectangle js
    let self = this;
      //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    window.addEventListener("keydown", function (e) {

      if (e.key === "Backspace") {
        self.removeObj();
        self.removeObj();
        self.removeObj();
      }
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    this.radius = getRandomInt(5, 45);
    this.color = generateRandomHexCode();
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
      //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      // console.log("in A")
      let newCircle = new CircularObj(this.mouseOffsetX, this.mouseOffsetY, this.radius, this.color, "#E6E6FA", this.context);
      this.addObj(newCircle);
    }
    if (this.drawingBoardId === "partB") {
      // console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      // console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      // console.log("in D")
    }
  }

  clickCanvas(e) {
   // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
    this.radius = getRandomInt(5, 45);
    this.color = generateRandomHexCode();

    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      // console.log("in A")

    }
    if (this.drawingBoardId === "partB") {
      // console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      // console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      // console.log("in D")
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }
removeObj() {
    if (this.drawingBoardId === "partA") {
      // console.log("in A")
      this.objectsOnCanvas.pop();
    }
  }

  setMicInput(volume) {
  this.micVolume = volume;
}

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {

    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
     this.objectsOnCanvas[i].update(this.micVolume); //get volume for both task 2 n 3 
   
     this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement){
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
}

// 
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// from: https://dev.to/thecodepixi/what-the-hex-how-to-generate-random-hex-color-codes-in-javascript-21n
function generateRandomHexCode() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  let hexCode = "#"

  while (hexCode.length < 7) {
    hexCode += digits[Math.round(Math.random() * digits.length)]
  }

  return hexCode
}
