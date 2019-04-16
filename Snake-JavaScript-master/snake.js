/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
awesome! I got this to work! I'm actually really proud of myself for being able to duplicate someone elses work! its a small thing, but it's a complicated thing, so to be able to do this is a boost of confidence, becaue I have to know at leat a litlte bit of what's going on to be able to trouble shoot. 
*/


//so this first variable grabs the canvas element from the DOM
const cvs = document.querySelector('#canvas');
//this variable creates a getContext('2d')

/* !about .getContext: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    and about the canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
    I think this is really worth looking into....
    Will add it to the stack....
 */
const ctx = cvs.getContext('2d');

//box unit: this will be used to size the snake and the game board. What would happen if I changed this value?...well the food.png is too large, and the borders do not match up with the ground image....
const box = 32;

//LOAD IMAGES; there are also sounds, but I've omitted them, because I find them to be trite and annoying, and have disabled them via my client
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


//create snake
//this happens once; Because it is outside of the draw() function. After the draw() function draws the snake once....the snake here is dissapearing. I have to figure out why it's dissapearing. My guess is that because I do snake.pop() just randomly. but what does .pop() return when I call it? it returns the value that was popped off.....so it's the last thing

//!This has been fixed! so I did a number of things; the tutorial is a little hazy about how it treats the snake array...so I had to do some troubleshooting to make it work. Essentially, the snake array is receiving it's initial location with an object that contains x and y cooridnates. The array.length is one, so the snake is only one box long. How the draw() function animate this, and grows this is pretty interesting, but safe to say, this array store the coordinates for the head and every "segment" of the snake that grows during the game. Any knowledge about arrays will lead you to believe, correctly, that eating food will push a new set of x and y coordinates to the snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}





//creates random food location at instantiation of animation
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//create the score variable
let score = 0;


//CONTROL THE SNAKE; again, this doesn't need to be inside the actual animation. It only needs to be defined once. So this is how to control the thing on the screen with the keys
//with keys; 
// d is a JS variable being set outside of a direction function. The direction function will use the letter d to denote direction, and direction will actually be a "string"
let d;

//The document object (the entire thing...the D of the DOM) receives an event listener. It is listening for any keydown. if a keydown is pressed, the direction() funciton is called at the end. But the function of direction adds some easy logic that limits the keydown events to a very few specific keys; ie - the direction arrow keys
document.addEventListener("keydown", direction);

