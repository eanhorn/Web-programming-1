//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');
const constructorMethod = (app) => {
    app.use('/',peopleRoutes);
    app.use('/searchpeople', (req,res) => {
        res.redirect('/');  
    });
    app.use('/persondetails', (req,res) => {
        res.status(400).render('error', {title: 'Error', error: 'You must supply an id. Click below to return to the home page'});
    });
    app.use('*',(req,res) => {
        res.status(404).render('error', {title: '404: Not Found Error', error: 'The given URL does not exist. Click below to return to the home page'});
    });
}
module.exports = constructorMethod;
