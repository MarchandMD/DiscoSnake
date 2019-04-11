/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

//box unit
const box = 32;

//LOAD IMAGES AND SOUND
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// const dead = new Audio();
// const eat = new Audio();
// const up = new Audio();
// const left = new Audio();
// const right = new Audio();
// const down = new Audio();
// dead.src = "audio/dead.mp3";
// eat.src = "audio/eat.mp3";
// up.src = "audio/up.mp3";
// left.src = "audio/left.mp3";
// right.src = "audio/right.mp3";
// down.src = "audio/down.mp3";




//create the food, randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//create the score variable
let score = 0;

//create snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//old head position
let snakeX = snake[0].x;
let snakeY = snake[0].y;
console.log(snakeX);

//CONTROL THE SNAKE
//with keys; 
let d;


document.addEventListener("keydown", direction);

function direction(e) {
    if (e.keyCode == 37 && d != "RIGHT") {
        //left.play();
        d = "LEFT";
        console.log(d);
        return d;
    } else if (e.keyCode == 38 && d != "DOWN") {
        //up.play();
        d = "UP";
        console.log(d);
    } else if (e.keyCode == 39 && d != "LEFT") {
        //right.play();
        d = "RIGHT";
        console.log(d);
    } else if (e.keyCode == 40 && d != "UP") {
        //down.play();
        d = "DOWN";
        console.log(d);
    }
}


//How to draw Snake && ground && food && score
//draw everything to the canvas
function draw() {



    ctx.drawImage(ground, 0, 0); //draws the ground image at 0,0 of the canvas

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";

        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);



    //which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;


    //remove the tail
    //snake.pop();

    //ADD NEW HEAD
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score, 2 * box, 1.6 * box);

    //if snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        //eat.play();
        food = {
            x: unit * Math.floor(Math.random() * 17 + 1),
            y: unit * Math.floor(Math.random() * 15 + 3)
        }
    } else {
        snake.pop();
    }


    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        //dead.play();
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

}

//call the draw function every 100ms
let game = setInterval(draw, 100); //calls the draw function every 100ms 