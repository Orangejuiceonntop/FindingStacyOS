var currentTime = new Date().toLocaleString();
var timeText = document.querySelector("#timeElement");
timeText.innerHTML = currentTime
setInterval(function() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}, 1000);

//Allows windows to be dragged/moved
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector('#notes'));
dragElement(document.querySelector('#calc'));
dragElement(document.querySelector('#paint'));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
    element.userSelect = "none";
  } else {
    element.onmousedown = startDragging;
  }
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "block"
}
  var welcomeScreenClose = document.querySelector("#welcomeclose")
  var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
})

var selectedIcon= undefined
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}
function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}
function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

//open and close windows
var notesScreen = document.querySelector('#notes')
var notesScreenClose = document.querySelector('#notesclose')
notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
var notesScreenOpen = document.querySelector('#notesopen')
notesScreenOpen.addEventListener("click", () => openWindow(notesScreen));

var calcScreen = document.querySelector('#calc')
var calcScreenClose = document.querySelector('#calcclose')
calcScreenClose.addEventListener("click", () => closeWindow(calcScreen));
var calcScreenOpen = document.querySelector('#calcopen')
calcScreenOpen.addEventListener("click", () => openWindow(calcScreen));

var paintScreen = document.querySelector('#paint')
var paintScreenClose = document.querySelector('#paintclose')
paintScreenClose.addEventListener("click", () => closeWindow(paintScreen));
var paintScreenOpen = document.querySelector('#paintopen')
paintScreenOpen.addEventListener("click", () => openWindow(paintScreen))

var biggestIndex = 1;
function openWindow(element) {
  element.style.display = "block";
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}

//Click on window, it goes on top
document.addEventListener('mousedown', (e) =>{
  const clickedWindow = e.target.closest('.window');
  if (clickedWindow) {
    biggestIndex++;
    clickedWindow.style.zIndex = biggestIndex
    topBar.style.zIndex = biggestIndex + 1
  }
})

//Top bar will always be on top of the screens
var topBar = document.querySelector("#top")
function openWindow(element) {
  element.style.display = "block";
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1
}
function handleWindowTap(element) {
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1
  deselectIcon(selectedIcon)
}

//Code for paint app
const board = document.getElementById("board");
const context = board.getContext("2d")

let isDrawing = false;

const colorPicker = document.getElementById("color-picker")
const brushSize = document.getElementById("brush-size")
const clear = document.getElementById("clear")
const fill = document.getElementById("fill")

board.addEventListener("mousedown", () => {isDrawing = true})
board.addEventListener("mouseup", () => {
  isDrawing = false;
  context.beginPath();
})
board.addEventListener("mouseout", () => {isDrawing = false})
board.addEventListener("mousemove", draw);

function draw(e) {
  if (!isDrawing) return;

  context.lineWidth = brushSize.value;
  context.lineCap = "round";
  context.strokeStyle = colorPicker.value;

  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  context.beginPath();
  context.moveTo(e.offsetX, e.offsetY);
}