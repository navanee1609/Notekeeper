
// import 

// import { Tooltip } from "./components/Tooltip";

// toggle sidebar in small screen


let sidebar= document.querySelector('[data-sidebar]')

let sidebarTogglers=document.querySelectorAll('[data-sidebar-toggler]');

let overlay=document.querySelector('[data-sidebar-overlay]')


/**@param {Array<HTMLElements>} elements   ===>an array of DOM elements

@param {string}  eventType ==>type of event to listen

@param {Function} callback ==>function to be excuted when called (Event occurs)

**/



let addEventOnElements = function(elements,eventType,callback){
    console.log(elements);

    elements.forEach(element=>element.addEventListener(eventType,callback))
}



addEventOnElements(sidebarTogglers, 'click', function(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active')
})


// show greeting message on homepage



let greetEle = document.querySelector('[data-greeting]');

let currentHour = new Date().getHours()




/* Generated a greeting based on current hour of the day

@param {number} currentHour - (0-23)

@returns {string} greeting with time of the day
*/

let getGreetingMsg =function (currentHour){
let greeting= currentHour <5 ? 'Night':
            currentHour <12 ? 'Morning' :
            currentHour < 15 ? 'Noon':
            currentHour < 17 ? 'Afternoon':
            currentHour < 20 ? 'Evening':
            'Night'


            return `Hey ! Good ${greeting}`
}

greetEle.textContent=getGreetingMsg(currentHour)


// showing date on home page


// Assuming currentdateElem represents an HTML element, make sure it's properly selected first
let currentdateElem = document.querySelector(".text.text-body-medium");

// Check if the element exists before setting its textContent
if (currentdateElem) {
    var currentDate = new Date();
    
    // Options for formatting the date
    let options = {
        weekday: 'short', // Short day name (e.g., "Sun")
        month: 'short',   // Short month name (e.g., "Oct")
        day: '2-digit',   // 2-digit day (e.g., "08")
        year: 'numeric'   // 4-digit year (e.g., "2023")
    };
    
    let formattedDate = currentDate.toLocaleDateString(undefined, options);
    
    currentdateElem.textContent = formattedDate;
} else {
    console.error("Element not found or does not exist.");
}


// adding tooltip


// let tooltipElems = document.querySelectorAll('[data-tooltip]');

// tooltipElems.forEach(elem=>Tooltip(elem))


// const Tooltip= function (element){
//     let tooltip=document.createElement('span')

//     tooltip.classList.add('tooltip', 'text-body-small');

//     element.addEventListener('mouseenter',function(){
//         console.log(this.dataset.tooltip);
//     })
// }

// Define the Tooltip function
const Tooltip = function (element) {
    // Create a tooltip element
    let tooltip = document.createElement('span');
    tooltip.classList.add('tooltip', 'text-body-small');

    // Set the tooltip text from the 'data-tooltip' attribute
    tooltip.textContent = element.dataset.tooltip;

    // Add custom styling to the tooltip
    tooltip.style.padding = '5px 10px';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white'; 
    tooltip.style.borderRadius = '5px'; 
    tooltip.style.height = 'auto'; 

    // Appending the tooltip element to the body
    document.body.appendChild(tooltip);

    // Position the tooltip relative to the element
    element.addEventListener('mouseenter', function () {
        // Get the position and dimensions of the element
        let rect = element.getBoundingClientRect();

        // Calculate the position for the tooltip
        let top = rect.top - tooltip.offsetHeight - 10; 
        let left = rect.left + (rect.width - tooltip.offsetWidth) / 2;

        // Set the tooltip position
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

        // Show the tooltip
        tooltip.style.display = 'block';
    });

    // Hide the tooltip when mouse leaves the element
    element.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });
};

// Select elements with the 'data-tooltip' attribute
let tooltipElems = document.querySelectorAll('[data-tooltip]');

// Initialize tooltips for each matching element
tooltipElems.forEach((elem) => Tooltip(elem));



