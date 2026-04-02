window.addEventListener("DOMContentLoaded", function () {

    //Code stolen from https://anomalse.github.io/CART263-Winter-2026/task4.html but adapted to my needs

    const garden = document.getElementById("garden-background");
    const flowers = [];



    // SUN
    const sun = document.createElement("div");
    sun.classList.add("sun");
    sun.style.backgroundColor = "rgb(240, 206, 83)";
    sun.style.left = "50px";
    sun.style.top = "30px";
    garden.appendChild(sun);

    const numFlowers = 60;

    for (let i = 0; i < numFlowers; i++) {
        const spacing = window.innerWidth / numFlowers;
        const flowerX = i * spacing + spacing / 2 + (Math.random() * 20 - 10);
        const stemHeight = Math.random() * 50 + 30;


        //FLOWER
        const flower = document.createElement("div");
        const flowerWidth = 40;
        flower.style.position = "absolute";
        flower.style.bottom = "0px";
        flower.style.width = flowerWidth + "px";
        flower.style.left = flowerX - flowerWidth / 2 + "px";
        flower.style.height = stemHeight + "px";
        flower.style.transformOrigin = "bottom center";
        flower.style.transition = "transform 0.2s ease-out";

        garden.appendChild(flower);
        flowers.push({
            el: flower,
            x: flowerX
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
            petal.style.bottom = stemHeight + offsetY - petalSize / 2 + "px"; // center petal

            flower.appendChild(petal);
        }
    }
    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;

        flowers.forEach(f => {
            const distance = mouseX - f.x;
            const maxDistance = 200;

            if (Math.abs(distance) < maxDistance) {
                const force = distance / maxDistance;
                const angle = force * 10;
                f.el.style.transform = `rotate(${angle}deg)`;
            } else {
                f.el.style.transform = "rotate(0deg)";
            }
        });
    });

});