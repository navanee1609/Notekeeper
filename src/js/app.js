
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
  

    //   let NavItem = function (id, name) {
    //     let navItem = document.createElement('div');
    //     navItem.classList.add('nav-item');
    //     navItem.setAttribute('data-notebook', id);
  
    //     navItem.innerHTML = `
    //       <div class="nav-item active">
    //         <span class="text text-label-large" data-notebook-field>
    //           ${name}
    //         </span>
    //         <button class="icon-btn-small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
    //           <span class="material-symbols-rounded" aria-hidden="true">
    //             Edit
    //           </span>
    //           <div class="state-layer"></div>
    //         </button>
    //         <button class="icon-btn-small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
    //           <span class="material-symbols-rounded" aria-hidden="true">
    //             delete
    //           </span>
    //           <div class="state-layer"></div>
    //         </button>
    //         <div class="state-layer"></div>
    //       </div>
    //     `;

    //     // showing tooltip on editt and delete

    //     let tooltipElems=navItem.querySelectorAll('[data-tooltip]')

    //     tooltipElems.forEach(elem=>Tooltip(elem))
  
    //     return navItem;
    //   };
  
      let sidebarList = document.querySelector('[data-sidebar-list]');
      let notePanelTitle = document.querySelector('[data-note-panel-title]')
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
        }
        },
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
        }




    },

    get:{
        // retrives all from db

        notebook(){
            readDB()

            return noteKeeperDB.notebooks
        }
    }
}





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

        tooltipElems.forEach(elem=>Tooltip(elem))
  
    return navItem;
  }
  
  // Function to render existing notebooks
  function renderExistedNotebook() {
    let notebookList = db.get.notebook(); // Assuming this function returns a list of notebooks
  
    let sidebarList = document.querySelector('[data-sidebar-list]');
    let notePanelTitle = document.querySelector('[data-note-panel-title]');
  
    notebookList.forEach((notebookData) => {
      let navItem = NavItem(notebookData.id, notebookData.name);
      sidebarList.appendChild(navItem);
      notePanelTitle.textContent = notebookData.name;
    });
  }
  
  // Call the renderExistedNotebook function to render existing notebooks
  renderExistedNotebook();
  


 
