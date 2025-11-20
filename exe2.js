let btn=document.querySelector("button");
btn.addEventListener("click" ,function (){
    let h1=document.querySelector("h1");
    let randomColor = getRandomColor()
    h1.innerText=randomColor;

    let p=document.querySelector("p");
    p.style.backgroundColor=randomColor;
})
function getRandomColor(){
    let red=Math.floor(Math.random()*255);
    let green=Math.floor(Math.random()*255);
    let blue=Math.floor(Math.random()*255);
    let color=`rgb(${red},${green},${blue})`;
    return color;
}


let p= document.querySelector("p");
p.addEventListener("scroll" , function(){
    console.log("mouse is out");
})



let btn1=document.querySelectorAll("button")[1];

btn1.onclick=function(){
    btn1.style.backgroundColor="green";}


