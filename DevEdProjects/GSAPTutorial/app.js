// grab the div.nav-button
const navButton = document.querySelector('.nav-button');
// grab the div.nav-open
const navOpen = document.querySelector('.nav-open');

// new is an operator; it calls an object constructor, and creates an instance of a new object; this one is called TimelineLite

//I'm going to GreenSock.com/docs for info....


//tl is equal to a constant i created; TimelineLite() is the object....

/* ok, so I just found the docs for GreenSock...and i'm looking at the docs for TimelineLite()....and since it's an object constructor, it has properties and it has methods....so, the properties are: autoRemoveChildren, data, smoothChildtiming, timeline and the methods are: add, addLabel, addPause, call, clear, delay, duration, endtime, eventCallback, TimelineLite.exportRoot, from, fromTo, getChildren, getLabelTime, getTweensOf, invalidate, isActive, kill, pause, paused, play, progress, recent, remove, removeLabel, restart, resume, reverse, reversed, seek, set, shiftChildren, staggerFrom, staggerFromTo, staggerTo, startTime, time, timeScale, to, totalDuration, totalProgress, totalTime, useFrames.   */

//THE TIMELINELITE METHODS I USE IN THIS .JS FILE ARE: .TO(), .FROMTO(), AND SOMETHING ELSE CALLED ONCOMPLETE() WHICH is a callback function using the variable created

//the objects in the params are values of the initial state....more in the docs
const tl = new TimelineLite({paused : true, reversed: true });

/* since tl is a TimelineLite object, I can call the methods of this object type. Exactly like I can call Array.map(), etc.. So what I have here is the variable, invoking one of it's approved methods, and arguments being passed to it. So, let's learn about the TimelineLite .to() method */

/* .to() = .to(target: Object, duration: Number in seconds, vars: Object, position: *):* */
tl.to('.cover', 1, { /* so, it looks like the target of this is the img.cover, and it's passed a duration of 1, so 1 second is how long this animation will take  */
    width: '60%', /* this property, and the next property is part of an object that is specified to determine the end value of any property to be "tweened"....At this point, I'm starting to feel like I should look at more rudimentary tutorials...if there are any.... */
    ease: Power2.easeOut,
})
.to('nav', 1, {
    height: '100%',
    ease: Power2.easeOut
}, '-=0.5')
.fromTo('.nav-open', 0.5, {
    opacity: 0,
    x: 50,
    ease: Power2.easeOut
},{
    opacity: 1,
    x: 0,
    onComplete: function() {
        navOpen.style.pointerEvents = 'auto';
        console.log('done');
    }
})

navButton.addEventListener('click', function(e) {

    if(tl.isActive()){
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }

    toggleTween(tl)
})

function toggleTween(tween){
    tween.reversed() ? tween.play() : tween.reverse();
}
