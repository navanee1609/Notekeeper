// import

// import {Tooltip} from './components/Tooltip'


// toggle sidebar in small screen


let sidebar= document.querySelector('[data-sidebar]')

let sidebarTogglers=document.querySelectorAll('[data-sidebar-toggler]');

let overlay=document.querySelector('[data-sidebar-overlay]')


/**@param {Array<HTMLElements>} elements   ===>  an array of DOM elements

@param {string}  eventType ==> type of event to listen

@param {Function} callback ==> function to be excuted when called (Event occurs)

**/



let addEventOnElements = function(elements,eventType,callback){
   

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



// initializing tooltip behaviour for all DOM elements with a data-tooltip attribute


let tooltipElems=document.querySelectorAll('[data-tooltip]')