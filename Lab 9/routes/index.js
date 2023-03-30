//Here you will require route files and export them as used in previous labs.
const arrayRoutes = require('./sortArray');
const constructorMethod = (app) => {
    app.use('/', arrayRoutes);
    app.use('*', (req,res) => {
        res.redirect('/');
    });
}
module.exports = constructorMethod;
