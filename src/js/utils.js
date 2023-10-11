// data note bookj field

let lastActiveNavItem;


// activates navigation by active class and deactivate the previous active item


let activeNoteBook=function (){
    lastActiveNavItem?.classList.remove('active')
    this.classList.add('active')   //this navitem
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





  export{
    activeNoteBook,
    makeElemEditable,
    generateID
  }