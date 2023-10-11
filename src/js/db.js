// DB object

let notekeeperDB={}


// initialise a local database..if data exists local storage loaded

let initDB= function(){
    let db= localStorage.getItem('noteKeeperDB')


    if(db){
        notekeeperDB=JSON.parse(db);
    }else{
        notekeeperDB.nootebooks=[]
        localStorage.setItem('noteKeeperDB',JSON.stringify(notekeeperDB))
    }



}

initDB()


export const db={}