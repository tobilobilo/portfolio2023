/*
    Initital sequence, after intro animation; unlock scroll, remove loader panel, fadein elements from the first fold
*/
const showInto = getExpiringStorage("showInto");
const loader = document.querySelector('#loader');
if(!showInto) { // show complete intro animation
    setExpiringStorage("showInto", true, (1000 * 60 * 10)); // expiring set for 10 minutes after the localstorage creation
    const initFade = setInterval( () => {
        if(window.getComputedStyle(loader).opacity == 0) {
            initPageAfterIntro();
            clearInterval(initFade);
        }
    }, 500);
} else { // show short intro animation
    loader.classList.add('short-intro');
    setTimeout( () => {
        initPageAfterIntro();
    }, 500);
}


/*
    Parallax triggers binding
*/
const bindParallaxTriggers = () => {
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
}


/*
    Functions
*/
function toFadeIn(elements) { // triggered by parallax, fade in viewport with animation
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

// Mail to, to avoid to put my email in the index page source
document.querySelectorAll('[data-event="mailto"]').forEach( item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const   zero   = 'mailt',
                one    = 'o:jipr',
                two    = 'ose@gm',
                three  = 'ail.c',
                four   = 'om';
        location = `${zero}${one}${two}${three}${four}`;
    });
});

/*
    Append content from templates
    Function that sets various custom value like text, attributes, css
*/
function templater({task, element, text, attribute, css, template, parent}) {
    if(Array.isArray(text) === true) { // check if multiple elements need to be added to the DOM
        const arrayTexts = Array.from(text);
        for(let el in arrayTexts) { // loop through every text and append a new node to their parent
            const item = template.content.cloneNode(true);
            parent.append(item);
            text = arrayTexts[el];
            element = parent.lastChild;
            templater({task, element, text, attribute, css}); // recursive call with a single text element
        }
    }
    switch(task) {
        case ("innerText"):
            element.innerText = text;
            break;
        case ("setAttribute"):
            if(!text) {
                element.remove();
                break;
            }
            element.setAttribute(attribute, text);
            break;
        case ("classListAdd"):
            element.classList.add(text);
            break;
        case ("style"):
            element.style.setProperty(css, text);
            break;
        default:
            break;
    }
}
function appendTemplateElements() {
    //Skills
    const wrapperSkills = document.querySelector('[data-element="skills"]');
    const fragmentSkills = new DocumentFragment();
    for(let skill in skills) {
        const templateSkill = document.querySelector('[data-template="skill"]');
        const content = templateSkill.content.cloneNode(true);
        templater({
            "task" : "innerText",
            "element" : content.querySelector('.skills__subtitle'),
            "text" : skill
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.skills__logo'),
            "attribute" : 'alt',
            "text" : skill
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.skills__logo'),
            "attribute" : 'src',
            "text" : skills[skill].icon
        });
        templater({
            "task" : "classListAdd",
            "element" : content.querySelector('.skills__logo'),
            "text" : skills[skill].extraclass
        });
        templater({
            "task" : "style",
            "element" : content.querySelector('.skills__table'),
            "css" : "animation-delay",
            "text" : skills[skill].animationdelay
        });
        templater({
            "task" : "innerText",
            "element" : null,
            "text" : skills[skill].subskills,
            "template" : content.querySelector('[data-template="skill-item"]'),
            "parent" : content.querySelector('.skills__list')
        });
        fragmentSkills.append(content);
    }
    wrapperSkills.append(fragmentSkills);

    //Projects
    const wrapperProjectPro = document.querySelector('[data-element="project-pro"]');
    const wrapperProjectPerso = document.querySelector('[data-element="project-perso"]');
    const fragmentProjectPro = new DocumentFragment();
    const fragmentProjectPerso = new DocumentFragment();
    for(let project in projects) {
        const templateProject = document.querySelector('[data-template="project"]');
        const content = templateProject.content.cloneNode(true);
        templater({
            "task" : "innerText",
            "element" : content.querySelector('.project__title'),
            "text" : project
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project'),
            "attribute" : 'id',
            "text" : `fade-trigger-${projects[project].type}-${Object.keys(projects).indexOf(project)}`
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project__btn--demo'),
            "attribute" : 'href',
            "text" : projects[project].links.demo
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project__btn--github'),
            "attribute" : 'href',
            "text" : projects[project].links.github
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.mobile .project-imgs__img'),
            "attribute" : 'src',
            "text" : projects[project].imgs.mobile
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.mobile .project-imgs__img'),
            "attribute" : 'alt',
            "text" : content.querySelector('.project-imgs__preview.mobile .project-imgs__img').getAttribute('alt').replace('%%', project)
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img'),
            "attribute" : 'src',
            "text" : projects[project].imgs.desktop.small
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img'),
            "attribute" : 'alt',
            "text" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img').getAttribute('alt').replace('%%', project)
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop source'),
            "attribute" : 'srcset',
            "text" : projects[project].imgs.desktop.large
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img'),
            "attribute" : 'src',
            "text" : projects[project].imgs.desktop.small
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img'),
            "attribute" : 'alt',
            "text" : content.querySelector('.project-imgs__preview.desktop .project-imgs__img').getAttribute('alt').replace('%%', project)
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-imgs__preview.desktop source'),
            "attribute" : 'srcset',
            "text" : projects[project].imgs.desktop.large
        });
        templater({
            "task" : "innerText",
            "element" : null,
            "text" : projects[project].stack,
            "template" : content.querySelector('[data-template="project-stack"]'),
            "parent" : content.querySelector('.project__stack')
        });
        templater({
            "task" : "innerText",
            "element" : null,
            "text" : projects[project].text,
            "template" : content.querySelector('[data-template="project-par"]'),
            "parent" : content.querySelector('.project__summary')
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-preview__picture .project-preview__img'),
            "attribute" : 'src',
            "text" : projects[project].imgs.preview.small
        });
        templater({
            "task" : "setAttribute",
            "element" : content.querySelector('.project-preview__picture source'),
            "attribute" : 'srcset',
            "text" : projects[project].imgs.preview.large
        });
        switch (projects[project].type) {
            case "pro":
                fragmentProjectPro.append(content);
                break;
            default:
                fragmentProjectPerso.append(content);
                break;
        }
        
    }
    wrapperProjectPro.append(fragmentProjectPro);
    wrapperProjectPerso.append(fragmentProjectPerso);

    bindParallaxTriggers(); // call parallax binding once every elements has been added to the DOM
}