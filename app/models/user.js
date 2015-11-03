var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
 tableName: 'users',
 hasTimestamps: true,

 clicks: function () {
   return this.hasMany(Click);
 },
 initialize: function () {
   this.on('creating', function (model, attrs, options) {
     var shasum = crypto.createHash('sha1');
     shasum.update(model.get('url'));
     model.set('code', shasum.digest('hex'));
   });
 }
});

module.exports = User;
