/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objectUtils = require('./objectUtils');

//arrayStats Tests
try{
    arrayUtils.arrayStats([10,-35,33,5,20.5,11,42]);
    console.log('arrayStats passed successfully')
}catch(e){console.error(e)}
try{
    arrayUtils.arrayStats('Should break');
    console.error('arrayStats did not error')
}catch(e){console.log('arrayStats failed successfully')}

//makeObjects tests
try{
    arrayUtils.makeObjects(['hello' , 'world'], [4, 1], ['foo', 'bar']);
    console.log('makeObjects passed successfully');
}catch(e){console.error(e)}
try{
    arrayUtils.makeObjects(['hello', 'there', 'world']);
    console.error('makeObjects did not error');
}catch(e){console.log('makeObjects failed successfully')}

//commonElements tests
try{
    const arr1 = [3,2,'Check'];
    const arr2 = ['Check',3];
    arrayUtils.commonElements(arr1,arr2);
    console.log('commonElements passed successfully');
}catch(e){console.error(e)}
try{
    arrayUtils.commonElements('Should fail');
    console.error('commonElements did not error');
}catch(e){console.log('commonElements failed successfully')}

//palindromes tests
try{
    stringUtils.palindromes('Mom, look at the racecar! Wow!');
    console.log('palindromes passed successfully');
}catch(e){console.error(e)}
try{
    stringUtils.palindromes('      ');
    console.error('palindromes did not error');
}catch(e){console.log('palindromes failed successfully')}

//replaceChar tests
try{
    stringUtils.replaceChar('The quick brown fox');
    console.log('replaceChar passed successfully');
}catch(e){console.error(e)}
try{
    stringUtils.replaceChar(42);
    console.error('replaceChar did not error');
}catch(e){console.log('replaceChar failed successfully')}

//charSwap tests
try{
    stringUtils.charSwap('Jonathan', 'Taylor');
    console.log('charSwap passed successfully');
}catch(e){console.error(e)}
try{
    stringUtils.charSwap('fail');
    console.error('charSwap did not error');
}catch(e){console.log('charSwap failed successfully')}

//deepEquality tests
try{
    const obj1 = {a:2, name:{first:'erik', last:'anhorn'}};
    const obj2 = {name:{last:'anhorn', first:'erik'}, a:2};
    objectUtils.deepEquality(obj1,obj2);
    console.log('deepEquality passed successfully');
}catch(e){console.error(e)}
try{
    const obj1 = [4,7,2];
    const obj2 = [2,7,4];
    objectUtils.deepEquality(obj1,obj2);
    console.error('deepEquality did not error');
}catch(e){console.log('deepEquality failed successfully')}

//commonKeysValues
try{
    const obj1 = {place:{school:'Stevens', town:'Hoboken'}, a:5};
    const obj2 = {b:4, place:{school:'Stevens', town:'Hoboken'}};
    objectUtils.commonKeysValues(obj1,obj2);
    console.log('commonKeysValues passed successfully');
}catch(e){console.error(e)}
try{
    const obj1 = 'foo';
    const obj2 = 'bar';
    objectUtils.commonKeysValues(obj1,obj2);
    console.error('commonKeysValues did not error');
}catch(e){console.log('commonKeysValues failed successfully')}

//calculateObject
try{
    objectUtils.calculateObject({x:3,y:8,z:15}, n =>n+1);
    console.log('calculateObject passed successfully');
}catch(e){console.error(e)}
try{
    objectUtils.calculateObject('1234');
    console.error('calculateObject did not error');
}catch(e){console.log('calculateObject failed successfully')}