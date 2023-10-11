// import 


/*
  creates a navigation item represents notebook ...AbortControllerit allows editiung,display notebookj name, handles click event to display its associated datas


  id==>unique identifier
  name==>name of notebook
  returns html 

  */


export let NavItem = function(id, name){


    let navItem = document.createElement('div')
    navItem.classList.add('nav-item')
    navItem.setAttribute(data-notebook,id)

    navItem.innerHTML=`
            <span class="text text-label-large" data-notebook-field>
            ${name}
        </span>

        <button class="icon-btn-small"  aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">
                        Edit
                    </span>


                    <div class="state-layer"></div>

        </button>
        <button class="icon-btn-small"  aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">
                        delete
                    </span>


                    <div class="state-layer"></div>

        </button>

        <div class="state-layer"></div>


    `
}