//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const {ObjectId} = require('mongodb');
const checkString = (str, varName, length=0) =>{
    if(!str) throw `Error: You must supply a ${varName}`
    if(typeof str !== 'string') throw `Error: ${varName} must be of type string`
    if(length !== 0){
        if(str.trim().length < length) throw `Error: ${varName} must be of at least length ${length}`
    }
    else{
        if(str.trim().length === length) throw `Error: ${varName} must not be empty`
    }
    str = str.trim()
    // if (!isNaN(str))
    //   throw `Error: ${str} is not a valid value for ${varName} as it only contains digits`;
    return str
}
const checkId = (id, varName) => {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error: ${varName} must be of type string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} must not be empty`;
    if(!ObjectId.isValid(ObjectId(id))) throw `${varName} must be a valid ObjectId`
    return id
}
const checkDate = (date, varName) => {
    date = checkString(date, varName);
    const checkDate = date.split('/');
    if(! /^(0[1-9]|1[0-2])/.test(checkDate[0])) throw `${varName} must be of the form MM/dd/yyyy`
    if(! /^(0[1-9]|[12][0-9]|3[01])/.test(checkDate[1])) throw `${varName} must be of the form mm/DD/yyyy`
    //Check year for errors
    if(! /^(19|20)[0-9][0-9]/.test(checkDate[2])) throw `${varName} must be of the form mm/dd/YYYY`
    const thirty = ['04','06','09','11'];
    const tweneight = ['02'];
    if((tweneight.includes(checkDate[0]) && (Number(checkDate[1]) > 28)) || 
        (thirty.includes(checkDate[0]) && (Number(checkDate[1]) > 30))) throw 'The given day does not fall within the given month'
    const currYear = new Date().getFullYear();
    if((Number(checkDate[2]) - currYear) > 2) throw 'The release year cannot be more than 2 years in the future'
    return date;    
}
const checkRating = (rating) => {  
    rating = checkString(rating, 'rating');
    const allowedRating = ['G','PG','PG-13','R','NC-17'];
    if(!allowedRating.includes(rating)) throw 'rating must be one of the following values: G, PG, PG-13, R, NC-17'
    return rating;
}
const checkTitle = (title) => {
    title = checkString(title, 'title', 2);
    if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(title)) throw 'title cannot contain special characters or punctuation'
    return title;
}
const checkStudio = (studio) =>{
    studio = checkString(studio, 'studio', 5);
    if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(studio)) throw 'studio cannot contain special characters or numbers'
    return studio;
}
const checkDirector = (director) => {
    director = checkString(director, 'director');
    if(! /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(director)) throw "director must be of the form 'FirstName LastName and cannot contain anything but letters"
    return director;
}
const checkGenres = (genres) => {
    if(genres === undefined) throw 'genres must exist'
    if((!Array.isArray(genres)) || (genres.length === 0) || 
    (genres.some(g => ((typeof g !== 'string') || (g.trim().length < 5) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(g))))) 
        throw 'genres must be an array with at least one non-empty string in it'
    genres.forEach(elem => elem = elem.trim());
    return genres
}
const checkCast = (castMembers) => {
  if(castMembers === undefined) throw 'castMembers must exist'
  if((!Array.isArray(castMembers)) || (castMembers.length === 0) || 
  (castMembers.some(c => (typeof c !== 'string') || (c.trim().length < 7) || (! /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(c))))) 
    throw "castMembers must be an array of strings with at least one non-empty string of the form 'FirstName LastName'"
    castMembers.forEach(elem => elem = elem.trim());
    return castMembers
}
const checkRuntime = (runtime) => {
    runtime = checkString(runtime, 'runtime');
    if(! /^[1-9]h (0|0[1-9]|[1-9]|[1-5][0-9])min$/.test(runtime)) throw "The runtime must be of the form '#h #min' and must be at least 1 hour"
    return runtime;
}
module.exports = {
    checkString,
    checkId,
    checkDate,
    checkRating,
    checkTitle,
    checkStudio,
    checkDirector,
    checkGenres,
    checkCast,
    checkRuntime
}
