/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      if(obj1 === 'undefined') throw 'Obj1 must exist';
      if(obj2 === 'undefined') throw 'Obj2 must exist';
      if(typeof obj1 !== 'object') throw 'Obj1 must be of type object';
      if(typeof obj2 !== 'object') throw 'Obj2 must be of type object';
      if(Array.isArray(obj1)) throw 'Obj1 must be of type object';
      if(Array.isArray(obj2)) throw 'Obj2 must be of type object';
      let obj1Key = Object.keys(obj1);
      let obj2Key = Object.keys(obj2);
      if(obj1Key.length === 0 && obj2Key.length === 0) return true;
      if((obj1Key.length === 0 && obj2Key.length !== 0) || (obj1Key.length !== 0 && obj2Key.length === 0)) return false;
      let obj1Val = Object.values(obj1);
      let obj2Val = Object.values(obj2);
      let retVal = true;
      for(let i=0; i<obj1Key.length; i++){
            let currKey = obj1Key[i];
            let oppIndex = obj2Key.findIndex(function (elem){return elem === currKey});
            if(oppIndex === -1) return false;
            let currVal = obj1Val[i];
            let oppVal = obj2Val[oppIndex];
            if(typeof currVal === 'object'){
                  if(typeof oppVal !== 'object') return false;
                  retVal = retVal && deepEquality(currVal, oppVal);
            }
            else if(Number.isNaN(currVal) && Number.isNaN(oppVal)) retVal = retVal && true;
            else{
                  retVal = retVal && (currVal === oppVal);  
            }
      }
      return retVal;
};

let commonKeysValues = (obj1, obj2) => {
      if(obj1 === 'undefined') throw 'Obj1 must exist';
      if(obj2 === 'undefined') throw 'Obj2 must exist';
      if(typeof obj1 !== 'object') throw 'Obj1 must be of type object';
      if(typeof obj2 !== 'object') throw 'Obj2 must be of type object';
      if(Array.isArray(obj1)) throw 'Obj1 must be of type object';
      if(Array.isArray(obj2)) throw 'Obj2 must be of type object';
      let commonObj = {};
      let obj1Key = Object.keys(obj1);
      let obj2Key = Object.keys(obj2);
      if(obj1Key.length ===0 && obj2Key.length === 0) return commonObj;
      let obj1Val = Object.values(obj1);
      let obj2Val = Object.values(obj2);
      for(let i=0; i<obj1Key.length; i++){
            let currKey = obj1Key[i];
            let oppIndex = obj2Key.findIndex(function (elem){return elem === currKey});
            if(oppIndex === -1) continue;
            let currVal = obj1Val[i];
            let oppVal = obj2Val[oppIndex];
            if(typeof currVal === 'object'){
                  if(typeof oppVal !== 'object') continue;
                  let ret = commonKeysValues(currVal, oppVal);
                  if(ret.length !== 0){
                        commonObj[currKey] = currVal;
                  }
                  Object.assign(commonObj, ret);
            }
            else if(currVal === oppVal){
                  commonObj[currKey] = currVal;      
            }
      }
      return commonObj;     
};

let calculateObject = (object, func) => {
      if(object === 'undefined') throw 'Object must exist';
      if(func === 'undefined') throw 'Func must exist';
      if(typeof object !== 'object') throw 'Object must be of type object';
      if(typeof func !== 'function') throw 'Func must be of type function';
      let retObj = {};
      let objKey = Object.keys(object);
      if(objKey.length === 0) return retObj;
      let objVal = Object.values(object);
      for(let i=0; i<objVal.length; i++){
            let x = objVal[i]
            if(typeof x !== 'number') throw ' Every element of Object must be a number';
            let k = objKey[i]
            retObj[k] = Math.sqrt(func(x)).toFixed(2);
      }
      return retObj;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
};
