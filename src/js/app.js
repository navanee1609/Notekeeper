// import
import { activeNoteBook, makeElemEditable } from './utils.js';

import {Tooltip} from './components/Tooltip.js'; 
import { db } from './db.js';
import { client } from './client.js';
import { NoteModal } from './components/Modal.js';


 






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

tooltipElems.forEach(elem => Tooltip(elem));



// notebook create field


let sidebarList=document.querySelector('[data-sidebar-list]')

let addNotebookBtn= document.querySelector('[data-add-notebook]')


// shows note book creating field

let showNotebookField= function (){
    let navItem = document.createElement('div')

    navItem.classList.add('nav-item')

navItem.innerHTML=`
        <span class='text text-label-large' data-notebook-field></span>

        <div class='state-layer'></div>
`;

sidebarList.appendChild(navItem)

let navItemField=navItem.querySelector('[data-notebook-field]')


// active new ctreated notebook and deactivate previous

activeNoteBook.call(navItem)


// make notefield content editable and focus

makeElemEditable(navItemField)

// enter button to create notebook

navItemField.addEventListener('keydown',createNotebook)

}

addNotebookBtn.addEventListener('click',showNotebookField)


// notebook creation

let createNotebook=function (event){
    if(event.key==='Enter'){
         // store new created notebook in database

   let notebookData=db.post.notebook(this.textContent || 'Untitled')

   this.parentElement.remove()

//    Render navitem


client.notebook.create(notebookData)
    }
    
}



// render all existing notebook by retriving data

let renderExistedNotebook= function(){
    let notebookList=db.get.notebook();

    client.notebook.read(notebookList);
}  
renderExistedNotebook()




// create new note

 let noteCreateBtns= document.querySelectorAll('[data-note-create-btn]')



 addEventOnElements(noteCreateBtns, 'click', function(){
    let modal = NoteModal();

    modal.open()


    // handles submission 

    modal.onSubmit(noteObj=> {
        let activeNoteBookId= document.querySelector('[data-notebook].active').dataset.notebook;

       let noteData= db.post.note(activeNoteBookId, noteObj)

       client.note.create(noteData)

       modal.close()
    })
 })

//  renderas existing notebooks in the active notebook and retrives from data base


let renderExistedNote= function (){
    let activeNoteBookId= document.querySelector('[data-notebook].active')?.dataset.notebook;

    if(activeNoteBookId){
     let noteList = db.get.note(activeNoteBookId)
     client.note.read(noteList)   
    }
}

renderExistedNote()