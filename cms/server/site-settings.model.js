"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingsModel = void 0;
var mongoose_1 = require("mongoose");
var siteSettingsSchema = new mongoose_1.Schema({
    featured_article: String,
});
exports.SiteSettingsModel = mongoose_1.default.model('SiteSettings', siteSettingsSchema);
