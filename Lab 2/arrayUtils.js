/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {
  if(array == 'undefined') throw 'The Array must exist';
  if(!Array.isArray(array)) throw 'The Array is not an array';
  if(array.length === 0) throw 'The Array must not be empty';
  for(let i=0; i<array.length; i++){
    if(typeof array[i] != 'number') throw 'Every element of the Array must be a number';
  }
  //Now can compile arrayInfo
  array.sort(function(x,y){return x-y});
  let Sum = 0;
  let Count = array.length;
  let Minimum = array[0];
  let Maximum = array[Count-1];
  let mid = Math.floor(Count/2);
  for(let i=0; i<array.length; i++){
    Sum += array[i];
  }
  let best = 1;
  let bestElems = [];
  let curr = 1;
  let currElem = array[0];
  for (let i = 1; i<Count; i++){
    if(array[i-1] !== array[i]){
      if(curr > best){
        best = curr;
        bestElems = [];
        bestElems.push(currElem);
      }
      else if((curr===best) && (curr > 1 && best > 1)){
        bestElems.push(currElem);
      }
      curr = 0;
      currElem = array[i];
    }
    curr++;
  }
  let Mode = 0;
  if(bestElems.length === 0){
    Mode = 0;
  }
  else if(bestElems.length === 1){
    Mode = bestElems[0];
  }
  else{
    Mode = bestElems;
  }
  let arrayInfo = {
    arr: array,
    mean : Sum/Count,
    median : Count % 2 !== 0 ? array[mid] : (array[mid-1] + array[mid]) / 2,
    mode : Mode,
    range : Maximum - Minimum,
    minimum : Minimum,
    maximum : Maximum,
    count : Count,
    sum : Sum
  };
  return arrayInfo;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays == 'undefined') throw 'The input must exist';
  if(arrays.length === 0) throw 'The input must contain data';
  let object = {};
  for(let i=0; i<arrays.length; i++){
    if(!Array.isArray(arrays[i])) throw 'All inputs must be an array';
    if(arrays[i].length !== 2) throw 'Every array must be of length 2';
    let key = arrays[i][0]
    object[key] = arrays[i][1];
  }
  return object;
};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays == 'undefined') throw 'The input must exist';
  if(arrays.length < 2) throw 'There must be at least 2 inputs';
  for(let i=0; i<arrays.length; i++){
    if(!Array.isArray(arrays[i])) throw 'All inputs must be an array';
    if(arrays[i].length === 0) throw 'Every array must not be empty';
  }
  let commonElems = [];
  //Loop for each array in arrays
  for (let i=0; i<arrays.length-1; i++){
    //Loop for looking up each element from the current array in the next array in the list
    let searchedArr = arrays[i+1];
    let srcArr = arrays[i];
    for(let j=0; j<srcArr.length; j++){
      //Find a match, add it to array of common elements
      if(Array.isArray(srcArr[j])){
        for(let k=0; k<searchedArr.length; k++){
          if(Array.isArray(searchedArr[k])){
            if(srcArr[j].every(function(elem){return searchedArr[k].includes(elem)})){
              let found = false;
              for(let l=0; l<commonElems.length; l++){
                if(srcArr[j].every(function (elem){return commonElems.includes(elem)})){
                  found = true;
                  break;
                }
              }
              if(!found){commonElems.push(srcArr[j]);}
            }
          }
        }
      }
      else{
        for(let k=0; k<searchedArr.length; k++){
          if(srcArr[j] === searchedArr[k]){
            let found = false;
            for(let l=0; l<commonElems.length; l++){
              if(srcArr[j] === commonElems[l]){
                found = true;
                break;
              }
            }
            if(!found){commonElems.push(srcArr[j]);}
          }
        }
      }
      // if(searchedArr.includes(srcArr[j])){
      //   if(!commonElems.includes(srcArr[j])){
      //     commonElems.push(srcArr[j]);
      //   }
      // }
    }
  }
  return commonElems;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
};
