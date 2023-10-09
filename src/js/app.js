
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


// adding tooltip and defining function



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



// Notebook create field

let sidebarList = document.querySelector('[data-sidebar-list]');
let addNotebookBtn = document.querySelector('[data-add-notebook]');
let lastActiveNavItem = null; // Keep track of the last active item

/* button click => add new note created*/

let showNotebookField = function () {
    let navItem = document.createElement('div');
    navItem.classList.add('nav-item');
    navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field></span>
        <div class="state-layer"></div>
    `;

    navItem.addEventListener('click', activeNotebook);

    sidebarList.appendChild(navItem);

    let navItemField = navItem.querySelector('[data-notebook-field]');

    // Function to activate the clicked notebook and deactivate the last one
    function activeNotebook() {
        if (lastActiveNavItem) {
            lastActiveNavItem.classList.remove('active');
        }
        navItem.classList.add('active');
        lastActiveNavItem = navItem;
    }

    activeNotebook(); // Activate the newly created notebook


    // make notyebook content editablea nd focus


    let makeElemEditable=function(element){
        element.setAttribute('contenteditable',true);
        element.focus()
    }

    makeElemEditable(navItemField)

    navItemField.addEventListener('keydown',createNotebook)

}





addNotebookBtn.addEventListener('click', showNotebookField);

function createNotebook(event) {
    if (event.key === 'Enter') {
      let notebookData = db.post.notebook(this.textContent || 'Untitled');
  
      this.parentElement.remove();
  

        // card 

        let Card=function(noteData){
            let {id,title,text,postedOn,notebookID}=noteData

            let getRelativeTime = function(milliseconds) {
                let currentTime = new Date().getTime();
            
                let minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
                let hour = Math.floor(minute / 60);
                let day = Math.floor(hour / 24);
            
                if (minute < 1) {
                    return 'Just now';
                } else if (minute < 60) {
                    return `${minute} min ago`;
                } else if (hour < 24) {
                    return `${hour} hour ago`;
                } else {
                    return `${day} day ago`;
                }
            };
            
            let card=document.createElement('div')

            card.classList.add('card')
            card.setAttribute('data-note',id)

            card.innerHTML=`
            <h3 class="card-title text-title-medium">${title}</h3>

            <p class="card-text text-body-large">${text}</p>

            <div class="wrapper">
                 <span class="card-time text-label-large">${getRelativeTime(postedOn)}</span>

                 <button class="icon-btn large" aria-label = Delete note data-tooltip="Delete note">
                    <span class="material-symbols-rounded" aria-hidden="true">delete</span>

            <div class="state-layer"></div>

                 </button>
            </div>
            `

            Tooltip(card.querySelector('[data-tooltip]'))
            return card;
        }

  
      let sidebarList = document.querySelector('[data-sidebar-list]');
      let notePanelTitle = document.querySelector('[data-note-panel-title]')

      let notepanel=document.querySelector('[data-note-panel]')
      let client = {
        notebook: {
          create(notebookData) {
            let navItem = NavItem(notebookData.id, notebookData.name);
            sidebarList.appendChild(navItem);
            // activeNotebook.call(navItem);
            notePanelTitle.textContent=notebookData.name
          },
        //   reads & display a list of notebooks

        read(notebookList){
            notebookList.forEach((notebookData, index) => {
                let navItem=NavItem(notebookData.id,notebookData.name);

                if(index===0){
                    // activeNotebook.call(navItem);
                    notePanelTitle.textContent=notebookData.name
                }

                sidebarList.appendChild(navItem)
            });
        },

        update(notebookID, notebookData) {
            let oldNotebook = document.querySelector(`[data-notebook="${notebookID}"]`);
          
            if (oldNotebook) {
              let newNotebook = NavItem(notebookData.id, notebookData.name);
          
              // Update the title and replace the old notebook with the new one
              notePanelTitle.textContent = notebookData.name;
              sidebarList.replaceChild(newNotebook, oldNotebook);
              activeNotebook.call(newNotebook)
            }
          },
          delete(notebookID){
            let deletedNotebook=document.querySelector(`[data-notebook]="${notebookID}"`)

            let activeNavItem= deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;


            if(activeNavItem){
                activeNavItem.click()
            }else{
                notePanelTitle.innerHTML=''
                notepanel.innerHTML=''
            }

            deletedNotebook.remove()
          }
        },


      
        note:{
            create(noteData){
                let card=Card(noteData)
                notepanel.appendChild(card)
            }
        }
      };
  
      // Rendering nav item
      client.notebook.create(notebookData);
    }
  }
  

//  //   rendering nav item

//  client.notebook.create(notebookData)




// store new csreated in database

let noteKeeperDB = {};

let initDB= function(){
    let db=localStorage.getItem('noteKeeperDB')

    if(db){
        noteKeeperDB=JSON.parse(db);
    }else{
        noteKeeperDB.notebooks=[];
        localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB))
    }
}

initDB()

// reads current state
function readDB(){
    noteKeeperDB=JSON.parse(localStorage.getItem('noteKeeperDB'))
}


let writeDB=function(){
    localStorage.setItem('noteKeeperDB',JSON.stringify(noteKeeperDB))
}

// generate id----time stamp

let generateID=function(){
    return new Date().getTime().toString()
}


// write current state
/* collection of dunctions CRUD*/

let db={
    post:{

        // adds new to database

        notebook(name){
            readDB()

         let notebookData={
            id:generateID(),
            name,
            notes:[]
         }

        noteKeeperDB.notebooks.push(notebookData); 

            writeDB()

            return notebookData
        },

        note(notebookID,object){
            readDB()

            let notebook=findNotebook(noteKeeperDB,notebookID)


            let noteData={
                id:generateID(),
                notebookID,
                ...object,
                postedOn:new Date().getTime()
            }

            notebook.notes.unshift(noteData)


            writeDB()

            return noteData
        }






    },

    get:{
        // retrives all from db

        notebook(){
            readDB()

            return noteKeeperDB.notebooks
        }
    },

    update:{
        notebook(notebookID,name){
            readDB();

            let findNotebook= function(db, notebookID){
                return db.notebooks.find(notebook=>notebook.id===notebookID)
            }
            let notebook=findNotebook(noteKeeperDB,notebookID);

            notebook

            notebook.name=name


            writeDB()

            return notebook;


        }

    },

    delete: {
        notebook(notebookID) {
            readDB();
    
            // Finding index
            let findNotebookIndex = function (db, notebookID) {
                return db.notebooks.findIndex(item => item.id === notebookID);
            }
    
            let notebookIndex = findNotebookIndex(noteKeeperDB, notebookID);
    
            if (notebookIndex !== -1) {
                noteKeeperDB.notebooks.splice(notebookIndex, 1); 
                
            }
        }
    }
    

}



let notePanelTitle = document.querySelector('[data-note-panel-title]');

// Define a function to create a notebook item (assuming you have a NavItem function)
function NavItem(id, name) {
    let navItem = document.createElement('div');
    navItem.classList.add('nav-item');
    navItem.setAttribute('data-notebook', id);
  
    navItem.innerHTML = `
      <div class="nav-item active">
        <span class="text text-label-large" data-notebook-field>
          ${name}
        </span>
        <button class="icon-btn-small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
          <span class="material-symbols-rounded" aria-hidden="true">
            Edit
          </span>
          <div class="state-layer"></div>
        </button>
        <button class="icon-btn-small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
          <span class="material-symbols-rounded" aria-hidden="true">
            delete
          </span>
          <div class="state-layer"></div>
        </button>
        <div class="state-layer"></div>
      </div>
    `;

    // showing tooltip on editt and delete

        let tooltipElems=navItem.querySelectorAll('[data-tooltip]')

        tooltipElems.forEach(elem=>Tooltip(elem));


        // handles click event on navigation itrm and retrives data associated noted and mark them as active

        navItem.addEventListener('click',()=>{
            notePanelTitle.textContent=name;
            // activeNotebook.call(this)
        })

        // notebook edit function

        let navItemEditBtn=navItem.querySelector('[data-edit-btn]')
        let navItemField = navItem.querySelector('[data-notebook-field]')

        let makeElemEditable=function(element){
            element.setAttribute('contenteditable',true);
            element.focus()
        }
    
        makeElemEditable(navItemField)
    

        navItemEditBtn.addEventListener('click',makeElemEditable.bind(null,navItemField))

      
// Define  event handler for the keydown event
navItemField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        this.removeAttribute('contenteditable');

        // Assuming db.update.notebook is a function that updates a notebook
        // Replace 'id' with the actual notebook ID and 'this.textContent' with the updated content.
        let updatedNotebookData = db.update.notebook(id, this.textContent);

        // Assuming NavItem is a constructor function to create a new NavItem instance
        let navItem = new NavItem(updatedNotebookData.id, updatedNotebookData.name);
        
        // Assuming sidebarList is a DOM element where you want to append the new NavItem
        sidebarList.appendChild(navItem);

        // Assuming notePanelTitle is a DOM element where you want to update the title
        notePanelTitle.textContent = updatedNotebookData.name;

        // client

       

        // Assuming you want to send the updated data to the client.notebook function
        client.notebook(id, updatedNotebookData);
    }
});


       let DeleteConfirmModal=function(title){
        let modal=document.createElement('div')
        modal.classList.add('modal')

        modal.innerHTML=`
            <h3 class="modal-title text-title-medium">
                Are you sure you want to delete <strong>"${title}"</strong>?
            </h3>

            <div class="modal-footer">
                <button class="btn text">
                    <span class="text-label-large" data-action-btn="false">Cancel</span>

                    <div class="state-layer"></div>
                </button>
                <button class="btn fill" data-action-btn="true">
                    <span class="text-label-large">Delete</span>

                    <div class="state-layer"></div>
                </button>
            </div>
        `
 //    adding overlay

    let overlay=document.createElement('div')

    overlay.classList.add('overlay','modal-overlay')

  
    
        // opens the delete confirmation


        const open = function (){
            document.body.appendChild(modal);
            document.body.appendChild(overlay)
        }

        // removing modal 

        const close = function (){
            document.body.remove(modal);
            document.body.remove(overlay)
        }
        // action btns

        let actionBtns=modal.querySelectorAll('[data-action-btn]')

        // handles onsubmit to excute dlete or not

        let onSubmit=function(callback){
            actionBtns.forEach(btn=>btn.addEventListener('click',function(){
                let isConfirm = this.dataset.actionBtn==='true' ? true : false;

                callback(isConfirm)
            }))
        }





        return{open,close,onSubmit}
       }

   

        // delete functionality

        let navItemDeleteBtn=navItem.querySelector('[data-delete-btn]')

         navItemDeleteBtn.addEventListener('click',function(){
            const modal= DeleteConfirmModal(name)

            modal.open()
            // modal.close()

          

            modal.onSubmit(function(isConfirm){
                if(isConfirm){
                    db.delete.notebook(id);
                    // client.delete(id);
                }

                modal.close()
            })
        })
    
    return navItem;
  }


  
  // Function to render existing notebooks
  function renderExistedNotebook() {
    let notebookList = db.get.notebook(); // Assuming this function returns a list of notebooks
  
    let sidebarList = document.querySelector('[data-sidebar-list]');
    
  
    notebookList.forEach((notebookData) => {
      let navItem = NavItem(notebookData.id, notebookData.name);
      sidebarList.appendChild(navItem);
      notePanelTitle.textContent = notebookData.name;
    });
  }
  
  // Call the renderExistedNotebook function to render existing notebooks
  renderExistedNotebook();
  


 
// create new note

let noteCreateBtns=document.querySelectorAll('[data-note-create-btn]')

addEventOnElements(noteCreateBtns, 'click', function(){
    let noteModal=function (title= "Untitled", text='Add your note...', time=''){
        let modal=document.createElement('div')

        modal.classList.add('modal')

        modal.innerHTML=`
        
        <button class="icon-btn large" aria-label="Close modal" data-close-btn>
                <span class="material-symbols-rounded" aria-hidden="true">close</span>

                <div class="state-layer"></div>
            </button> 

            
            <input type="text" placeholder="Untitled" class="modal-title text-title-medium" data-note-field value="${title}">

            <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>

            <div class="modal-footer">
                <span class="time text-label-large">${time}</span>

                <button class="btn text" data-submit-btn >
                    <span class="text-label-large">Save</span>
                    <div class="state-layer"></div>
                </button>
            </div>
        
        `


        let submitBtn=modal.querySelector('[data-submit-btn]')

        submitBtn.disabled=true

        let [titleField, textField]=modal.querySelectorAll('[data-note-field]')


        let enableSubmit=function(){
            submitBtn.disabled= !titleField.value && !textField.value
        }

        textField.addEventListener('keyup',enableSubmit)

        // opening modal

        let open=function(){
            document.body.appendChild(modal)
            document.body.appendChild(overlay)
            titleField.focus()

        }
        let close=function(){
            document.body.removeChild(modal)
            document.body.removeChild(overlay)
          

        }

        let closeBtn=modal.querySelector('[data-close-btn]');

        closeBtn.addEventListener('click',close)
        let onSubmit=function (callback){
            submitBtn.addEventListener('click',function(){
                let noteData={
                    title:titleField,
                    text:textField.value
                }

                callback(noteData)
            })
        }






        return {open,close, onSubmit}
    }
    
   let modal=noteModal()
   modal.open()
// Assuming you have a modal.onSubmit function that takes a callback
modal.onSubmit(function (noteObj) {
    // Determine the active notebook (replace this logic with your actual implementation)
    let activeNotebook = document.querySelector('[data-notebook].active');
    let activeNotebookId = activeNotebook ? activeNotebook.dataset.notebook : null;

    let noteData=db.post.notebook(activeNotebookId,noteObj);


    
client.note.create(noteData)

  modal.close()
});


})