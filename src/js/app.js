// Module import

import { addEventOnElements } from "./utils";



// toggle sidebar in small screen


let sidebar= document.querySelector('[data-sidebar]')

let sidebarTogglers=document.querySelector('[data-sidebar-toggler]');

let overlay=document.querySelector('[data-sidebar-overlay]')




addEventOnElements(sidebarTogglers, 'click', function(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active')
})