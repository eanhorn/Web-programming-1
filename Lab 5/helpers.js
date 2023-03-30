//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
module.exports = {
    checkString(strVal, varName) {
        if (!strVal) throw `Error: You must supply a ${varName}`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string`;
        strVal = strVal.trim();
        if (strVal.length === 0)
          throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(strVal))
          throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        return strVal;
    },
    checkNumber(numVal, varName){
      if(!numVal) throw `Error: You must supply a ${varName}`;
      if(isNaN(numVal)) throw `Error: ${varName} must be a number`;
      return numVal;
    }
};