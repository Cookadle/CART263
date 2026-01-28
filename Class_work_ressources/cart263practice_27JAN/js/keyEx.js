window.onload = function () {
    console.log("keys");

    let speedX = 5;
    let boxA = document.querySelector("#boxA");


    window.addEventListener("keydown",function (e) {    
        if (e.key === "ArrowRight") {
                //console.log(ParseIntboxA.style.left)
                let currentPos = parseInt(boxA.style.left)
                boxA.style.left = currentPos + speedX+"px"
            }
            if (e.key === "ArrowLeft") {
                //console.log(ParseIntboxA.style.left)
                let currentPos = parseInt(boxA.style.left)
                boxA.style.left = currentPos - speedX+"px"
            }
            //console
        })

    }
//interactiveness for project 1 ideas
