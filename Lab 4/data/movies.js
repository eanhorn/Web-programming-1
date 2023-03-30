const mongoCollections = require('../config/mongoCollections');
const helper = require('../helpers');
const movies = mongoCollections.movies;
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
  if(title === undefined) throw 'title must exist'
  if(plot === undefined) throw 'plot must exist'
  if(genres === undefined) throw 'genres must exist'
  if(rating === undefined) throw 'rating must exist'
  if(studio === undefined) throw 'studio must exist'
  if(director === undefined) throw 'director must exist'
  if(castMembers === undefined) throw 'castMembers must exist'
  if(dateReleased === undefined) throw 'dateReleased must exist'
  if(runtime === undefined) throw 'runtime must exist'

  if((typeof title !== 'string') || (title.trim().length < 2)) throw 'title must be a string of at least length 2'
  if((typeof plot !== 'string') || (plot.trim().length === 0)) throw 'plot must be a non-empty string'
  if((typeof rating !== 'string') || (rating.trim().length === 0)) throw 'rating must be a non-empty string'
  if((typeof studio !== 'string') || (studio.trim().length < 5)) throw 'studio must be a non-empty string of at least length 5'
  if((typeof director !== 'string') || (director.trim().length === 0)) throw 'director must be a non-empty string'
  if((typeof dateReleased !== 'string') || (dateReleased.trim().length === 0)) throw 'dateReleased must be a non-empty string'
  if((typeof runtime !== 'string') || (runtime.trim().length === 0)) throw 'runtime must be a non-empty string'

  title = title.trim();
  plot = plot.trim();
  rating = rating.trim();
  studio = studio.trim();
  director = director.trim();
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();

  if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(title)) throw 'title cannot contain special characters or punctuation'
  if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(studio)) throw 'studio cannot contain special characters or numbers'
  if(! /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(director)) throw "director must be of the form 'FirstName LastName and cannot contain anything but letters"
  const allowedRating = ['G','PG','PG-13','R','NC-17'];
  if(!allowedRating.includes(rating)) throw 'rating must be one of the following values: G, PG, PG-13, R, NC-17'

  if((!Array.isArray(genres)) || 
      (genres.length === 0) || 
      (genres.some(g => ((typeof g !== 'string') || (g.trim().length < 5) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(title))))) 
        throw 'genres must be an array with at least one non-empty string in it'
  genres.forEach(elem => elem = elem.trim());
  if((!Array.isArray(castMembers)) || 
      (castMembers.length === 0) || 
      (castMembers.some(c => (typeof c !== 'string') || (c.trim().length < 7) || (! /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/.test(c))))) 
        throw "castMembers must be an array of strings with at least one non-empty string of the form 'FirstName LastName'"
  castMembers.forEach(elem => elem = elem.trim());
  const checkDate = dateReleased.split('/');
  if(! /^(0[1-9]|1[0-2])/.test(checkDate[0])) throw 'dateReleased must be of the form MM/dd/yyyy'
  if(! /^(0[1-9]|[12][0-9]|3[01])/.test(checkDate[1])) throw 'dateReleased must be of the form mm/DD/yyyy'
  //Check year for errors
  if(! /^(19|20)[0-9][0-9]/.test(checkDate[2])) throw 'dateReleased must be of the form mm/dd/YYYY'
  const thirty = ['04','06','09','11'];
  const tweneight = ['02'];
  if((tweneight.includes(checkDate[0]) && (Number(checkDate[1]) > 28)) || 
     (thirty.includes(checkDate[0]) && (Number(checkDate[1]) > 30))) throw 'The given day does not fall within the given month'
  const currYear = new Date().getFullYear();
  if((Number(checkDate[2]) - currYear) > 2) throw 'The release year cannot be more than 2 years in the future'

  if(! /^[1-9]h (0|0[1-9]|[1-9]|[1-5][0-9])min$/.test(runtime)) throw "The runtime must be of the form '#h #min' and must be at least 1 hour"

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
    runtime: runtime
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
  return retVal;
};

const getMovieById = async (id) => {
  if(id === undefined) throw 'id must exist'
  if((typeof id !== 'string') || (id.trim().length === 0)) throw 'id must be a non-empty string'
  id = id.trim();
  if(!ObjectId.isValid(id)) throw 'id must be a valid ObjectId'
  const movieCollection = await movies();
  const thisMovie = await movieCollection.findOne({_id: ObjectId(id)});
  if(thisMovie === null) throw 'No movie exists with the given id'
  //Check if it actually updates the Id
  thisMovie._id = thisMovie._id.toString();
  return thisMovie;
};

const removeMovie = async (id) => {
  if(id === undefined) throw 'id must exist'
  if((typeof id !== 'string') || (id.trim().length === 0)) throw 'id must be a non-empty string'
  id = id.trim();
  if(!ObjectId.isValid(id)) throw 'id must be a valid ObjectId'
  const movieCollection = await movies();
  const movieInfo = await getMovieById(id);
  const deleteInfo = await movieCollection.deleteOne({_id: ObjectId(id)});
  if(deleteInfo.deletedCount === 0) throw `Could not delete movie with id ${id}`
  return `${movieInfo.title} has been successfully deleted!`
};

const renameMovie = async (id, newName) => {
  if(id === undefined) throw 'id must exist'
  if(newName === undefined) throw 'newName must exist'
  if((typeof id !== 'string') || (id.trim().length === 0)) throw 'id must be a non-empty string'
  if((typeof newName !== 'string') || (newName.trim().length < 0)) throw 'newName must be a string of at least length 2'
  id = id.trim();
  newName = newName.trim();
  if(!ObjectId.isValid(id)) throw 'id must be a valid ObjectId'
  if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newName)) throw 'newName cannot contain special characters or punctuation'
  const movieCollection = await movies();
  const oldMovie = await getMovieById(id);
  const updatedMovie = {
    title: newName,
    plot: oldMovie.plot,
    genres: oldMovie.genres,
    rating: oldMovie.rating,
    studio: oldMovie.studio,
    director: oldMovie.director,
    castMembers: oldMovie.castMembers,
    dateReleased: oldMovie.dateReleased,
    runtime: oldMovie.runtime
  };
  const updateInfo = await movieCollection.updateOne({_id: ObjectId(id)},{$set: updatedMovie});
  if(updateInfo.modifiedCount === 0) throw 'Could not update movie title successfully'
  const newMovie = await getMovieById(id);
  return newMovie;
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
