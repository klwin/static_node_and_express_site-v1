const express = require('express');

const data = require('./data');

const app = express();

//Set pug as view engine
app.set('view engine', 'pug');

//Static files
app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

//Create route for home page
app.get('/', (req,res) => {
    res.locals.projects = data.projects;
    res.render('index');
})

//Create route for about page
app.get('/about', (req,res) => {
    res.render('about');
})

//Create routes for each projects
app.get('/projects/:id', (req,res) => {
    const {id} = req.params;
    res.locals.projects = data.projects;
    res.render('project', {id});
})

/* GET generated error route - create and throw 500 server error */
app.get('/error', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
  
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
  });

//404 Error Handler
app.use((req,res, next) => {
    console.log("404 error handler called");
    res.status(404).render('page-not-found');
});

//Global Error Handler
app.use((err, req, res, next) => {
    if(err) {
        console.log("Global error handler called", err);
    }
    if(err.status === 404) {
        res.status(404),render('page-not-found', {err});
    } else {
        err.message || "Oops!! It looks like something went wrong on the server.";
        res.status(err.status || 500).render('error', {err})
    }
    
})

//Tell which port to listen on
app.listen(3000);

