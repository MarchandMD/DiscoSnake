// Grabs the div.carousel-slides; this div is a single item, but it has three children
const carouselSlides_div = document.querySelector('.carousel-slides');
//this is a nodeList of the images that are in a row
const carouselImages = document.querySelectorAll('.carousel-slides img');

//Buttons
const prevBtn = document.querySelector('#prev-button');
const nextBtn = document.querySelector('#next-button');

//Counter
let counter = 1;
const size = carouselImages[0].clientWidth; //so this is the size of a single carouselImage. .(dot)clientWidth is a new one for me.... but it looks straight forward. 

//caption
const para = document.querySelector('p');
//this sets a transform style onto the div.carousel-slides which contains the two buttons and the several images
//this syntax is a little foreign to me. but here's what it is:
//It's string concatenation...in a really messed up way. Can i do this with a string literal?
//So what am I doing here? I grab the carouselSlides_div...which is the div that has the arrows and a div with all the images, and it is applying a transform to the div. The transform is a translate of X by a matter of pixels. How many pixels? The size of the first carouselImage as displayed in the client viewport.
//so, why is this style being applied? it's adding the CSS property/value of transform: translateX(someRandomnumber)px);
//so I can't add the transform: translateX() rule in the style.css because the size has to bbe fluid...that is...it has to be dynamic. Because the amount to transform the image has to be dependent upon the size of the device which is doing the viewing. and this is the way I get the size of the device being used to view the webpage...Wow.
carouselSlides_div.style.transform = `translateX(${-size*counter}px)`;


//Button listeners
/* adding an Event Listener to the nextBtn */
nextBtn.addEventListener('click', () => { //listening for a click
    if (counter >= carouselImages.length - 1) return; //if the counter variable defined above is greater or equal to the length of the caoruselImages.Nodelist minus one, then just exit out of this function, with a quick return. That is, if I slam on the nextButton and make the counter (in JS) accumulate to a number that is greater than the length of the carouselImages nodeList, then just return out of this. That is, don't do any of the following transitions or transformation....
    //And so, when the next button is clicked, a new CSS property/value pair is added to the...carouselSlides_div. The entire window.  This is a really strange transition....
    carouselSlides_div.style.transition = "transform 0.4s ease-in-out";
    para.textContent = `${carouselImages[counter + 1].alt}`;
    //So the counter is set to 1. And it's used to keep track of the number of times the next/prev buttons are pushed. And then they're used as a factor to slide the images one way or another. Becuase the counter variable is used in the calculation of the amount ot translate, as well as avoiding a skipping and looping the nodeList for display
    counter++;
    //this defines the transform property that is used for transition
    carouselSlides_div.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

//copy of the nextBtn, but the counter conditional is reversed to avoid a buggy behavior if clicking one of the buttons too much
prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlides_div.style.transition = "transform 0.4s ease-in-out";
    //decrement the counter on each click
    counter--;
    carouselSlides_div.style.transform = 'translateX(' + (-size * counter) + 'px)';
    para.textContent = `${carouselImages[counter].alt}`;
});

// This is the event listener for looping the images. Since the images are actually a nodeList in Javascript, It's a little easier to think of the images as a single thing. A single item. the point is this...the images are both a single item (in JS it's a nodeList) and in HTML they are individual items. Two of those individual items have been asigned unique IDs. The first HTML img is a clone of the last HTML image, and the last HTML image is actually a clone of the first image. So think of it like this: I have 5 images: A, B, C, D, AND E. To make the HTML/JS loop work, I need to add E to the beginning, and A to the end. So in the HTML it actually looks like this: E, A, B, C, D, E, A. And why does it do this? Well, the item at nodeList[0] has an id of "lastClone". And that bit of logic is applied to the if statement for the loop. If(nodeList[counter].id === "lastClone") then do a couple of things. The things to do when true are key to understanding how this carousel works. When the image with the id of "lastClone" experiences a transitionend event, then JS will do the following: it will change the transition CSS property on the carouselSlides_div to none, so it won't have that trantsition effect applied to it. Then, the counter is reset to the number represented by carouselImages.length -2. Why? becuase now the carouselImages[counter].id is an empty string, and the only two conditions in this Event Handler do not evaluate to anything, so they don't do anything other than their normal behaviors. And setting the counter = carouselImages.length - 2, puts the counter at 6,  Man this is really complicated.....

carouselSlides_div.addEventListener('transitionend', () => {

    if (carouselImages[counter].id === 'lastClone') {
        carouselSlides_div.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlides_div.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlides_div.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlides_div.style.transform = 'translateX(' + (-size * counter) + 'px)';
        para.textContent = carouselImages[counter].alt;
    }

})