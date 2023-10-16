

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

/* 
converts timwstamp in milli/secs  to relative time string

milliseconds   ms to convert
return => relative time (3 days ago like that)



*/




let getRelativeTime=function(milliseconds){
  let currentTime= new Date().getTime();
  let minute= Math.floor((currentTime - milliseconds) / 1000 / 60);

  let hour = Math.floor(minute / 60);

  let day=Math.floor(hour / 24);

  return minute < 1 ? 'Just now' : minute < 60 ? `${minute} min ago` : hour <24 ? `{hour} hour ago`: `${day} day ago`
}

let findNote= (db, noteId)=>{
  let note;

  for(let notebook of db.notebooks){
    note=notebook.notes.find(note=> note.id === noteId)
    if(note) break
  }
  return note;
}



let findNoteIndex= function (notebook, noteId){
  return notebook.notes.findIndex(note => note.id===noteId)
}

  export{
    activeNoteBook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote,
    findNoteIndex 
    
  }