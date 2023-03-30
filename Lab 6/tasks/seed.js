const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const movies = data.movies;
const reviews = data.reviews;

async function main(){
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    //Add data to database
    try{
        const fourtytwo = await movies.createMovie('42','Jackie Robinson struggles to become the first african-american baseball player',
        ['Action'],'PG-13','Warner Bros', 'Ians forget', ['Chadwick Boseman', 'Harrison Ford'], '02/28/2012','2h 8min');
        let id = fourtytwo._id.toString();
        await reviews.createReview(id,'Pretty Good', 'Joe Schmo', 'I liked the plot and storytelling', 3.9);
        await reviews.createReview(id,'Amazing', 'John Doe', 'Best movie ever!!', 5);
        await reviews.createReview(id,'Could have been better', 'Sure Fire', 'The production quality was okay, could have been better', 2.8);
    }catch(e){console.log(e)}
    try{
        const hackers = await movies.createMovie('Hackers', 'Hackers are blamed for virus', ['Crime','Drama'], 'PG-13', 
        'United Artists', 'Iain Softley', ['Johnny Miller', 'Angelina Jolie'], '09/15/1995', '1h 45min');
        id = hackers._id.toString();
        await reviews.createReview(id,'Terrible', 'John Doe', 'This movie was not entertaining and very inaccurate',1);
        await reviews.createReview(id,'Meh...', ' Pat Rick', 'Was good, but not realistic', 3);
        await reviews.createReview(id, 'Awesome work!', 'Joe Schmo', 'I loved the movie, Im gonna become a hacker!',5);
    }catch(e){console.log(e)}
    try{
        const breakfast = await movies.createMovie('The Breakfast Club','Students have Saturday Detention',['Comedy','Drama'],
        'R','Universal Pictures','John Hughes',['Judd Nelson','Molly Ringwald'],'02/07/1985','1h 37min');
        id = breakfast._id.toString();
        await reviews.createReview(id,'A classic', 'Pete Her', 'Ill always remember the first time watching it', 4.8);
        await reviews.createReview(id,'Overrated', 'Joe Schmo', 'This is not as good as people say, the movie kind of stinks', 2.3);
        await reviews.createReview(id, 'Why?', 'Sure Fire', 'I dont understand the premise of the movie, why are they in the library?', 3);
    }catch(e){console.log(e)}

    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();