//Your data modules to make the Axios calls and get the data
const helpers = require('../helpers');
const axios = require('axios');

const pokemon = async () => { 
    let {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data;
};

const pokemonById = async (id) => { 
    id = helpers.checkNumber(id, 'id');
    if(id<1) throw 'Error: id must be greater than 0';
    let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
};

module.exports = {
    pokemon, 
    pokemonById
};