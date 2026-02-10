class Flower{
    //function inside class do not prefix with 'function'
    constructor(){
    let flower = {
      // Position and size information
      this.x= Math.random()* (window.innerWidth),
      this.y= Math.random()*120,
      this.size= 40,
      this.stemLength= 75,
      this.stemThickness= 10,
      this.petalThickness= 8,
      this.flowerStemDiv= document.createElement("div"),
      this.flowerPetalDiv= document.createElement("div"),
      
      // Color information
      this.stemColor= {
        r: 50,
        g: 150,
        b: 50,
      },
      this.petalColor= {
        r: 200,
        g: 50,
        b: 50,
      },
      this.centreColor= {
        r: 50,
        g: 0,
        b: 0,
      },
    }
}

//to render a flower (passed as an argument)
  function renderFlower(flower){ 
    flower.flowerStemDiv.classList.add("flower");
    flower.flowerStemDiv.style.width = flower.stemThickness+"px";
    flower.flowerStemDiv.style.height = flower.stemLength+"px";
    flower.flowerStemDiv.style.background = `rgb(
        ${flower.stemColor.r},
        ${flower.stemColor.g},
        ${flower.stemColor.b}
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
