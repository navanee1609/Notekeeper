// import 

import { generateID } from "./utils.js";


// DB object

let notekeeperDB={}


// initialise a local database..if data exists local storage loaded

let initDB= function(){
    let db= localStorage.getItem('noteKeeperDB')


    if(db){
        notekeeperDB=JSON.parse(db);
    }else{
        notekeeperDB.nootebooks=[];
        localStorage.setItem('noteKeeperDB',JSON.stringify(notekeeperDB))
    }



}

initDB()



// reads and loads the ls

let readDB=function (){
    notekeeperDB=JSON.parse(localStorage.getItem('noteKeeperDB'))
}



// writes current


let writeDB= function(){
    localStorage.setItem('noteKeeperDB',JSON.stringify(notekeeperDB))
}



// collection of function performing CRUD

// db is managed uswing local variable and LS


export const db={
    post:{
        notebook(name){
            readDB()

            let notebookdata={
                id:generateID(),
                name,
                notes:[]
            }
          

            notekeeperDB.nootebooks.push(notebookdata)
            

            writeDB()

            return notebookdata;
        }
    }
}