/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
      if(string === 'undefined') throw 'The input must exist';
      if(typeof string !== 'string') throw 'The input must be a string';
      string = string.trim();
      if(string.length === 0) throw 'The input must not be empty';
      string = string.replace(/[^A-Za-z\s]/g,'');
      let modString = string.toLowerCase();
      modString = modString.trim();
      let words = modString.split(/\s/);
      let retWords = string.split(/\s/);
      let palindromes = [];
      let isPalin = true;
      for(let i=0; i<words.length; i++){
            isPalin = true;
            let w = words[i]
            for(let j=0; j<Math.floor(w.length/2); j++){
                  if(w[j] !== w[w.length-j-1]){
                        isPalin = false;
                        break;
                  }
            }
            if(isPalin){
                  palindromes.push(retWords[i]);
            }
      }
      return palindromes;
};

let replaceChar = (string) => {
      if(string === 'undefined') throw 'The input must exist';
      if(typeof string !== 'string') throw 'The input must be a string';
      string.trim();
      if(string.length === 0) throw 'The string must not be empty';
      let replaced = string;
      let repChar = '*$';
      for(let i=0; i<Math.floor(replaced.length/2); i++){
            replaced = replaced.substring(0,i*2+1) + repChar[i%2] + replaced.substring(i*2+2, replaced.length);
      }
      return replaced;
};

let charSwap = (string1, string2) => {
      if(string1 === 'undefined') throw 'String1 must exist';
      if(string2 === 'undefined') throw 'String2 must exist';
      if(typeof string1 !== 'string') throw 'String1 must be of type string';
      if(typeof string2 !== 'string') throw 'String2 must be of type string';
      string1.trim();
      string2.trim();
      if(string1.length < 4) throw 'String1 must be at least 4 characters long';
      if(string2.length < 4) throw 'String2 must be at least 4 characters long';
      let temp1 = string1.substring(0,4);
      let temp2 = string2.substring(0,4);
      let newStr1 = string1.replace(temp1, temp2);
      let newStr2 = string2.replace(temp2, temp1);
      return `${newStr1} ${newStr2}`;
};

module.exports = {
      palindromes, 
      replaceChar,
      charSwap
};