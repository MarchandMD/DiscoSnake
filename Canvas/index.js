// grab the HTML element 
const canvas = document.querySelector('canvas');


canvas.width = window.innerWidth; //set the width of the canvas element to the inner width of the viewport window
canvas.height = window.innerHeight; //set the height to the inner height of the viewport window

//this creates some "context" for all the things I draw; I'll end up using this variable for a lot. .getContext() is some kind of built in object....
//HTMLCanvasElement.getContext().....so the HTMLCanvasElement is a web API
//getContext() is a method for the HTMLCanvasElement webAPI; 
let c = canvas.getContext('2d');  /*possible strings for the getContext() method parameter: 2d, webgl (or experimental-webgl),webgl2, bitmaprenderer. All of these things are worth researching.... */

/* c.fillStyle = "rgba(255, 0, 9, 0.5)"; //c.fillStyle = "colors" is the way to add some color to a shape; Need to add this c.fillStyle = ('') BEEFORE the shape to color. c.fillStyle() will apply to every shape beyond it.....
c.fillRect(100,100,100,100); //c.fillRect(x-position, y-position, width, height) is the way to render a square (aka rectangle) on the page
c.fillStyle = "#fff145";
c.fillRect(200,200,100,100); //this is an example of a square that originates at the 200th x pixel from the top left, to the 200th y pixel, from the top left. and It's 100x100 wide and high. 

/*SOMETHING THAT I'M THINKING ABOUT NOW....WITH THE IDEA OF POSITIONING.....IT'S LIKE THE VIEWPORT IS THE FOURTH QUADRANT OF COLLEGE ALGEBRA...PRE-CALCULUS......SO IF THERE'S AN ENTIRE GRAPH, EVERYTHING HAPPENS STRICTLY IN THE FOURTH QUADRANT. AND IF THIS IS JOHARI'S WINDOW, THEN THIS IS THE UNKNOWN, MADE KNOWN...  */

/*c.fillRect(100,300,100,100); //A shape at 100x and 300y from top left corner, 100x100
c.fillStyle = "red";
c.fillRect(300,100,100,100); //a shape at 300x and 100y, 100x100
c.fillStyle = "black";
c.fillRect(300,300,100,100); */ //a shape at 300x and 300y, 100x100

//drawing a line
//grab c variable, draw a path
/* c.beginPath(); //this is like hovering your pen or pencil over the canvas, getting ready to draw a new line
c.moveTo(400, 100); //starting position of line; this is like placing the pencil down on the canvas
c.lineTo(500,20); //this is like tracing lightly to another position on the canvas. In this examply, I move to 500x20y
c.lineTo(500,100); Then I move to 500x100y
c.lineTo(400, 200);Then I move to 400x200y
c.strokeStyle = "rgba(154,48,55,0.5)"; this is like saying, i'm going to use this color to draw my line
c.stroke(); *///push down and make that line come to life

/* c.beginPath(); //hover your pencil over the canvas...
c.moveTo(300, 100); //put the pencil on the canvas, starting at 300x100y
c.lineTo(500, 0); //trace to 500x0y
c.lineTo(400, 100);//trace to 400x100y
c.stroke(); */ //push down and make that line come to life


//let's hard code a bunch of circles, with some randomness
/* for(var i = 0; i < 200; i++) {
    var x = Math.random() * window.innerWidth; //this creates a random x-posiiton that falls within the innerWidth of hte window
    var y = Math.random() * window.innerHeight; //this creates a random y-position that falls witnin the bounds of the innerHeight of the viewport window
    var red = Math.random() * 256; //randomizes a number to be used in RGB strokeStyle()
    var green = Math.random() * 256; //randomizes a number to be used in the RGB strokeStyle()
    var blue = Math.random() * 256; //randomizes a number to be used in the RGB strokeSTyle()
    var radius = Math.random() * 75; //creates a random number for the radius of an arc/circle..... this is a new variable. Circles have to have a diameter...radius is half that...if my geometry is correct
    c.beginPath(); //this lifts the pencil from the last item, and also hovers it above the paper
    c.arc(x, y, radius, 0, Math.PI * 2, false); //so here's the actual method to draw a circle. c.arc(xPosition, yPosition, radius, startAngle(expressed in radians), and whether clockwise is on?  )
    c.strokeStyle = `rgb(${red}, ${green}, ${blue})`; //color the line
    c.stroke(); //draw the circle
} */
/* c.arc(200, 200, 75, 0, endAngle, anticlockwise ) */


//creating a Circle object, with this Object Contructor and animate it with velocity
function Circle(x, y, dx, dy, radius) {
    this.x = x; //using 'this' when creating a class...becuase this is what I'm doing right? I'm creating an entire class.....
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "white";
        c.stroke();
        c.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        c.fill();
    }

    this.update = () => {
        //creates boundaries of the canvas... as well as velocity ?? maybe...
        if (this.x + this.radius > innerWidth - this.radius || this.x - this.radius < 0) { //conditional reverses motion
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx; //creates the initial motion horizontally along the x-axis
        this.y += this.dy; //creates motion vertically along the y-axis

        this.draw();
    }

}


//first, create the variables for the circle size, and the circle velocity


var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 30; //accounts for size of circle, and bounces off the edge of circle
    var x = Math.random() * (innerWidth - radius * 2) + radius; //variable for x coordinate on page; is incremented
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 5; //x velocity aka speed and direction
    var dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

//draws the circle, using our new Circle object


function animate() {
    requestAnimationFrame(animate); //Makes this function recursive 
    c.clearRect(0, 0, innerWidth, innerHeight); //clears the context from x = 0, y = 0, to the innerWidth and innerHeight of the screen

    //draw a circle with the new Circle() object

    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    /*  //draws the hard-coded circle
     c.beginPath();
     c.arc(x, y, radius, 0, Math.PI * 2, false);
     c.strokeStyle = "blue";
     c.stroke(); */
}

animate();