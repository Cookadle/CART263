window.onload = function () {
    console.log("move");
    let box = document.querySelector('#draw-box-a');
    box.addEventListener("mousemove", drawBoxCallBack);
     let particle =this.document.createElement("div");
     particle.classList.add("point");
     box.appendChild(particle);
            
        
     }
    
    
    function drawBoxCallBack(e) {
        console.log("moving");
        //console.log(this)
        console.log(e)
        console.log(this.getBoundingClientRect())

        let offsetX=e.clientX - this.getBoundingClientRect
        let offsetY=e.clientY- this.getBoundingClientRect

        particle.style.left =offsetX+"px";
        particle.style.top =offsetY+"px"
        //this.innerHTML = 'x: ${e.clientX} y:${e.clientY}';
    }

