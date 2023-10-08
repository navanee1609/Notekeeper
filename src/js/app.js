// Module import

// import { addEventOnElements } from "./utilss";



// import { addEventOnElements } from "./utils";





// toggle sidebar in small screen


let sidebar= document.querySelector('[data-sidebar]')

let sidebarTogglers=document.querySelectorAll('[data-sidebar-toggler]');

let overlay=document.querySelector('[data-sidebar-overlay]')





let addEventOnElements = function(elements,eventType,callback){
    console.log(elements);

    elements.forEach(element=>element.addEventListener(eventType,callback))
}



addEventOnElements(sidebarTogglers, 'click', function(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active')
})