const lab1 = require('./lab1');

//Question1 test cases
console.log(lab1.questionOne([2,7,26]));
console.log(lab1.questionOne([1,3,317]));
console.log(lab1.questionOne([14159,457,9]));
console.log(lab1.questionOne([5,4,0]));
console.log(lab1.questionOne([17389,10]));

console.log('');

//Question2 test cases
console.log(lab1.questionTwo(5,3,10));
console.log(lab1.questionTwo(15,12,-40));
console.log(lab1.questionTwo(56,25,10));
console.log(lab1.questionTwo(0,10,4));
console.log(lab1.questionTwo(175,4,8));

console.log('');

//Question3 test cases
console.log(lab1.questionThree('Testing the accuracy?'));
console.log(lab1.questionThree('TTryiNg upper case'));
console.log(lab1.questionThree('Test-case for ~ weird chars!'));
console.log(lab1.questionThree('What else to say?'));
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog"));

console.log('');

//Question4 test cases
console.log(lab1.questionFour('Hello World!', 'll'));
console.log(lab1.questionFour('Checking for a double to fail', 'cc'));
console.log(lab1.questionFour('This class is great!', 'a'));
console.log(lab1.questionFour('Where should the test cases go next? Easy', 'e'));
console.log(lab1.questionFour('Helllllllo, class', 'll'));
//TODO: Write and call each function in lab1.js 5 times each, passing in different input
