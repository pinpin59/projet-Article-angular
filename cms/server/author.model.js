"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = void 0;
// author.model.ts
var mongoose_1 = require("mongoose");
var authorSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    bio: String,
});
exports.AuthorModel = mongoose_1.default.model('Author', authorSchema);
