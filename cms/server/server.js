"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var path = require("path");
var routes_1 = require("./routes");
var auth_1 = require("./auth");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require('cors');
var MongoDBStore = require('connect-mongodb-session')(session);
var bodyParser = require('body-parser');
var port = 3000;
var database = "mongodb://127.0.0.1:27017/article";
var app = express();
var sessionStore = new MongoDBStore({
    uri: database,
    collection: "sessions"
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard badger',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(auth_1.default.authenticate('session'));
app.use(function (err, req, res, next) {
    if (err) {
        var status_1 = err.status || 500;
        res.status(status_1).json({
            status: 'error',
            statusCode: status_1,
            stack: err.stack
        });
    }
});
app.use(express.static(path.join(__dirname, '../www')));
app.use("/api", routes_1.default);
// app.all('/admin',
//   (req, res, next) => {
//     if (!req.user) {
//       res.redirect('/login');
//     } else {
//       next();
//     }
//   }
// )
app.all(/^[^.]*$/, function (req, res, next) {
    res.sendFile('index.html', { root: path.join(__dirname, '../www') });
});
app.listen(3000, function () {
    console.log("listening http://localhost:".concat(port));
    mongoose_1.default.connect(database);
    var db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
    db.once('open', function () {
        console.log('Connecté à la base de données MongoDB.');
    });
});
var article_model_1 = require("./article.model");
var newArticle1 = new article_model_1.ArticleModel({
    id: '1',
    imageUrl: 'URL_de_l_image',
    title: 'Titre du 1',
    summary: 'Résumé du 1',
    content: 'Contenu de l\'article 1',
    author: '1',
    keywords: ['mot-clé1', 'mot-clé2'],
});
var newArticle2 = new article_model_1.ArticleModel({
    id: '2',
    imageUrl: 'URL_de_l_image',
    title: 'Titre du 2',
    summary: 'Résumé du 2',
    content: 'Contenu de l\'article 2',
    author: '1',
    keywords: ['mot-clé1', 'mot-clé2'],
});
var newArticle3 = new article_model_1.ArticleModel({
    id: '3',
    imageUrl: 'URL_de_l_image',
    title: 'Mon titre du 3',
    summary: 'le resumé de 3',
    content: 'Contenu de l\'article 3',
    author: '1',
    keywords: ['mot-clé1', 'mot-clé2'],
});
// const newAuthor = new AuthorModel({
//   id: '1',
//   name: 'Robert Azerty',
//   bio: 'Biographie de Robert',
// });
// newAuthor.save();
newArticle1.save();
newArticle2.save();
newArticle3.save();
var auth_2 = require("./auth");
var newUser = new auth_2.UserModel({
    username: 'Robert Kakyo',
    bio: 'Biographie de l\'utilisateur Robert',
});
newUser.save();
var site_settings_model_1 = require("./site-settings.model");
var siteSettings = new site_settings_model_1.SiteSettingsModel({
    featured_article: '1',
});
siteSettings.save();
