const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const helpers = require('../helpers');
const {ObjectId} = require('mongodb');
const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  plot = helpers.checkString(plot, 'plot');
  title = helpers.checkTitle(title);
  studio = helpers.checkStudio(studio);
  director = helpers.checkDirector(director);
  rating = helpers.checkRating(rating)
  genres = helpers.checkGenres(genres);
  castMembers = helpers.checkCast(castMembers);
  dateReleased = helpers.checkDate(dateReleased, 'dateReleased');
  runtime = helpers.checkRuntime(runtime);
  //Now insert the movie into the database
  const movieCollection = await movies();
  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: [],
    overallRating: 0
  };
  const insertInfo = await movieCollection.insertOne(newMovie);
  if(!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add movie'
  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  let retVal = await movieCollection.find({}).toArray();
  if(!retVal) return [];
  retVal.forEach(elem => elem._id = elem._id.toString());
  retVal.reviews.forEach(elem => elem._id = elem._id.toString());
  return retVal;
};

const getMovieById = async (movieId) => {
  if(movieId === undefined) throw 'id must exist'
  if((typeof movieId !== 'string') || (movieId.trim().length === 0)) throw 'id must be a non-empty string'
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)) throw 'id must be a valid ObjectId'
  const movieCollection = await movies();
  const thisMovie = await movieCollection.findOne({_id: ObjectId(movieId)});
  if(thisMovie === null) throw 'No movie exists with the given id'
  //Check if it actually updates the Id
  thisMovie._id = thisMovie._id.toString();
  thisMovie.reviews.forEach(elem => elem._id = elem._id.toString());
  return thisMovie;
};

const removeMovie = async (movieId) => {
  if(movieId === undefined) throw 'id must exist'
  if((typeof movieId !== 'string') || (movieId.trim().length === 0)) throw 'id must be a non-empty string'
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)) throw 'id must be a valid ObjectId'
  const movieCollection = await movies();
  const movieInfo = await getMovieById(movieId);
  const deleteInfo = await movieCollection.deleteOne({_id: ObjectId(movieId)});
  if(deleteInfo.deletedCount === 0) throw `Could not delete movie with id ${movieId}`
  return `${movieInfo.title} has been successfully deleted!`
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  movieId = helpers.checkId(movieId, 'movieId')
  plot = helpers.checkString(plot, 'plot');
  genres = helpers.checkGenres(genres);
  castMembers = helpers.checkCast(castMembers);
  title = helpers.checkTitle(title);
  studio = helpers.checkStudio(studio);
  director = helpers.checkDirector(director);
  rating = helpers.checkRating(rating)
  dateReleased = helpers.checkDate(dateReleased, 'dateReleased');
  runtime = helpers.checkRuntime(runtime);
  //Get the movie
  let oldMovie = await getMovieById(movieId);

  let updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: oldMovie.reviews,
    overallRating: oldMovie.overallRating
  };
  //Now update the movie
  const movieCollection = await movies();
  const updateInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedMovie}
  );
  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
  return await getMovieById(movieId);
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
};
