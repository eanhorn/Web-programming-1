//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const helpers = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      const movieCollection = await movies();
      const movies = movieCollection.find({},{projection:{_id:1, title: 1}}).toArray();
      res.json(movies);
    }catch(e){res.status(404).json({error:e})}
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      req.body.title = helpers.checkTitle(req.body.title);
      req.body.plot = helpers.checkString(req.body.plot, 'plot');
      req.body.genres = helpers.checkGenres(req.body.genres);
      req.body.rating = helpers.checkRating(req.body.rating);
      req.body.studio = helpers.checkStudio(req.body.studio);
      req.body.director = helpers.checkDirector(req.body.director);
      req.body.castMembers = helpers.checkCast(req.body.castMembers);
      req.body.dateReleased = helpers.checkDate(req.body.dateReleased, 'dateReleased');
      req.body.runtime = helpers.checkRuntime(req.body.runtime);
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try{
      const movie = await movieData.createMovie(req.body.title, 
          req.body.plot, req.body.genres, req.body.rating, req.body.studio, req.body.director, req.body.castMembers, 
          req.body.dateReleased, req.body.runtime);
      res.status(200).json(movie);
    }catch(e){res.status(500).json({error: e})}
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.movieId = helpers.checkId(req.params.movieId,'movieID URL Param');
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      const movie = await movieData.getMovieById(req.params.movieId);
      res.status(200).json(movie);
    }catch(e){
      res.status(404).json({error:e});
      return;
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.movieId = helpers.checkId(req.params.movieId, 'movieId URL Param')
    }catch(e){
      res.status(400).json({error:e})
      return;
    }
    try{
      await movieData.removeMovie(req.params.movieId);
      res.status(200).json({movieId: req.params.movieId, deleted: true})
    }catch(e){
      res.status(404).json({error:e});
      return;
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const updateData = req.body;
    try{
      req.params.movieId = helpers.checkId(req.params.movieId, 'movieId URL Param');
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      updateData.title = helpers.checkTitle(updateData.title);
      updateData.plot = helpers.checkString(updateData.plot, 'plot');
      updateData.genres = helpers.checkGenres(updateData.genres);
      updateData.rating = helpers.checkRating(updateData.rating);
      updateData.studio = helpers.checkStudio(updateData.studio);
      updateData.director = helpers.checkDirector(updateData.director);
      updateData.castMembers = helpers.checkCast(updateData.castMembers);
      updateData.dateReleased = helpers.checkDate(updateData.dateReleased, 'dateReleased');
      updateData.runtime = helpers.checkRuntime(updateData.runtime);
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try{
      const newMovie = await movieData.updateMovie(req.params.movieId,updateData.title,updateData.plot,updateData.genres,
        updateData.rating,updateData.studio,updateData.director,updateData.castMembers,updateData.dateReleased,updateData.runtime);
      res.status(200).json(newMovie)
    }catch(e){
      res.status(500).json({error:e})
      return;
    }
  });

module.exports = router;