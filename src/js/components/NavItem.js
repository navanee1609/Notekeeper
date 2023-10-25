// import

import { client } from "../client.js"
import { db } from "../db.js"
import { activeNoteBook,makeElemEditable } from "../utils.js"
import { DeleteConfirmModal } from "./Modal.js"
import { Tooltip } from "./Tooltip.js"





let notePanelTitle=document.querySelector('[data-note-panel-title]')
Tooltip


/*
  creates a navigation item represents notebook ...AbortControllerit allows editiung,display notebookj name, handles click event to display its associated datas


  id==>unique identifier
  name==>name of notebook
  returns html 

  */


export let NavItem = function(id, name){


    let navItem = document.createElement('div')
    navItem.classList.add('nav-item')
    navItem.setAttribute('data-notebook',id)

    navItem.innerHTML= `
            <span class="text text-label-large" data-notebook-field>
            ${name}
        </span>

        <button class="icon-btn-small"  aria-label="Edit notebook" data-tooltip="Edit" data-edit-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">
                        Edit
                    </span>


                    <div class="state-layer"></div>

        </button>
        <button class="icon-btn-small"  aria-label="Delete notebook" data-tooltip="Delete" data-delete-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">
                        delete
                    </span>


                    <div class="state-layer"></div>

        </button>

        <div class="state-layer"></div>


    `

    // // show tooltip on edit and delete button

    let tooltipElems= navItem.querySelectorAll('[data-tooltip]')

    tooltipElems.forEach(elem=>Tooltip(elem))



    // // handles the title update


    navItem.addEventListener('click',function (){
        notePanelTitle.textContent=name;
        activeNoteBook.call(this)

        let noteList = db.get.note(this.dataset.notebook)   // this refers to navitem
        client.note.read(noteList)
    })

    // // edit functionality

     let navItemEditBtn=navItem.querySelector('[data-edit-btn]')

     let navItemField=navItem.querySelector('[data-notebook-field]')

     navItemEditBtn.addEventListener('click',makeElemEditable.bind(null,navItemField))

    navItemField.addEventListener('keydown', function (event){
        if (event.key==='Enter'){
            this.removeAttribute('contenteditable');

            // update edited data in db

            let updatedNotebookData= db.update.notebook(id, this.textContent)

                 

         // render updated notebook

         client.notebook.update(id,updatedNotebookData) 

          
        }
    })

  


   
    


    //  notebook item delete function

     let navItemdeleteBtn=navItem.querySelector('[data-delete-btn]')

     
     navItemdeleteBtn.addEventListener('click',function(){


        let modal= DeleteConfirmModal(name)

        modal.open()

        modal.onSubmit(function(isConfirm){
            if(isConfirm){
                db.delete.notebook(id)
            }

            modal.close()
            client.notebook.delete(id)
        })
       
    })




    return navItem
}