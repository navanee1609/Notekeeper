// import { Card } from "./components/Card.js";
import { Card } from "./components/Card.js";
import { NavItem } from "./components/NavItem.js"

import { activeNoteBook } from "./utils.js";







let sidebarList=document.querySelector('[data-sidebar-list]')

let notePanelTitle=document.querySelector('[data-note-panel-title]')

let notePanel=document.querySelector('[data-note-panel]')

let noteCreateBtns= document.querySelectorAll('[data-note-create-btn]')

let emptyNotesTemplate = `

 <div class="empty-notes">
<span class="material-symbols-rounded" aria-hidden="true">note_stack</span>

<div class="text-headline-small">No notes</div>
</div> 
        
`


let disabledNoteCreateBtns=function (isThereAnyNotebooks){
    noteCreateBtns.forEach(item=>{
        item[isThereAnyNotebooks ? 'removeAttribute' : 'setAttribute']('disabled', '')
    })
}

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
        notePanelTitle.textContent=notebookData.name;
        notePanel.innerHTML=emptyNotesTemplate;
        disabledNoteCreateBtns(true)

      },
// reads and display list of notebooks

read(notebookList){
    disabledNoteCreateBtns(notebookList.length)
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
        disabledNoteCreateBtns(false)
    }
    deletedNotebook.remove()

}



    },

 note:{

    // creates ui in a new note card based on provided data
    create(noteData){

        // clear empty notes  from notepanel if there is no note exists
        if (!notePanel.querySelector('[data-note]')) notePanel.innerHTML='';
        let card=Card(noteData)

        notePanel.prepend(card)
    },


   read(noteList){

    if(noteList.length){
        notePanel.innerHTML='';

        noteList.forEach(noteData=>{
            let card=Card(noteData);
            notePanel.appendChild(card)
        })
    }else{
        notePanel.innerHTML=emptyNotesTemplate
    }
   },

   update(noteId, noteData){
    let oldCard = document.querySelector(`[data-note="${noteId}"]`)

    let newcard= Card(noteData);
    notePanel.replaceChild(newcard, oldCard)
   },
   delete(noteId,isNoteExists){
    document.querySelector(`[data-note="${noteId}"]`).remove();

    if(!isNoteExists) notePanel.innerHTML= emptyNotesTemplate
   }
 }



}