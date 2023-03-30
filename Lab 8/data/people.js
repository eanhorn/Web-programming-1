const axios = require('axios');
const helpers = require('../helpers');

//Axios call to get all data
const getAllPeople = async () => {
    let data = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data.data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    searchPersonName = helpers.checkString(searchPersonName, 'searchPersonName');
    searchPersonName = searchPersonName.toLowerCase();
    let results=[];
    let people = await getAllPeople();
    let i=0;
    while (results.length < 20 && i < people.length){
        let tmp = people[i];
        if(tmp.firstName.toLowerCase().includes(searchPersonName) || tmp.lastName.toLowerCase().includes(searchPersonName)){
            results.push(tmp);
        }
        i++;
    }
    if(results.length === 0) throw `No person found with the name ${searchPersonName}`;
    return results;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    id = helpers.checkNumber(id, 'id');
    id = Number(id);
    let people = await getAllPeople();
    for(let i=0;i<people.length; i++){
        if(people[i].id === id){
            return people[i];
        } 
    }
    throw `No person found with the id ${id}`;
};

module.exports = { searchPeopleByName, searchPeopleByID };
