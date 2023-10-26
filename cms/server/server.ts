import * as express from 'express';
import mongoose from 'mongoose';
import * as  path from 'path';
import router from './routes';
import passportInstance from './auth';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
const cors = require('cors'); 

const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');

const port: number = 3000;
const database: string = "mongodb://127.0.0.1:27017/article";
const app = express();

const sessionStore = new MongoDBStore({
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
} ));
app.use(passportInstance.authenticate('session'));

app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    const status = err.status || 500;
    res.status(status).json({
      status: 'error',
      statusCode:status,
      stack: err.stack
    });
  }
});

app.use(express.static(path.join(__dirname, '../www')));
app.use("/api", router);
// app.all('/admin',
//   (req, res, next) => {
//     if (!req.user) {
//       res.redirect('/login');
//     } else {
//       next();
//     }
//   }
// )

app.all(/^[^.]*$/,
  (req, res, next) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../www') });
  }
);


app.listen(3000, () => {
  console.log(`listening http://localhost:${port}`)
    
  mongoose.connect(database);
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
  db.once('open', () => {
    console.log('Connecté à la base de données MongoDB.');
  });
});


import { ArticleModel } from './article.model';
import {AuthorModel}  from './author.model'; 

const newArticle1 = new ArticleModel({
  id: '1',
  imageUrl: 'URL_de_l_image',
  title: 'Titre du 1',
  summary: 'Résumé du 1',
  content: 'Contenu de l\'article 1',
  author: '1', 
  keywords: ['mot-clé1', 'mot-clé2'],
});
const newArticle2 = new ArticleModel({
  id: '2',
  imageUrl: 'URL_de_l_image',
  title: 'Titre du 2',
  summary: 'Résumé du 2',
  content: 'Contenu de l\'article 2',
  author: '1', 
  keywords: ['mot-clé1', 'mot-clé2'],
});

const newArticle3 = new ArticleModel({
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



import { UserModel } from './auth';


const newUser = new UserModel({
  username: 'Robert Kakyo', 
  bio: 'Biographie de l\'utilisateur Robert', 
});

newUser.save();

import { SiteSettingsModel } from './site-settings.model';

const siteSettings = new SiteSettingsModel({
  featured_article: '1', 
});

siteSettings.save()