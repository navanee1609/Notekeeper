import {db} from "./db.js";



// data note bookj field

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

let findNotebook=function(db,notebookId){

  /*
  db-- database containing object
  notebookID-- id of notebook field
  return--- notebook object

  */

  return db.notebooks.find(notebook=>notebook.id===notebookId)
}



// findnotebookindex


let findNotebookIndex=function(db,notebookID){
   return db.notebooks.findIndex(item=>item.id=== notebookID)

}





  export{
    activeNoteBook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex
  }