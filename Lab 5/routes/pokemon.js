//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
const helpers = require('../helpers');

router
  .route('/pokemon')
  .get(async (req,res) => {
    try{
      const pokemon = await pokemonData.pokemon();
      res.json(pokemon);
    }catch(e){res.status(404).json(e)}
  });

router
  .route('/pokemon/:id')
  .get(async(req,res) =>{
    try{
      let id = parseInt(req.params.id);
      try{
        id = helpers.checkNumber(id, 'id');
      }catch(e){
        res.status(400).json('Invalid URL Parameter');
        return;
      }
      const pokemon = await pokemonData.pokemonById(id);
      res.json(pokemon);
    }catch(e){
      if(e.response && e.response.status === 404){
        res.status(404).json('Pokémon Not Found!')
      }
      else{
        res.status(500).json(e)
      }}
  });

module.exports = router;