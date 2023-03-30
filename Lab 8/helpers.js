//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
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
const checkNumber = (num, varName) => {
    if(!num) throw `Error: You must supply a ${varName}`;
    if(isNaN(num) || num < 0) throw `Error: ${varName} must be a number greater than 0`;
    return num;
}
module.exports = {
    checkString,
    checkNumber
}
