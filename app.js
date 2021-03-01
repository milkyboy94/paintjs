const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// canvas에 width와 height값을 주어야함

const INITIAL_COLOR = "##2c2c2c";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 위 두 코드는 바탕화면의 디폴트 색값을 흰색으로 만들기 위한 작업
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let point = false;
let filling = false;

function stopPainting() {
  point = false;

  //painting에 불리언을 주면서 마우스를 클릭했을때와 그렇지 않았을 때의 작동을 구분
}

function startPainting() {
  point = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!point) {
    ctx.beginPath();
    ctx.moveTo(x, y);

    // path를 만들면 마우스의 xy좌표로 path를 옮기는 상황
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCM(event) {
  event.preventDefault();
  // 우클릭을 해도 save옵션이 뜨지 않음
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// array.from 메서드는 object로부터 array를 만든다.

Array.from(colors).forEach((items) =>
  items.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

range.addEventListener("input", handleRangeChange);

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

mode.addEventListener("click", handleModeClick);

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PAINTJS[EXPORT]";
  link.click();
}

saveBtn.addEventListener("click", handleSaveClick);
