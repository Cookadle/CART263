window.onload = go_all_stuff;

function go_all_stuff() {
    console.log("go");
    //mic var set up first (notes for class presentation;)
    let audioCtx;
    let analyser;
    let dataArray;

    //mic access
    navigator.mediaDevices.getUserMedia({ audio: true })
        //class prsentation :once accepted we covert mic input for audio context
        .then(function (stream) {

            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            let source = audioCtx.createMediaStreamSource(stream);

            analyser = audioCtx.createAnalyser();

            dataArray = new Uint8Array(analyser.frequencyBinCount);// class p:array for storing data
            //connect mic
            source.connect(analyser);
        })
        .catch(function (err) {//....handle error...
            console.log("had an error getting the microphone", err)
        });
    /* for loading the video */
    let videoEl = document.getElementById("video-birds");
    window.addEventListener("click", function () {
        if (videoEl.currentTime === 0) {
            videoEl.play()
        }
    })


    videoEl.loop = true;

    let theCanvases = document.querySelectorAll(".canvases");
    let theContexts = [];
    //add a context for each canvas and put into an array

    for (let i = 0; i < theCanvases.length; i++) {
        let context = theCanvases[i].getContext("2d");
        theContexts.push(context);
    }

    let drawingBoardA = new DrawingBoard(theCanvases[0], theContexts[0], theCanvases[0].id);
    //add a circular object to canvas A
    drawingBoardA.addObj(new CircularObj(100, 100, 20, "#FFC300", "#E6E6FA", drawingBoardA.context))
    drawingBoardA.display();



    let drawingBoardB = new DrawingBoard(theCanvases[1], theContexts[1], theCanvases[1].id);
    //add a rectangular object to canvas B
    drawingBoardB.addObj(new RectangularObj(100, 100, 50, 70, "#FF5733", "#E6E6FA", drawingBoardB.context))
    drawingBoardB.display();


    let drawingBoardC = new DrawingBoard(theCanvases[2], theContexts[2], theCanvases[2].id);
    //add a freestyle object to canvas C
    drawingBoardC.addObj(new FreeStyleObj(10, 100, 300, "#CF9FFF", "#CF9FFF", drawingBoardC.context))
    drawingBoardC.display();

    let drawingBoardD = new DrawingBoard(theCanvases[3], theContexts[3], theCanvases[3].id);
    drawingBoardD.addObj(new VideoObj(0, 0, 400, 300, videoEl, drawingBoardD.context))
    drawingBoardD.display();


    /*** RUN THE ANIMATION LOOP  */
    window.requestAnimationFrame(animationLoop);

    function animationLoop() {
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);// class pres: get data for sound 
            let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;//class p:conver our multiple values into one
            volume = volume * 2; 
            // class p;send volume to board B
            drawingBoardB.setMicInput(volume);
            //class p t3;send volume to board C
            drawingBoardC.setMicInput(volume);
        }//class p:bring them to drawing board js




        /*** CALL THE EACH CANVAS TO ANIMATE INSIDE  */
        drawingBoardA.animate();
        drawingBoardB.animate();
        drawingBoardC.animate();
        drawingBoardD.run(videoEl)
        window.requestAnimationFrame(animationLoop);
    }


}