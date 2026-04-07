window.addEventListener("DOMContentLoaded", function () {

    //Code stolen from https://anomalse.github.io/CART263-Winter-2026/task4.html but adapted to my needs

    const garden = document.getElementById("garden-background");
    const flowers = [];



    //SUN
    const sun = document.createElement("div");
    sun.classList.add("sun");
    sun.style.backgroundColor = "rgb(240, 206, 83)";
    sun.style.left = "50px";
    sun.style.top = "30px";
    //append to body instead so can be click
    document.body.appendChild(sun);

    let isNight = false; //day at first
    sun.addEventListener("click", () => {
        isNight = !isNight; //switch between day/night

        if (isNight) {
            //night mode
            garden.style.background = "linear-gradient(to bottom, #0b1d3b 0%, #1a2b4c 40%, #0a1f2b 41%, #061520 100%)";
            sun.style.backgroundColor = "rgb(200, 200, 255)";
            sun.style.boxShadow = "0 0 20px rgba(255,255,255,0.6)"; // soft glow
        } else {
            //day mode
            garden.style.background = "linear-gradient(to bottom, #bde0fe 0%, #e6f2ff 40%, #c7f9cc 41%, #80ed99 100%)";
            sun.style.backgroundColor = "rgb(240, 206, 83)";
            sun.style.boxShadow = "none";
        }
    });

    const numFlowers = 60;

    for (let i = 0; i < numFlowers; i++) {
        const spacing = window.innerWidth / numFlowers;
        const flowerX = i * spacing + spacing / 2 + (Math.random() * 20 - 10);
        const stemHeight = Math.random() * 50 + 30;
        const flowerWidth = 40;

        //FLOWER
        const flower = document.createElement("div");
        flower.style.position = "absolute";
        flower.style.bottom = "0px";
        flower.style.width = flowerWidth + "px";
        flower.style.left = flowerX - flowerWidth / 2 + "px";
        flower.style.height = stemHeight + "px";
        flower.style.transformOrigin = "bottom center";

        garden.appendChild(flower);
        flowers.push({
            el: flower,
            x: flowerX,
            angle: 0,
            target: 0
        });


        //STEM FLOWER
        const stem = document.createElement("div");
        stem.style.width = "4px";
        stem.style.height = stemHeight + "px";
        stem.style.backgroundColor = "green";
        stem.style.position = "absolute";
        stem.style.left = flowerWidth / 2 - 2 + "px";
        stem.style.bottom = "0";
        flower.appendChild(stem);

        //FLOWER CENTER
        const centerSize = 12;
        const center = document.createElement("div");
        center.style.width = centerSize + "px";
        center.style.height = centerSize + "px";
        center.style.borderRadius = "50%";
        center.style.backgroundColor = "yellow";
        center.style.position = "absolute";
        center.style.left = flowerWidth / 2 - centerSize / 2 + "px";
        center.style.bottom = stemHeight - centerSize / 2 + "px";
        flower.appendChild(center);

        //PETALS FLOWER
        const petalCount = 6;
        const petalSize = 12;
        const petalColor = "pink";
        const petalRadius = 10;

        for (let p = 0; p < petalCount; p++) {
            const petal = document.createElement("div");
            petal.style.width = petalSize + "px";
            petal.style.height = petalSize + "px";
            petal.style.borderRadius = "50%";
            petal.style.backgroundColor = petalColor;
            petal.style.position = "absolute";


            const angle = (p / petalCount) * 2 * Math.PI;
            const offsetX = Math.cos(angle) * petalRadius;
            const offsetY = Math.sin(angle) * petalRadius;

            petal.style.left = flowerWidth / 2 + offsetX - petalSize / 2 + "px";
            petal.style.bottom = stemHeight + offsetY - petalSize / 2 + "px"; //center4petal

            flower.appendChild(petal);
        }
    }
    //guided and inspired by https://stackoverflow.com/questions/34374774/how-to-add-inertia-to-animations-tracking-mouse-move?
    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;

        flowers.forEach(f => {
            const distance = mouseX - f.x;
            const maxDistance = 200;

            if (Math.abs(distance) < maxDistance) {
                const force = distance / maxDistance;
                f.target = force * 15;
            } else {
                f.target = 0;
            }
        });
    });

    //guided and inspired by https://stackoverflow.com/questions/34374774/how-to-add-inertia-to-animations-tracking-mouse-move?
    function animate() {
        flowers.forEach(f => {
            f.angle += (f.target - f.angle) * 0.1;
            f.el.style.transform = `rotate(${f.angle}deg)`;
            f.el.style.filter = isNight ? "brightness(0.6)" : "brightness(1)";
        });
        requestAnimationFrame(animate);
    }
    animate();

});