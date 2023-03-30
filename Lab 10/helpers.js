//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const checkUsername = (username) =>{
    if(!username) throw 'Error: username must be supplied';
    if(typeof username !== 'string') throw 'Error: username must be a string';
    if(username.trim().length < 4) throw 'Error: username must be at least 4 characters long';
    //Make sure username only contains alphanumeric characters
    username = username.trim();
    if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/.test(username)) throw 'Error: username can only contain alphanumeric characters'
    return username;
};
const checkPass = (pswd) =>{
    if(!pswd) throw 'Error: password must be supplied';
    if(typeof pswd !== 'string') throw 'Error: password must be a string';
    if(pswd.trim().length < 6) throw 'Error: password must be at least 6 characters long'; 
    pswd = pswd.trim();
    if(/[ ]/.test(pswd)) throw 'Error: password cannot contain spaces';
    if(! /[A-Z]/.test(pswd)) throw 'Error: password must contain at least 1 uppercase character';
    if(! /[0-9]/.test(pswd)) throw 'Error: password must contain at least 1 number';
    if(! /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pswd)) throw 'Error: password must contain at least 1 special character'
    //Check that password does not have spaces, also make sure it has:
    /*
        1 uppercase character
        1 number
        1 special character
    */
   return pswd;
};
module.exports = {
    checkUsername,
    checkPass
};