//here, a function is defined called direction(). And I see that this function is passed a single argument. What's neat about this is the argument is called event. And so if I use this function within the context of an event listener, then I have access to all the things that cause the event. Attributes, etc.. And this is how the logic for creating direction is used, or the logic for limiting the key input to just the arrow keys
function direction(event) {
    //if the keydown has a keyCode of 37, and the variable of d is not currently equal to "RIGHT"
    if (event.keyCode == 37 && d != "RIGHT") {
        //then the direction is set to left
        d = "LEFT";
        //same logic applied for other three keys/directions, etc
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

//And so, that's all that's needed for the single-use JavaScript code. To recap: 
/* 
1. got the canvas DOM element
2. added the context of 2d
3. created a variable to match the dimensions of a box; 
4. created variables for the images of ground and food
5. created an empty array to hold x and y coordinates of a snake head
6. created the initial x and y coordinates of a snake head
7. created a random location for an inital value of food on the board
8. created a score variable for the script
9. created a single variable for direction
10. added an event listener for all the keys
11. created logic to limit the repsonse of the script to specific keys, and "intelligent" about limiting the movements of the snake according to it's "state"
 */

// ? now this does the animating...Something tells me that this might be out dated. I beleive there's another function called requestAnimationFrame()....So, as a personal challenge, can I update this game to use requestAnimationFrame()? Can I learn about requestAnimationFrame() to become more proficient at it? because If I learn more about this, I can tinker more with animating a single piece of text. Reading the docs might help too... anyway, keep notating this...


//How to draw Snake && ground && food && score
//draw everything to the canvas
//draw() is like a meta-function; draw() does a number of things

//!things draw() draws...
/*
1. draws the ground at 0,0 (which is an Image)
2. draws the snake by means of a for loop (this is fairly ingenious)
3. draws the food
4. draws the score
 */

//! THINGS draw() does behind the scenes....
/* 
1. creates a variable snakeX that is equal to the x property of the snake array [0] element
2. creates a variable snakeY that is equal to the y property of the snake array [0] element
3. applies logic to the variable of d, which is used to control the direction of the snake;
   for example: 
       if (d is equal to "Left") then the draw() function will decrement the snakeX variable equal to "box"...which if I recall, is a hard-coded static value of 32. So if the direction is Left, the snake head X value will be decreasing by 32. But again, the size of the head is set by the for-loop that draws the snake.
4. creates a variable called newHead. And the newHead is assigned an object, similar to snake[0],  in that it contains an x and y coordinate. The x and y coordinate is equal to snakeX variable and snakeY variable....and this is how the animation is created. It's a combination really of a couple of things. An initial "state" of the initial "snake head". A direction, which adds or subtracts a value to x or y, and then an unshifting of the snake array with the newHead. So the newHead is kind of like a generator for the new snake[0]. Because if something on the canvas is moving vertically, it's x-coordinate is not changing; however it's y-coordinate is changing. Remember, this is a two-dimensional world I'm creating. Two-dimensions. Either up-down, or left-right. No more, no less. That's animation in a two-D world.  To be animation is to be either changing x coordinates, or y coordinates....really interesting....
5. Runs logic to determine if snakeHead x and y is the same as food x and y; because this means that the snake has eaten the food
6. handles collision detection
*/

//!SO BETWEEN DRAWING 4 THINGS, AND "MANAGING" 6 THINGS, THE draw() function is complete

// * lets take a closer look at the actual draw() function parts...


function draw() {
    ctx.drawImage(ground, 0, 0); // !draws the ground image at 0,0 of the canvas

    //!draws the snake with a for loop: 
    //!for every element in the snake array, do the following
    for (let i = 0; i < snake.length; i++) {
        //!if the element in the array is the first element, ctx should fill with the color "green", otherwise, for all elements in the snake array that are NOT the first element, ctx should fill with the color "white"
        ctx.fillStyle = (i == 0) ? "green" : `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, ${Math.random()})`;
        //! here, the for loop is drawing a square, or mathematically-specific, a rectangle. The four arguments that .fillRect takes are .fillRect(x-coordinate, y-coordinate, width, height)
        //!and this loop is using the object to reference the x and y coordinate of each snake array element
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        //!.strokeStyle is a way to give a border or a line a color
        ctx.strokeStyle = "darkslategray";
        //! and this is how you make a square/rectangle. invoking .strokeOfSomeType is like the final thing needed to invoke before the script will draw the thing
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    };

    //! so, this is how to draw the food. takes three arguments(an image, an x.coordinate, and an y.coordinate)
    ctx.drawImage(foodImg, food.x, food.y);

    //! old head position; This just destructures the array element at [0], which is actually an object. So I might be able to appply some destructring to this...
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // **which direction; so this is some logic that is "in the open" of the draw() function. making the snake move means that the direction needs to be constantly monitored. So since animation is just one invocation of the draw() function at a time, then doing the incrementation (that is += or -=) means that everytime an animation frame is drawn, the value of snakeX or snakeY will be changed by one exact box.
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // ADD NEW HEAD //?adding a new head....so, this just sets up a variable of newHead....not sure how it's used....
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //*Here, the newHead variable is passed to the unshift() method. So unshift will add an element to the 0 position of an array.So the value of newHead will be...ok...so the head of the snake is generated with the for-loop at the beginning of the draw() function. So, it goes object, to snakeX and snakeY, and then back to snake array object....wow....really take a close look at this....
    snake.unshift(newHead);

    //drawing the score
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score, 2 * box, 1.6 * box);

    //if snake eats the food
    //Then i want to push the coordinates to snake; so I'd want to snake.push(foodCoordinates);

    //* This is more like game play during the animations. if snakeX is the same as the food.x coordinate that was randomly generated earlier in draw, and snakeY is the same as food.y (this essentially is just saying, if the head of the snake is in the same coordinates of the food)
    if (snakeX == food.x && snakeY == food.y) {
        //*increment the score variable that is existing outside of the draw
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
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
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