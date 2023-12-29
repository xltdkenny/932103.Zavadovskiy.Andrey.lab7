document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const numShapesInput = document.getElementById("numShapes");
    const addSquareButton = document.getElementById("addSquare");
    const addTriangleButton = document.getElementById("addTriangle");
    const addCircleButton = document.getElementById("addCircle");
    const clearAllButton = document.getElementById("clearAll");

    addSquareButton.addEventListener("click", () => addShape("square"));
    addTriangleButton.addEventListener("click", () => addShape("triangle"));
    addCircleButton.addEventListener("click", () => addShape("circle"));
    clearAllButton.addEventListener("click", clearAllShapes);

    function addShape(type) {
        const numShapes = parseInt(numShapesInput.value);
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
    
        for (let i = 0; i < numShapes; i++) {
            const shape = document.createElement("div");
            shape.classList.add("shape", type);
    
            let width, height;
    
            // Генерируем случайные размеры для фигуры в соответствии с её типом
            if (type === "square") {
                width = getRandomInt(10, 70); 
                height = width;
            } else if (type === "triangle") {
                const size = getRandomInt(20, 70);
                shape.style.borderLeft = `${size / 2}px solid transparent`;
                shape.style.borderRight = `${size / 2}px solid transparent`;
                shape.style.borderBottom = `${size * 1.5}px solid blue`;
            } else if (type === "circle") {
                width = getRandomInt(10, 70); 
                height = width; 
            }
    
            const leftPosition = getRandomInt(0, canvasWidth - 60);
            const topPosition = getRandomInt(0, canvasHeight - 60);

            shape.style.width = `${width}px`;
            shape.style.height = `${height}px`;
            shape.style.left = `${leftPosition}px`;
            shape.style.top = `${topPosition}px`;

            
            shape.addEventListener("click", () => selectShape(shape));

            
            shape.addEventListener("dblclick", () => removeShape(shape));
            canvas.appendChild(shape);
        }
    }
    

    numShapesInput.addEventListener("input", () => {
        const value = parseInt(numShapesInput.value);
        if (value < 1) {
            alert("Значение не может быть меньше 1");
            numShapesInput.value = 1;
        } else if (value > 10) {
            alert("Значение не может быть больше 10");
            numShapesInput.value = 10;
        }
    });
    

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function selectShape(shape) {
        const selectedShapes = document.querySelectorAll(".selected");
        selectedShapes.forEach((s) => {
            s.classList.remove("selected");
            s.classList.remove("selected-" + s.classList[1]);
            s.classList.add(s.classList[1]);
        });
        
        if (!shape.classList.contains("selected")) {
            shape.classList.add("selected");
            shape.classList.add("selected-" + shape.classList[1]);
            if (shape.classList.contains("triangle")) {
                shape.classList.add("selected-triangle-color");
            }
        } else {
            shape.style.display = "none"; // Скрываем выбранный элемент
        }
    }
    
    
    

    function removeShape(shape) {
        shape.remove();
    }

    function clearAllShapes() {
        const shapes = document.querySelectorAll(".shape");
        shapes.forEach((shape) => shape.remove());
    }
});
