// initialising theme


let storedTheme = localStorage.getItem('theme');


let systemThemeDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

let initialTheme= storedTheme ?? (systemThemeDark ? 'dark': 'light');

document.documentElement.setAttribute('data-theme', initialTheme);


// toggled b\w light and dark

let toggleTheme= function(){
    let currentTheme = document.documentElement.getAttribute('data-theme' || 'light');

    let newTheme = currentTheme ===  'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme',newTheme)
}




// attaching toggler to icon button  via click event


window.addEventListener('DOMContentLoaded', function(){
    let themeBtn=this.document.querySelector('[data-theme-btn]');
    if(themeBtn) themeBtn.addEventListener('click',toggleTheme)
})