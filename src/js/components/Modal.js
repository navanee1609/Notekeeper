//  overlay

let overlay=document.createElement('div')

 overlay.classList.add('overlay','modal-overlay')



 let NoteModal=function(title = 'Untitled', text= 'Add your notes...',  time=''){
   
    

    let modal=document.createElement('div');
    modal.classList.add('modal')

    modal.innerHTML=`
    <button class="icon-btn large" aria-label="Close modal" data-close-btn>
    <span class="material-symbols-rounded" aria-hidden="true">close</span>

    <div class="state-layer"></div>
</button>


<input type="text" placeholder="Untitled" value="${title}"class="modal-title text-title-medium" data-note-field>

<textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>

<div class="modal-footer">
    <span class="time text-label-large">${time}</span>

    <button class="btn text" data-submit-btn >
        <span class="text-label-large">Save</span>
        <div class="state-layer"></div>
    </button>
</div> 
     
    
    `



    let submitBtn= modal.querySelector('[data-submit-btn]')
    submitBtn.disabled=true


    let [titleField,textField]= modal.querySelectorAll('[data-note-field]')


    // enable submit 

    let enableSubmit=function(){
        submitBtn.disabled =  !titleField.value && !textField.value
    }

    textField.addEventListener('keyup',enableSubmit)
    titleField.addEventListener('keyup',enableSubmit)

    const open =function(){
        document.body.appendChild(modal)
        document.body.appendChild(overlay)
        titleField.focus()
    }


    // closes modal by removing it from document body

    const close =function(){
        document.body.removeChild(modal)
        document.body.removeChild(overlay)
    }


    let closeBtn=modal.querySelector('[data-close-btn]')

    closeBtn.addEventListener('click',close)
    // callback to submit note data

   let onSubmit= function (callback){
    submitBtn.addEventListener('click',function(){
        let noteData={
            title:titleField.value,
            text:textField.value
        }
        callback(noteData)
    })
   }


    return {open,close, onSubmit}


}


 let DeleteConfirmModal=function(title){

     let modal=document.createElement('div')
     modal.classList.add('modal')

     modal.innerHTML=`
    
     <h3 class="modal-title text-title-medium">
     Are you sure you want to delete <strong>"${title}"</strong>?
 </h3>

 <div class="modal-footer" > 
     <button class="btn text" data-action-btn="false">
         <span class="text-label-large">Cancel</span>

         <div class="state-layer"></div>
     </button>
     <button class="btn fill" data-action-btn="true">
         <span class="text-label-large">Delete</span>

         <div class="state-layer"></div>
     </button>
 </div>
     `
console.log(modal);

    // opens delete con firmation by appending to body

    let open=function(){
        document.body.appendChild(modal)
        document.body.appendChild(overlay)
    }


    // closes the delete confirmation


    let close=function()
{
    document.body.removeChild(modal)
        document.body.removeChild(overlay)
}
 
 let actionBtns=modal.querySelectorAll('[data-action-btn]')


 let onSubmit= function(callback)
{
    actionBtns.forEach(btn=>btn.addEventListener('click',function(){
        let isConfirm = this.dataset.actionBtn===
        'true' ? true : false;

        callback(isConfirm)
    }))
}


    return { open,close, onSubmit}
 }



 export {
    DeleteConfirmModal 
    , NoteModal
 }