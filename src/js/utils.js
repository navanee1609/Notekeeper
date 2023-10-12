

// data note book field

let lastActiveNavItem;


// activates navigation by active class and deactivate the previous active item


let activeNoteBook=function (){
    lastActiveNavItem?.classList.remove('active')
    this.classList.add('active')   //this navItem
    lastActiveNavItem=this
  }


//   make dom element editable by setting contenteditable true

let makeElemEditable= function(element){
    element.setAttribute('contenteditable',true);
    element.focus()
}

// generating id based on current timestamp
 
let generateID = function(){
  return new Date().getTime().toString();

}


/*  db => database,
    notebookId=> id of notebook ton find
    object | undefined => found or not found

    */

let findNotebook= function (db, notebookId){
  return db.notebooks.find(notebook =>notebook.id === notebookId)
}


/*  
db => object contsins array of objects
notebookId => id of the notebook to find
returnm => indec of the found notebook or -1 if not found  

*/


let findNotebookIndex= function (db,notebookId){
  return db.notebooks.findIndex(item=> item.id===notebookId)
}





  export{
    activeNoteBook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex
    
  }