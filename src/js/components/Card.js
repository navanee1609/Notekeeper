import { client } from "../client.js"
import { db } from "../db.js"
import { getRelativeTime } from "../utils.js"
import { DeleteConfirmModal, NoteModal } from "./Modal.js"
import { Tooltip } from "./Tooltip.js"





/*
create html card element representing a note based on provided data

notedata--- data represents not displayed on card

returns  generated card element

*/


export const Card= function(noteData){


    let {id, title,text,postedOn,notebookId}=noteData


    let card=document.createElement('div')

    card.classList.add('card')
    card.setAttribute('data-note',id)

    card.innerHTML=`
        
    <h3 class="card-title text-title-medium">${title}</h3>

    <p class="card-text text-body-large">${text}</p>

    <div class="wrapper">
         <span class="card-time text-label-large">${getRelativeTime(postedOn)}</span>

         <button class="icon-btn large" aria-label = Delete note data-tooltip="Delete note" data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>

    <div class="state-layer"></div>

    
    `

    Tooltip(card.querySelector('[data-tooltip]'))




    card.addEventListener('click',function(){
        let modal=NoteModal(title,text,getRelativeTime(postedOn))

        modal.open()

        modal.onSubmit(function(noteData){
           const updatedData= db.update.note(id, noteData)

            client.note.update(id, updatedData)
            modal.close()
        })
    })




    // delete btn

    let deleteBtn= card.querySelector('[data-delete-btn]')

     deleteBtn.addEventListener('click',function(event){
         event.stopImmediatePropagation();
    
         let modal=DeleteConfirmModal(title)

         modal.open()

         modal.onSubmit(function (isConfirm){
             if(isConfirm){
                 let existedNotes = db.delete.note(notebookId,id)

                client.note.delete(id,existedNotes.length)
             };

            modal.close()
        })
    })



    return card
}