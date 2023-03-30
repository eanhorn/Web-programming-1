function questionOne(arr) {
  if(!Array.isArray(arr)){
    throw 'Error: parameter is not an array';
  }
  let retVal = [];
  isPrime = true;
  for(let i=0; i<arr.length; i++){
    let num = arr[i];
    if(isNaN(num)){
      retVal.push(false);
      continue;
    }
    else if(num<=1){
      retVal.push(false);
      continue;
    }
    for(let j=2; j<=Math.sqrt(num); j++){
      if(num%j === 0){
        isPrime = false;
      }
    }
    retVal.push(isPrime);
  }
  return retVal;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  if(!isNaN(startingNumber)){
    if(startingNumber === 0){
      return 0;
    }
  }
  if(!isNaN(commonRatio)){
    if(commonRatio === 0){
      return 0;
    }
  }
  if(!isNaN(numberOfTerms)){
    if(numberOfTerms <= 0 || numberOfTerms%1 != 0){
      return NaN;
    }
  }
  let sum = 0;
  for(let i=0; i<numberOfTerms; i++){
    sum += startingNumber * (commonRatio**i);
  }
  return sum;
}

function questionThree(str) {
  if(typeof str !== 'string'){
    throw 'Error: parameter is not a string';
  }
  consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
  numCons = 0;
  for(let i=0; i<str.length; i++){
    currChar = str[i];
    if(consonants.includes(currChar)){
      numCons ++;
    }
  }
  return numCons;
}

function questionFour(fullString, substring) {
  if(typeof fullString !== 'string'){
    throw 'Error: parameter is not a string';
  }
  if(substring.length === 0){
    throw 'Error: substring is empty';
  }
  if(fullString.length === 0){
    throw 'Error: fullString is empty';
  }
  numOccur = 0;
  for(let i=0; i<fullString.length; i++){
    if(fullString[i] === substring[0]){
      loopPos = 1;
      matching = true;
      while(matching && loopPos<substring.length){
        if(fullString[i+loopPos] !== substring[loopPos]){
          matching = false;
        }
        loopPos++;
      }
      if(matching){
        numOccur++;
        i += substring.length-1;
      }
    }
  }
  return numOccur;
}


module.exports = {
  firstName: 'Erik',
  lastName: 'Anhorn',
  studentId: '10447539',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};