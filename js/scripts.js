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