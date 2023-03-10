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

// Mail to
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
*/
function appendTemplateElements() {
    //Skills
    const wrapperSkills = document.querySelector('[data-element="skills"]');
    const fragmentSkills = new DocumentFragment();
    for(let skill in skills) {
        const templateSkill = document.querySelector('[data-template="skill"]');
        const content = templateSkill.content.cloneNode(true);
        content.querySelector('.skills__subtitle').innerText = skill;
        content.querySelector('.skills__logo').setAttribute('alt', skill);
        content.querySelector('.skills__logo').setAttribute('src', skills[skill].icon);
        content.querySelector('.skills__logo').classList.add(skills[skill].extraclass);
        content.querySelector('.skills__table').style.animationDelay = skills[skill].animationdelay;
        const skillsList = content.querySelector('.skills__list');
        const templateSkillItem = content.querySelector('[data-template="skill-item"]');
        for(let subskill in skills[skill].subskills) {
            const item = templateSkillItem.content.cloneNode(true);
            item.querySelector('.skills__item').innerText = skills[skill].subskills[subskill];
            skillsList.append(item);
        }
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
        content.querySelector('.project__title').innerText = project;
        content.querySelector('.project').id = `fade-trigger-${projects[project].type}-${Object.keys(projects).indexOf(project)}`;
        const btnDemo = content.querySelector('.project__btn--demo');
        (projects[project].links.demo) ? btnDemo.setAttribute('href', projects[project].links.demo) : btnDemo.remove();
        const btnGithub = content.querySelector('.project__btn--github');
        (projects[project].links.github) ? btnGithub.setAttribute('href', projects[project].links.github) : btnGithub.remove();
        const previewMobile = content.querySelector('.project-imgs__preview.mobile .project-imgs__img');
        previewMobile.setAttribute('src', projects[project].imgs.mobile);
        previewMobile.setAttribute('alt', previewMobile.getAttribute('alt').replace('%%', project));
        const imgDesktop = content.querySelector('.project-imgs__preview.desktop .project-imgs__img');
        const imgDesktopLarge = content.querySelector('.project-imgs__preview.desktop source');
        imgDesktop.setAttribute('src', projects[project].imgs.desktop.small);
        imgDesktopLarge.setAttribute('srcset', projects[project].imgs.desktop.large);
        imgDesktop.setAttribute('alt', imgDesktop.getAttribute('alt').replace('%%', project));
        const previewDesktop = content.querySelector('.project-preview__picture .project-preview__img');
        const previewDesktopLarge = content.querySelector('.project-preview__picture source');
        previewDesktop.setAttribute('src', projects[project].imgs.preview.small);
        previewDesktopLarge.setAttribute('srcset', projects[project].imgs.preview.large);
        previewDesktop.setAttribute('alt', previewDesktop.getAttribute('alt').replace('%%', project));
        //content.querySelector('.skills__logo').setAttribute('src', projects[project].icon);
        //content.querySelector('.skills__logo').classList.add(projects[project].extraclass);
        //content.querySelector('.skills__table').style.animationDelay = projects[project].animationdelay;
        const projectsStacks = content.querySelector('.project__stack');
        const templateStack = content.querySelector('[data-template="project-stack"]');
        for(let tech in projects[project].stack) {
            const item = templateStack.content.cloneNode(true);
            item.querySelector('li').innerText = projects[project].stack[tech];
            projectsStacks.append(item);
        }
        const projectsPars = content.querySelector('.project__summary');
        const templatePar = content.querySelector('[data-template="project-par"]');
        for(let par in projects[project].text) {
            const item = templatePar.content.cloneNode(true);
            item.querySelector('p').innerText = projects[project].text[par];
            projectsPars.append(item);
        }
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

    bindParallaxTriggers();
}