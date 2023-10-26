"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
var mongoose_1 = require("mongoose");
var articleSchema = new mongoose_1.Schema({
    id: String,
    imageUrl: String,
    title: String,
    summary: String,
    content: String,
    author: String,
    keywords: [String],
});
exports.ArticleModel = mongoose_1.default.model('Article', articleSchema);
