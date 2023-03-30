/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

(function (){
    function sortArrs(arrs){
        if(!arrs) throw 'Must provide an input';
        let arr = [];
        for(let i=0; i<arrs.length; i++){
            let curr = arrs[i];
            if(curr === ',' || curr === ' ') continue;
            if(curr !== '[') throw 'Each array input must be of the form [number,number...]';
            if(arrs[i+1] === ']') throw 'Every array must contain at least one whole number';
            i++;
            curr = arrs[i];
            while(curr !== ']'){
                if(arrs[i-1] === '[' && curr === ']') throw 'Every array must contain at least one whole number';
                if(arrs[i] === '.') throw 'No decimals are allowed';
                if(curr === '[') throw 'Nested arrays are not allowed';
                if(curr === ',') {i++; curr = arrs[i]; continue;}
                if(curr === ' ') {i++; curr = arrs[i]; continue;}
                if(isNaN(curr)) throw `${curr} is not a number`;
                while(!isNaN(arrs[i+1]) && i<arrs.length){
                    curr += arrs[i+1];
                    i++;
                }
                arr.push(parseInt(curr));
                i++;
                curr = arrs[i];
            }
        }
        arr.sort(function(a,b){
            if(a>b) return 1;
            if(b>a) return -1;
            else return 0;
        });
        return arr;
    }
    const staticForm = document.getElementById('static-form');
    if(staticForm){
        const textInput = document.getElementById('input');
        const errorDiv = document.getElementById('error');
        const errorText = errorDiv.getElementsByClassName('text-goes-here')[0];
        const results = document.getElementById('results');
        let i=1;
        const classes = ['is-red', 'is-green'];

        staticForm.addEventListener('submit', (event) =>{
            event.preventDefault();
            try{
                errorDiv.hidden = true;
                const inputVal = textInput.value;
                const result = sortArrs(inputVal);
                let li = document.createElement('li');
                li.innerHTML = '['+result+']';
                li.classList.add(classes[i%2]);
                i++;
                results.appendChild(li);
                staticForm.reset();
                textInput.focus();
            }catch(e){
                const message = typeof e === 'string' ? e: e.message;
                errorText.textContent = message;
                staticForm.reset();
                textInput.focus();
                errorDiv.hidden = false;
            }
        });
    }
})();