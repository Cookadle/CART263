window.onload = setup;
function setup() {
    console.log("events!")
//let intoBoolean ='inactive'
//let sBoolean ='inactive'//to change the boolean in html
    let introSection = document.querySelector("#intro");
    introSection.addEventListener("click", function (e) {
        console.log(this);
        console.log(e)

        //a:
        this.style.background = `rgba(214, 110, 239, 0.5)`
    });
    let introSection = document.querySelector("#intro");
    introSection.addEventListener("click", mouseIntroHandler)
    function mouseIntroHandle(e) {
        //console.log("hello");
        //console.log("this")
        this.style.background = 'rgb(46, 32, 50)';
        //console.log (document.querySelector('#${this.id}p'))
        //console.log("#"+this.id+"p")
        document.querySelector(`#${this.id} p`).classList.add("intro-section-p-active");

        let introSection = document.getElementById("#intro");

        let allSection = document.querySelectorAll(".mouseclicke-active-section");
        for (let element of allSection) {
            element.addEventListener("click"changeOpacityOfSections)
        }
    }
    function changeOpacityOfSections(e) {
        console.log(this);
        let classToAdd = '${this.id}-section-active'
          let classToAddp = '${this.id}-section-p-active'
        this.classlist.add(classToAdd);
        document.querySelector('#{this.id}p').classList.add(classToAddP)
    }
}