 /*=============== CHANGE BACKGROUND HEADER ===============*/
 function scrollHeader() {
    const header = document.getElementById('header')

    //When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)


/*=============== MUSIC ===============*/
const soundCloud = document.querySelector('.sound-cloud');
const off = document.querySelector('#off');
const on = document.querySelector('#on');
const myAudio = document.querySelector('#myAudio');

off.addEventListener('click', () => soundTrack('off'));
on.addEventListener('click', () => soundTrack('on'));

const soundTrack = (soundState) => {
    if(soundState === 'off'){
        on.style.display = 'block';
        off.style.display = 'none';
        soundCloud.style.color = "#08fdd8";
        myAudio.play();
    }
    else if(soundState === 'on'){
        on.style.display = 'none';
        off.style.display = 'block';
        soundCloud.style.color = "#f50057";
        myAudio.pause();
    }
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')
    
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else{
        document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }

    })
}

window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if(selectedTheme) {
    //If the validation is fulfilled, we ask what the issue was to know if we activated or desactivated the light
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / desactivate the theme manually with the button
themeButton.addEventListener('click',() => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true,
})

sr.reveal(`.home_data`)
sr.reveal(`.home_handle`, {delay: 700})
sr.reveal(`.home_social, .home_scroll`, {delay: 900, origin: 'bottom'})

sr.reveal(`.animate-bottom`, {interval: 100, duration: 1000, delay: 400, origin: 'bottom'})

sr.reveal(`.animate-right`, {interval: 150, duration: 1000, delay: 400, origin: 'right'})


/*=============== THEME COLOR ===============*/
const setThemeColor = (color) => {
    const meta = document.querySelector('meta[name="theme-color"]')
if (meta) {
    meta.setAttribute('content', color)
    }
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        const { isIntersecting, target } = entry
        if (isIntersecting) {
            const color = window.getComputedStyle(target).getPropertyValue("background-color");
            setThemeColor(color)
        }
        })
}, {
    root: document.getElementById('viewport'),
    rootMargin: "1px 0px -100% 0px",
    treshold: 0.1
})
    
    document.querySelectorAll('body').forEach(section => {
    observer.observe(section)
    })
}

/*=============== CLICK ===============*/
const myClick = document.querySelector('#myClick');

function clickSound() {
    myClick.play();
}