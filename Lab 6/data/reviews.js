const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const movie = require('./movies')
const helpers = require('../helpers');
const {ObjectId} = require('mongodb');
const uuid = require('uuid');
const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  movieId = helpers.checkId(movieId, 'movieId');
  reviewTitle = helpers.checkString(reviewTitle, 'reviewTitle');
  reviewerName = helpers.checkString(reviewerName, 'reviewerName');
  review = helpers.checkString(review, 'review');
  if(isNaN(rating) || rating < 1 || rating > 5) throw 'Error: rating must be a number between 1 and 5'

  //Check if there is a movie corresponding to movieId
  let thisMovie = await movie.getMovieById(movieId);
  thisMovie.reviews.forEach(elem => elem._id = ObjectId(elem._id));

  //Get today's date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  if(day < 10) day = `0${day}`
  if(month < 10) month = `0${month}`
  let currDate = `${month}/${day}/${year}`

  //Create the review
  let newReview = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: currDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  }
  const reviewId = newReview._id.toString();
  let overall = newReview.rating;
  let num = 1;

  for(let i=0;i<thisMovie.reviews.length;i++){
    overall += thisMovie.reviews[i].rating
    num++;
  }
  overall = Math.round(overall*10/num)/10;
  thisMovie.reviews.push(newReview);
  let updMovie = {
    title: thisMovie.title,
    plot: thisMovie.plot,
    genres: thisMovie.genres,
    rating: thisMovie.rating,
    studio: thisMovie.studio,
    castMembers: thisMovie.castMembers,
    dateReleased: thisMovie.dateReleased,
    runtime: thisMovie.runtime,
    reviews: thisMovie.reviews,
    overallRating: overall
  };

  //Now update the movie on the db
  const movieCollection = await movies();
  const updateInfo = await movieCollection.updateOne({_id: ObjectId(movieId)},{$set: updMovie});
  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed'
  return getReview(reviewId);
};

const getAllReviews = async (movieId) => {
  movieId = helpers.checkId(movieId);
  let thisMovie = await movie.getMovieById(movieId);
  thisMovie.reviews.forEach(elem => elem._id = elem._id.toString());
  return thisMovie.reviews;
};

const getReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);
  const movieCollection = await movies();
  //FInds the review matching the reviewId
  let thisReview = await movieCollection.findOne({'reviews._id': ObjectId(reviewId)},{projection:{ _id: 0, 'reviews.$': 1}});
  if(!thisReview) throw 'Error: no review found with the given reviewId'
  //Check formatting of output
  let retRev = thisReview;
  retRev.reviews[0]._id = thisReview.reviews[0]._id.toString();
  return retRev.reviews[0];
};

const removeReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);
  const movieCollection = await movies();
  let movieOfRev = await movieCollection.findOne({'reviews._id': ObjectId(reviewId)})
  //Query the subdocument, not the movie
  let remReview = await movieCollection.updateOne({'reviews._id': ObjectId(reviewId)}, {$pull: {'reviews': {_id: ObjectId(reviewId)}}})
  movieOfRev = await movieCollection.findOne({_id: movieOfRev._id})
  //Check if it was successfully removed, also error if it didn't exist
  if(remReview.matchedCount === 0) throw 'Error: no review exists with the given reviewId';
  if(remReview.modifiedCount === 0) throw 'Error: unable to remove the review'
  //Now recalculate the overall rating
  let overall = 0;
  let num = 1;
  for(let i=0;i<movieOfRev.reviews.length;i++){
    overall += movieOfRev.reviews[i].rating
    num++;
  }
  num--;
  overall = Math.round(overall*10/num)/10;
  // let updMovie = {
  //   title: movieOfRev.title,
  //   plot: movieOfRev.plot,
  //   genres: movieOfRev.genres,
  //   rating: movieOfRev.rating,
  //   studio: movieOfRev.studio,
  //   castMembers: movieOfRev.castMembers,
  //   dateReleased: movieOfRev.dateReleased,
  //   runtime: movieOfRev.runtime,
  //   reviews: movieOfRev.reviews,
  //   overallRating: overall
  // };
  //Now update the movie on the db
  let movieId = movieOfRev._id.toString();
  const updateRev = await movieCollection.updateOne({_id: ObjectId(movieId)},{$set: {'reviews': movieOfRev.reviews}});
  const updateOvr = await movieCollection.updateOne({_id: ObjectId(movieId)},{$set: {'overallRating': overall}});
  if(!updateRev.matchedCount && !updateRev.modifiedCount) throw 'Update reviews failed'
  if(!updateOvr.matchedCount && !updateOvr.modifiedCount) throw 'Update overallRating failed'
  return await movie.getMovieById(movieId);
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
