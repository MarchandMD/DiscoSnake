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

const dead = new Audio();
// const eat = new Audio();
// const up = new Audio();
// const left = new Audio();
// const right = new Audio();
// const down = new Audio();
 dead.src = "audio/dead.mp3";
// eat.src = "audio/eat.mp3";
// up.src = "audio/up.mp3";
// left.src = "audio/left.mp3";
// right.src = "audio/right.mp3";
// down.src = "audio/down.mp3";

//create snake
//this happens once; Because it is outside of the draw() function. After the draw() function draws the snake once....the snake here is dissapearing. I have to figure out why it's dissapearing. My guess is that because I do snake.pop() just randomly. but what does .pop() return when I call it? it returns the value that was popped off.....so it's the last thing
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}





//create the food, randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//create the score variable
let score = 0;


//CONTROL THE SNAKE
//with keys; 
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}


//How to draw Snake && ground && food && score
//draw everything to the canvas
function draw() {
    ctx.drawImage(ground, 0, 0); //draws the ground image at 0,0 of the canvas

    //draws the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    };

    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //remove the tail...so he's trying to remove the tail...but if there is no tail...it just removes the entire snake....so I feel like I need to say, if snake.length > 1
    // if (snake.length >= 1) {
    //     snake.pop();
    // }

    //which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // ADD NEW HEAD
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    //drawing the score
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score, 2 * box, 1.6 * box);

    //if snake eats the food
    //Then i want to push the coordinates to snake; so I'd want to snake.push(foodCoordinates);

    
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        snake.push(newHead);
        snake.pop();
        food = {
            x: box * Math.floor(Math.random() * 17 + 1),
            y: box * Math.floor(Math.random() * 15 + 3)
        };
    } else {
        snake.pop();
    }

    //handing collisions with the wall
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake) ) {
        clearInterval(game);
    }

    //handling collisions with the snake body

    // if (snake.length > 1 && collision(newHead, snake)) {
    //     console.log("hit the body");
    // }
    //so, something is happening when snakeHead is the same as the food...so take a look at what happens when snake head is same as food

    //this function is part of the conditional statement for the IF statement handling collision
    function collision(head, array) {
        for (let i = 1; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

}

//call the draw function every 100ms
let game = setInterval(draw, 200); 