class beehive {

constructor(x,y,width,height,r,g,b){
this.x=x;
this.y=y;
this.width=width;
this.height=height;
this.r=r;
this.g=g;
this.b=b;
this.rs=10
this.beehive=document.createElement("div")
}
}
renderbeehive(){

this.beehive.style.width=this.width +"px"
this.beehive.style.height=this.height +"px"
this.beehive.style.left=this.left.x +"px"
this.beehive.style.topt=this.right.y +"px"
document.getElementsByClassName("sky")[0].appendChild(this.beehive);
}