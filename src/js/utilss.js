/**@param {Array<HTMLElements>} elements   ===>an array of DOM elements

@param {string}  eventType ==>type of event to listen

@param {Function} callback ==>function to be excuted when called (Event occurs)

**/




let addEventOnElements = function(elements,eventType,callback){
    console.log(elements);

    elements.forEach(element=>element.addEventListener(eventType,callback))
}



export{
    addEventOnElements
}