
/* So this is an object in JavaScript. JavaScript objects are a fairly new idea for me, but I've learned them; property, and values. I have three keys; curviness, autoRotate, and values. The keys in turn have values of: 1.25, true, and an array. Curviness is a number, autoRotate is a boolean, and the Array is an array of objects. The objects themselves are plot coordinates. X and Y. If I refer back to the CSS I'll see that the paper plane had a position of absolute, and a top and left position defined that put it in the middle left of the section. since the screen is usually the 4th quadrant, positive X values lead to the right, and positive Y values lead to the South? I need to think about that some other time...Anyway, this is all wrapped up neatly in a JS variable... */
const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: 100},
        {x: 300, y: -100},
        {x: 500, y: 100},
        {x: 750, y: -100},
        {x: 500, y: -50},
        {x: 750, y: 100},
        {x: window.innerWidth, y: -50}, /* oh, I should also say: since this is Javascript, instead of using specific numbers, I can do things like "window.innerWidth" because that returns a numeric value without a suffix */
    ]
}


/* Now, since I included the TimelineLite CDN script on my HTML page, I'm able to create a new TimelineLite object. Which is exactly what is done here. It's assigned to a variable, as most things in JS are */
const tween = new TimelineLite();

/* Then, I call an .add() method on to this object. I do recall that when I create an object, it has built in properties and methods, and so this .add() is a built in method. The method takes parameters.... */
tween.add(
    /* since I've included a tweenLite CDN on my HTML page, I'm able to use this TweenLite object; That's what it looks like to me. And on this object, I call a .to() method. The method takes 1. a CSS selector, a duration in seconds, and then an object. The object includes what appears to be a couple of specific properties; highly specialized properties that come from the bezier plug in and the ease plugin. But bezier is applied to the flightPath variable I created earlier. so this is where the flightPath is appled */
    TweenLite.to('.paper-plane', 1, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
)

//AFter the Tween is finished, a new scrollMagic object.controller is created and assigned to a controller variable

const controller = new ScrollMagic.Controller();

//next, a scene is created; and this is specific to scroll magic, and the triggering and pinning of scroll magic
const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 1000,
    triggerHook: 0
})
.addIndicators()
.setTween(tween)
.setPin('.animation')
.addTo(controller);