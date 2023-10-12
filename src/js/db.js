// import 

import { generateID, findNotebook } from "./utils.js";



// DB object

let notekeeperDB={}


// initialise a local database..if data exists local storage loaded

let initDB= function(){
    let db= localStorage.getItem('noteKeeperDB')


    if(db){
        notekeeperDB=JSON.parse(db);
    }else{
        notekeeperDB.notebooks=[];
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

            let notebookData={
                id:generateID(),
                name,
                notes:[]
            }
          
            notekeeperDB.notebooks.push(notebookData)
            

            writeDB()

            return notebookData;
        },

      
 
    },

    get:{

        // retrives all notebook from db
        notebook(){
            readDB()


            return notekeeperDB.notebooks
        }
    },

    update:{

        /*  notebookId ->id to update*/
        notebook(notebookId,name){
            readDB()
let notebook= findNotebook(notekeeperDB, notebookId)

notebook.name=name


            writeDB()

            return notebook
        }



    }

  


    // delete:{
    //     notebook(notebookId){
    //         readDB()

    //         let notebookIndex=findNotebookIndex(notekeeperDB,notebookId)

    //         notekeeperDB.nootebooks.splice(notebookIndex,1)

    //         writeDB()
    //     }
    // }
  
    
}