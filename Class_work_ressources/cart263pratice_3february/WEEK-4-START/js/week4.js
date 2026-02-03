window.onload = setup;
function setup() {
  console.log("in week 4 ;)")
}
 document.querySelector("boxA").addEventListener("click",runTimeOut)

 function runTimeOut(){
  window.setTimeout(addTimeoutText,2000);

 }
 function addTimeoutText