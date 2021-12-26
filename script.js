const drawingCanvas = document.querySelector(".drawingCanvas");
const rest = document.querySelector(".rest");
const canvas = document.querySelector('.drawingCanvas');
const ctx = canvas.getContext('2d');
const changeSize = document.querySelector(".change");
const sizeInput = document.querySelector(".changeSize");
const err = document.querySelector(".error");

let isDown = false;
let color = `rgb(0, 0, 0)`;
let size = 5;

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
    ctx.fillRect((e.clientX - 560), (e.clientY - 215), size, size);
    ctx.stroke();
}

drawingCanvas.addEventListener("pointermove", (e) =>{
    drawingCanvas.addEventListener("pointerdown", (e) =>{    
        isDown = true;
    })
    drawingCanvas.addEventListener("pointerup", (e) =>{
        isDown = false;
    })
    if(isDown){
        createNewPixel(e);
    }
})

rest.addEventListener("click", () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})