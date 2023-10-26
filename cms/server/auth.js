"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var passport_1 = require("passport");
var passport_local_1 = require("passport-local");
var crypto = require('crypto');
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    hashed_password: { type: Buffer, required: true },
    salt: { type: Buffer, required: true },
    bio: { type: String, required: false }
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
var passportInstance = new passport_1.Passport();
passportInstance.use('local', new passport_local_1.Strategy(function (username, password, done) {
    exports.UserModel.findOne({ username: username }).then(function (user) {
        if (user) {
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) {
                    return done(err);
                }
                if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                    return done(null, false, { message: "Nom d'utilisateur ou mot de passe incorrect" });
                }
                return done(null, { id: user.id, username: user.username, bio: user.bio });
            });
        }
        else {
            return done(null, false, { message: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    })
        .catch(function (err) { return done(err); });
}));
passportInstance.use('local-signup', new passport_local_1.Strategy(function (username, password, done) {
    exports.UserModel.findOne({ username: username }).then(function (user) {
        if (user) {
            return done(null, false, { message: "Un utilisateur avec le même nom existe déjà" });
        }
        else {
            // create the user
            var newUser = new exports.UserModel();
            // set the user's local credentials
            newUser.username = username;
            newUser.salt = crypto.randomBytes(16);
            crypto.pbkdf2(password, newUser.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                newUser.hashed_password = Buffer.from(hashedPassword);
                // save the user
                newUser.save().then(function (value) {
                    var returnUser = { id: value._id, username: value.username, bio: value.bio };
                    return done(null, returnUser);
                });
            });
        }
    })
        .catch(function (err) { return done(err); });
}));
passportInstance.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    });
});
passportInstance.deserializeUser(function (user, done) {
    exports.UserModel.findById(user.id).then(function (user) {
        return done(null, user);
    })
        .catch(function (err) { return done(err); });
});
exports.default = passportInstance;
