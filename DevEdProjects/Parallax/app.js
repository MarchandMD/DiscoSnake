//Controlling function; call once to make everything work
function splitScroll() {
    //creates a new class? or Object? It's capitalized and underlined...It's a new class, with a class object called with it....So I need to learn a little more about classes and class methods?
    //this idea, of the js variable, seems to be a really important one...because it's one of the few things that is actually used....
    const controller = new ScrollMagic.Controller();

    //It looks like the 'controller' variable is only used once, and it's placed after the .setPin method. So it looks like these are methods that are strung onto the ScrollMagic.Scene({object here}).setPin(DOMelementHere).AddIndicators().addTo(controller); So that's the entire thing. So that's what's happening here. ScrollMagic is some kind of API CDN?
    //ScrollMagic is a JS library....
    //So basically, what I've been doing with YouTube videos, I can start doing with JavaSCript libraries. This is pretty wild. 

    //So, this is another new class, with a method called on it. And really, I'm adding an object to the new class/method. It includes a duration, which is like a height effect; It's a triggerElement, which is a DOM element, and it's a triggerHook, which I don't remember what that was, so I'm going to watch the tutorial again. at least scroll for that info...
    new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: '.about-title',
        //triggerHook is the PLACEMENT of where the trigger occurs
        triggerHook: 0,
    })
    .addIndicators()
    //setPin defines what thing is 'pinned' to the screen
    .setPin('.about-title')
    //adds a ScrollMagic.Scene to the ScrollMagic Controller
    .addTo(controller);

}


splitScroll();


