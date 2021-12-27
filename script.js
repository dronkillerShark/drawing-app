const drawingCanvas = document.querySelector(".drawingCanvas");
const rest = document.querySelector(".rest");
const canvas = document.querySelector('.drawingCanvas');
const ctx = canvas.getContext('2d');
const changeSize = document.querySelector(".change");
const sizeInput = document.querySelector(".changeSize");
const err = document.querySelector(".error");
const eraser = document.querySelector(".erase");
const colorError = document.querySelector(".err");
const Btns = document.querySelectorAll(".button");

let isDown = false;
let color = `rgb(0, 0, 0)`;
let size = 5;
let isErase = false;

    Btns.forEach((e, i) => {
    e.addEventListener("click", () => {
    Btns.forEach((s) => {
        if(s.classList.contains("active")) s.classList.remove("active");
    })
    e.classList.add("active");
    color = e.classList[1];
    })
    })

const addEventToErase = function(){
    eraser.addEventListener("click", ()=>{
    isErase = true;
    eraser.textContent = "draw";
    eraser.addEventListener("click", ()=>{
    isErase = false;
    eraser.textContent = "erase";
    addEventToErase();
    })
})
}

addEventToErase();

changeSize.addEventListener("click", (e)=>{
    e.preventDefault();
    err.textContent = "";
    size = Number(sizeInput.value);
    if(size > 1000) size = 1000;
    if(!size){
        err.style.color = "red";
        err.textContent = "please type a number!";
    }
    sizeInput.value = "";
})

const createNewPixel = function(e){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((e.clientX - canvas.getBoundingClientRect().x), (e.clientY - canvas.getBoundingClientRect().y), size, 0, 2 * Math.PI);
    ctx.fill();
}

const removePixel = function(e){
    ctx.clearRect((e.clientX - canvas.getBoundingClientRect().x), (e.clientY - canvas.getBoundingClientRect().y), size, size);
}

drawingCanvas.addEventListener("pointermove", (e) =>{
    drawingCanvas.addEventListener("pointerdown", (e) =>{  
        document.body.style.cursor = 'pointer';
        isDown = true;
    })
    drawingCanvas.addEventListener("pointerup", (e) =>{
        document.body.style.cursor = 'default';
        isDown = false;
    })
    if(isDown && !isErase){
        createNewPixel(e);
    } else if (isDown && isErase){
        removePixel(e);
    }
})

rest.addEventListener("click", () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
