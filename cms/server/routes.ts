import { Router } from "express";
import passportInstance from './auth';
import { ArticleModel } from "./article.model";
import { AuthorModel } from "./author.model";
import { SiteSettingsModel } from "./site-settings.model";


const router: Router = Router();

router.post('/login',
    (req, res, next) => {
        passportInstance.authenticate('local', (err: any, user: Express.User, data:any) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (!user) {
                return res.json({success: false, message: "Nom d'utilisateur ou mot de passe incorrect"});
            }
            req.login(user, loginErr => {
                if (loginErr) {
                  return next(loginErr);
                }
                return res.json({ success : true, message : "Connexion établie", user: req.user });
            }); 
        })(req, res, next);
    }
);

router.post('/signup',
    (req, res, next) => {
        passportInstance.authenticate('local-signup', (err: any, user: Express.User, data:any) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (user) {
                return res.json({success : true, message: "Utilisateur enregistré"});
            } else {
                return res.json({success: false, ...data});
            }
        })(req, res, next);
    }
);

router.get('/alldata', async (req, res) => {
    try {
      const articles = await ArticleModel.find();
      const authors = await AuthorModel.find();
  
      const allData = {
        articles,
        authors,
      };
      res.json(allData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
  });
  

  router.get('/featured-article', (req, res) => {
    SiteSettingsModel.findOne()
      .then((settings:any) => {
        if (settings && settings.featured_article) {
          res.json({ featured_article: settings.featured_article });
        } else {
          res.status(404).json({ message: 'Article vedette non trouvé dans les réglages généraux' });
        }
      })
      .catch((error:any) => {
        console.error('Erreur lors de la récupération de l\'article vedette :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'article vedette' });
      });
  });
  
  router.put('/update-featured-article/:articleId', async (req, res) => {
    const articleId = req.params.articleId;
    try {
      await SiteSettingsModel.updateOne({}, { featured_article: articleId });
      res.status(200).json({ message: 'Paramètres du site mis à jour avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour des paramètres du site.' });
    }
  });

  router.put('/update-article/:articleId', async (req, res) => {
    const articleId = req.params.articleId;
    const updatedArticleData = req.body;
  
    try {
      const updatedArticle = await ArticleModel.findOneAndUpdate(
        { id: articleId }, 
        updatedArticleData,
        { new: true }
      );
  
      if (!updatedArticle) {
        res.status(404).json({ error: 'Article non trouvé' });
      }
  
      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article.' });
    }
  });
  
    
export default router;