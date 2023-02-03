/*
    Initital sequence, after intro animation; unlock scroll, remove loader panel, fadein elements from the first fold
*/
const initFade = setInterval( () => {
    const loader = document.querySelector('#loader');
    if(window.getComputedStyle(loader).opacity == 0) {
        document.querySelector('html').classList.remove('scroll-lock');
        toFadeIn(document.querySelectorAll('.main [data-tofadein]'));
        document.querySelector('#loader').remove(); // remove loader panel
        clearInterval(initFade);
    }
}, 500);


/*

*/
var controller = new ScrollMagic.Controller();
document.querySelectorAll('[data-fade-trigger]').forEach((el) => {
    const id = el.getAttribute('id');
    // build scene - fade in stuff
    new ScrollMagic.Scene({
        triggerElement: `#${id}`,
        triggerHook: .9,
        offset: 150, // move trigger to center of element
        reverse: false // only do once
    })
    //.addIndicators() // add indicators (requires plugin)
    .on("enter leave", function (e) {
        setTimeout(function() {
            toFadeIn(document.querySelectorAll(`#${id} [data-tofadein]`));
        },250);
    })
    .addTo(controller);
});


/*
    Event Listeners    
*/

// Theme toggler
document.querySelector('#switch-theme').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', (e.target.checked) ? 'dark' : 'light');
    document.querySelector('#switch-label-1').textContent = document.querySelector('#switch-label-1').getAttribute((e.target.checked) ? 'data-text-off' : 'data-text-on');
});



function toFadeIn(elements) {
    elements.forEach(element => {
        element.setAttribute("data-fadedin", "");
    });
}