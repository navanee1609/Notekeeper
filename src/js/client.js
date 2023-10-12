// import { Card } from "./components/Card.js";
import { Card } from "./components/Card.js";
import { NavItem } from "./components/NavItem.js"

import { activeNoteBook } from "./utils.js";







let sidebarList=document.querySelector('[data-sidebar-list]')

let notePanelTitle=document.querySelector('[data-note-panel-title]')

let notePanel=document.querySelector('[data-note-panel]')

/* client manages interactions with user interface to CRUD ........*/


/*

@property {Object} notebook    ==> Function for msnagiong notebooks in ui

@property {Object} note functionx for managing notes in ui

*/


export const client = {
    
    
    notebook:{
        // create notebook in ui

       /* @param {object} notebookData -- represents new notebook*/


      create(notebookData){
        let navItem=NavItem(notebookData.id, notebookData.name);
        sidebarList.appendChild(navItem)
        activeNoteBook.call(navItem)
        notePanelTitle.textContent=notebookData.name

      },
// reads and display list of notebooks

read(notebookList){
    notebookList.forEach((notebookData , index) => {
        let navItem= NavItem(notebookData.id, notebookData.name)

      if(index===0){
        activeNoteBook.call(navItem)
        notePanelTitle.textContent=notebookData.name
      }
      

      sidebarList.appendChild(navItem)

        
    });
},


// update


update(notebookId,notebookData){
    let oldNotebook=document.querySelector(`[data-notebook= "${notebookId}"`)

    let newNotebook= NavItem(notebookData.id, notebookData.name)

    notePanelTitle.textContent=notebookData.name;

    sidebarList.replaceChild(newNotebook,oldNotebook)
        
        activeNoteBook.call(newNotebook)
},


// delete


delete(notebookId){
    let deletedNotebook=document.querySelector(`[data-notebook="${notebookId}"]`);

    let activeNavItem=deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;

    if(activeNavItem){
        activeNavItem.click()

    }else{
        notePanelTitle.innerHTML='';
        notePanel.innerHTML=''
    }
    deletedNotebook.remove()

}



    },

 note:{

    // creates ui in a new note card based on provided data
    create(noteData){
        let card=Card(noteData)

        notePanel.appendChild(card)
    }
 }



}