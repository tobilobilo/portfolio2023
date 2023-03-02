/*
    Initital sequence, after intro animation; unlock scroll, remove loader panel, fadein elements from the first fold
*/
const showInto = getExpiringStorage("showInto");
const loader = document.querySelector('#loader');
if(!showInto) { // 'show complete intro animation'
    setExpiringStorage("showInto", true, (1000 * 60 * 10)); // expiring set for 10 minutes after the localstorage creation
    const initFade = setInterval( () => {
        if(window.getComputedStyle(loader).opacity == 0) {
            initPageAfterIntro();
            clearInterval(initFade);
        }
    }, 500);
} else { // 'show short intro animation'
    loader.classList.add('short-intro');
    setTimeout( () => {
        initPageAfterIntro();
    }, 500);
}


/*
    Parallax triggers binding
*/
const controller = new ScrollMagic.Controller();
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
        }, 250);
    })
    .addTo(controller);
});


/*
    Functions
*/
function toFadeIn(elements) {
    elements.forEach(element => {
        element.setAttribute("data-fadedin", "");
    });
}

function initPageAfterIntro() {
    document.querySelector('html').classList.remove('scroll-lock');
    toFadeIn(document.querySelectorAll('.main [data-tofadein]'));
    document.querySelector('#loader').remove(); // remove loader panel
}

function setExpiringStorage(key, value, ttl) {
	const now = new Date();
    // `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getExpiringStorage(key) {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
}


/*
    Event Listeners
*/

// Theme toggler
document.querySelector('#switch-theme').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', (e.target.checked) ? 'dark' : 'light');
    //document.querySelector('#switch-label-1').textContent = document.querySelector('#switch-label-1').getAttribute((e.target.checked) ? 'data-text-off' : 'data-text-on');
});