/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
const main = async() => {
    const db = await connection.dbConnection();
    await db.dropDatabase();
    let hackers = undefined;
    let fourtytwo = undefined;
    let breakfast = undefined;
    try{
     //1
     hackers = await movies.createMovie('Hackers', 'Hackers are blamed for virus', ['Crime','Drama'], 'PG-13', 
             'United Artists', 'Iain Softley', ['Johnny Miller', 'Angelina Jolie'], '09/15/1995', '1h 45min');
     //2
     console.log(hackers);
     //3
     fourtytwo = await movies.createMovie('42', 'Jackie Robinson was the first African American Baseball player',
     ['Biography','Drama','Sport'],'PG-13','Warner Bros','Brian Helgeland',['Chadwick Boseman','Harrison Ford'],
     '04/09/2013','2h 8min');
     //4
     let allMovies = await movies.getAllMovies();
     console.log(allMovies);
     //5
     breakfast = await movies.createMovie('The Breakfast Club','Students have Saturday Detention',['Comedy','Drama'],
          'R','Universal Pictures','John Hughes',['Judd Nelson','Molly Ringwald'],'02/07/1985','1h 37min');
     //6
     console.log(breakfast);
     //7
     await movies.renameMovie(hackers._id, 'Hacked');
     //8
     let newOne = await movies.getMovieById(hackers._id.toString());
     console.log(newOne);
     //9
     await movies.removeMovie(fourtytwo._id.toString())
     //10
     allMovies = await movies.getAllMovies();
     console.log(allMovies);
     let testing = undefined;
     console.log('Now testing errors'); 
     try{
      //11
      console.log('11')
      testing = await movies.createMovie('Hi!', 'Hackers are blamed for virus', ['Crime','Drama'], 'PG-13', 
      'United Artists', 'Iain Softley', ['Johnny Miller', 'Angelina Jolie'], '09/15/1995', '1h 45min');
     }catch(e){console.log(e)}
     try{
      //12
      console.log('12')
      //Succeeds
      await movies.removeMovie(hackers._id.toString());
      //Fails
      await movies.removeMovie(hackers._id.toString());
     }catch(e){console.log(e)}
     try{
      //13
      console.log('13')
      await movies.renameMovie(hackers._id.toString(), 'Hackers');
     }catch(e){console.log(e)}
     try{
      //14
      console.log('14')
      await movies.renameMovie(hackers._id.toString(), 'Hi!');
     }catch(e){console.log(e)}
     try{
      //15
      console.log('15')
      await movies.getMovieById('dfjklhvbkdjhewr');
     }catch(e){console.log(e)}
    }catch(e){console.log(e)}
    await connection.closeConnection();
}
main();
