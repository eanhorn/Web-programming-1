//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const movieData = data.movies;
const helpers = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.movieId = helpers.checkId(req.params.movieId, 'movieId URL Param');
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      const reviews = await reviewData.getAllReviews(req.params.movieId);
      if(reviews.length === 0) throw 'Error: no reviews received'
      res.status(200).json(reviews);
    }catch(e){
      res.status(404).json({error:e})
      return;
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      req.params.movieId = helpers.checkId(req.params.movieId, 'movieId URL Param');
      req.body.reviewTitle = helpers.checkString(req.body.reviewTitle, 'reviewTitle');
      req.body.reviewerName = helpers.checkString(req.body.reviewerName, 'reviewerName');
      req.body.review = helpers.checkString(req.body.review, 'review');
      if(isNaN(req.body.rating) || req.body.rating < 1 || req.body.rating > 5) throw ' Error: rating must be a number between 1 and 5'
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      await reviewData.createReview(req.params.movieId,req.body.reviewTitle,req.body.reviewerName,req.body.review,req.body.rating);
      const movie = await movieData.getMovieById(req.params.movieId);
      res.status(200).json(movie);
    }catch(e){res.status(500).json({error:e});}
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.reviewId = helpers.checkId(req.params.reviewId, 'reviewId URL Param');
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      const review = await reviewData.getReview(req.params.reviewId);
      res.status(200).json(review);
    }catch(e){
      res.status(404).json({error:e})
      return;
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.reviewId = helpers.checkId(req.params.reviewId, 'reviewId URL Param');
    }catch(e){
      res.status(400).json({error:e});
      return;
    }
    try{
      const updMovie = await reviewData.removeReview(req.params.reviewId);
      res.status(200).json(updMovie);
    }catch(e){
      res.status(404).json({error:e})
      return;
    }
  });
module.exports = router;
