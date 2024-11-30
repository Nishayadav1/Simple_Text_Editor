let canvas = document.getElementById("canvas");
let history = [""];
let redoStack = [];

function addText() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    let textBox = document.createElement("div");
    textBox.className = "text-box";
    textBox.textContent = userInput;
    textBox.style.fontSize = document.getElementById("fontSize").value + "px";
    textBox.style.fontFamily = document.getElementById("fontStyle").value;
    textBox.style.position = "absolute";
    textBox.style.left = "10px"; 
    textBox.style.top = "10px";

    textBox.onmousedown = (e) => {
        let offsetX = e.offsetX;
        let offsetY = e.offsetY;

        canvas.onmousemove = (moveEvent) => {
            let left = moveEvent.pageX - canvas.offsetLeft - offsetX;
            let top = moveEvent.pageY - canvas.offsetTop - offsetY;


            left = Math.max(0, Math.min(left, canvas.offsetWidth - textBox.offsetWidth));
            top = Math.max(0, Math.min(top, canvas.offsetHeight - textBox.offsetHeight));

            textBox.style.left = left + "px";
            textBox.style.top = top + "px";
        };

        canvas.onmouseup = () => {
            canvas.onmousemove = null; 
            saveState();
        };
    };

    canvas.appendChild(textBox);
    document.getElementById("userInput").value = ""; 
    saveState();
}

function saveState() {
    history.push(canvas.innerHTML);
    redoStack = [];
}

function undo() {
    if (history.length > 1) {
        redoStack.push(history.pop());
        canvas.innerHTML = history[history.length - 1];
    } else {
        alert("Nothing to undo!");
    }
}

function redo() {
    if (redoStack.length > 0) {
        history.push(redoStack.pop());
        canvas.innerHTML = history[history.length - 1];
    } else {
        alert("Nothing to redo!");
    }
}


function updateFontStyle() {
    let fontStyle = document.getElementById("fontStyle").value;
    document.querySelectorAll(".text-box").forEach((box) => {
        box.style.fontFamily = fontStyle;
    });
    saveState();
}

function updateFontSize() {
    let fontSize = document.getElementById("fontSize").value;
    document.querySelectorAll(".text-box").forEach((box) => {
        box.style.fontSize = fontSize + "px";
    });
    saveState();
}

saveState();