"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var article_model_1 = require("./article.model");
var author_model_1 = require("./author.model");
var site_settings_model_1 = require("./site-settings.model");
var router = (0, express_1.Router)();
router.post('/login', function (req, res, next) {
    auth_1.default.authenticate('local', function (err, user, data) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        req.login(user, function (loginErr) {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({ success: true, message: "Connexion établie", user: req.user });
        });
    })(req, res, next);
});
router.post('/signup', function (req, res, next) {
    auth_1.default.authenticate('local-signup', function (err, user, data) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (user) {
            return res.json({ success: true, message: "Utilisateur enregistré" });
        }
        else {
            return res.json(__assign({ success: false }, data));
        }
    })(req, res, next);
});
router.get('/alldata', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articles, authors, allData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, article_model_1.ArticleModel.find()];
            case 1:
                articles = _a.sent();
                return [4 /*yield*/, author_model_1.AuthorModel.find()];
            case 2:
                authors = _a.sent();
                allData = {
                    articles: articles,
                    authors: authors,
                };
                res.json(allData);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/featured-article', function (req, res) {
    site_settings_model_1.SiteSettingsModel.findOne()
        .then(function (settings) {
        if (settings && settings.featured_article) {
            res.json({ featured_article: settings.featured_article });
        }
        else {
            res.status(404).json({ message: 'Article vedette non trouvé dans les réglages généraux' });
        }
    })
        .catch(function (error) {
        console.error('Erreur lors de la récupération de l\'article vedette :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'article vedette' });
    });
});
router.put('/update-featured-article/:articleId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                articleId = req.params.articleId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, site_settings_model_1.SiteSettingsModel.updateOne({}, { featured_article: articleId })];
            case 2:
                _a.sent();
                res.status(200).json({ message: 'Paramètres du site mis à jour avec succès.' });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: 'Erreur lors de la mise à jour des paramètres du site.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/update-article/:articleId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, updatedArticleData, updatedArticle, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                articleId = req.params.articleId;
                updatedArticleData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, article_model_1.ArticleModel.findOneAndUpdate({ id: articleId }, updatedArticleData, { new: true })];
            case 2:
                updatedArticle = _a.sent();
                if (!updatedArticle) {
                    res.status(404).json({ error: 'Article non trouvé' });
                }
                res.status(200).json(updatedArticle);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
