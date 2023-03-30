const axios = require('axios');

async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
}

const getPersonById = async (id) => {
    if(id === undefined) throw 'Id must exist';
    if(typeof id !== 'string') throw 'Id must be of type string'
    id = id.trim();
    if(id.length === 0) throw 'Id must not be empty'
    const data = await getPeople();
    for(let i=0;i<data.length;i++){
        if(data[i]['id'] === id){
            return data[i];
        }
    }
    throw 'person not found'
};

const sameJobTitle = async (jobTitle) => {
    if(jobTitle === undefined) throw 'jobTitle must exist'
    if(typeof jobTitle !== 'string') throw 'jobTitle must be of type string'
    jobTitle = jobTitle.trim();
    if(jobTitle.length === 0) throw 'jobTitle must not be empty'
    jobTitle = jobTitle.toLowerCase();
    let sameJob = [];
    let numPeople = 0;
    const data = await getPeople();
    for(let i=0;i<data.length;i++){
        if(data[i]['job_title'].toLowerCase() === jobTitle){
            sameJob.push(data[i]);
            numPeople++;
        }
    }
    if(numPeople === 0) throw 'No matches found'
    return sameJob;

};

const getPostalCodes = async (city, state) => {
    if(city === undefined) throw 'city must exist'
    if(state === undefined) throw 'state must exist'
    if(typeof city !== 'string') throw 'city must be of type string'
    if(typeof state !== 'string') throw 'state must be of type string'
    city = city.trim();
    if(city.length === 0) throw 'city must not be empty'
    state = state.trim();
    if(state.length === 0) throw 'state must not be empty'
    city = city.toLowerCase();
    state = state.toLowerCase();
    const data = await getPeople();
    let postalCodes = [];
    let numCodes = 0;
    for(let i=0;i<data.length;i++){
        if(data[i]['city'].toLowerCase() === city){
            if(data[i]['state'].toLowerCase() === state){
                if(postalCodes.includes(parseInt(data[i]['postal_code'],10))){continue}
                postalCodes.push(parseInt(data[i]['postal_code'],10));
                numCodes++;
            }
        }
    }
    if(numCodes === 0) throw 'No postal codes found'
    postalCodes = postalCodes.sort()
    return postalCodes;
};

const sameCityAndState = async (city, state) => {
    if(city === undefined) throw 'city must exist'
    if(state === undefined) throw 'state must exist'
    if(typeof city !== 'string') throw 'city must be of type string'
    if(typeof state !== 'string') throw 'state must be of type string'
    city = city.trim();
    if(city.length === 0) throw 'city must not be empty'
    state = state.trim();
    if(state.length === 0) throw 'state must not be empty'
    city = city.toLowerCase();
    state = state.toLowerCase();
    const data = await getPeople();
    let cityState = [];
    let numSame = 0;
    for(let i=0;i<data.length;i++){
        if(data[i]['city'].toLowerCase() === city){
            if(data[i]['state'].toLowerCase() === state){
                tempObj = {first : data[i]['first_name'], last: data[i]['last_name']};
                let isFound=false;
                for(let j=0;j<cityState.length;j++){
                    if((cityState[j]['first'] === tempObj['first']) && (cityState[j]['last'] === tempObj['last'])){
                        isFound = true;
                        break;
                    }
                }
                if(isFound){continue}
                cityState.push(tempObj);
                numSame++;
            }
        }
    }
    if(numSame < 2) throw 'No one found with the same city and state'
    //Now need to sort and return
    cityState = cityState.sort(function (a,b){
        if(a.last<b.last){return -1}
        if(a.last>b.last){return 1}
        return 0;
    });
    let retCityState = [];
    for(let i=0;i<cityState.length;i++){
        retCityState.push(`${cityState[i].first} ${cityState[i].last}`);
    }
    return retCityState;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState,
    getPeople
};
