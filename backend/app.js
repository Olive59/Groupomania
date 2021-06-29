const express = require('express');
const path = require ('path');

const helmet = require('helmet');
const nocache = require('nocache');

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');


// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

const app = express();

//moteur de template

app.set('view engine', 'ejs')

app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    console.log('req=',req.originalUrl);
    next();
});



// Sécuriser Express en définissant divers en-têtes HTTP - https://www.npmjs.com/package/helmet#how-it-works
// On utilise helmet pour plusieurs raisons notamment la mise en place du X-XSS-Protection afin d'activer le filtre de script intersites(XSS) dans les navigateurs web
app.use(helmet());

//Désactive la mise en cache du navigateur
app.use(nocache());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/comments', commentRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/user', userRoutes);


module.exports = app;