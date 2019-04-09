// grabs the div.hamburger (which includes the div.lines)
const hamburger = document.querySelector('.hamburger');
// grabs the ul.navlinks
const navlinks = document.querySelector('.navlinks');
// grabs the list items in the unordered list
const links = document.querySelectorAll('.navlinks li');

// adds an event listener on the click even of the hamburger; so when I click on the hamburger, the following will happen
hamburger.addEventListener('click', () => {
    // add the open class to the div.hamburger....which is made up of the div.lines. So clicking on the lines adds the open class to the ul.navlinks; the "open" class includes the clip-path property, but it alters the size of the clip-path; But the animation comes from the transition property that is originally put on navlinks. 
    navlinks.classList.toggle('open');
    //now, since I have a NodeList of all the list items, I'm adding the fade class, or toggling the fade class to each list item. So again, when the div.hamburger is clicked, each list item will receive the fade class. And again, the fade class is actually selected in CSS as li.fade and all it does is add an opacity of 0; Now to implement this, each li:nth-child(n) is given a transition element of all, to negate the opacity:0 set up by .navlinks li { opacity: 0}
    links.forEach(link => {
        link.classList.toggle('fade');
    })
})

