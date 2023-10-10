// data note bookj field

let lastActiveNavItem;


// activates navigation by active class and deactivate the previous active item


let activeNoteBook=function (){
    lastActiveNavItem.classList.remove('active')
    this.classList.add('active')   //this
    lastActiveNavItem=this
  }


  export{
    activeNoteBook
  }