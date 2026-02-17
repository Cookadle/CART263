class Flower{
    //function inside class do not prefix with 'function'
   
constructor(x,y,size,stemLength,petalColor) {
      // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 8;
    this.flowerStemDiv = document.createElement("div");
    this.flowerPetalDiv = document.createElement("div");
      
 // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50,
    };
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0,
    };
  }
}
for (let i = 0; i < garden.numFlowers; i++) {
      // Create variables for our arguments for clarity
      let x = Math.random() * (window.innerWidth-100);
      let y = Math.random() * 120;
      let size = Math.random() * 30 + 50;
      let stemLength = Math.random() * 50 + 50;
      let petalColor = {
        r: parseInt(Math.random() * 155) + 100,
        g: parseInt(Math.random() * 155) + 100,
        b: parseInt(Math.random() * 155) + 100,
      };

      // Create a new flower using the arguments
      let flower = new Flower(x, y, size, stemLength, petalColor);
      // Add the flower to the array of flowers
      garden.flowers.push(flower);
    }
this.flowerStemDiv.addEventL
//to render a flower (passed as an argument)
  renderFlower(flower){ 
    this.flower.flowerStemDiv.classList.add("flower");
    flower.flowerStemDiv.style.width = flower.stemThickness+"px";
    flower.flowerStemDiv.style.height = flower.stemLength+"px";
    flower.flowerStemDiv.style.background = `rgb(
        ${flower.stemColor.r},
        ${flower.stemColor.g},
        ${this.flower.stemColor.b}
        )`;
    flower.flowerStemDiv.style.left = flower.x+"px";
    flower.flowerStemDiv.style.top = flower.y-flower.stemLength+"px";
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(flower.flowerStemDiv);

    flower.flowerPetalDiv.classList.add("petal");
    flower.flowerPetalDiv.style.width = flower.size+"px";
    flower.flowerPetalDiv.style.height = flower.size+"px";
    flower.flowerPetalDiv.style.borderRadius = flower.size+"px"

    flower.flowerPetalDiv.style.background = `rgb(
        ${flower.centreColor.r},
        ${flower.centreColor.g},
        ${flower.centreColor.b}
        )`;
    flower.flowerPetalDiv.style.left = (flower.x-flower.size/2)+"px";
    flower.flowerPetalDiv.style.top = (flower.y-flower.stemLength-flower.size/2)+"px";
    flower.flowerPetalDiv.style.borderWidth = flower.petalThickness+"px";
    flower.flowerPetalDiv.style.borderColor =  `rgb(
        ${flower.petalColor.r},
        ${flower.petalColor.g},
        ${flower.petalColor.b}
        )`;
     //add to the DOM
     document.getElementsByClassName("grass")[0].appendChild(flower.flowerPetalDiv);
}
