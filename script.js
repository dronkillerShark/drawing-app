const drawingCanvas = document.querySelector(".drawingCanvas");
const rest = document.querySelector(".rest");
const canvas = document.querySelector('.drawingCanvas');
const ctx = canvas.getContext('2d');
const changeSize = document.querySelector(".change");
const sizeInput = document.querySelector(".changeSize");
const err = document.querySelector(".error");
const eraser = document.querySelector(".erase");
const redInp = document.querySelector(".red");
const greenInp = document.querySelector(".green");
const blueInp = document.querySelector(".blue");
const changeColorButton = document.querySelector(".change__color");
const colorError = document.querySelector(".err");

let isDown = false;
let color = `rgb(0, 0, 0)`;
let size = 5;
let isErase = false;

changeColorButton.addEventListener("click", (e) => {
    e.preventDefault();
    colorError.textContent = "";
    colorError.style.color = "red";
    if(redInp.value == "") redInp.value = 0;
    if(blueInp.value == "") blueInp.value = 0;
    if(greenInp.value == "") greenInp.value = 0;
    if(!greenInp.value
        || 
        !blueInp.value 
        ||
        !redInp.value){
            colorError.textContent = "please type a number!";
        }
    color = `rgb(${redInp.value}, ${greenInp.value}, ${blueInp.value})`;
    redInp.value = blueInp.value = greenInp.value = '';
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
    if(!size){
        err.style.color = "red";
        err.textContent = "please type a number!";
    }
    sizeInput.value = "";
})

const createNewPixel = function(e){
    ctx.fillStyle = color;
    ctx.fillRect((e.clientX - 630), (e.clientY - 215), size, size);
    ctx.stroke();
}

const removePixel = function(e){
    ctx.clearRect((e.clientX - 630), (e.clientY - 215), size, size);
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